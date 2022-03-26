import {
  ImageSourcePropType,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {AnchorProps} from 'components/buttons/types';

export interface IconProps {
  name: string;
  size?: string | number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

export interface AvatarProps extends AnchorProps {
  source?: ImageSourcePropType;
  size?: number;
  online?: boolean;
  initials?: string;
}

export interface OrganizationProp {
  id: string;
  name: string;
}

export interface TitleProps {
  organization?: OrganizationProp;
  role: string | string[];
  // This is a bad design, find a way to pass style instead of defining it here
  style?: StyleProp<TextStyle>;
}

export interface NameCardProps {
  avatar: AvatarProps;
  name: {
    value: string;
    // This is a bad design, find a way to pass style instead of defining it here
    style?: StyleProp<TextStyle>;
  };
  title: TitleProps | TitleProps[];
  button?: AnchorProps;
  style?: StyleProp<ViewStyle>;
}
