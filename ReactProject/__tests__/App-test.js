/**
 * @format
 */

import Header from '../src/Header';
import store from '../src/store';
import { Provider } from 'react-redux';
import Popup from '../src/Popup';
import App from '../src/App';
import renderer from 'react-test-renderer';

test('renders correctly App component', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <App />
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
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
