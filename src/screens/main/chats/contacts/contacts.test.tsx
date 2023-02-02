import ContactsScreen from './contacts.screen';
import ContactsHeader from './contacts.header';
import {render} from '@testing-library/react-native';

it('renders the Contacts Screen', () => {
  render(<ContactsScreen />);
});

it('renders the Contacts Header', () => {
  render(<ContactsHeader />);
});
