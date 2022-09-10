/**
 * @format
 */

import Header from '../src/Header';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import store from '../src/store';
import { Provider } from 'react-redux';
import GameBoard from '../src/GameBoard/Gameboard';
import Popup from '../src/Popup';

test('renders correctly Header component', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <Header />
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly Gameboard component', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <GameBoard />
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly Pop up component', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <Popup />
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
