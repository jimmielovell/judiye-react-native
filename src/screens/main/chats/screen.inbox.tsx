// import {useNavigation} from '@react-navigation/native';
import {Flex} from 'components/layout';
import wrapper from 'hoc/wrapper';
import AppBar from '../app-bar';

export const InboxHeader = wrapper(function InboxHeader() {
  // const navigation = useNavigation();

  return (
    <AppBar
      showBackButton
      showAvatar
      title="Jimmie Lovell"
      firstPostfixButton={{name: 'Phone'}}
    />
  );
});

const InboxScreen = wrapper(function ChatsScreen() {
  return <Flex />;
});

export default InboxScreen;
