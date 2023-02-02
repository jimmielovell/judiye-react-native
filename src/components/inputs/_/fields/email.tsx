import {forwardRef} from 'react';
import {Email} from 'domains';
import Field, {FieldProps, InputHandle, ValidatableField} from './base';

const EmailField = forwardRef<InputHandle, ValidatableField<FieldProps>>(
  function EmailField({rules, ...rest}, ref) {
    return (
      <Field
        ref={ref}
        autoCorrect={false}
        autoComplete="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        rules={{
          rule: (value: string) => {
            return new Email(value);
          },
          ...rules,
        }}
        {...rest}
      />
    );
  },
);

export default EmailField;
