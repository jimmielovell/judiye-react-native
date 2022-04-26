import {render} from '@testing-library/react-native';
import ChatsScreen from './chats.screen';
import ChatsHeader from './chats.header';

it('renders the Chats Screen', () => {
  render(<ChatsScreen />);
});

it('renders the Chats Header', () => {
  render(<ChatsHeader />);
});
