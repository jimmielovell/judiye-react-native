import wrapper from 'hoc/wrapper';
import {useTheme} from 'hooks';
import {Flex, FlexProps} from 'components/layout';
import {SafeAreaView} from 'react-native-safe-area-context';

const Frame = wrapper(function Frame(props: FlexProps) {
  const {style, ...rest} = props;
  const {colors, spacing} = useTheme();
  const computedStyle = {
    backgroundColor: colors.background,
    paddingHorizontal: spacing.md,
    selfAlign: 'stretch',
    height: '100%',
  };

  return (
    <SafeAreaView>
      <Flex justify="flex-start" style={[computedStyle, style]} {...rest} />
    </SafeAreaView>
  );
});

export default Frame;
