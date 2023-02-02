import {forwardRef} from 'react';
import {View, ViewProps, ViewStyle} from 'react-native';

export interface FlexKeys {
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

export interface FlexProps extends FlexKeys, ViewProps {}

const Flex = forwardRef<View, FlexProps>(function Flex(props, ref) {
  const {
    align = 'center',
    direction = 'column',
    justify = 'flex-start',
    self = 'flex-start',
    content,
    wrap,
    flex,
    style,
    ...rest
  } = props;
  const compStyles: ViewStyle = {
    flexDirection: direction,
    alignItems: align,
    justifyContent: justify,
    alignSelf: self,
    alignContent: content,
    flexWrap: wrap,
    flex,
    width: '100%',
  };

  return <View ref={ref} style={[compStyles, style]} {...rest} />;
});

export default Flex;
