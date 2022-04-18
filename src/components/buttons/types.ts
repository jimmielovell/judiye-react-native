import {RefObject} from 'react';
import {
  PressableProps as RNPressableProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {FlexProps} from 'components/layout/types';
import {BackdropHandle} from 'components/feedback/types';
import {IconProps} from 'components/datadisplay/types';

export interface PressableProps extends RNPressableProps, FlexProps {
  style?: StyleProp<ViewStyle>;
}

export interface FillButtonProps extends PressableProps {
  textStyle?: StyleProp<TextStyle>;
  icon?: IconProps;
}

export interface IconButtonProps extends PressableProps, IconProps {}

export interface TextButtonProps extends PressableProps {}

export type ButtonProps =
  | ({appearance: 'icon'} & IconButtonProps)
  | ({appearance: 'text'} & TextButtonProps)
  | ({appearance: 'fill' | 'outline'} & FillButtonProps);

export type AnchorProps = ButtonProps & {
  withRef?: RefObject<BackdropHandle>;
};
