import wrapper from 'hoc/wrapper';
import AppBar from '../app-bar';

const ChatsHeader = wrapper(function ChatsHeader() {
  return (
    <AppBar
      showAvatar
      title="Chats"
      firstPostfixButton={{name: 'Phone'}}
      secondPostfixButton={{name: 'MessageSquare'}}
    />
  );
});

export default ChatsHeader;
