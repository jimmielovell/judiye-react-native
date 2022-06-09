import {Frame} from 'components/layout';
import wrapper from 'hoc/wrapper';
import {Form, Input, Option, Options} from 'components/inputs';
import {PText, ScreenTitle} from 'components/typography';
import {Anchor, Button} from 'components/buttons';
import {useStyles} from 'hooks';
import {Dialog} from 'components/feedback';
import {useRef} from 'react';
import ConfirmInputDialog from '../components/confirm-input-dialog';
import {PhoneScreenProps} from '../types';

const PhoneScreen = wrapper(function PhoneScreen({
  navigation,
}: PhoneScreenProps) {
  const cCodeDialogRef = useRef(null);
  const confirmDialogRef = useRef(null);

  const sepTextStyle = useStyles({
    marginVertical: 21,
  });

  function navigateToLoginByEmailScreen() {
    navigation.navigate('LoginByEmail');
  }

  return (
    <Frame>
      <ScreenTitle>Continue with phone</ScreenTitle>
      <Form>
        <Input
          type="phone"
          label="Country code and phone"
          prefix={{withRef: cCodeDialogRef}}
        />
        <Anchor appearance="fill" withRef={confirmDialogRef}>
          Continue
        </Anchor>
      </Form>
      <PText style={sepTextStyle}>OR</PText>
      <Button appearance="outline" onPress={navigateToLoginByEmailScreen}>
        Continue with email
      </Button>
      <Dialog ref={cCodeDialogRef}>
        <Options onSelect={optionData => console.log(optionData)}>
          <Option value="+254" justify="space-between">
            <PText>Kenya</PText>
            <PText>+254</PText>
          </Option>
          <Option value="+256" justify="space-between">
            <PText>Tanzania</PText>
            <PText>+256</PText>
          </Option>
          <Option value="+257" justify="space-between">
            <PText>Uganda</PText>
            <PText>+257</PText>
          </Option>
        </Options>
      </Dialog>
      <ConfirmInputDialog
        ref={confirmDialogRef}
        value="+254 700 782326"
        type="phone"
      />
    </Frame>
  );
});

export default PhoneScreen;
