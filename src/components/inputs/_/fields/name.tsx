import {forwardRef} from 'react';
import Field, {FieldProps, InputHandle, ValidatableField} from './base';

const NameField = forwardRef<InputHandle, ValidatableField<FieldProps>>(
  function NameField(props, ref) {
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
  },
);

export default NameField;
