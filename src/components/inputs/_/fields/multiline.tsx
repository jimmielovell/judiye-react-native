import {forwardRef} from 'react';
import {NativeSyntheticEvent, Platform} from 'react-native';
import {useForwardedRef, useTheme} from 'hooks';
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import Field, {FieldProps, InputHandle, ValidatableField} from './base';

const MultilineField = forwardRef<InputHandle, ValidatableField<FieldProps>>(
  function MultilineField(props, ref) {
    const {onContentSizeChange, style, ...rest} = props;
    const inputRef = useForwardedRef(ref);
    const {sizing, spacing} = useTheme();
    const height = useSharedValue(sizing.height.nm);

    function _onContentSizeChange(e: NativeSyntheticEvent<any>) {
      height.value = withSpring(
        Math.max(sizing.height.nm, e.nativeEvent.contentSize.height + 21),
        {
          damping: 150,
          stiffness: 150,
        },
      );
      onContentSizeChange?.(e);
    }

    const inputStyles = {
      ...Platform.select({
        ios: {
          paddingTop: spacing.sm,
        },
      }),
    };
    const animatedStyle = useAnimatedStyle(() => {
      return {
        height: height.value,
      };
    });

    return (
      <Field
        ref={inputRef}
        multiline={true}
        onContentSizeChange={_onContentSizeChange}
        style={[inputStyles, style, animatedStyle]}
        {...rest}
      />
    );
  },
);

export default MultilineField;
