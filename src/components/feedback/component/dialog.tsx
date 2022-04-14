import {forwardRef, useCallback} from 'react';
import {Platform, ViewStyle} from 'react-native';
import wrapper from 'hoc/wrapper';
import {useForwardedRef, useStyles, useTheme} from 'hooks';
import {Button} from 'components/buttons';
import {FView} from 'components/layout';
import Backdrop from './backdrop';
import {BackdropHandle, DialogProps} from '../types';
import Animated, {FadeIn} from 'react-native-reanimated';

const Dialog = wrapper(
  forwardRef<BackdropHandle, DialogProps>(({children}, dialogRef) => {
    const backdropRef = useForwardedRef(dialogRef);
    const {colors, sizing} = useTheme();

    const closeDialog = useCallback(() => {
      if (backdropRef.current) {
        backdropRef.current.close();
      }
    }, [backdropRef]);

    const dialogCompStyles = useStyles<ViewStyle>({
      backgroundColor: colors.surfaceContainer,
      borderRadius: sizing.surfaceBorderRadius,
      overflow: 'hidden',
      padding: 13,
      // Shadow
      ...Platform.select({
        ios: {
          shadowColor: colors.border,
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.144,
          shadowRadius: 2,
        },
        android: {
          elevation: 2,
        },
      }),
    });

    return (
      <Backdrop ref={backdropRef} entering={FadeIn}>
        <Animated.View
          onStartShouldSetResponder={_e => true}
          style={dialogCompStyles}>
          <FView direction="row" justify="flex-end">
            <Button
              appearance="icon"
              name="Clear"
              size={20}
              onPress={closeDialog}
            />
          </FView>
          {children}
        </Animated.View>
      </Backdrop>
    );
  }),
);

export default Dialog;
