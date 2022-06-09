import {forwardRef} from 'react';
import {Pressable as Touchable, View} from 'react-native';
import {PressableProps} from '../types';
import {useStyles, useTheme} from 'hooks';
import Animated from 'react-native-reanimated';

const UnAnanimatedPressable = forwardRef<View, PressableProps>(
  function Pressable(
    {
      direction,
      align,
      justify,
      self,
      content,
      flex,
      style,
      android_ripple,
      hideRipple,
      ...rest
    },
    ref,
  ) {
    const {colors} = useTheme();
    const compStyles = useStyles(
      {
        alignItems: align || 'center',
        alignContent: content,
        alignSelf: self || 'stretch',
        flexDirection: direction,
        flex,
        justifyContent: justify || 'center',
        zIndex: 999,
        overflow: 'hidden',
      },
      style,
    );

    return (
      <Touchable
        ref={ref}
        style={compStyles}
        android_ripple={{
          ...android_ripple,
          color: hideRipple ? 'transparent' : colors.ripple,
        }}
        {...rest}
      />
    );
  },
);

const Pressable = Animated.createAnimatedComponent(UnAnanimatedPressable);

export default Pressable;
