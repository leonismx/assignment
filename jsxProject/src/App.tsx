import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import GameBoard from './GameBoard/Gameboard';
import Header from './Header';
import { animateAllCardsBack, clearAllStatesAndRestart, setCards } from './slices/gameSlice';

export const CARD_PAIRS_VALUE = 6;

const App: () => JSX.Element = () => {
  const dispatch = useDispatch();
  const [restart, setRestart] = useState(false);

  useEffect(() => {
    let arr = [];
    while (arr.length < CARD_PAIRS_VALUE) {
      let r = Math.floor(Math.random() * 100) + 1;
      if (arr.indexOf(r) === -1) arr.push(r);
    }

    const shuffleCards = [...arr, ...arr]
      .sort(() => Math.random() - 0.5)
      .map((cardValue) => ({
        value: cardValue,
        id: Math.random(),
        matched: false,
        opened: false,
        reset: false,
        restart: false,
      }));

    dispatch(setCards(shuffleCards));
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
      <Header restartBtnTapped={restartApp}></Header>
      <GameBoard />
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
