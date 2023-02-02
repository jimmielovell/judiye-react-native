import {forwardRef} from 'react';
import Field, {FieldProps, InputHandle, ValidatableField} from './base';

const NumberField = forwardRef<InputHandle, ValidatableField<FieldProps>>(
  function NumberField({masks, ...rest}, ref) {
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
);

export default NumberField;
