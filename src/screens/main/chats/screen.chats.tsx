import {useNavigation} from '@react-navigation/native';
import {Flex} from 'components/layout';
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
      firstPostfixButton={{name: 'Phone'}}
      secondPostfixButton={{name: 'Plus', onPress: _onPress}}
    />
  );
});

const ChatsScreen = wrapper(function ChatsScreen() {
  return <Flex />;
});

export default ChatsScreen;
