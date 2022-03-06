import {PressableProps, StyleProp, TextStyle, ViewStyle} from 'react-native';
import {IconProps} from 'components/icons/types';
import {FlexProps} from 'components/layout/types';

export interface ButtonAppearance {
  appearance?: 'fill' | 'icon' | 'outline' | 'text';
}

export interface TouchableProps extends PressableProps, FlexProps {
  style?: StyleProp<ViewStyle>;
}

export interface ButtonProps extends TouchableProps, ButtonAppearance {
  textStyle?: StyleProp<TextStyle>;
  isFocused?: boolean;
  label?: string;
  icon?: IconProps;
}
