// import {useNavigation} from '@react-navigation/native';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import {Flex, Frame} from 'components/layout';
import wrapper from 'hoc/wrapper';
import AppBar from '../app-bar';
import {useTheme} from 'hooks';
import {Input} from 'components/inputs';
import {Button} from 'components/buttons';
import {useCallback} from 'react';

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
    <Flex direction="row" align="center" style={_style.inputArea}>
      <Button
        appearance="icon"
        name="EmojiSmile"
        size={24}
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

  const hideKeyboard = useCallback(() => {
    if (Keyboard.isVisible()) {
      Keyboard.dismiss();
    }
  }, []);

  return <Flex style={_style.messageArea} onTouchEnd={hideKeyboard} />;
});

const InboxScreen = wrapper(function InboxScreen() {
  const theme = useTheme();
  const _style = createStyle(theme);

  return Platform.OS === 'ios' ? (
    <KeyboardAvoidingView
      behavior="height"
      style={_style.kAView}
      keyboardVerticalOffset={70}>
      <Frame bottomTab={false} justify="flex-end" style={_style.inbox}>
        <MessageArea />
        <InputArea />
      </Frame>
    </KeyboardAvoidingView>
  ) : (
    <Frame bottomTab={false} justify="flex-end" style={_style.inbox}>
      <MessageArea />
      <InputArea />
    </Frame>
  );
});

function createStyle(theme: Judiye.Theme) {
  const {colors, spacing} = theme;

  return StyleSheet.create({
    kAView: {
      flex: 1,
      width: '100%',
    },
    inbox: {
      width: '100%',
      height: '100%',
      ...Platform.select({
        ios: {
          backgroundColor: colors.surface.secondary,
          paddingHorizontal: spacing.sm,
        },
      }),
    },
    inputArea: {
      width: '100%',
      position: 'relative',
      ...Platform.select({
        ios: {
          backgroundColor: colors.background,
          borderRadius: 1000,
          padding: spacing.xs,
        },
        android: {
          paddingVertical: spacing.xs,
          paddingHorizontal: spacing.sm,
        },
      }),
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
      width: '100%',
      flex: 1,
      ...Platform.select({
        android: {
          backgroundColor: colors.surface.secondary,
          padding: spacing.xs,
        },
      }),
    },
  });
}

export default InboxScreen;
