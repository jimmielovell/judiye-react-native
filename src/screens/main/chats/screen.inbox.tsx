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
      firstPostfixButton={{name: 'Phone'}}
    />
  );
});

const InputArea = wrapper(function InputArea() {
  const theme = useTheme();
  const _style = createStyle(theme);

  return (
    <Flex style={_style.inputArea}>
      <Button
        appearance="icon"
        name="EmojiSmile"
        size={24}
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
        size={20}
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
  const {colors, sizing, spacing} = theme;

  return StyleSheet.create({
    inbox: {
      width: '100%',
      height: '100%',
    },
    inputArea: {
      width: '100%',
      backgroundColor: colors.background,
      position: 'relative',
    },
    input: {
      borderWidth: 0,
      paddingLeft: sizing.height.lg + spacing.nm,
    },
    inputWrapper: {
      width: '100%',
      marginBottom: 0,
    },
    emojiSmileButton: {
      backgroundColor: 'transparent',
      position: 'absolute',
      bottom: spacing.sm + 1,
      left: spacing.nm,
    },
    sendButton: {
      backgroundColor: colors.primary,
      position: 'absolute',
      bottom: spacing.sm + 1,
      right: spacing.nm,
    },
    messageArea: {
      backgroundColor: colors.surface.secondary,
      width: '100%',
      flex: 1,
    },
  });
}

export default InboxScreen;
