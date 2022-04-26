import {render} from '@testing-library/react-native';
import HomeScreen from './home.screen';
import HomeHeader from './home.header';

it('renders the Home Screen', () => {
  render(<HomeScreen />);
});

it('renders the Home Header', () => {
  render(<HomeHeader />);
});
