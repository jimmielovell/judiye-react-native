import {useRef} from 'react';
import {Anchor, Button} from 'components/buttons';
import {Frame} from 'components/layout';
import {Form, Input} from 'components/inputs';
import {PText, ScreenTitle} from 'components/typography';
import wrapper from 'hoc/wrapper';
import {useStyles} from 'hooks';
import ConfirmInputDialog from '../components/confirm-input-dialog';
import {EmailScreenProps} from '../types';

const EmailScreen = wrapper(function PhoneScreen({
  navigation,
}: EmailScreenProps) {
  const confirmDialogRef = useRef(null);

  const sepTextStyle = useStyles({
    marginVertical: 21,
  });
  function navigateToLoginByPhoneScreen() {
    navigation.navigate('LoginByPhone');
  }

  return (
    <Frame>
      <ScreenTitle>Continue with email</ScreenTitle>
      <Form>
        <Input type="email" label="Enter email" />
        <Anchor appearance="fill" withRef={confirmDialogRef}>
          Continue
        </Anchor>
      </Form>
      <PText style={sepTextStyle}>OR</PText>
      <Button appearance="outline" onPress={navigateToLoginByPhoneScreen}>
        Continue with phone
      </Button>

      <ConfirmInputDialog
        ref={confirmDialogRef}
        value="jimmieomlovell@gmail.com"
        type="email"
      />
    </Frame>
  );
});

export default EmailScreen;
