import {Button} from 'components/buttons';
import {Flex} from 'components/layout';
import {Form, Input} from 'components/inputs';
import wrapper from 'hoc/wrapper';
import {StyleSheet} from 'react-native';
import {useTheme} from 'hooks';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {useStore} from 'store';
import {AuthStackParamList} from '.';
import {useNavigation} from '@react-navigation/native';
import {Icon} from 'components/datadisplay';
import AuthFrame from './_/auth-frame';

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
    <AuthFrame
      subTitle={
        "Enter the code sent to {'\n'}{' '}" +
        (auth.method === 'email'
          ? auth.email?.toString()
          : auth.phone?.international)
      }>
      <Form onSubmit={onSubmit}>
        <Input
          type="pin"
          name="otp"
          rules={{
            required: {
              message: 'Please enter the code',
            },
          }}
        />

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
    </AuthFrame>
  );
});

function createStyle(theme: Judiye.Theme) {
  const {spacing, colors} = theme;
  return StyleSheet.create({
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
