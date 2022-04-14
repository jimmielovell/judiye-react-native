import {ReactNode} from 'react';
import {ModalProps, StyleProp, ViewStyle} from 'react-native';
import {EntryExitAnimationFunction, Keyframe} from 'react-native-reanimated';

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
  entering?: EntryExitAnimationFunction | Keyframe;
  exiting?: EntryExitAnimationFunction | Keyframe;
}

export interface DialogProps {
  children: ReactNode;
}
