//reducer tests
import reducer, {
  setCards,
  openCard,
  clearAllStatesAndRestart,
  clearCards,
  disableAllCards,
  enableAllCards,
  animateAllCardsBack,
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
  const previousState = {
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

  expect(reducer(previousState, setCards([]))).toEqual({
    cards: [],
    flippedCardsIndex: [],
    disableCards: false,
    stepsTaken: 0,
    pairedCards: 0,
    showAlert: false,
  });
});

test('should handle cards added to an empty list', () => {
  const previousState = {
    cards: [],
    flippedCardsIndex: [],
    disableCards: false,
    stepsTaken: 0,
    pairedCards: 0,
    showAlert: false,
  };

  expect(
    reducer(
      previousState,
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
  const previousState = {
    cards: [],
    flippedCardsIndex: [],
    disableCards: false,
    stepsTaken: 0,
    pairedCards: 0,
    showAlert: false,
  };

  expect(
    reducer(
      previousState,
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
  const previousState = {
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

  expect(reducer(previousState, clearCards(2))).toEqual({
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

test('should change state of disableCard when action sent', () => {
  const previousState = {
    cards: [],
    flippedCardsIndex: [],
    disableCards: false,
    stepsTaken: 0,
    pairedCards: 0,
    showAlert: false,
  };

  expect(reducer(previousState, disableAllCards(true))).toEqual({
    cards: [],
    flippedCardsIndex: [],
    disableCards: true,
    stepsTaken: 0,
    pairedCards: 0,
    showAlert: false,
  });
});

test('should change state of disableCard when a different action sent', () => {
  const previousState = {
    cards: [],
    flippedCardsIndex: [],
    disableCards: true,
    stepsTaken: 0,
    pairedCards: 0,
    showAlert: false,
  };

  expect(reducer(previousState, enableAllCards(false))).toEqual({
    cards: [],
    flippedCardsIndex: [],
    disableCards: false,
    stepsTaken: 0,
    pairedCards: 0,
    showAlert: false,
  });
});

test('should handle Card restart key-value set to true', () => {
  const previousState = {
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
  };

  expect(reducer(previousState, animateAllCardsBack())).toEqual({
    cards: [
      { value: 58, id: 0.56894548, opened: true, reset: false, restart: true },
      { value: 88, id: 0.65489111, opened: false, reset: true, restart: false },
      { value: 32, id: 0.98789512, opened: true, reset: false, restart: true },
    ],
    flippedCardsIndex: [],
    disableCards: false,
    stepsTaken: 0,
    pairedCards: 0,
    showAlert: false,
  });
});

test('should reset back to initial state', () => {
  const previousState = {
    cards: [
      { value: 58, id: 0.56894548, opened: true, reset: false, restart: false },
      { value: 88, id: 0.65489111, opened: false, reset: true, restart: false },
      { value: 32, id: 0.98789512, opened: true, reset: false, restart: false },
    ],
    flippedCardsIndex: [],
    disableCards: false,
    stepsTaken: 18,
    pairedCards: 9,
    showAlert: false,
  };

  expect(reducer(previousState, clearAllStatesAndRestart())).toEqual({
    cards: [],
    flippedCardsIndex: [],
    disableCards: false,
    stepsTaken: 0,
    pairedCards: 0,
    showAlert: false,
  });
});

test('should handle game steps incrementing by 1', () => {
  const previousState = {
    cards: [
      { value: 58, id: 0.56894548, opened: true, reset: false, restart: false },
      { value: 88, id: 0.65489111, opened: false, reset: true, restart: false },
      { value: 32, id: 0.98789512, opened: true, reset: false, restart: false },
    ],
    flippedCardsIndex: [],
    disableCards: false,
    stepsTaken: 5,
    pairedCards: 0,
    showAlert: false,
  };

  expect(reducer(previousState, openCard(2))).toEqual({
    cards: [
      { value: 58, id: 0.56894548, opened: true, reset: false, restart: false },
      { value: 88, id: 0.65489111, opened: false, reset: true, restart: false },
      { value: 32, id: 0.98789512, opened: true, reset: false, restart: false },
    ],
    flippedCardsIndex: [{ index: 2, value: 32 }],
    disableCards: false,
    stepsTaken: 6,
    pairedCards: 0,
    showAlert: false,
  });
});

test('should handle adding an object to the flippedCardsIndex array', () => {
  const previousState = {
    cards: [
      { value: 58, id: 0.56894548, opened: true, reset: false, restart: false },
      { value: 88, id: 0.65489111, opened: false, reset: true, restart: false },
      { value: 32, id: 0.98789512, opened: true, reset: false, restart: false },
    ],
    flippedCardsIndex: [],
    disableCards: false,
    stepsTaken: 3,
    pairedCards: 0,
    showAlert: false,
  };

  expect(reducer(previousState, openCard(1))).toEqual({
    cards: [
      { value: 58, id: 0.56894548, opened: true, reset: false, restart: false },
      { value: 88, id: 0.65489111, opened: true, reset: true, restart: false },
      { value: 32, id: 0.98789512, opened: true, reset: false, restart: false },
    ],
    flippedCardsIndex: [{ index: 1, value: 88 }],
    disableCards: false,
    stepsTaken: 4,
    pairedCards: 0,
    showAlert: false,
  });
});

test('should handle when 2 cards are matched', () => {
  const previousState = {
    cards: [
      { value: 58, id: 0.56894548, opened: true, reset: false, restart: false },
      { value: 88, id: 0.65489111, opened: false, reset: false, restart: false },
      { value: 32, id: 0.98789512, opened: true, reset: false, restart: false },
      { value: 58, id: 0.12413512, opened: false, reset: false, restart: false },
      { value: 88, id: 0.98765445, opened: false, reset: false, restart: false },
      { value: 32, id: 0.35789644, opened: true, reset: false, restart: false },
    ],
    flippedCardsIndex: [{ index: 0, value: 58 }],
    disableCards: false,
    stepsTaken: 8,
    pairedCards: 0,
    showAlert: false,
  };

  expect(reducer(previousState, openCard(3))).toEqual({
    cards: [
      { value: 58, id: 0.56894548, opened: true, reset: false, restart: false },
      { value: 88, id: 0.65489111, opened: false, reset: false, restart: false },
      { value: 32, id: 0.98789512, opened: true, reset: false, restart: false },
      { value: 58, id: 0.12413512, opened: true, reset: false, restart: false },
      { value: 88, id: 0.98765445, opened: false, reset: false, restart: false },
      { value: 32, id: 0.35789644, opened: true, reset: false, restart: false },
    ],
    flippedCardsIndex: [],
    disableCards: false,
    stepsTaken: 9,
    pairedCards: 1,
    showAlert: false,
  });
});

test('should handle when 2 cards are unmatched', () => {
  const previousState = {
    cards: [
      { value: 58, id: 0.56894548, opened: false, reset: false, restart: false },
      { value: 88, id: 0.65489111, opened: false, reset: false, restart: false },
      { value: 32, id: 0.98789512, opened: true, reset: false, restart: false },
      { value: 58, id: 0.12413512, opened: false, reset: false, restart: false },
      { value: 88, id: 0.98765445, opened: false, reset: false, restart: false },
      { value: 32, id: 0.35789644, opened: false, reset: false, restart: false },
    ],
    flippedCardsIndex: [{ index: 2, value: 32 }],
    disableCards: false,
    stepsTaken: 8,
    pairedCards: 0,
    showAlert: false,
  };

  expect(reducer(previousState, openCard(4))).toEqual({
    cards: [
      { value: 58, id: 0.56894548, opened: false, reset: false, restart: false },
      { value: 88, id: 0.65489111, opened: false, reset: false, restart: false },
      { value: 32, id: 0.98789512, opened: false, reset: true, restart: false },
      { value: 58, id: 0.12413512, opened: false, reset: false, restart: false },
      { value: 88, id: 0.98765445, opened: false, reset: true, restart: false },
      { value: 32, id: 0.35789644, opened: false, reset: false, restart: false },
    ],
    flippedCardsIndex: [
      { index: 2, value: 32 },
      { index: 4, value: 88 },
    ],
    disableCards: false,
    stepsTaken: 9,
    pairedCards: 0,
    showAlert: false,
  });
});
