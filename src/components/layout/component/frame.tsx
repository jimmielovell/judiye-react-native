import {useWindowDimensions} from 'react-native';
import wrapper from 'hoc/wrapper';
import {useStyles, useTheme} from 'hooks';
import {FViewProps} from '../types.js';
import FView from 'components/layout/component/fview';

const Frame = wrapper(({style, ...rest}: FViewProps) => {
  const {width, height} = useWindowDimensions();
  const {colors, spacing} = useTheme();
  const compStyles = useStyles({
    backgroundColor: colors.primary,
    width,
    height,
    paddingHorizontal: spacing.screenPaddingHorizontal,
    paddingTop: spacing.screenPaddingTop,
  });

  return <FView justify="flex-start" style={[compStyles, style]} {...rest} />;
});

export default Frame;
