import wrapper from 'hoc/wrapper';
import {Text, TextProps} from 'components/typography';
import Animated from 'react-native-reanimated';

const AnimatedText = Animated.createAnimatedComponent(Text);

const Counter = wrapper(function Counter(props: TextProps) {
  const {children, ...rest} = props;

  return (
    <AnimatedText size="chip" color="secondary" {...rest}>
      {children}
    </AnimatedText>
  );
});

export default Counter;
