import {forwardRef} from 'react';
import {
  Pressable as Touchable,
  View,
  ViewStyle,
  PressableProps as RNPressableProps,
  StyleProp,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import {useTheme} from 'hooks';
import {FlexKeys} from 'components/layout';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
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
    children,
    onPressIn,
    onPressOut,
    ripple = false,
    ...rest
  } = props;
  const theme = useTheme();
  const _style = createStyle(theme);
  const rippleValue = useSharedValue(0);

  const computedStyles: ViewStyle = {
    alignItems: align,
    alignContent: content,
    alignSelf: self,
    flexDirection: direction,
    flex,
    justifyContent: justify,
  };

  const _onPressIn = (e: GestureResponderEvent) => {
    if (ripple) {
      e.stopPropagation();
      rippleValue.value = 1;
    }
    onPressIn?.(e);
  };

  const _onPressOut = (e: GestureResponderEvent) => {
    if (ripple) {
      e.stopPropagation();
      rippleValue.value = 0;
    }
    onPressOut?.(e);
  };

  const animatedRippleStyle = useAnimatedStyle(() => {
    return {
      opacity: rippleValue.value,
    };
  });

  return (
    // @ts-ignore
    <Touchable
      ref={ref}
      style={[computedStyles, _style.button, style]}
      onPressIn={_onPressIn}
      onPressOut={_onPressOut}
      accessibilityLabel="Pressable"
      accessibilityRole="button"
      {...rest}
      android_ripple={undefined}>
      {ripple && <Animated.View style={[_style.ripple, animatedRippleStyle]} />}
      {children}
    </Touchable>
  );
});

function createStyle(theme: Judiye.Theme) {
  const {colors} = theme;

  return StyleSheet.create({
    button: {
      position: 'relative',
      overflow: 'hidden',
    },
    ripple: {
      backgroundColor: colors.ripple,
      position: 'absolute',
      width: '200%',
      height: '200%',
      top: 0,
      left: 0,
    },
  });
}

export default Pressable;
