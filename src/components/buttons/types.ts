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
  hideRipple?: boolean;
}

interface BaseButtonProps extends PressableProps {
  type?: 'button' | 'submit';
}

export interface FillButtonProps extends BaseButtonProps {
  textStyle?: StyleProp<TextStyle>;
  icon?: IconProps;
}

export interface IconButtonProps extends BaseButtonProps, IconProps {}

export interface TextButtonProps extends BaseButtonProps {
  textStyle?: StyleProp<TextStyle>;
}

export type ButtonProps =
  | ({appearance: 'icon'} & IconButtonProps)
  | ({appearance: 'text'} & TextButtonProps)
  | ({appearance?: 'fill' | 'outline'} & FillButtonProps);

export type AnchorProps = ButtonProps & {
  withRef?: RefObject<BackdropHandle>;
};
