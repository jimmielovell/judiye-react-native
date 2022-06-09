import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {forwardRef} from 'react';
import {FView} from 'components/layout';
import {PText} from 'components/typography';
import {Button} from 'components/buttons';
import {useForwardedRef, useStyles} from 'hooks';
import {Dialog} from 'components/feedback';
import {BackdropHandle, DialogProps} from 'components/feedback/types';
import {LoginStackParamList} from '../../types';

interface Props extends DialogProps {
  value: string;
  type: string;
}

const ConfirmInputDialog = forwardRef<BackdropHandle, Props>(
  function ConfirmInputDialog({value, type}, ref) {
    const navigation =
      useNavigation<NativeStackNavigationProp<LoginStackParamList>>();
    const dialogRef = useForwardedRef(ref);

    function navigateToOtpVerify() {
      if (dialogRef.current) {
        dialogRef.current.close();
      }
      navigation.navigate('OtpVerify', {value, type});
    }

    const btnContStyle = useStyles({
      marginTop: 21,
    });
    const btnStyle = useStyles({
      marginRight: 13,
    });

    return (
      <Dialog ref={dialogRef} title={value}>
        <PText>
          Is this correct?{'\n'} {'\n'}
          We will send a one time verification code to this
          {type === 'email' ? ' email.' : ' phone (carrier charges may apply).'}
        </PText>
        <FView direction="row" style={btnContStyle}>
          <Button appearance="outline" flex={1} style={btnStyle}>
            Edit
          </Button>
          <Button appearance="fill" flex={1} onPress={navigateToOtpVerify}>
            Send
          </Button>
        </FView>
      </Dialog>
    );
  },
);

export default ConfirmInputDialog;
