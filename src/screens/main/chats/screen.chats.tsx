import {useNavigation} from '@react-navigation/native';
import {Flex} from 'components/layout';
import {Tabs} from 'components/navigation';
import wrapper from 'hoc/wrapper';
import AppBar from '../app-bar';

export const ChatsHeader = wrapper(function ChatsHeader() {
  const navigation = useNavigation();
  const _onPress = () => {
    navigation.navigate('NewChatScreen');
  };

  return (
    <AppBar
      showAvatar
      title="Chats"
      secondPostfixButton={{name: 'Plus', onPress: _onPress}}
    />
  );
});

const ChatsScreen = wrapper(function ChatsScreen() {
  return (
    <Tabs labels={['Inbox', 'Workspace', 'Calls']}>
      <Flex />
      <Flex />
      <Flex />
    </Tabs>
  );
});

export default ChatsScreen;
