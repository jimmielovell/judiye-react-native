import {forwardRef, useCallback} from 'react';
import {Platform, ViewStyle} from 'react-native';
import wrapper from 'hoc/wrapper';
import {useForwardedRef, useStyles, useTheme} from 'hooks';
import {Button} from 'components/buttons';
import {FView} from 'components/layout';
import Backdrop from './backdrop';
import {BackdropHandle, DialogProps} from '../types';
import Animated, {FadeIn} from 'react-native-reanimated';
// import {Grow} from 'components/transition';

const Dialog = wrapper(
  forwardRef<BackdropHandle, DialogProps>(({children}, dialogRef) => {
    const backdropRef = useForwardedRef(dialogRef);
    const {colors, sizing} = useTheme();

    const onOpen = useCallback(() => {}, []);
    const onClose = useCallback(() => {}, []);

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
          shadowOpacity: 0.13,
          shadowRadius: 2,
        },
        android: {
          elevation: 3,
        },
      }),
    });
    const closeBtnCompStyles = useStyles({
      width: 'auto',
      height: 'auto',
    });

    return (
      <Backdrop ref={backdropRef} onOpen={onOpen} onClose={onClose}>
        <Animated.View
          entering={FadeIn}
          onStartShouldSetResponder={_e => true}
          style={dialogCompStyles}>
          <FView direction="row" justify="flex-end">
            <Button
              appearance="icon"
              icon={{name: 'Clear'}}
              style={closeBtnCompStyles}
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
