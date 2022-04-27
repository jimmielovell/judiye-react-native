import {Tab, Tabs, TabPanels} from '.';
import {render} from '@testing-library/react-native';

it('renders Tab component', () => {
  render(<Tab />);
});

it('renders Tabs component', () => {
  // @ts-ignore
  render(<Tabs />);
});

it('renders TabPanels component', () => {
  render(<TabPanels />);
});
