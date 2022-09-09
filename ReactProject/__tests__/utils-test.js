//utils test
import { Dimensions } from 'react-native';
import {
  getColumns,
  getHeight,
  getWidth,
  CARD_MARGIN,
  GAMEBOARD_MARGIN,
} from '../src/Utils/dimension';
const screen = Dimensions.get('window');

describe('get number of columns to display', () => {
  it('should return a number of 3 when %3 === 0', () => {
    expect(getColumns(6)).toBe(3);
  });

  it('should return a number of 2 when %3 !== 0', () => {
    expect(getColumns(2)).toBe(2);
  });
});

describe('get width of card from device screen', () => {
  it('should return a number of 3 when %3 === 0', () => {
    expectedValue = Math.floor((screen.width - CARD_MARGIN * 6 - GAMEBOARD_MARGIN * 2) / 3);
    expect(getWidth(3)).toBe(expectedValue);
  });

  it('should return a number of 3 when %3 !== 0', () => {
    expectedValue = Math.floor((screen.width - CARD_MARGIN * 4 - GAMEBOARD_MARGIN * 2) / 2);
    expect(getWidth(4)).toBe(expectedValue);
  });
});

describe('get height of card static value', () => {
  it('should return a number 150', () => {
    expect(getHeight()).toBe(150);
  });
});
