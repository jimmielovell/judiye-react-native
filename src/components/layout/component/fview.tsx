import {forwardRef} from 'react';
import {View, ViewStyle} from 'react-native';
import {FViewProps} from '../types';
import {useStyles} from 'hooks';
import wrapper from 'hoc/wrapper';

const FView = wrapper(
  forwardRef<View, FViewProps>(
    (
      {
        direction = 'column',
        align = 'center',
        justify = 'flex-start',
        self = 'flex-start',
        content,
        wrap,
        style,
        ...rest
      },
      ref,
    ) => {
      const compStyles = useStyles<ViewStyle>(
        {
          flexDirection: direction,
          alignItems: align,
          justifyContent: justify,
          alignSelf: self,
          alignContent: content,
          flexWrap: wrap,
          width: '100%',
        },
        style,
      );

      return <View ref={ref} style={compStyles} {...rest} />;
    },
  ),
);

export default FView;
