// import {useNavigation} from '@react-navigation/native';
import {KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import {Frame} from 'components/layout';
import wrapper from 'hoc/wrapper';
import AppBar from '../app-bar';
import {useTheme} from 'hooks';
import InboxMessageArea from './_/inbox-message-area';
import InboxInputArea from './_/inbox-input-area';

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

const InboxScreen = wrapper(function InboxScreen() {
  const theme = useTheme();
  const _style = createStyle(theme);

  return Platform.OS === 'ios' ? (
    <KeyboardAvoidingView
      behavior="height"
      style={_style.kAView}
      keyboardVerticalOffset={70}>
      <Frame bottomTab={false} justify="flex-end" style={_style.inbox}>
        <InboxMessageArea />
        <InboxInputArea />
      </Frame>
    </KeyboardAvoidingView>
  ) : (
    <Frame bottomTab={false} justify="flex-end" style={_style.inbox}>
      <InboxMessageArea />
      <InboxInputArea />
    </Frame>
  );
});

function createStyle(theme: Judiye.Theme) {
  const {colors} = theme;

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
        },
      }),
    },
  });
}

export default InboxScreen;
