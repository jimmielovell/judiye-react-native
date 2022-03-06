import {forwardRef, createRef, useCallback} from 'react';
import {Pressable, View} from 'react-native';
import {TouchableProps} from '../types';
import {useForwardedRef, useStyles} from 'hooks';
import wrapper from 'hoc/wrapper';

const Touchable = wrapper(
  forwardRef<View, TouchableProps>(
    ({direction, align, justify, self, content, style, ...rest}, ref) => {
      const buttonRef = useForwardedRef(ref || createRef<View>());
      const compStyles = useStyles(
        {
          flexDirection: direction || 'row',
          alignItems: align || 'center',
          alignContent: content,
          justifyContent: justify || 'center',
          alignSelf: self || 'stretch',
          zIndex: 1000,
        },
        style,
      );

      const setOpacityTo = useCallback(
        value => {
          buttonRef.current?.setNativeProps({
            opacity: value,
          });
        },
        [buttonRef],
      );

      return (
        <Pressable
          ref={buttonRef}
          accessibilityRole="button"
          accessibilityLabel="button"
          style={compStyles}
          onPressIn={() => setOpacityTo(0.89)}
          onPressOut={() => setOpacityTo(1)}
          {...rest}
        />
      );
    },
  ),
);

export default Touchable;
