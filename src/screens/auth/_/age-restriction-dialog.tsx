import {Flex} from 'components/layout';
import wrapper from 'hoc/wrapper';
import {Button} from 'components/buttons';
import {forwardRef, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {useForwardedRef, useTheme} from 'hooks';
import {BackdropHandle, Dialog} from 'components/feedback';
import {Text} from 'components/typography';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '..';

const AgeRestrictionDialog = wrapper(
  forwardRef<BackdropHandle, any>(function AgeRestrictionDialog(_props, ref) {
    const navigation =
      useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
    const dialogRef = useForwardedRef(ref);
    const theme = useTheme();
    const style = createStyle(theme);

    const navigateToJudiyeForKids = useCallback(() => {}, []);

    const onTryLater = useCallback(() => {
      // Exit the app
      navigation.navigate('LoginScreen');
    }, [navigation]);

    return (
      <Dialog ref={dialogRef} title="Sorry!">
        <Text>
          It appears you’re not old enough to use this service. {'\n\n'}You can
          however continue to Judiye for Kids, or try some time later when
          you’re old enough.
        </Text>
        <Flex direction="row" style={style.buttonContainer}>
          <Button
            appearance="outline"
            flex={1}
            style={style.button}
            onPress={onTryLater}>
            Try later
          </Button>
          <Button appearance="fill" flex={1} onPress={navigateToJudiyeForKids}>
            Judiye for Kids
          </Button>
        </Flex>
      </Dialog>
    );
  }),
);

function createStyle(theme: Judiye.Theme) {
  const {spacing} = theme;

  return StyleSheet.create({
    continueButton: {
      marginTop: spacing.lg,
    },
    buttonContainer: {
      marginTop: spacing.md,
    },
    button: {
      marginRight: spacing.md,
    },
  });
}

export default AgeRestrictionDialog;
