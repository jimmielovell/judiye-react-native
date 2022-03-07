import {
  LayoutChangeEvent,
  NativeSyntheticEvent,
  NativeTouchEvent,
  StyleProp,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {ValidationError} from './component/errors';
import {ButtonProps} from 'components/buttons/types';

export interface LabelRefHandle {
  isErrored: (errored: boolean) => void;
}
export interface LabelProps {
  label: string;
  style?: StyleProp<TextStyle>;
}

export interface ErrorRefHandle {
  addError: (error: ValidationError) => void;
  removeError: () => void;
}
export interface ErrorProps {
  message: string;
}

export interface PrePostfixProps extends ButtonProps {
  ref?: React.RefObject<View>;
  text?: string;
  onPress?: (e?: NativeSyntheticEvent<NativeTouchEvent>) => void;
  onLayout?: (e: LayoutChangeEvent) => void;
}

interface FieldRules {
  numeric?: boolean;
  alpha?: boolean;
  required?: boolean;
  min?: string | number;
  max?: string | number;
  lessThan?: string | number;
  moreThan?: string | number;
  regex?: RegExp;
}

interface FieldMasks {
  cast?: 'string' | 'number';
  numOnly?: boolean;
  alphaOnly?: boolean;
  max?: string | number;
}

export interface FieldWithoutPrePostfixProps extends TextInputProps {
  label?: string;
  name?: string;
  contRef?: React.ForwardedRef<View>;
  contStyle?: StyleProp<ViewStyle>;
  masks?: FieldMasks;
}

export interface FieldProps
  extends TextInputProps,
    FieldWithoutPrePostfixProps {
  postfix?: PrePostfixProps;
  prefix?: PrePostfixProps;
}

export interface PasswordFieldProps extends FieldWithoutPrePostfixProps {
  newPassword?: boolean;
}

export interface PInFieldProps extends FieldWithoutPrePostfixProps {
  length?: number;
}

export interface SearchFieldProps extends FieldWithoutPrePostfixProps {
  minimized?: boolean;
  onSearch?: (value: string) => void;
}

export type ValidatableField<T> = T & {
  rules?: FieldRules;
  onValid?: (value: string | ValidationError) => void;
};

export type InputProps<T> = T & {
  contStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  hidden?: boolean;
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
  FieldWithoutPrePostfixProps & {
    type: 'search';
  }
>;
