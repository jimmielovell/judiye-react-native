import {forwardRef, useCallback, useImperativeHandle, useState} from 'react';
import {Modal, ViewStyle} from 'react-native';
import wrapper from 'hoc/wrapper';
import {useStyles, useTheme} from 'hooks';
import {BackdropHandle, BackdropProps, InWindowMeasurement} from '../types';
import {AnimatedPressable} from 'components/buttons';

const Backdrop = wrapper(
  forwardRef<BackdropHandle, BackdropProps>(
    (
      {
        entering,
        exiting,
        children,
        visible = false,
        style,
        onClose,
        onOpen,
        ...rest
      },
      ref,
    ) => {
      const [_visible, setVisible] = useState(visible);
      const {colors, sizing} = useTheme();

      const open = useCallback(
        (measurement?: InWindowMeasurement) => {
          setVisible(true);
          onOpen && onOpen(measurement);
        },
        [onOpen],
      );
      const close = useCallback(() => {
        onClose && onClose();
        setVisible(false);
      }, [onClose]);

      useImperativeHandle(ref, () => ({
        open,
        close,
      }));

      const compStyles = useStyles<ViewStyle>(
        {
          backgroundColor: colors.scrimContainer,
          width: '100%',
          height: '100%',
          paddingTop: sizing.headerHeight,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 13,
        },
        style,
      );

      return (
        <Modal
          animationType="none"
          presentationStyle="overFullScreen"
          onRequestClose={close}
          statusBarTranslucent={true}
          supportedOrientations={['portrait', 'landscape']}
          transparent={true}
          visible={_visible}
          {...rest}>
          <AnimatedPressable
            entering={entering}
            exiting={exiting}
            style={compStyles}
            onPress={close}>
            {children}
          </AnimatedPressable>
        </Modal>
      );
    },
  ),
);

export default Backdrop;
