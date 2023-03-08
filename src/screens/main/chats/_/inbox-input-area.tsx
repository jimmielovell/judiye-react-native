// import {useNavigation} from '@react-navigation/native';
import {Platform, StyleSheet} from 'react-native';
import {Flex} from 'components/layout';
import wrapper from 'hoc/wrapper';
import {useTheme} from 'hooks';
import {Input} from 'components/inputs';
import {Button} from 'components/buttons';

const InboxInputArea = wrapper(function InboxInputArea() {
  const theme = useTheme();
  const _style = createStyle(theme);

  return (
    <Flex style={_style.inputArea}>
      <Flex direction="row" align="center" style={_style.inputCont}>
        <Button
          appearance="icon"
          name="Plus"
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
          name="Mic"
          size={20}
          color={theme.colors.background}
          style={_style.sendButton}
          ripple
        />
      </Flex>
    </Flex>
  );
});

function createStyle(theme: Judiye.Theme) {
  const {colors, spacing} = theme;

  return StyleSheet.create({
    inputArea: {
      ...Platform.select({
        ios: {
          paddingHorizontal: spacing.sm,
        },
      }),
    },
    inputCont: {
      width: '100%',
      position: 'relative',
      ...Platform.select({
        ios: {
          backgroundColor: colors.background,
          borderRadius: 1000,
          padding: spacing.xxs,
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
      zIndex: 1,
    },
    sendButton: {
      backgroundColor: colors.primary,
      alignSelf: 'flex-end',
      // paddingLeft: spacing.xxs,
    },
  });
}

export default InboxInputArea;
