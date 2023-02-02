import {forwardRef, useState} from 'react';
import Field, {FieldProps, InputHandle, ValidatableField} from './base';

export interface PasswordFieldProps extends FieldProps {
  newPassword?: boolean;
}

const PasswordField = forwardRef<
  InputHandle,
  ValidatableField<PasswordFieldProps>
>(function PasswordField({newPassword, postfix, ...rest}, ref) {
  const [textEntrySecured, setTextEntrySecured] = useState(true);

  return (
    <Field
      ref={ref}
      autoComplete="password"
      autoCorrect={false}
      textContentType={newPassword ? 'newPassword' : 'password'}
      secureTextEntry={textEntrySecured}
      {...rest}
      postfix={{
        ...postfix,
        appearance: 'icon',
        name: textEntrySecured ? 'EyeOff' : 'Eye',
        onPress: () => setTextEntrySecured(!textEntrySecured),
      }}
    />
  );
});

export default PasswordField;
