import {forwardRef} from 'react';
import {NativeSyntheticEvent} from 'react-native';
import {useForwardedRef, useTheme} from 'hooks';
import {useAnimatedStyle, useSharedValue} from 'react-native-reanimated';
import Field, {FieldProps, InputHandle, ValidatableField} from './base';

const MultilineField = forwardRef<InputHandle, ValidatableField<FieldProps>>(
  function MultilineField(props, ref) {
    const {onContentSizeChange, style, ...rest} = props;
    const inputRef = useForwardedRef(ref);
    const {sizing} = useTheme();
    const height = useSharedValue(sizing.height.nm);

    function _onContentSizeChange(e: NativeSyntheticEvent<any>) {
      height.value = Math.max(
        sizing.height.lg,
        e.nativeEvent.contentSize.height,
      );
      onContentSizeChange?.(e);
    }
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
        style={[style, animatedStyle]}
        {...rest}
      />
    );
  },
);

export default MultilineField;
