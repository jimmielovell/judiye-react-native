import {
  forwardRef,
  ReactNode,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import {
  Modal,
  ModalProps,
  StyleProp,
  StyleSheet,
  useWindowDimensions,
  ViewStyle,
} from 'react-native';
import {useTheme} from 'hooks';
import {Pressable} from 'components/buttons';

export interface InWindowMeasurement {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

export type BackdropHandle = {
  open: (measurement?: InWindowMeasurement) => void;
  close: () => void;
};

export interface BackdropProps extends ModalProps {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  onOpen?: (measurement?: InWindowMeasurement) => void;
  onClose?: () => void;
}

const Backdrop = forwardRef<BackdropHandle, BackdropProps>(function Backdrop(
  {children, visible = false, style, onClose, onOpen, ...rest},
  ref,
) {
  const {height} = useWindowDimensions();
  const [_visible, setVisible] = useState(visible);
  const theme = useTheme();
  const _style = createStyle(theme, height);

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

  return (
    <Modal
      animationType="fade"
      presentationStyle="overFullScreen"
      onRequestClose={close}
      statusBarTranslucent={true}
      supportedOrientations={['portrait', 'landscape']}
      transparent={true}
      visible={_visible}
      {...rest}>
      <Pressable style={[_style.cont, style]} onPress={close}>
        {children}
      </Pressable>
    </Modal>
  );
});

function createStyle(theme: Judiye.Theme, screenHeight: number) {
  const {colors, spacing} = theme;

  return StyleSheet.create({
    cont: {
      backgroundColor: colors.scrim,
      width: '100%',
      height: screenHeight,
      paddingHorizontal: spacing.sm,
    },
  });
}

export default Backdrop;
