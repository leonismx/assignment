import { Dimensions } from 'react-native';
import { CARD_PAIRS_VALUE } from '../App';

const screen = Dimensions.get('window');

export const CARD_MARGIN = 10;
export const GAMEBOARD_MARGIN = 15;

const getColumns = () => ((CARD_PAIRS_VALUE * 2) % 3 === 0 ? 3 : 2);

const getWidth = () => {
  if (CARD_PAIRS_VALUE % 3 !== 0) {
    return (screen.width - CARD_MARGIN * 4 - GAMEBOARD_MARGIN * 2) / 2;
  } else {
    return (screen.width - CARD_MARGIN * 6 - GAMEBOARD_MARGIN * 2) / 3;
  }
};

const getHeight = () => 150;

export { getHeight, getWidth, getColumns };
