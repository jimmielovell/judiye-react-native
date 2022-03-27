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
  PixelRatio,
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
  PInFieldProps,
  PrePostfixProps,
  SearchFieldProps,
  ValidatableField,
} from '../types';
import {ValidationError} from './errors';
import {useForwardedRef, useStyles, useTheme} from 'hooks';
import wrapper from 'hoc/wrapper';
import {Button} from 'components/buttons';
import {Column, FView} from 'components/layout';

const Prefix = wrapper(
  forwardRef<View, PrePostfixProps>(
    ({appearance, icon, text, style, onLayout, ...rest}, ref) => {
      const innerRef = useForwardedRef(ref);
      const {sizing, spacing} = useTheme();
      const compStyles = useStyles<ViewStyle>(style, {
        borderRadius: 0,
        height: sizing.inputHeight,
        position: 'absolute',
        paddingRight: 0,
        paddingLeft: spacing.inputPaddingHorizontal,
        width: 'auto',
        left: 0,
        bottom: 0,
      });

      return (
        <Button
          ref={innerRef}
          align="center"
          justify="center"
          appearance={appearance || 'icon'}
          icon={icon}
          style={compStyles}
          onLayout={onLayout}
          {...rest}>
          {text}
        </Button>
      );
    },
  ),
);

const Postfix = wrapper(
  forwardRef<View, PrePostfixProps>(
    ({appearance, icon, text, style, onLayout, ...rest}, ref) => {
      const innerRef = useForwardedRef(ref);
      const {sizing, spacing} = useTheme();
      const compStyles = useStyles<ViewStyle>(style, {
        borderRadius: 0,
        height: sizing.inputHeight,
        position: 'absolute',
        paddingRight: spacing.inputPaddingHorizontal,
        paddingLeft: 0,
        width: 'auto',
        right: 0,
        bottom: 0,
      });

      return (
        <Button
          ref={innerRef}
          appearance={appearance || 'icon'}
          icon={icon}
          style={compStyles}
          onLayout={onLayout}
          {...rest}>
          {text}
        </Button>
      );
    },
  ),
);

export const Field = wrapper(
  forwardRef<TextInput, ValidatableField<FieldProps>>(
    (
      {
        contRef,
        masks,
        name,
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
      const inputRef = useForwardedRef(ref || createRef<TextInput>());

      const validateInput = useCallback(
        (value: string) => {
          if (rules?.required && value.length === 0) {
            throw new ValidationError(`Please enter ${name}`);
          }
          if (rules?.min && value.length < Number(rules?.min)) {
            throw new ValidationError(
              `${name} cannot be less than ${Number(rules?.min)} chars.`,
            );
          }
          if (rules?.max && Number(value) > Number(rules?.max)) {
            value = value.slice(0, value.length - 1);
            inputRef.current!.setNativeProps({text: value});
          }
          if (rules?.lessThan && Number(value) >= Number(rules?.lessThan)) {
            value = value.slice(0, value.length - 1);
            inputRef.current!.setNativeProps({text: value});
          }
          if (rules?.moreThan && Number(value) <= Number(rules?.moreThan)) {
            throw new ValidationError(
              `${name} cannot be less than ${Number(rules?.moreThan)}`,
            );
          }
          if (rules?.regex && !rules?.regex.test(value)) {
            throw new ValidationError(`Please enter a valid ${name}`);
          }

          return value;
        },
        [inputRef, rules, name],
      );
      const maskInput = useCallback(
        (value: string) => {
          // Do mind the ordering of the masks as it may result to unexpected
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
      const usePrefixWidth = useCallback(
        (e: LayoutChangeEvent) => {
          if (inputRef.current) {
            inputRef.current.setNativeProps({
              style: {
                paddingLeft:
                  e.nativeEvent.layout.width + spacing.inputPrefixPadding,
              },
            });
          }
        },
        [inputRef, spacing.inputPrefixPadding],
      );
      const usePostfixWidth = useCallback(
        (e: LayoutChangeEvent) => {
          if (inputRef.current) {
            inputRef.current.setNativeProps({
              style: {
                paddingRight:
                  e.nativeEvent.layout.width + spacing.inputPostfixPadding,
              },
            });
          }
        },
        [inputRef, spacing.inputPostfixPadding],
      );

      const contCompStyles = useStyles<ViewStyle>(
        {
          position: 'relative',
        },
        contStyle,
      );

      const fontScale = PixelRatio.getFontScale();
      const fontSize = useMemo(() => {
        return fonts.defaultSize * fontScale;
      }, [fonts, fontScale]);
      const inputCompStyles = useStyles<ViewStyle & TextStyle>(
        {
          alignSelf: 'stretch',
          borderStyle: 'solid',
          borderColor: colors.inputOutline,
          borderWidth: sizing.inputBorderWidth,
          borderRadius: sizing.inputBorderRadius,
          height: sizing.inputHeight,
          ...Platform.select({
            android: {
              paddingHorizontal: spacing.inputPaddingHorizontal,
            },
            ios: {
              paddingHorizontal: spacing.inputPaddingHorizontal - 1,
            },
          }),
          fontSize: fontSize,
          textAlignVertical: 'center',
          paddingTop: 0,
          paddingBottom: 0,
        },
        style,
      );

      function onInputChangeText(value: string) {
        if (masks) {
          value = maskInput(value);
        }
        if (rules && onValid) {
          try {
            value = validateInput(value);
            onValid(value);
          } catch (e) {
            onValid(e as ValidationError);
          }
        }

        onChangeText && onChangeText(value);
      }

      return (
        <FView ref={contRef} style={contCompStyles}>
          {prefix && <Prefix {...prefix} onLayout={usePrefixWidth} />}
          <TextInput
            ref={inputRef}
            style={inputCompStyles}
            onChangeText={onInputChangeText}
            {...rest}
          />
          {postfix && <Postfix {...postfix} onLayout={usePostfixWidth} />}
        </FView>
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
          rules={{
            regex: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/,
            ...rules,
          }}
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
        name="name"
        autoComplete="name"
        autoCorrect={false}
        autoCapitalize="words"
        textContentType="name"
        placeholder="Name"
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
      const compStyles = useStyles(
        {
          height: sizing.inputHeight,
        },
        style,
      );

      function onInputContentSizeChange(e: NativeSyntheticEvent<any>) {
        inputRef.current?.setNativeProps({
          height: Math.max(
            sizing.inputHeight,
            e.nativeEvent.contentSize.height + 21,
          ),
        });
        onContentSizeChange && onContentSizeChange(e);
      }

      return (
        <Field
          ref={inputRef}
          multiline={true}
          onContentSizeChange={onInputContentSizeChange}
          style={compStyles}
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
            icon: {
              name: textEntrySecured ? 'EyeOff' : 'Eye',
            },
            onPress: () => setTextEntrySecured(!textEntrySecured),
          }}
        />
      );
    },
  ),
);

export const PhoneField = wrapper(
  forwardRef<TextInput, ValidatableField<FieldWithoutPrePostfixProps>>(
    (props, ref) => {
      const innerRef = useForwardedRef(ref || createRef<TextInput>());

      return (
        <Field
          ref={innerRef}
          keyboardType="number-pad"
          prefix={{
            appearance: 'text',
            text: '+254',
            textStyle: {fontWeight: 'normal'},
          }}
          {...props}
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
  forwardRef<TextInput, ValidatableField<PInFieldProps>>(
    ({onValid, length = 6, ...rest}: ValidatableField<PInFieldProps>, ref) => {
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
      const postfixRef = useRef<View>(null);

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
          postfixRef.current?.setNativeProps({opacity: 0});
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
          // setClearBtnVisible(true);
          postfixRef.current?.setNativeProps({opacity: 1});
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
            icon: {
              name: 'Search',
              size: 20,
            },
            onPress: handleSearchButtonPress,
          }}
          postfix={{
            icon: {
              name: 'Clear',
            },
            ref: postfixRef,
            style: {
              opacity: 0,
            },
            onPress: handleClearButtonPress,
          }}
          {...rest}
        />
      );
    },
  ),
);
