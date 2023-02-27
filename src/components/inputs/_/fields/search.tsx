import {forwardRef, useRef} from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputEndEditingEventData,
} from 'react-native';
import {useForwardedRef, useTheme} from 'hooks';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Field, {FieldProps, InputHandle} from './base';

const SearchField = forwardRef<InputHandle, FieldProps>(function SearchField(
  props: FieldProps,
  ref,
) {
  const {prefix, postfix, onChangeText, onEndEditing, contStyle, ...rest} =
    props;
  const inputRef = useForwardedRef(ref);
  const searchValueRef = useRef<string>('');
  const clearBtnScale = useSharedValue(0);
  const theme = useTheme();
  const _style = createStyle(theme);

  const _onEndEditing = (
    e: NativeSyntheticEvent<TextInputEndEditingEventData>,
  ) => {
    if (!searchValueRef.current || searchValueRef.current.length === 0) {
      clearBtnScale.value = withTiming(0, {duration: 300});
      searchValueRef.current = '';
    }
    onEndEditing && onEndEditing(e);
  };

  const _onChangeText = (value: string) => {
    if (value.length === 1 && searchValueRef.current === '') {
      clearBtnScale.value = withTiming(1, {duration: 300});
    }
    searchValueRef.current = value;
    onChangeText && onChangeText(value);
  };

  const _onClearButtonPress = () => {
    if (inputRef.current && searchValueRef.current !== '') {
      inputRef.current.clear();
      searchValueRef.current = '';
    }
  };

  const animatedClearBtnStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: clearBtnScale.value}],
    };
  });

  return (
    <Field
      ref={inputRef}
      defaultValue={searchValueRef.current}
      keyboardType="web-search"
      returnKeyType="search"
      contStyle={[contStyle]}
      autoCorrect={true}
      onEndEditing={_onEndEditing}
      onChangeText={_onChangeText}
      prefix={{
        // @ts-ignore
        appearance: 'icon',
        name: 'Search',
        color: theme.colors.text.secondary,
        ...prefix,
        style: [_style.searchIcon, prefix?.style],
      }}
      postfix={{
        ...postfix,
        animated: true,
        appearance: 'icon',
        name: 'Clear',
        ripple: true,
        style: [animatedClearBtnStyle, _style.clearButton, postfix?.style],
        onPress: _onClearButtonPress,
      }}
      {...rest}
    />
  );
});

function createStyle(theme: Judiye.Theme) {
  const {sizing} = theme;

  return StyleSheet.create({
    clearButton: {
      borderRadius: 1000,
      width: sizing.height.nm - 2,
      paddingRight: 0,
      paddingLeft: 0,
    },
    searchIcon: {
      zIndex: 10,
    },
  });
}

export default SearchField;
