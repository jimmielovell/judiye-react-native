import wrapper from 'hoc/wrapper';
import {Form, Input} from 'components/inputs';
import {Anchor, Button} from 'components/buttons';
import {useRef} from 'react';
import {StyleSheet} from 'react-native';
import {useTheme} from 'hooks';
import {useStore} from 'store';
import {BackdropHandle} from 'components/feedback';
import ConfirmInputDialog from './_/confirm-input-dialog';
import {Text} from 'components/typography';
import {Icon} from 'components/datadisplay';
import {Email, Phone, ValidationError} from 'domains';
import {InputHandle} from 'components/inputs/_/fields/base';
import AuthFrame from './_/auth-frame';

export type LoginScreenParamList = {
  LoginScreen: undefined;
};

// type LoginScreenProps = NativeStackScreenProps<LoginStackParamList, 'Login'>;

const LoginScreen = wrapper(function LoginScreen() {
  const confirmDialogRef = useRef<BackdropHandle>(null);
  const emailOrPhoneRef = useRef<InputHandle>(null);
  const {auth} = useStore();
  const theme = useTheme();
  const _style = createStyle(theme);

  const onSubmit = (values: Record<string, string>) => {
    const value = values.emailOrPhone;
    try {
      const email = new Email(value);
      auth.loginWithEmail(email);
    } catch (error) {
      try {
        const phone = new Phone(value);
        auth.loginWithPhone(phone);
      } catch (e) {
        if (emailOrPhoneRef.current) {
          const _e = new ValidationError('Email or phone is not valid');
          emailOrPhoneRef.current.setError(_e);
          // Prevent the form from submitting
          throw _e;
        }
      }
    }
  };

  return (
    <AuthFrame subTitle="Sign In or create account">
      <Form onSubmit={onSubmit}>
        <Input
          ref={emailOrPhoneRef}
          type="text"
          label="Email or phone"
          description="This will not be shown publicly."
          rules={{
            required: {
              message: 'Please enter an email or phone',
            },
          }}
          name="emailOrPhone"
        />
        <Anchor type="submit" appearance="fill" withRef={confirmDialogRef}>
          Continue
        </Anchor>
        <Button
          appearance="outline"
          direction="row"
          style={_style.continueWithGoogleButton}>
          <Text>Continue with </Text>
          <Icon name="Google" size={16} />
          <Text>oogle</Text>
        </Button>
      </Form>
      <Icon name="Watfoe" size={70} style={_style.icon} />
      <ConfirmInputDialog ref={confirmDialogRef} inputRef={emailOrPhoneRef} />
    </AuthFrame>
  );
});

function createStyle(theme: Judiye.Theme) {
  const {spacing} = theme;

  return StyleSheet.create({
    continueWithGoogleButton: {
      marginTop: spacing.xlg,
    },
    icon: {
      position: 'absolute',
      bottom: 0,
    },
  });
}

export default LoginScreen;
