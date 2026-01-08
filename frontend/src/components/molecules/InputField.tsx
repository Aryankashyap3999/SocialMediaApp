import React from 'react';
import { Input, type InputProps } from '@components/atoms';
import { Text } from '@components/atoms';

type InputFieldProps = InputProps & {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  disabled?: boolean;
}

/**
 * InputField Molecule
 * 
 * Combines: Label (Text) + Input (Input) + Error Message (Text) + Helper Text (Text)
 * Single responsibility: Provide complete form input with validation display
 * 
 * @example
 * <InputField label="Email" type="email" error="Invalid email" />
 * <InputField label="Password" type="password" hint="Min 8 characters" required />
 */
const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({  error, hint = false, disabled = false, ...inputProps }, ref) => {
    return (
      <div className="w-full flex flex-col ">
        
        <Input ref={ref} error={error} disabled={disabled} {...inputProps} />
        {!error && hint && (
          <Text className="mt-2 text-sm text-gray-500">{hint}</Text>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';

export { InputField };
export type { InputFieldProps };
