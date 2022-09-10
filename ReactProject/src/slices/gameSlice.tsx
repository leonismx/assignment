import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';
import { CARD_PAIRS_VALUE } from '../App';

export interface FlipCard {
  index: number;
  value: number;
}

export interface Card {
  value: number;
  opened: boolean;
  reset: boolean;
  id: Double;
  restart: boolean;
}

const initialState: {
  cards: Card[];
  flippedCardsIndex: FlipCard[];
  disableCards: boolean;
  stepsTaken: number;
  pairedCards: number;
  showAlert: boolean;
} = {
  cards: [],
  flippedCardsIndex: [],
  disableCards: false,
  stepsTaken: 0,
  pairedCards: 0,
  showAlert: false,
};

export const gameSlice = createSlice({
  name: 'gameboard',
  initialState: initialState,
  reducers: {
    clearCards: (state, action) => {
      state.cards[action.payload].reset = false;
      state.flippedCardsIndex = [];
    },
    setCards: (state, action: PayloadAction<Card[]>) => {
      state.cards = action.payload;
    },
    openCard: (state, action: PayloadAction<number>) => {
      state.stepsTaken += 1;
      state.flippedCardsIndex.push({
        index: action.payload,
        value: state.cards[action.payload].value,
      });
      state.cards[action.payload].opened = true;

      const firstCardIndex = state.flippedCardsIndex[0]?.index;
      const secondCardIndex = state.flippedCardsIndex[1]?.index;

      if (state.flippedCardsIndex.length === 2) {
        if (state.flippedCardsIndex[0].value === state.flippedCardsIndex[1].value) {
          state.flippedCardsIndex = [];
          state.pairedCards++;
        } else {
          state.cards[firstCardIndex].reset = true;
          state.cards[firstCardIndex].opened = false;

          state.cards[secondCardIndex].reset = true;
          state.cards[secondCardIndex].opened = false;
        }
      }

      if (state.pairedCards === CARD_PAIRS_VALUE) {
        state.showAlert = true;
      }
    },
    disableAllCards: (state) => {
      state.disableCards = true;
    },
    enableAllCards: (state) => {
      state.disableCards = false;
    },
    animateAllCardsBack: (state) => {
      state.cards.map((card) => {
        if (card.opened) {
          card.restart = true;
        }
      });
    },
    clearAllStatesAndRestart: () => initialState,
  },
});

export const {
  setCards,
  openCard,
  clearCards,
  disableAllCards,
  enableAllCards,
  animateAllCardsBack,
  clearAllStatesAndRestart,
} = gameSlice.actions;

export const selectCards = (state: { gameboard: { cards: Card[] } }) => state.gameboard.cards;
export const selectStepsTaken = (state: { gameboard: { stepsTaken: number } }) =>
  state.gameboard.stepsTaken;
export const selectIfCardsShouldBeDisabled = (state: { gameboard: { disableCards: boolean } }) =>
  state.gameboard.disableCards;
export const selectIfGameEnded = (state: { gameboard: { showAlert: boolean } }) =>
  state.gameboard.showAlert;

export default gameSlice.reducer;
