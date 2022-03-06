import {StyleProp, ViewStyle} from 'react-native';

export interface IconProps {
  name: string;
  size?: string | number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}
