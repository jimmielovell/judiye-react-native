import {RefObject} from 'react';
import {PressableProps, StyleProp, TextStyle, ViewStyle} from 'react-native';
import {FlexProps} from 'components/layout/types';
import {BackdropHandle} from 'components/feedback/types';
import {IconProps} from 'components/datadisplay/types';

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

export interface AnchorProps extends ButtonProps {
  withRef?: RefObject<BackdropHandle>;
}
