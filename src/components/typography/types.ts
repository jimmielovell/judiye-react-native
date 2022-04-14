import {TextProps as RNTextProps} from 'react-native';

export interface TextProps extends RNTextProps {
  color?: string;
  size?: number;
  weight?:
    | 'bold'
    | 'normal'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
  decoration?: 'line-through' | 'none' | 'underline' | 'underline line-through';
  italic?: boolean;
}
