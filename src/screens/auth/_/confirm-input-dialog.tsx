import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {forwardRef, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {Flex} from 'components/layout';
import {Text} from 'components/typography';
import {Button} from 'components/buttons';
import {useForwardedRef, useTheme} from 'hooks';
import {BackdropHandle, Dialog, DialogProps} from 'components/feedback';
import {useStore} from 'store';
import wrapper from 'hoc/wrapper';
import {AuthStackParamList} from '..';
import {InputHandle} from 'components/inputs/_/fields/base';

interface ConfirmInputDialogProps extends DialogProps {
  inputRef: React.RefObject<InputHandle>;
}

const ConfirmInputDialog = wrapper(
  forwardRef<BackdropHandle, ConfirmInputDialogProps>(
    function ConfirmInputDialog(props, ref) {
      const {inputRef} = props;
      const navigation =
        useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
      const dialogRef = useForwardedRef(ref);
      const {auth} = useStore();
      const theme = useTheme();
      const style = createStyle(theme);

      const navigateToOtpVerify = useCallback(() => {
        navigation.navigate('VerifyOtpScreen');

        if (dialogRef.current) {
          dialogRef.current.close();
        }
      }, [dialogRef, navigation]);

      const onEdit = useCallback(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
        if (dialogRef.current) {
          dialogRef.current.close();
        }
      }, [dialogRef, inputRef]);

      return (
        <Dialog
          ref={dialogRef}
          title={
            auth.method === 'email'
              ? auth.email?.toString()
              : auth.phone?.international
          }>
          <Text>
            Is this correct?{'\n\n'}
            We will send a one time verification code to this
            {auth.method === 'email'
              ? ' email.'
              : ' phone (carrier charges may apply).'}
          </Text>
          <Flex direction="row" style={style.buttonContainer}>
            <Button
              appearance="outline"
              flex={1}
              style={style.button}
              onPress={onEdit}>
              Edit
            </Button>
            <Button appearance="fill" flex={1} onPress={navigateToOtpVerify}>
              Send
            </Button>
          </Flex>
        </Dialog>
      );
    },
  ),
);

function createStyle(theme: Judiye.Theme) {
  const {spacing} = theme;

  return StyleSheet.create({
    buttonContainer: {
      marginTop: spacing.md,
    },
    button: {
      marginRight: spacing.md,
    },
  });
}

export default ConfirmInputDialog;
