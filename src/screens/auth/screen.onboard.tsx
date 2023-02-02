import {Frame} from 'components/layout';
import wrapper from 'hoc/wrapper';
import {Form, Input} from 'components/inputs';
import {Anchor, Button} from 'components/buttons';
import {useRef} from 'react';
import {StyleSheet} from 'react-native';
import {useTheme} from 'hooks';
import {useStore} from 'store';
import {BackdropHandle} from 'components/feedback';
import {Email, Phone} from 'domains';
import ScreenTitle from './_/screen-title';

export type OnboardScreenParamList = {
  OnboardScreen: undefined;
};
interface FormValue {
  phone?: string;
  email?: string;
}

// type LoginScreenProps = NativeStackScreenProps<LoginStackParamList, 'Login'>;

const OnboardScreen = wrapper(function OnboardScreen() {
  const confirmDialogRef = useRef<BackdropHandle>(null);
  const {auth} = useStore();
  const theme = useTheme();
  const style = createStyle(theme);

  const onSubmit = (values: FormValue) => {
    if (auth.method === 'phone') {
      auth.setPhone(new Phone(values.phone!));
    } else if (auth.method === 'email') {
      auth.setEmail(new Email(values.email!));
    }
  };

  return (
    <Frame>
      <ScreenTitle>Create account</ScreenTitle>

      <Form onSubmit={onSubmit}>
        <Input
          type="name"
          label="Fullname"
          rules={{
            required: {
              message: 'Please enter your fullname',
            },
          }}
          name="fullname"
          style={style.input}
        />
        <Input
          type="date"
          label="Date of birth"
          rules={{
            required: {
              message: 'Please enter your date of birth',
            },
          }}
          name="dob"
          style={style.input}
        />
        <Input
          type="text"
          label="Email or phone"
          rules={{
            required: {
              message: 'Please enter an email or phone',
            },
          }}
          name="email"
          defaultValue={auth.email?.toString()}
          style={style.input}
        />

        <Button
          appearance="text"
          style={style.signInButton}
          textStyle={style.signInButtonText}>
          Sign in
        </Button>

        <Anchor type="submit" appearance="fill" withRef={confirmDialogRef}>
          Create account
        </Anchor>
      </Form>
    </Frame>
  );
});

function createStyle(theme: Judiye.Theme) {
  const {colors, spacing} = theme;

  return StyleSheet.create({
    input: {
      marginBottom: spacing.sm,
    },

    signInButton: {
      alignSelf: 'flex-start',
      borderRadius: 0,
      marginBottom: spacing.xlg,
    },

    signInButtonText: {
      color: colors.text.link,
      fontWeight: '500',
    },
  });
}

export default OnboardScreen;
