//reducer tests
import reducer, {
  setCards,
  openCard,
  clearAllStatesAndRestart,
  clearCards,
  selectCards,
  selectIfCardsShouldBeDisabled,
  selectIfGameEnded,
  selectStepsTaken,
  Card,
} from '../src/slices/gameSlice';

test('should return the initial state', () => {
  expect(reducer(undefined, { type: undefined })).toEqual({
    cards: [],
    flippedCardsIndex: [],
    disableCards: false,
    stepsTaken: 0,
    pairedCards: 0,
    showAlert: false,
  });
});

test('should return empty cards state if array emptied', () => {
  const cardsPreviousState = {
    cards: [
      { value: 58, id: 0.56894548, opened: true, reset: false, restart: false },
      { value: 88, id: 0.65489111, opened: false, reset: true, restart: false },
      { value: 32, id: 0.98789512, opened: true, reset: false, restart: false },
      { value: 8, id: 0.10148032, opened: true, reset: false, restart: false },
      { value: 48, id: 0.32789432, opened: true, reset: false, restart: false },
      { value: 23, id: 0.32457978, opened: true, reset: false, restart: false },
    ],
    flippedCardsIndex: [],
    disableCards: false,
    stepsTaken: 0,
    pairedCards: 0,
    showAlert: false,
  };

  expect(reducer(cardsPreviousState, setCards([]))).toEqual({
    cards: [],
    flippedCardsIndex: [],
    disableCards: false,
    stepsTaken: 0,
    pairedCards: 0,
    showAlert: false,
  });
});

test('should handle cards added to an empty list', () => {
  const cardsPreviousState = {
    cards: [],
    flippedCardsIndex: [],
    disableCards: false,
    stepsTaken: 0,
    pairedCards: 0,
    showAlert: false,
  };

  expect(
    reducer(
      cardsPreviousState,
      setCards([
        { value: 58, id: 0.56894548, opened: true, reset: false, restart: false },
        { value: 88, id: 0.65489111, opened: false, reset: true, restart: false },
        { value: 32, id: 0.98789512, opened: true, reset: false, restart: false },
      ])
    )
  ).toEqual({
    cards: [
      { value: 58, id: 0.56894548, opened: true, reset: false, restart: false },
      { value: 88, id: 0.65489111, opened: false, reset: true, restart: false },
      { value: 32, id: 0.98789512, opened: true, reset: false, restart: false },
    ],
    flippedCardsIndex: [],
    disableCards: false,
    stepsTaken: 0,
    pairedCards: 0,
    showAlert: false,
  });
});

test('should handle cards added to an empty list', () => {
  const cardsPreviousState = {
    cards: [],
    flippedCardsIndex: [],
    disableCards: false,
    stepsTaken: 0,
    pairedCards: 0,
    showAlert: false,
  };

  expect(
    reducer(
      cardsPreviousState,
      setCards([
        { value: 58, id: 0.56894548, opened: true, reset: false, restart: false },
        { value: 88, id: 0.65489111, opened: false, reset: true, restart: false },
        { value: 32, id: 0.98789512, opened: true, reset: false, restart: false },
      ])
    )
  ).toEqual({
    cards: [
      { value: 58, id: 0.56894548, opened: true, reset: false, restart: false },
      { value: 88, id: 0.65489111, opened: false, reset: true, restart: false },
      { value: 32, id: 0.98789512, opened: true, reset: false, restart: false },
    ],
    flippedCardsIndex: [],
    disableCards: false,
    stepsTaken: 0,
    pairedCards: 0,
    showAlert: false,
  });
});

// this test to set all cards to reset=false to flip them back if opened
// also clears the stored flipped card index
test('should clear cards when action sent', () => {
  const cardsPreviousState = {
    cards: [
      { value: 58, id: 0.56894548, opened: true, reset: true, restart: false },
      { value: 88, id: 0.65489111, opened: false, reset: false, restart: false },
      { value: 32, id: 0.98789512, opened: true, reset: true, restart: false },
    ],
    flippedCardsIndex: [8, 12],
    disableCards: false,
    stepsTaken: 0,
    pairedCards: 0,
    showAlert: false,
  };

  expect(reducer(cardsPreviousState, clearCards(2))).toEqual({
    cards: [
      { value: 58, id: 0.56894548, opened: true, reset: true, restart: false },
      { value: 88, id: 0.65489111, opened: false, reset: false, restart: false },
      { value: 32, id: 0.98789512, opened: true, reset: false, restart: false },
    ],
    flippedCardsIndex: [],
    disableCards: false,
    stepsTaken: 0,
    pairedCards: 0,
    showAlert: false,
  });
});
