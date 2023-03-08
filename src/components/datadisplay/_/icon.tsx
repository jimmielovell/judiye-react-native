import * as svgs from 'assets/svgs';
import {StyleProp, ViewStyle} from 'react-native';

export interface IconProps {
  name: string;
  size?: string | number;
  color?: string;
  viewBox?: string;
  style?: StyleProp<ViewStyle>;
}

export default function Icon({name, ...rest}: IconProps) {
  // @ts-ignore
  const SVGIcon = svgs[name];
  return <SVGIcon {...rest} />;
}
