// import {useNavigation} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import {Flex} from 'components/layout';
import wrapper from 'hoc/wrapper';
import AppBar from '../app-bar';
import {useTheme} from 'hooks';
import {Input} from 'components/inputs';
import {Button} from 'components/buttons';

export const InboxHeader = wrapper(function InboxHeader() {
  // const navigation = useNavigation();

  return (
    <AppBar
      showBackButton
      showAvatar
      title="Jimmie Lovell"
      secondPostfixButton={{name: 'Phone'}}
    />
  );
});

const InputArea = wrapper(function InputArea() {
  const theme = useTheme();
  const _style = createStyle(theme);

  return (
    <Flex direction="row" align="center" style={_style.inputArea}>
      <Button
        appearance="icon"
        name="EmojiSmile"
        size={28}
        color={theme.colors.text.secondary}
        style={_style.emojiSmileButton}
        ripple
      />
      <Input
        type="multiline"
        placeholder="Write a message"
        autoCorrect
        // hide keyboard on autoFocus
        style={_style.input}
        wrapperStyle={_style.inputWrapper}
      />
      <Button
        appearance="icon"
        name="Send"
        size={24}
        color={theme.colors.background}
        style={_style.sendButton}
        ripple
      />
    </Flex>
  );
});

const MessageArea = wrapper(function MessageArea() {
  const theme = useTheme();
  const _style = createStyle(theme);

  return <Flex style={_style.messageArea} />;
});

const InboxScreen = wrapper(function ChatsScreen() {
  const theme = useTheme();
  const _style = createStyle(theme);

  return (
    <Flex direction="column" justify="flex-end" style={_style.inbox}>
      <MessageArea />
      <InputArea />
    </Flex>
  );
});

function createStyle(theme: Judiye.Theme) {
  const {colors, spacing} = theme;

  return StyleSheet.create({
    inbox: {
      width: '100%',
      height: '100%',
    },
    inputArea: {
      backgroundColor: colors.background,
      width: '100%',
      position: 'relative',
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.sm,
    },
    input: {
      backgroundColor: 'transparent',
      borderWidth: 0,
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
    },
    inputWrapper: {
      flex: 1,
      marginBottom: 0,
    },
    emojiSmileButton: {
      backgroundColor: 'transparent',
      alignSelf: 'flex-end',
      marginBottom: 1,
      zIndex: 1,
    },
    sendButton: {
      backgroundColor: colors.primary,
      alignSelf: 'flex-end',
      marginBottom: 1,
      paddingLeft: spacing.xxs,
    },
    messageArea: {
      backgroundColor: colors.surface.secondary,
      width: '100%',
      flex: 1,
    },
  });
}

export default InboxScreen;
