import {Flex} from 'components/layout';
import wrapper from 'hoc/wrapper';
import AppBar from '../app-bar';

export const ChatsHeader = wrapper(function ChatsHeader() {
  return (
    <AppBar
      showAvatar
      title="Chats"
      firstPostfixButton={{name: 'Phone'}}
      secondPostfixButton={{name: 'MessageSquare'}}
    />
  );
});

const ChatsScreen = wrapper(function ChatsScreen() {
  return <Flex />;
});

export default ChatsScreen;
