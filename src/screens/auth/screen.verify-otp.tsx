import {Button} from 'components/buttons';
import {Flex, Frame} from 'components/layout';
import {Form, Input} from 'components/inputs';
import wrapper from 'hoc/wrapper';
import {StyleSheet} from 'react-native';
import {useTheme} from 'hooks';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {useStore} from 'store';
import ScreenTitle from './_/screen-title';
import {AuthStackParamList} from '.';
import {useNavigation} from '@react-navigation/native';
import {Icon} from 'components/datadisplay';

export type VerifyOtpScreenParamList = {
  VerifyOtpScreen: undefined;
};

type VerifyOtpScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'VerifyOtpScreen'
>;

const VerifyOtpScreen = wrapper(function VerifyOtp(
  _props: VerifyOtpScreenProps,
) {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const {auth} = useStore();
  const theme = useTheme();
  const style = createStyle(theme);

  const onSubmit = (_values: any) => {
    navigation.navigate('SignupScreen');
  };

  return (
    <Frame>
      <ScreenTitle>
        Enter the code sent to {'\n'}{' '}
        {auth.method === 'email'
          ? auth.email?.toString()
          : auth.phone?.international}
      </ScreenTitle>

      <Form onSubmit={onSubmit}>
        <Input type="pin" style={style.input} />

        <Button
          appearance="text"
          style={style.resendButton}
          textStyle={style.resendButtonText}>
          Didn't receive the code? Resend
        </Button>

        <Flex direction="row">
          <Button
            appearance="outline"
            flex={1}
            style={style.button}
            onPress={navigation.goBack}>
            Back
          </Button>
          <Button type="submit" appearance="fill" flex={1} onPress={onSubmit}>
            Continue
          </Button>
        </Flex>
      </Form>

      <Icon name="Watfoe" size={70} />
    </Frame>
  );
});

function createStyle(theme: Judiye.Theme) {
  const {spacing, colors} = theme;
  return StyleSheet.create({
    input: {
      marginBottom: spacing.sm,
    },

    cancelBtn: {
      marginTop: spacing.md,
    },

    resendButton: {
      alignSelf: 'flex-start',
      borderRadius: 0,
      marginBottom: spacing.lg,
    },

    resendButtonText: {
      color: colors.text.link,
      fontWeight: '500',
    },

    button: {
      marginRight: spacing.md,
    },

    watfoeIcon: {
      marginBottom: spacing.nm,
      alignSelf: 'center',
    },
  });
}

export default VerifyOtpScreen;
