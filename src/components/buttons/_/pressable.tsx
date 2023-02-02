import {forwardRef} from 'react';
import {
  Pressable as Touchable,
  View,
  ViewStyle,
  PressableProps as RNPressableProps,
  StyleProp,
} from 'react-native';
import {useTheme} from 'hooks';
import {FlexKeys} from 'components/layout';
// import Animated from 'react-native-reanimated';

export interface PressableProps extends FlexKeys, RNPressableProps {
  ripple?: boolean;
  style?: StyleProp<ViewStyle>;
}

const Pressable = forwardRef<View, PressableProps>(function Pressable(
  props,
  ref,
) {
  const {
    direction,
    align = 'center',
    justify = 'center',
    self = 'stretch',
    content,
    flex,
    style,
    android_ripple,
    ripple,
    ...rest
  } = props;
  const {colors} = useTheme();
  const computedStyles: ViewStyle = {
    alignItems: align,
    alignContent: content,
    alignSelf: self,
    flexDirection: direction,
    flex,
    justifyContent: justify,
    zIndex: 999,
    overflow: 'hidden',
  };

  return (
    <Touchable
      ref={ref}
      style={[computedStyles, style]}
      android_ripple={{
        ...android_ripple,
        color: ripple ? colors.ripple : 'transparent',
      }}
      {...rest}
    />
  );
});

// const Pressable = Animated.createAnimatedComponent(_Pressable);

export default Pressable;
