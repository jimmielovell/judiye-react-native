// import {useNavigation} from '@react-navigation/native';
import {Keyboard, Platform, StyleSheet} from 'react-native';
import {Flex} from 'components/layout';
import wrapper from 'hoc/wrapper';
import {useTheme} from 'hooks';
import {useCallback} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {Text} from 'components/typography';
import {Icon} from 'components/datadisplay';

interface IMessageContent {
  text: string | null;
  images: string | null;
  videos: string | null;
}

interface IMessage {
  id: string;
  type: 'sent' | 'received';
  message: IMessageContent;
  time: string;
  status: 'queued' | 'sent' | 'read' | 'delivered';
}

interface IMessageFooter {
  type: 'sent' | 'received';
  time: string;
  status: 'queued' | 'sent' | 'read' | 'delivered';
}

const MessageContent = wrapper(function MessageBody(props: IMessageContent) {
  const {text, images, videos} = props;
  const theme = useTheme();
  const _style = createStyle(theme);

  return <>{text && <Text size="body">{text}</Text>}</>;
});

const MessageFooter = wrapper(function MessageFooter(props: IMessageFooter) {
  const {type, time, status} = props;
  const theme = useTheme();
  const _style = createStyle(theme);

  return (
    <Flex
      direction="row"
      justify="flex-end"
      align="flex-end"
      style={_style.messageFooter}>
      <Text size="chip" color="secondary" style={_style.messageTime}>
        {time}
      </Text>
      {type === 'sent' && (
        <Flex style={_style.sentTextStatusIconCont}>
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
        </Flex>
      )}
    </Flex>
  );
});

const Message = wrapper(function Message(props: IMessage) {
  const {type, message, ...rest} = props;
  const theme = useTheme();
  const _style = createStyle(theme);

  return (
    <Flex
      justify={type === 'sent' ? 'flex-end' : 'flex-start'}
      direction="row"
      style={_style.messageCont}>
      <Flex
        direction="column"
        align="flex-start"
        style={[_style.message, _style[type + 'Message']]}>
        <MessageContent {...message} />
        <MessageFooter type={type} {...rest} />
      </Flex>
    </Flex>
  );
});

const data = [
  {
    id: '1',
    type: 'sent',
    message: {
      text: 'Hello',
      images: null,
      videos: null,
    },
    time: '12:00 PM',
    status: 'read',
  },
  {
    id: '2',
    type: 'received',
    message: {
      text: 'Hi, how are you? How is your day going? Did you have lunch?',
      images: null,
      videos: null,
    },
    time: '12:01 PM',
    status: 'read',
  },
  {
    id: '3',
    type: 'sent',
    message: {
      text: 'I am fine, thanks. I am having a great day. I had lunch.',
      images: null,
      videos: null,
    },
    time: '12:02 PM',
    status: 'delivered',
  },
  {
    id: '4',
    type: 'sent',
    message: {
      text: 'How about you?',
      images: null,
      videos: null,
    },
    time: '12:03 PM',
    status: 'delivered',
  },
];

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
      data={data}
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
      borderRadius: shape.radius.md,
      maxWidth: '80%',
      width: 'auto',
      flexGrow: 0,
      padding: spacing.sm,
    },
    sentMessage: {
      backgroundColor: colors.surface.primary,
    },
    receivedMessage: {
      backgroundColor: colors.surface.primary,
    },
    messageFooter: {
      alignSelf: 'flex-end',
      width: 'auto',
      marginLeft: spacing.nm,
    },
    messageTime: {
      verticalAlign: 'bottom',
      ...Platform.select({
        android: {
          lineHeight: fonts.size.chip!,
          verticalAlign: 'bottom',
        },
        ios: {
          height: fonts.size.chip! - 2,
        },
      }),
    },
    sentTextStatusIconCont: {
      position: 'relative',
      width: 18,
      height: fonts.size.chip! - 2,
    },
    sentTextStatusIcon: {
      position: 'absolute',
      bottom: 0,
    },
  });
}

export default InboxMessageArea;
