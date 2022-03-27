import {
  forwardRef,
  useImperativeHandle,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import {Text, TextInput, TextStyle, ViewStyle} from 'react-native';
import {FView} from '../../layout';
import {
  ErrorRefHandle,
  LabelProps,
  LabelRefHandle,
  PasswordInputProps,
  PlainInputProps,
  SearchInputProps,
} from '../types';
import {
  DateField,
  EmailField,
  MultilineField,
  Field,
  NameField,
  NumberField,
  PasswordField,
  PhoneField,
  PinField,
  SearchField,
} from './fields';
import {ValidationError} from './errors';
import {useForwardedRef, useStyles, useTheme} from 'hooks';
import wrapper from 'hoc/wrapper';
import {PText, TextError} from 'components/typography';

const Label = wrapper(
  forwardRef<LabelRefHandle, LabelProps>(({label, style}: LabelProps, ref) => {
    const innerRef = useForwardedRef(ref);
    const textRef = useRef<Text>(null);

    const {colors, spacing, fonts} = useTheme();
    const compStyles = useStyles({
      color: colors.inputLabelText,
      marginBottom: spacing.inputLabelMarginBottom,
      marginLeft: spacing.inputLabelMarginLeft,
      lineHeight: fonts.inputLabelSize,
    });

    const isErrored = useCallback(
      (errored: boolean) => {
        if (textRef.current) {
          textRef.current.setNativeProps({
            style: {
              color: errored ? colors.inputLabelErrored : colors.inputLabelText,
            },
          });
        }
      },
      [textRef, colors.inputLabelErrored, colors.inputLabelText],
    );
    useImperativeHandle(innerRef, () => ({isErrored}));

    return (
      <PText
        ref={textRef}
        size={fonts.inputLabelSize}
        style={[compStyles, style]}>
        {label}
      </PText>
    );
  }),
);

const Error = wrapper(
  forwardRef<ErrorRefHandle>((_, ref) => {
    const [value, setValue] = useState<string | null>(null);
    const innerRef = useForwardedRef(ref);
    const textRef = useRef<Text>(null);

    const {colors, spacing, fonts} = useTheme();
    const compStyles = useStyles<TextStyle>({
      color: colors.inputErrorText,
      backgroundColor: colors.inputErrorContainer,
      paddingHorizontal: spacing.inputErrorPaddingHorizontal,
      position: 'absolute',
      left: spacing.inputErrorLeft,
      top: spacing.inputErrorTop,
      display: 'none',
      lineHeight: fonts.inputErrorSize,
    });

    const addError = useCallback(
      (error: ValidationError) => {
        if (textRef.current) {
          if (value === null) {
            textRef.current.setNativeProps({
              style: {display: 'flex'},
            });
          }
          setValue(error.message);
        }
      },
      [textRef, value],
    );
    const removeError = useCallback(() => {
      if (value !== null && textRef.current) {
        textRef.current?.setNativeProps({style: {display: 'none'}});
        setValue(null);
      }
    }, [value]);
    useImperativeHandle(innerRef, () => ({addError, removeError}));

    return (
      <TextError ref={textRef} size={fonts.inputErrorSize} style={compStyles}>
        {value}
      </TextError>
    );
  }),
);

const Input = wrapper(
  ({
    hidden,
    label,
    type = 'text',
    ...props
  }: PlainInputProps | PasswordInputProps | SearchInputProps) => {
    // @ts-ignore
    const {onValid, ...rest} = props;
    const {colors, spacing} = useTheme();
    const inputRef = useRef<TextInput>(null);
    const errorRef = useRef<ErrorRefHandle>(null);
    const labelRef = useRef<LabelRefHandle>(null);

    const handleOnValid = useCallback(
      (message: string | ValidationError) => {
        const isValid = typeof message === 'string';
        if (inputRef.current) {
          inputRef.current.setNativeProps({
            borderColor: isValid
              ? colors.inputOutline
              : colors.inputOutlineErrored,
          });
        }
        if (errorRef.current) {
          if (isValid) {
            errorRef.current.removeError();
          } else {
            errorRef.current.addError(message);
          }
        }
        if (labelRef.current) {
          labelRef.current.isErrored(!isValid);
        }
        onValid(message);
      },
      [
        colors.inputOutline,
        colors.inputOutlineErrored,
        errorRef,
        inputRef,
        labelRef,
        onValid,
      ],
    );

    const compStyles = useStyles<ViewStyle>({
      marginBottom: spacing.inputMarginBottom,
      position: 'relative',
      display: hidden ? 'none' : 'flex',
    });

    const TextField = useMemo(() => {
      switch (type) {
        case 'date':
          return DateField;
        case 'email':
          return EmailField;
        case 'multiline':
          return MultilineField;
        case 'name':
          return NameField;
        case 'number':
          return NumberField;
        case 'password':
          return PasswordField;
        case 'phone':
          return PhoneField;
        case 'pin':
          return PinField;
        case 'search':
          return SearchField;
        default:
          return Field;
      }
    }, [type]);

    return (
      <FView align="flex-start" style={compStyles}>
        {label && <Label ref={labelRef} label={label} />}
        <FView>
          <TextField
            ref={inputRef}
            {...rest}
            onValid={onValid ? handleOnValid : undefined}
          />
          {<Error ref={errorRef} />}
        </FView>
      </FView>
    );
  },
);

export default Input;
