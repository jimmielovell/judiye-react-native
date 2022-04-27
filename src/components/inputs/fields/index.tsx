import {
  createRef,
  forwardRef,
  useCallback,
  useMemo,
  useState,
  useRef,
  RefObject,
} from 'react';
import {
  LayoutChangeEvent,
  NativeSyntheticEvent,
  Platform,
  TextInput,
  TextInputEndEditingEventData,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {
  FieldProps,
  FieldWithoutPrePostfixProps,
  PasswordFieldProps,
  PhoneFieldProps,
  PinFieldProps,
  SearchFieldProps,
  ValidatableField,
} from '../types';
import {ValidationError} from '../errors';
import {useFontSize, useForwardedRef, useStyles, useTheme} from 'hooks';
import wrapper from 'hoc/wrapper';
import {Anchor} from 'components/buttons';
import {AnimatedFView, Column, FView} from 'components/layout';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {AnchorProps} from 'components/buttons/types';
import {validators} from 'utils';

const Prefix = wrapper(
  forwardRef<View, AnchorProps>(({style, onLayout, ...rest}, ref) => {
    const innerRef = useForwardedRef(ref);
    const {sizing, spacing} = useTheme();
    const compStyles = useStyles<ViewStyle>(style, {
      backgroundColor: 'transparent',
      borderRadius: 0,
      height: sizing.inputHeight,
      position: 'absolute',
      paddingLeft: spacing.inputPaddingHorizontal,
      paddingRight: spacing.inputPrefixPadding,
      width: 'auto',
      left: 0,
      bottom: 0,
    });

    return (
      <Anchor
        ref={innerRef}
        android_ripple={{
          borderless: false,
        }}
        style={compStyles}
        onLayout={onLayout}
        {...rest}
      />
    );
  }),
);

const Postfix = wrapper(
  forwardRef<View, AnchorProps>(({style, onLayout, ...rest}, ref) => {
    const innerRef = useForwardedRef(ref);
    const {sizing, spacing} = useTheme();
    const compStyles = useStyles<ViewStyle>(style, {
      backgroundColor: 'transparent',
      borderRadius: 0,
      height: sizing.inputHeight,
      position: 'absolute',
      paddingLeft: spacing.inputPrefixPadding,
      paddingRight: spacing.inputPaddingHorizontal,
      width: 'auto',
      right: 0,
      bottom: 0,
    });

    return (
      <Anchor
        ref={innerRef}
        android_ripple={{
          borderless: false,
        }}
        style={compStyles}
        onLayout={onLayout}
        {...rest}
      />
    );
  }),
);

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
export const Field = wrapper(
  forwardRef<TextInput, ValidatableField<FieldProps>>(
    (
      {
        contRef,
        masks,
        prefix,
        postfix,
        rules,
        style,
        contStyle,
        onValid,
        onChangeText,
        ...rest
      },
      ref,
    ) => {
      const {colors, sizing, spacing, fonts} = useTheme();
      const inputRef = useForwardedRef(ref);
      const errorRef = useRef<ValidationError | null>(null);

      // onLayoutChange on Prefix & Postfix buttons is not fired everytime the
      // input re-renders
      const prefixPadRef = useRef(
        Platform.OS === 'ios'
          ? spacing.inputPaddingHorizontal - 1
          : spacing.inputPaddingHorizontal,
      );
      const postfixPadRef = useRef(spacing.inputPaddingHorizontal);

      const validateInput = useCallback(
        (value: string) => {
          if (rules?.required && rules?.required.value && value.length === 0) {
            throw new ValidationError(rules?.required.message);
          }
          if (rules?.minLength && value.length < rules?.minLength.value) {
            throw new ValidationError(rules?.minLength.message);
          }
          if (rules?.maxLength && Number(value) > rules?.maxLength.value) {
            throw new ValidationError(rules?.maxLength.message);
          }
          if (rules?.lessThan && Number(value) >= rules?.lessThan.value) {
            throw new ValidationError(rules?.lessThan.message);
          }
          if (rules?.moreThan && Number(value) <= rules?.moreThan.value) {
            throw new ValidationError(rules?.moreThan.message);
          }
          if (rules?.regex) {
            if (Array.isArray(rules?.regex)) {
              rules.regex.forEach(rule => {
                if (!rule.value.test(value)) {
                  throw new ValidationError(rule.message);
                }
              });
            } else {
              if (!rules.regex.value.test(value)) {
                throw new ValidationError(rules?.regex.message);
              }
            }
          }

          return value;
        },
        [rules],
      );

      const addError = useCallback(
        (e: ValidationError) => {
          errorRef.current = e as ValidationError;
          if (inputRef.current) {
            inputRef.current.setNativeProps({
              borderColor: colors.inputOutlineErrored,
            });
          }
        },
        [colors.inputOutlineErrored, inputRef],
      );
      const removeError = useCallback(() => {
        if (errorRef.current !== null) {
          if (inputRef.current) {
            inputRef.current.setNativeProps({
              borderColor: colors.inputOutline,
            });
          }
          errorRef.current = null;
        }
      }, [colors.inputOutline, inputRef]);
      // useImperativeHandle(ref, () => ({
      //   addError,
      //   removeError,
      // }));

      const maskInput = useCallback(
        (value: string) => {
          // Do mind the ordering of the masks as it may result in unexpected
          // behaviour
          if (masks?.numOnly && /[\D]+/.test(value)) {
            value = value.slice(0, value.length - 1);
            inputRef.current!.setNativeProps({
              text: value,
            });
            return value;
          } else if (masks?.alphaOnly && /[\d]+/.test(value)) {
            value = value.slice(0, value.length - 1);
            inputRef.current!.setNativeProps({
              text: value,
            });
            return value;
          }

          if (masks?.cast === 'string') {
            value = value.replace(/[\d]/g, '');
            inputRef.current!.setNativeProps({
              text: value,
            });
            return value;
          } else if (masks?.cast === 'number') {
            value = value.replace(/[\D]/g, '');
            inputRef.current!.setNativeProps({
              text: value,
            });
            return value;
          }

          if (masks?.max && Number(value) > Number(masks?.max)) {
            value = value.slice(0, value.length - 1);
            inputRef.current!.setNativeProps({text: value});
            return value;
          }

          return value;
        },
        [inputRef, masks],
      );
      const onInputChangeText = useCallback(
        (value: string) => {
          if (masks) {
            value = maskInput(value);
          }
          if (rules && onValid) {
            try {
              value = validateInput(value);
              removeError();
              onValid(value);
            } catch (e) {
              addError(e as ValidationError);
              onValid(e as ValidationError);
            }
          }
          onChangeText && onChangeText(value);
        },
        [
          maskInput,
          masks,
          onChangeText,
          onValid,
          removeError,
          rules,
          addError,
          validateInput,
        ],
      );

      function onPrefixLayoutChange(e: LayoutChangeEvent) {
        if (inputRef.current) {
          const paddingLeft = e.nativeEvent.layout.width;
          prefixPadRef.current = paddingLeft;
          inputRef.current.setNativeProps({
            style: {
              paddingLeft,
            },
          });
        }
      }

      function onPostfixLayoutChange(e: LayoutChangeEvent) {
        if (inputRef.current) {
          const paddingRight = e.nativeEvent.layout.width;
          postfixPadRef.current = paddingRight;
          inputRef.current.setNativeProps({
            style: {
              paddingRight,
            },
          });
        }
      }

      const {fontSize} = useFontSize(fonts.defaultSize);
      const inputCompStyles = useStyles<ViewStyle & TextStyle>(
        {
          alignSelf: 'stretch',
          borderStyle: 'solid',
          borderColor:
            errorRef.current === null
              ? colors.inputOutline
              : colors.inputOutlineErrored,
          borderWidth: sizing.inputBorderWidth,
          borderRadius: sizing.inputBorderRadius,
          height: sizing.inputHeight,
          paddingVertical: 0,
          paddingLeft: prefixPadRef.current,
          paddingRight: postfixPadRef.current,
          fontSize,
          includeFontPadding: false,
          textAlignVertical: 'center',
        },
        style,
      );

      return (
        <AnimatedFView ref={contRef} self="stretch" style={contStyle}>
          {prefix && <Prefix {...prefix} onLayout={onPrefixLayoutChange} />}
          <AnimatedTextInput
            ref={inputRef}
            style={inputCompStyles}
            onChangeText={onInputChangeText}
            {...rest}
          />
          {postfix && <Postfix {...postfix} onLayout={onPostfixLayoutChange} />}
        </AnimatedFView>
      );
    },
  ),
);

export const EmailField = wrapper(
  forwardRef<TextInput, ValidatableField<FieldProps>>(
    ({name, rules, ...rest}, ref) => {
      return (
        <Field
          ref={ref}
          name={name || 'Email'}
          autoCorrect={false}
          autoComplete="email"
          textContentType="emailAddress"
          keyboardType="email-address"
          rules={{...validators.email, ...rules}}
          {...rest}
        />
      );
    },
  ),
);

export const NameField = wrapper(
  forwardRef<TextInput, ValidatableField<FieldProps>>((props, ref) => {
    return (
      <Field
        ref={ref}
        autoComplete="name"
        autoCorrect={false}
        autoCapitalize="words"
        textContentType="name"
        {...props}
      />
    );
  }),
);

export const NumberField = wrapper(
  forwardRef<TextInput, ValidatableField<FieldProps>>(
    ({masks, ...rest}, ref) => {
      return (
        <Field
          ref={ref}
          keyboardType="numeric"
          masks={{
            numOnly: true,
            ...masks,
          }}
          {...rest}
        />
      );
    },
  ),
);

export const DateField = wrapper(
  forwardRef<TextInput, ValidatableField<FieldWithoutPrePostfixProps>>(
    (_, ref) => {
      const {spacing} = useTheme();
      const dateInputRef = useForwardedRef(ref);
      const monthInputRef = useRef<TextInput>(null);
      const yearInputRef = useRef<TextInput>(null);

      const dateOnValid = useCallback(
        (value: string | ValidationError) => {
          if (typeof value === 'string') {
            if (value.length === 2) {
              if (dateInputRef.current && monthInputRef.current) {
                dateInputRef.current.focus();
                monthInputRef.current.focus();
              }
            }
          }
        },
        [dateInputRef, monthInputRef],
      );
      const monthOnValid = useCallback(
        (value: string | ValidationError) => {
          if (typeof value === 'string') {
            if (value.length === 2) {
              if (yearInputRef.current && monthInputRef.current) {
                monthInputRef.current.focus();
                yearInputRef.current.focus();
              }
            }
          }
        },
        [yearInputRef, monthInputRef],
      );

      const dateCompStyles = useStyles<ViewStyle>({
        flex: 1,
      });
      const monthCompStyles = useStyles<ViewStyle>({
        flex: 1,
        marginHorizontal: spacing.inputMarginBottom,
      });
      const yearCompStyles = useStyles<ViewStyle>({
        flex: 2,
      });
      return (
        <FView direction="row" justify="space-between">
          <NumberField
            ref={dateInputRef}
            textAlign="center"
            contStyle={dateCompStyles}
            placeholder="DD"
            name="day"
            masks={{max: 31}}
            maxLength={2}
            onChangeText={dateOnValid}
          />
          <NumberField
            ref={monthInputRef}
            textAlign="center"
            contStyle={monthCompStyles}
            placeholder="MM"
            name="month"
            masks={{max: 12}}
            maxLength={2}
            onChangeText={monthOnValid}
          />
          <NumberField
            ref={yearInputRef}
            textAlign="center"
            contStyle={yearCompStyles}
            placeholder="YYYY"
            name="year"
            maxLength={4}
          />
        </FView>
      );
    },
  ),
);

export const MultilineField = wrapper(
  forwardRef<TextInput, ValidatableField<FieldProps>>(
    ({onContentSizeChange, style, ...rest}, ref) => {
      const inputRef = useForwardedRef(ref || createRef<TextInput>());
      const {sizing} = useTheme();
      const height = useSharedValue(sizing.inputHeight);

      function onInputContentSizeChange(e: NativeSyntheticEvent<any>) {
        height.value = withTiming(
          Math.max(sizing.inputHeight, e.nativeEvent.contentSize.height + 21),
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
  ),
);

export const PasswordField = wrapper(
  forwardRef<TextInput, ValidatableField<PasswordFieldProps>>(
    ({name, newPassword, ...rest}, ref) => {
      const [textEntrySecured, setTextEntrySecured] = useState(true);

      return (
        <Field
          ref={ref}
          name={name || 'password'}
          autoComplete="password"
          autoCorrect={false}
          textContentType={newPassword ? 'newPassword' : 'password'}
          secureTextEntry={textEntrySecured}
          {...rest}
          postfix={{
            appearance: 'icon',
            name: textEntrySecured ? 'EyeOff' : 'Eye',
            onPress: () => setTextEntrySecured(!textEntrySecured),
          }}
        />
      );
    },
  ),
);

export const PhoneField = wrapper(
  forwardRef<TextInput, ValidatableField<PhoneFieldProps>>(
    ({prefix, ...rest}, ref) => {
      const innerRef = useForwardedRef(ref || createRef<TextInput>());

      return (
        <Field
          ref={innerRef}
          keyboardType="number-pad"
          prefix={{
            appearance: 'text',
            children: '+254',
            ...prefix,
          }}
          {...rest}
        />
      );
    },
  ),
);

const SinglePin = wrapper(
  forwardRef<TextInput, ValidatableField<FieldProps>>(
    ({style, ...rest}, ref) => {
      return (
        <Field
          ref={ref}
          name="Pin"
          keyboardType="number-pad"
          returnKeyType="next"
          textAlign="center"
          secureTextEntry={true}
          masks={{
            numOnly: true,
          }}
          maxLength={1}
          contStyle={style}
          {...rest}
        />
      );
    },
  ),
);
export const PinField = wrapper(
  forwardRef<TextInput, ValidatableField<PinFieldProps>>(
    ({onValid, length = 6, ...rest}: ValidatableField<PinFieldProps>, ref) => {
      const currentIndex = useRef<number>();
      let pins: Record<string, string | undefined> = useMemo(() => {
        return {};
      }, []);

      let inputRefs: RefObject<TextInput>[] = useMemo(() => {
        let refs = [];
        for (let i = 0; i < length; i++) {
          refs.push(createRef<TextInput>());
          pins[i] = undefined;
        }
        currentIndex.current = 0;
        if (ref) {
          if (typeof ref === 'function') {
            ref(refs[0].current);
          } else {
            ref.current = refs[0].current;
          }
        }
        return refs;
      }, [length, pins, ref]);

      const setPin = useCallback(
        (value: string | undefined) => {
          if (value === '') {
            value = undefined;
          }
          if (pins[currentIndex.current!] !== value) {
            pins[currentIndex.current!] = value;
          }
          for (let i = 0; i < length; i++) {
            if (value !== undefined) {
              if (i === currentIndex.current) {
                continue;
              } else if (pins[i] === undefined) {
                inputRefs[currentIndex.current!].current!.blur();
                inputRefs[i].current!.focus();
                break;
              }
            }
          }

          onValid && onValid(new ValidationError(''));
        },
        [inputRefs, onValid, pins, length],
      );
      const children = useMemo(() => {
        return inputRefs.map((inputRef, index) => (
          <SinglePin
            key={index}
            ref={inputRef}
            // onValid={setPin}
            onChangeText={setPin}
            onFocus={() => {
              currentIndex.current = index;
            }}
            // autoFocus={index === 0}
          />
        ));
      }, [inputRefs, setPin]);

      return (
        <Column columns={6} direction="row" justify="flex-start" {...rest}>
          {children}
        </Column>
      );
    },
  ),
);

export const SearchField = wrapper(
  forwardRef<TextInput, SearchFieldProps>(
    (
      {
        contRef,
        minimized = false,
        onSearch,
        onChangeText,
        onEndEditing,
        ...rest
      }: SearchFieldProps,
      ref,
    ) => {
      const inputRef = useForwardedRef(ref || createRef<TextInput>());
      const searchValueRef = useRef<string | null>(null);
      const searchContRef = useForwardedRef(contRef || createRef<View>());
      const clearBtnScale = useSharedValue(0);

      function handleSearchButtonPress() {
        if (minimized === true && searchValueRef.current === null) {
          searchContRef.current!.setNativeProps({flex: 1});
          inputRef.current!.focus();
        }
        onSearch && onSearch(searchValueRef.current!);
      }

      function handleInputEditing(
        e: NativeSyntheticEvent<TextInputEndEditingEventData>,
      ) {
        if (!searchValueRef.current || searchValueRef.current.length === 0) {
          clearBtnScale.value = withTiming(0, {duration: 300});
          searchValueRef.current = null;
          if (minimized === true) {
            searchContRef.current!.setNativeProps({flex: 0});
          }
        }
        onEndEditing && onEndEditing(e);
      }

      function handleChangeText(value: string) {
        if (
          value.length === 1 &&
          (searchValueRef.current === null || searchValueRef.current === '')
        ) {
          clearBtnScale.value = withTiming(1, {duration: 300});
        }
        searchValueRef.current = value;
        onChangeText && onChangeText(value);
      }

      function handleClearButtonPress() {
        if (inputRef.current && searchValueRef.current !== null) {
          inputRef.current.setNativeProps({text: ''});
          searchValueRef.current = null;
        }
      }

      const animatedClearBtnStyle = useAnimatedStyle(() => {
        return {
          transform: [{scale: clearBtnScale.value}],
        };
      });

      return (
        <Field
          ref={inputRef}
          keyboardType="web-search"
          returnKeyType="search"
          contRef={searchContRef}
          name="search"
          autoCorrect={true}
          onEndEditing={handleInputEditing}
          onChangeText={handleChangeText}
          prefix={{
            appearance: 'icon',
            name: 'Search',
            onPress: handleSearchButtonPress,
          }}
          postfix={{
            appearance: 'icon',
            name: 'Clear',
            style: animatedClearBtnStyle,
            onPress: handleClearButtonPress,
          }}
          {...rest}
        />
      );
    },
  ),
);
