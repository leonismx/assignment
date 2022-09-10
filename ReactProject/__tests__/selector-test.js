import reducer, {
  selectCards,
  selectIfCardsShouldBeDisabled,
  selectIfGameEnded,
  selectStepsTaken,
} from '../src/slices/gameSlice';

test('should return cards', () => {
  const state = {
    cards: [
      { value: 8, id: 0.10148032, opened: false, reset: false, restart: false },
      { value: 48, id: 0.32789432, opened: false, reset: false, restart: false },
      { value: 23, id: 0.32457978, opened: false, reset: false, restart: false },
      { value: 65, id: 0.18974555, opened: false, reset: false, restart: false },
    ],
  };

  expect(reducer(state, selectCards)).toEqual({
    cards: [
      { value: 8, id: 0.10148032, opened: false, reset: false, restart: false },
      { value: 48, id: 0.32789432, opened: false, reset: false, restart: false },
      { value: 23, id: 0.32457978, opened: false, reset: false, restart: false },
      { value: 65, id: 0.18974555, opened: false, reset: false, restart: false },
    ],
  });
});

test('should return disabled state', () => {
  const state = {
    disabled: true,
  };

  expect(reducer(state, selectIfCardsShouldBeDisabled)).toEqual({ disabled: true });
});

test('should return popup alert', () => {
  const state = {
    showAlert: true,
  };

  expect(reducer(state, selectIfGameEnded)).toEqual({ showAlert: true });
});

test('should return game steps', () => {
  const state = {
    stepsTaken: 21,
  };

  expect(reducer(state, selectStepsTaken)).toEqual({ stepsTaken: 21 });
});
