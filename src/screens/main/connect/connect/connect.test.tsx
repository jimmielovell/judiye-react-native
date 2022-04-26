import {render} from '@testing-library/react-native';
import ConnectScreen from './connect.screen';
import ConnectHeader from './connect.header';

it('renders the Connect Screen', () => {
  render(<ConnectScreen />);
});

it('renders the Connect Header', () => {
  render(<ConnectHeader />);
});
