import {RefObject} from 'react';
import {
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {ValidationError} from './component/errors';
import {AnchorProps} from 'components/buttons/types';
import {FViewProps} from 'components/layout/types';

export interface LabelHandle {
  isErrored(errored: boolean): void;
}
export interface LabelProps {
  label: string;
  style?: StyleProp<TextStyle>;
}

export interface ErrorHandle {
  addError(error: ValidationError): void;
  removeError(): void;
}
export interface ErrorProps {
  message: string;
}

export type TextInputHandle = TextInput & ErrorHandle;

interface FieldMasks {
  cast?: 'string' | 'number';
  numOnly?: boolean;
  alphaOnly?: boolean;
  max?: string | number;
}

export interface FieldWithoutPrePostfixProps extends TextInputProps {
  label?: string;
  name?: string;
  contRef?: RefObject<View>;
  contStyle?: StyleProp<ViewStyle>;
  masks?: FieldMasks;
}

export interface FieldProps
  extends TextInputProps,
    FieldWithoutPrePostfixProps {
  postfix?: AnchorProps;
  prefix?: AnchorProps;
}

export interface PasswordFieldProps extends FieldWithoutPrePostfixProps {
  newPassword?: boolean;
}

export interface PinFieldProps extends FieldWithoutPrePostfixProps {
  length?: number;
}

export interface PhoneFieldProps extends FieldWithoutPrePostfixProps {
  prefix?: AnchorProps;
}

export interface SearchFieldProps extends FieldWithoutPrePostfixProps {
  minimized?: boolean;
  onSearch?: (value: string) => void;
}

interface RegexInputRule {
  value: RegExp;
  message: string;
}
export interface InputRules {
  required?: {
    value: boolean;
    message: string;
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
}

export type ValidatableField<T> = T & {
  rules?: InputRules;
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

export interface ToggleButtonHandle {
  __setActive: () => void;
  __setInactive: () => void;
}
export interface ToggleButtonsProps extends FViewProps {
  onValueChange?(index: number): void;
}
