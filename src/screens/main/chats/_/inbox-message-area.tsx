// import {useNavigation} from '@react-navigation/native';
import {Keyboard, Platform, StyleSheet} from 'react-native';
import {Flex} from 'components/layout';
import wrapper from 'hoc/wrapper';
import {useTheme} from 'hooks';
import {useCallback} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {Text} from 'components/typography';
import {Icon} from 'components/datadisplay';

interface IMessage {
  id: string;
  type: 'sent' | 'received';
  message: string;
  time: string;
  status: 'queued' | 'sent' | 'read' | 'delivered';
}

const Message = wrapper(function Message(props: IMessage) {
  const {type, message, time, status} = props;
  const theme = useTheme();
  const _style = createStyle(theme);

  return (
    <Flex
      justify={type === 'sent' ? 'flex-end' : 'flex-start'}
      direction="row"
      style={_style.messageCont}>
      <Flex direction="column" align="flex-start" style={_style.message}>
        <Text size="body">{message}</Text>
        <Flex
          direction="row"
          justify="flex-end"
          align="flex-end"
          style={_style.messageFooter}>
          <Text size="chip" color="secondary" style={_style.messageTime}>
            {time}
          </Text>
          {type === 'sent' && (
            <Icon
              name="Check"
              size={18}
              color={
                status === 'read'
                  ? theme.colors.actions.success
                  : theme.colors.text.secondary
              }
              viewBox="0 0 24 14"
              style={_style.sentTextStatusIcon}
            />
          )}
        </Flex>
      </Flex>
    </Flex>
  );
});

const InboxMessageArea = wrapper(function InboxMessageArea() {
  const theme = useTheme();
  const _style = createStyle(theme);

  const hideKeyboard = useCallback(() => {
    if (Keyboard.isVisible()) {
      Keyboard.dismiss();
    }
  }, []);

  return (
    <FlatList
      data={
        [
          {
            id: '1',
            type: 'sent',
            message: 'Hello',
            time: '12:00 PM',
            status: 'read',
          },
          {
            id: '2',
            type: 'received',
            message:
              'Hi, how are you? How is your day going? Did you have lunch?',
            time: '12:01 PM',
            status: 'read',
          },
          {
            id: '3',
            type: 'sent',
            message: 'I am fine, thanks. I am having a great day. I had lunch.',
            time: '12:02 PM',
            status: 'delivered',
          },
          {
            id: '4',
            type: 'sent',
            message: 'How about you?',
            time: '12:03 PM',
            status: 'delivered',
          },
        ] as IMessage[]
      }
      contentContainerStyle={_style.flatListContent}
      renderItem={({item}) => <Message {...item} />}
      style={_style.messageArea}
      onTouchEnd={hideKeyboard}
    />
  );
});

function createStyle(theme: Judiye.Theme) {
  const {colors, spacing, shape, fonts} = theme;

  return StyleSheet.create({
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
    flatListContent: {
      flexGrow: 1,
      justifyContent: 'flex-end',
      paddingBottom: spacing.nm,
    },
    messageCont: {
      width: '100%',
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.sm,
    },
    message: {
      backgroundColor: colors.background,
      borderRadius: shape.radius.md,
      maxWidth: '80%',
      width: 'auto',
      flexGrow: 0,
      padding: spacing.sm,
    },
    messageFooter: {
      alignSelf: 'flex-end',
      width: 'auto',
      marginLeft: spacing.nm,
    },
    messageTime: {
      verticalAlign: 'bottom',
      height: fonts.size.chip! - 2,
    },
    sentTextStatusIcon: {
      alignSelf: 'flex-end',
      height: 18,
    },
  });
}

export default InboxMessageArea;
