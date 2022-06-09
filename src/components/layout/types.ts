import {ViewProps} from 'react-native';

export interface FlexProps {
  direction?: 'column' | 'row' | 'row-reverse' | 'column-reverse';
  justify?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  content?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'stretch'
    | 'space-between'
    | 'space-around';
  wrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
  self?: 'auto' | 'baseline' | 'center' | 'flex-end' | 'flex-start' | 'stretch';
  flex?: number;
}

export interface FViewProps extends FlexProps, ViewProps {}

export interface ColumnProps extends FViewProps {
  columns?: number;
  gutter?: number;
  width?: string | number;
  pressable?: boolean;
}
