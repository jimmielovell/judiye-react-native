import {TextProps} from 'react-native';

export type CTextProps = TextProps & {
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
};
