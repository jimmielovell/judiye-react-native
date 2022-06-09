import {forwardRef, useCallback} from 'react';
import {Platform, ViewStyle} from 'react-native';
import {useForwardedRef, useStyles, useTheme} from 'hooks';
import {Button} from 'components/buttons';
import {FView} from 'components/layout';
import Backdrop from '../backdrop';
import {BackdropHandle, DialogProps} from '../types';
import {FadeIn} from 'react-native-reanimated';
import {ScreenTitle} from 'components/typography';

const Dialog = forwardRef<BackdropHandle, DialogProps>(function Dialog(
  {children, title, onClose, onOpen},
  dialogRef,
) {
  const backdropRef = useForwardedRef(dialogRef);
  const {colors, sizing} = useTheme();

  const closeDialog = useCallback(() => {
    if (backdropRef.current) {
      backdropRef.current.close();
    }
  }, [backdropRef]);

  const dialogCompStyle = useStyles<ViewStyle>({
    backgroundColor: colors.surfaceContainer,
    borderRadius: sizing.surfaceBorderRadius,
    overflow: 'hidden',
    paddingHorizontal: 13,
    paddingVertical: 8,
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
  const headerStyle = useStyles({
    marginBottom: 13,
  });
  const titleContStyle = useStyles({
    height: '100%',
    flex: 1,
  });
  const titleStyle = useStyles({
    marginTop: 0,
    marginBottom: 0,
  });

  return (
    <Backdrop
      ref={backdropRef}
      entering={FadeIn.duration(250)}
      onOpen={onOpen}
      onClose={onClose}>
      <FView
        align="flex-start"
        onStartShouldSetResponder={_e => true}
        style={dialogCompStyle}>
        <FView direction="row" justify="space-between" style={headerStyle}>
          <FView direction="row" align="center" style={titleContStyle}>
            {typeof title === 'string' ? (
              <ScreenTitle style={titleStyle}>{title}</ScreenTitle>
            ) : (
              title
            )}
          </FView>
          <Button
            appearance="icon"
            name="Clear"
            size={20}
            onPress={closeDialog}
          />
        </FView>
        {children}
      </FView>
    </Backdrop>
  );
});

export default Dialog;
