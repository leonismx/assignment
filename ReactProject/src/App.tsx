import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import GameBoard from './GameBoard/Gameboard';
import Header from './Header';
import Popup from './Popup';
import { animateAllCardsBack, Card, clearAllStatesAndRestart, setCards } from './slices/gameSlice';

export const CARD_PAIRS_VALUE = 4;

export const randomCards = (pairsOfCard: number): Card[] => {
  let arrOfNumbers = [];
  while (arrOfNumbers.length < pairsOfCard) {
    let r = Math.floor(Math.random() * 100) + 1;
    if (arrOfNumbers.indexOf(r) === -1) arrOfNumbers.push(r);
  }

  return [...arrOfNumbers, ...arrOfNumbers]
    .sort(() => Math.random() - 0.5)
    .map((cardValue) => ({
      value: cardValue,
      id: Math.random(),
      opened: false,
      reset: false,
      restart: false,
    }));
};

const App = () => {
  const dispatch = useDispatch();
  const [restart, setRestart] = useState(false);

  useEffect(() => {
    dispatch(setCards(randomCards(CARD_PAIRS_VALUE)));
  }, [restart]);

  const restartApp = () => {
    dispatch(animateAllCardsBack());

    setTimeout(() => {
      setRestart((prevState) => !prevState);
      dispatch(clearAllStatesAndRestart());
    }, 300);
  };

  return (
    <SafeAreaView style={styles.overviewContainer}>
      <Header restartBtnTapped={restartApp} />
      <GameBoard />
      <Popup callBack={restartApp} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  overviewContainer: {
    flexDirection: 'column',
    flex: 1,
  },
});

export default App;
