import {useWindowDimensions} from 'react-native';
import wrapper from 'hoc/wrapper';
import {useTheme} from 'hooks';
import {Flex, FlexProps} from 'components/layout';
import {SafeAreaView} from 'react-native-safe-area-context';

const Frame = wrapper(function Frame(props: FlexProps) {
  const {style, ...rest} = props;
  const {width, height} = useWindowDimensions();
  const {colors, spacing} = useTheme();
  const computedStyle = {
    backgroundColor: colors.background,
    width,
    height,
    paddingHorizontal: spacing.md,
    paddingTop: 0,
  };

  return (
    <SafeAreaView>
      <Flex justify="flex-start" style={[computedStyle, style]} {...rest} />
    </SafeAreaView>
  );
});

export default Frame;
