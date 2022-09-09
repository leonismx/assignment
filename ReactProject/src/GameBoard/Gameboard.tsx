import React, { useMemo } from 'react';
import { FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { CARD_PAIRS_VALUE } from '../App';
import CardComponent from '../Card/Card';
import {
  openCard,
  selectCards,
  clearCards,
  disableAllCards,
  selectIfCardsShouldBeDisabled,
  enableAllCards,
  Card,
} from '../slices/gameSlice';
import { GAMEBOARD_MARGIN, getColumns } from '../Utils/dimension';
interface RenderProps {
  item: Card;
  index: number;
}

const RenderItem = (props: RenderProps) => {
  const { item, index } = props;
  const dispatch = useDispatch();

  const triggerCardTapped = (index: number) => {
    dispatch(openCard(index));
    dispatch(enableAllCards());
  };

  const triggerClearFlippedCard = (index: number) => {
    dispatch(clearCards(index));
    dispatch(enableAllCards());
  };
  const disable = () => {
    dispatch(disableAllCards());
  };

  return (
    <CardComponent
      cardIndex={index}
      card={item}
      opened={item.opened}
      restart={item.restart}
      cardTapped={triggerCardTapped}
      reset={item.reset}
      clearFlippedCards={triggerClearFlippedCard}
      disable={useSelector(selectIfCardsShouldBeDisabled)}
      disableAllCards={disable}
    />
  );
};

const GameBoard = () => {
  const cards = useSelector(selectCards);
  const col = getColumns();

  return (
    <FlatList
      removeClippedSubviews={true}
      style={{ margin: GAMEBOARD_MARGIN }}
      data={cards}
      keyExtractor={(item) => item.id.toString()}
      numColumns={col}
      renderItem={(props) => <RenderItem {...props} />}
    />
  );
};

export default GameBoard;
