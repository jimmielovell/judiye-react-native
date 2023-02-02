import {forwardRef} from 'react';
import {NativeSyntheticEvent, Platform} from 'react-native';
import {useForwardedRef, useStyles, useTheme} from 'hooks';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Field, {FieldProps, InputHandle, ValidatableField} from './base';

const MultilineField = forwardRef<InputHandle, ValidatableField<FieldProps>>(
  function MultilineField({onContentSizeChange, style, ...rest}, ref) {
    const inputRef = useForwardedRef(ref);
    const {sizing} = useTheme();
    const height = useSharedValue(sizing.height.nm);

    function onInputContentSizeChange(e: NativeSyntheticEvent<any>) {
      height.value = withTiming(
        Math.max(sizing.height.nm, e.nativeEvent.contentSize.height + 21),
        {duration: 50},
      );
      onContentSizeChange && onContentSizeChange(e);
    }

    const inputStyles = useStyles(
      {
        ...Platform.select({
          ios: {
            paddingTop: 9,
          },
        }),
      },
      style,
    );
    const animatedStyle = useAnimatedStyle(() => {
      return {
        height: height.value,
      };
    });

    return (
      <Field
        ref={inputRef}
        multiline={true}
        onContentSizeChange={onInputContentSizeChange}
        style={[animatedStyle, inputStyles]}
        {...rest}
      />
    );
  },
);

export default MultilineField;
