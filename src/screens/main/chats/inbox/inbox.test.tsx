import {render} from '@testing-library/react-native';
import InboxScreen from './inbox.screen';
import InboxHeader from './inbox.header';

it('renders the Inbox Screen', () => {
  render(<InboxScreen />);
});

it('renders the Inbox Header', () => {
  render(<InboxHeader />);
});
