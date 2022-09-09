import { Dimensions } from 'react-native';

const screen = Dimensions.get('window');

export const CARD_MARGIN = 10;
export const GAMEBOARD_MARGIN = 15;

const getColumns = (cardPairs: number) => ((cardPairs * 2) % 3 === 0 ? 3 : 2);

const getWidth = (cardPairs: number) => {
  if (cardPairs % 3 !== 0) {
    return Math.floor(screen.width - CARD_MARGIN * 4 - GAMEBOARD_MARGIN * 2) / 2;
  } else {
    return Math.floor(screen.width - CARD_MARGIN * 6 - GAMEBOARD_MARGIN * 2) / 3;
  }
};

const getHeight = () => 150;

export { getHeight, getWidth, getColumns };
