import {render} from '@testing-library/react-native';
import DiscoverScreen from './discover.screen';
import DiscoverHeader from './discover.header';

it('renders the Discover Screen', () => {
  render(<DiscoverScreen />);
});

it('renders the Discover Header', () => {
  render(<DiscoverHeader />);
});
