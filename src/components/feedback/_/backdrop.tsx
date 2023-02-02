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
  const [_visible, setVisible] = useState(visible);
  const theme = useTheme();
  const _style = createStyle(theme);

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

function createStyle(theme: Judiye.Theme) {
  const {colors, spacing, sizing} = theme;

  return StyleSheet.create({
    cont: {
      backgroundColor: colors.scrim,
      width: '100%',
      height: '100%',
      paddingTop: sizing.height.lg,
      paddingBottom: spacing.nm,
      paddingHorizontal: spacing.md,
      position: 'relative',
    },
  });
}

export default Backdrop;
