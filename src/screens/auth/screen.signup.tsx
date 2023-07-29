import {Flex} from 'components/layout';
import wrapper from 'hoc/wrapper';
import {Form, Input} from 'components/inputs';
import {Anchor} from 'components/buttons';
import {useRef} from 'react';
import {StyleSheet} from 'react-native';
import {useTheme} from 'hooks';
import {BackdropHandle} from 'components/feedback';
import {Text} from 'components/typography';
import AgeRestrictionDialog from './_/age-restriction-dialog';
import AuthFrame from './_/auth-frame';

export type SignupScreenParamList = {
  SignupScreen: undefined;
};

const SignupScreen = wrapper(function SignupScreen() {
  const ageRestDialogRef = useRef<BackdropHandle>(null);
  const theme = useTheme();
  const _style = createStyle(theme);

  const onSubmit = (values: Record<string, string>) => {
    console.log(values);
  };

  return (
    <AuthFrame subTitle="Create account">
      <Form onSubmit={onSubmit}>
        <Input
          type="name"
          label="Fullname"
          description="We use real names here."
          rules={{
            required: {
              message: 'Please enter your fullname',
            },
          }}
          name="fullname"
          returnKeyType="next"
        />
        <Input
          type="date"
          label="Date of birth"
          description="This will not be shown publicly. This is to confirm that you are old enough to use our services."
          rules={{
            required: {
              message: 'Please enter your date of birth',
            },
          }}
          name="dob"
          returnKeyType="done"
        />

        <Flex direction="row" justify="flex-start" wrap="wrap">
          <Text weight="700">By continuing, you agree to our </Text>
          <Text color="link">Terms of service</Text>
          <Text>, and </Text>
          <Text color="link">Privacy statement</Text>
        </Flex>

        <Anchor
          type="submit"
          appearance="fill"
          withRef={ageRestDialogRef}
          style={_style.continueButton}>
          Agree and create
        </Anchor>
      </Form>

      <AgeRestrictionDialog ref={ageRestDialogRef} />
    </AuthFrame>
  );
});

function createStyle(theme: Judiye.Theme) {
  const {spacing} = theme;

  return StyleSheet.create({
    continueButton: {
      marginTop: spacing.md,
    },
    buttonContainer: {
      marginTop: spacing.md,
    },
    button: {
      marginRight: spacing.md,
    },
  });
}

export default SignupScreen;
