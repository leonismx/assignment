/**
 * @format
 */

import Header from '../src/Header';
import store from '../src/store';
import { Provider } from 'react-redux';
import Popup from '../src/Popup';
import App, { randomCards } from '../src/App';
import renderer from 'react-test-renderer';
import CardComponent from '../src/Card/Card';

test('renders correctly App component', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <App />
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
  // pop up is not rendering any component as its just an alert
  expect(tree.children.length).toBe(2);
});

describe('random numbers from number generator', () => {
  const uniqueCards = new Set(randomCards(6));
  expectedValue = uniqueCards.size === 6 * 2;
  it('should return random unique numbers', () => {
    expect(expectedValue).toBe(true);
  });
});

test('renders correctly Header component', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <Header />
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
  expect(tree.children.length).toBe(2);
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
  expect(tree).toBe(null);
});
