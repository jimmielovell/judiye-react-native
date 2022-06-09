import {Button} from 'components/buttons';
import {Frame} from 'components/layout';
import {Form, Input} from 'components/inputs';
import {PText, ScreenTitle} from 'components/typography';
import wrapper from 'hoc/wrapper';
import {useStyles} from 'hooks';
import {OtpVerifyScreenProps} from '../types';

const OtpVerify = wrapper(function PhoneScreen({
  navigation,
  route,
}: OtpVerifyScreenProps) {
  const {type, value} = route.params;
  const orTextStyle = useStyles({
    marginVertical: 21,
  });
  function navigateToLoginByPhoneScreen() {
    navigation.navigate('LoginByPhone');
  }

  return (
    <Frame>
      <ScreenTitle>
        Verify your {type}
        {'\n'}
        <PText>{value}</PText>
      </ScreenTitle>
      <Form>
        <Input type="pin" label="6-digit code" />
        <Button appearance="fill">Continue</Button>
      </Form>
      <PText style={orTextStyle}>OR</PText>
      <Button appearance="outline" onPress={navigateToLoginByPhoneScreen}>
        Resend code
      </Button>
    </Frame>
  );
});

export default OtpVerify;
