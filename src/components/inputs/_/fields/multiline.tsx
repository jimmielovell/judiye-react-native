import {forwardRef, useCallback} from 'react';
import {NativeSyntheticEvent, Platform} from 'react-native';
import {useForwardedRef, useTheme} from 'hooks';
import {useAnimatedStyle, useSharedValue} from 'react-native-reanimated';
import Field, {FieldProps, InputHandle, ValidatableField} from './base';

const MultilineField = forwardRef<InputHandle, ValidatableField<FieldProps>>(
  function MultilineField(props, ref) {
    const {onContentSizeChange, style, ...rest} = props;
    const inputRef = useForwardedRef(ref);
    const {sizing, spacing} = useTheme();
    const height = useSharedValue(sizing.height.nm);

    const _onContentSizeChange = useCallback(
      (e: NativeSyntheticEvent<any>) => {
        height.value = Math.max(
          sizing.height.lg,
          e.nativeEvent.contentSize.height,
        );
        onContentSizeChange?.(e);
      },
      [height, onContentSizeChange, sizing.height.lg],
    );

    const animatedStyle = useAnimatedStyle(() => {
      return {
        height: height.value,
        paddingTop: Platform.OS === 'ios' ? spacing.nm : 0,
      };
    });

    return (
      <Field
        ref={inputRef}
        multiline={true}
        onContentSizeChange={_onContentSizeChange}
        textAlignVertical="center"
        style={[style, animatedStyle]}
        {...rest}
      />
    );
  },
);

export default MultilineField;
