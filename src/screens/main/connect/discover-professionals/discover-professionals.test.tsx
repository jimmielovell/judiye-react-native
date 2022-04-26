import {render} from '@testing-library/react-native';
import DiscoverProfessionalsScreen from './discover-professionals.screen';
import DiscoverProfessionalsHeader from './discover-professionals.header';

it('renders the DiscoverProfessionals Screen', () => {
  render(<DiscoverProfessionalsScreen />);
});

it('renders the DiscoverProfessionals Header', () => {
  render(<DiscoverProfessionalsHeader />);
});
