import {
  forwardRef,
  useCallback,
  useState,
  useRef,
  memo,
  useImperativeHandle,
  useMemo,
} from 'react';
import {
  LayoutChangeEvent,
  NativeSyntheticEvent,
  Platform,
  StyleProp,
  TextInput,
  TextInputEndEditingEventData,
  TextInputFocusEventData,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {useFontColor, useFontFamily, useFontSize, useTheme} from 'hooks';
import {Flex} from 'components/layout';
import Prefix, {PrefixProps} from './prefix';
import Postfix, {PostfixProps} from './postfix';
import {ValidationError} from 'domains';
import Animated from 'react-native-reanimated';

export interface FieldMasks {
  cast?: 'string' | 'number';
  numOnly?: boolean;
  alphaOnly?: boolean;
  max?: string | number;
}

export interface FieldProps extends TextInputProps {
  postfix?: PostfixProps;
  prefix?: PrefixProps;
  contStyle?: StyleProp<ViewStyle>;
  masks?: FieldMasks;
  validateOn?: 'change-text' | 'blur';
}

interface RegexInputRule {
  value: RegExp;
  message: string;
}
export interface FieldRules {
  required?: {
    message?: string;
  };
  minLength?: {
    value: number;
    message: string;
  };
  maxLength?: {
    value: number;
    message: string;
  };
  lessThan?: {
    value: number;
    message: string;
  };
  moreThan?: {
    value: number;
    message: string;
  };
  regex?: RegexInputRule | RegexInputRule[];
  rule?(value: string): void;
}

export type ValidatableField<T> = T & {
  rules?: FieldRules;
  onValidate?(value: string | ValidationError): void;
};

export type InputHandle = {
  setError(error: ValidationError): void;
  clearError(): void;
  getError(): ValidationError | null;
  getValue(): any;
  setValue(value: string): void;
  validate(): void;
  focus(): void;
  isFocused(): boolean;
  blur(): void;
  clear(): void;
};

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const Field = forwardRef<InputHandle, ValidatableField<FieldProps>>(
  function Field(
    {
      masks,
      prefix,
      postfix,
      rules,
      style,
      contStyle,
      defaultValue,
      value,
      onValidate,
      onChangeText,
      onBlur,
      onEndEditing,
      onFocus,
      validateOn,
      ...rest
    },
    ref,
  ) {
    const {colors, sizing, spacing, shape} = useTheme();
    const inputRef = useRef<TextInput>(null);
    const errorRef = useRef<ValidationError | null>(null);
    const [errored, setErrored] = useState(errorRef.current != null);
    const [inputValue, setInputValue] = useState(value || defaultValue || '');
    const [focused, setFocused] = useState(false);
    // onLayoutChange on Prefix & Postfix buttons is not fired everytime the
    // input re-renders
    const prefixPadRef = useRef(spacing.nm);
    const postfixPadRef = useRef(spacing.nm);
    const [paddingLeft, setPaddingLeft] = useState(prefixPadRef.current);
    const [paddingRight, setPaddingRight] = useState(postfixPadRef.current);

    style = (style || {}) as TextStyle;
    const fontColor = useFontColor(colors.primary);
    const fontSize = useFontSize(style.fontSize);
    const [fontFamily, fontWeight] = useFontFamily(
      style.fontWeight,
      'normal',
      'body',
    );

    const setError = useCallback(
      (e: ValidationError) => {
        errorRef.current = e as ValidationError;
        if (inputRef.current) {
          setErrored(true);
        }
        onValidate?.(e as ValidationError);
      },
      [inputRef, onValidate],
    );

    const clearError = useCallback(() => {
      if (errorRef.current !== null) {
        if (inputRef.current) {
          setErrored(false);
        }
        errorRef.current = null;
      }
    }, [inputRef]);

    const _validateField = useCallback(
      (_value: string) => {
        try {
          validateField(_value, rules!);
          clearError();
          onValidate?.(_value);
        } catch (e) {
          setError(e as ValidationError);
        }
      },
      [rules, onValidate, setError, clearError],
    );

    useImperativeHandle(ref, () => ({
      setError: setError,
      clearError: clearError,
      getError: () => errorRef.current,
      getValue: () => inputValue,
      setValue: (_value: string) => setInputValue(_value),
      validate: () => _validateField(inputValue),
      focus: () => inputRef.current?.focus(),
      isFocused: () => focused,
      blur: () => inputRef.current?.blur(),
      clear: () => setInputValue(''),
    }));

    const onInputChangeText = useCallback(
      (_value: string) => {
        if (masks) {
          _value = maskInput(_value, masks) || '';
        }

        setInputValue(_value);

        if (rules && validateOn === 'change-text') {
          _validateField(_value);
        }

        onChangeText?.(_value);
      },
      [masks, rules, validateOn, onChangeText, _validateField],
    );
    const onInputEndEditing = useCallback(
      (e: NativeSyntheticEvent<TextInputEndEditingEventData>) => {
        if (validateOn === 'blur' && rules) {
          _validateField(e.nativeEvent.text);
        }

        onEndEditing?.(e);
      },
      [_validateField, onEndEditing, rules, validateOn],
    );
    const onInputFocus = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setFocused(true);
        onFocus?.(e);
      },
      [onFocus],
    );
    const onInputBlur = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setFocused(false);

        if (validateOn === 'blur' && rules) {
          _validateField(e.nativeEvent.text);
        }

        onBlur?.(e);
      },
      [_validateField, onBlur, rules, validateOn],
    );

    const _Prefix = useMemo(() => {
      if (prefix) {
        const onPrefixLayoutChange = (e: LayoutChangeEvent) => {
          const _paddingLeft = e.nativeEvent.layout.width;
          prefixPadRef.current = _paddingLeft;
          setPaddingLeft(_paddingLeft + spacing.xs);
        };

        return <Prefix {...prefix} onLayout={onPrefixLayoutChange} />;
      }

      return null;
    }, [prefix, spacing.xs]);

    const _Postfix = useMemo(() => {
      if (postfix) {
        const onPostfixLayoutChange = (e: LayoutChangeEvent) => {
          const _paddingRight = e.nativeEvent.layout.width;
          postfixPadRef.current = _paddingRight;
          setPaddingRight(_paddingRight);
        };

        return <Postfix {...postfix} onLayout={onPostfixLayoutChange} />;
      }

      return null;
    }, [postfix]);

    const inputCompStyles: ViewStyle & TextStyle = {
      alignSelf: 'stretch',
      borderStyle: 'solid',
      borderColor: errored ? colors.actions.error : colors.border.primary,
      borderWidth: focused ? 1.6 : sizing.border.width,
      borderRadius: shape.radius.nm,
      height: sizing.height.lg,
      paddingLeft,
      paddingRight,
      color: fontColor,
      fontSize,
      fontFamily,
      fontWeight,
      textAlignVertical: 'center',
      ...Platform.select({
        ios: {
          lineHeight: fontSize,
          paddingTop: 2,
        },
        android: {
          paddingBottom: 9.5,
        },
      }),
    };

    return (
      <Flex style={[contStyle]}>
        {_Prefix}
        <AnimatedTextInput
          ref={inputRef}
          style={[inputCompStyles, style]}
          onChangeText={onInputChangeText}
          onBlur={onInputBlur}
          onEndEditing={onInputEndEditing}
          onFocus={onInputFocus}
          value={inputValue}
          placeholderTextColor={colors.text.secondary}
          {...rest}
        />
        {_Postfix}
      </Flex>
    );
  },
);

function maskInput(_value: string, masks: FieldMasks) {
  // Do mind the ordering of the masks as it may result in unexpected
  // behaviour
  if (masks?.numOnly && /[\D]+/.test(_value)) {
    return _value.slice(0, _value.length - 1);
  } else if (masks?.alphaOnly && /[\d]+/.test(_value)) {
    return _value.slice(0, _value.length - 1);
  }

  if (masks?.cast === 'string') {
    return _value.replace(/[\d]/g, '');
  } else if (masks?.cast === 'number') {
    return _value.replace(/[\D]/g, '');
  }

  if (masks?.max && Number(_value) > Number(masks?.max)) {
    return _value.slice(0, _value.length - 1);
  }

  return _value;
}

function validateField(_value: string, rules: FieldRules) {
  if (rules?.required && _value.length === 0) {
    throw new ValidationError(rules?.required.message || 'Input is required');
  }
  if (rules?.minLength && _value.length < rules?.minLength.value) {
    throw new ValidationError(rules?.minLength.message);
  }
  if (rules?.maxLength && Number(_value) > rules?.maxLength.value) {
    throw new ValidationError(rules?.maxLength.message);
  }
  if (rules?.lessThan && Number(_value) >= rules?.lessThan.value) {
    throw new ValidationError(rules?.lessThan.message);
  }
  if (rules?.moreThan && Number(_value) <= rules?.moreThan.value) {
    throw new ValidationError(rules?.moreThan.message);
  }
  if (rules?.regex) {
    if (Array.isArray(rules?.regex)) {
      rules.regex.forEach(rule => {
        if (!rule.value.test(_value)) {
          throw new ValidationError(rule.message);
        }
      });
    } else {
      if (!rules.regex.value.test(_value)) {
        throw new ValidationError(rules?.regex.message);
      }
    }
  }
  if (rules?.rule) {
    rules?.rule(_value);
  }
}

export default memo(Field);
