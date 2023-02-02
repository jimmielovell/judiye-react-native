import {createRef, forwardRef, useState, useRef} from 'react';
import {
  NativeSyntheticEvent,
  TextInputEndEditingEventData,
  View,
  ViewStyle,
} from 'react-native';
import {useForwardedRef, useTheme} from 'hooks';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Field, {FieldProps, InputHandle} from './base';

export interface SearchFieldProps extends FieldProps {
  minimized?: boolean;
}

const SearchField = forwardRef<InputHandle, SearchFieldProps>(
  function SearchField(props: SearchFieldProps, ref) {
    const {
      contRef,
      minimized = false,
      prefix,
      postfix,
      onChangeText,
      onEndEditing,
      contStyle,
      ...rest
    } = props;
    const inputRef = useForwardedRef(ref);
    const searchValueRef = useRef<string>('');
    const searchContRef = useForwardedRef(contRef || createRef<View>());
    const clearBtnScale = useSharedValue(0);
    const [shouldMinimize, setShouldMinimize] = useState(
      minimized && searchValueRef.current === '',
    );
    const {sizing} = useTheme();

    const _onSearchButtonPress = () => {
      if (minimized === true && searchValueRef.current === '') {
        // searchContRef.current!.setNativeProps({flex: 1});
        setShouldMinimize(true);
        inputRef.current!.focus();
      }
    };

    const _onEndEditing = (
      e: NativeSyntheticEvent<TextInputEndEditingEventData>,
    ) => {
      if (!searchValueRef.current || searchValueRef.current.length === 0) {
        clearBtnScale.value = withTiming(0, {duration: 300});
        searchValueRef.current = '';

        if (minimized === true) {
          // searchContRef.current!.setNativeProps({flex: 0});
          setShouldMinimize(false);
        }
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
    const computedClearBtnStyle: ViewStyle = {
      borderRadius: 1000,
      width: sizing.height.nm - 2,
      paddingRight: 0,
      paddingLeft: 0,
    };
    const computedContainerStyle = {
      flex: shouldMinimize ? 1 : 0,
    };

    return (
      <Field
        ref={inputRef}
        defaultValue={searchValueRef.current}
        keyboardType="web-search"
        returnKeyType="search"
        contRef={searchContRef}
        contStyle={[contStyle, computedContainerStyle]}
        autoCorrect={true}
        onEndEditing={_onEndEditing}
        onChangeText={_onChangeText}
        prefix={{
          ...prefix,
          appearance: 'icon',
          name: 'Search',
          onPress: _onSearchButtonPress,
          // hideRipple: true,
        }}
        postfix={{
          ...postfix,
          appearance: 'icon',
          name: 'Clear',
          // hideRipple: false,
          style: [animatedClearBtnStyle, computedClearBtnStyle, postfix?.style],
          onPress: _onClearButtonPress,
        }}
        {...rest}
      />
    );
  },
);

export default SearchField;
