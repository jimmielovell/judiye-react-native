import {forwardRef, useCallback, useMemo, useRef} from 'react';
import {TextStyle, ViewStyle, StyleProp} from 'react-native';
import {Flex} from '../../layout';
import {useTheme} from 'hooks';
import Label, {LabelHandle} from './label';
import Error, {ErrorHandle} from './error';
import DateField from './fields/date';
import EmailField from './fields/email';
import Field, {FieldProps, InputHandle, ValidatableField} from './fields/base';
import MultilineField from './fields/multiline';
import NameField from './fields/name';
import NumberField from './fields/number';
import PasswordField, {PasswordFieldProps} from './fields/password';
import PhoneField from './fields/phone';
import PinField from './fields/pin';
import SearchField, {SearchFieldProps} from './fields/search';
import {ValidationError} from 'domains';

export type InputProps<T> = T & {
  label?: string;
  name?: string;
  description?: string;
  contStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  hidden?: boolean;
  wrapperStyle?: StyleProp<ViewStyle>;
};

export type PlainInputProps = InputProps<
  ValidatableField<FieldProps> & {
    type?:
      | 'date'
      | 'email'
      | 'multiline'
      | 'name'
      | 'number'
      | 'pin'
      | 'phone'
      | 'text';
  }
>;

export type PasswordInputProps = InputProps<
  ValidatableField<PasswordFieldProps> & {
    type: 'password';
  }
>;

export type SearchInputProps = InputProps<
  SearchFieldProps & {
    type: 'search';
  }
>;

const Input = forwardRef<
  InputHandle,
  PlainInputProps | PasswordInputProps | SearchInputProps
>(function Input(
  {hidden, label, description, type = 'text', wrapperStyle, ...props},
  ref,
) {
  // @ts-ignore
  const {onValidate, ...rest} = props;
  const {spacing} = useTheme();
  const errorRef = useRef<ErrorHandle>(null);
  const labelRef = useRef<LabelHandle>(null);

  const _onValidate = useCallback(
    (message: string | ValidationError) => {
      const isValid = typeof message === 'string';
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
      onValidate?.(message);
    },
    [errorRef, labelRef, onValidate],
  );

  const _wrapperStyle: ViewStyle = {
    marginBottom: spacing.md,
    position: 'relative',
    display: hidden ? 'none' : 'flex',
  };

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
    <Flex align="flex-start" style={[_wrapperStyle, wrapperStyle]}>
      {label && (
        <Label ref={labelRef} label={label} description={description} />
      )}
      <Flex>
        <TextField ref={ref} {...rest} onValidate={_onValidate} />
        {<Error ref={errorRef} />}
      </Flex>
    </Flex>
  );
});

export default Input;
