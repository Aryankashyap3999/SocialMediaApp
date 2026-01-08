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
  (
    {
      label,
      error,
      hint,
      required = false,
      disabled = false,
      ...inputProps
    },
    ref
  ) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="block">
            <Text variant="small" weight="medium">
              {label}
              {required && <span className="text-error ml-1">*</span>}
            </Text>
          </label>
        )}
        
        <Input
          ref={ref}
          disabled={disabled}
          error={error}
          {...inputProps}
        />
        
        {error ? (
          <Text variant="tiny" color="error">
            {error}
          </Text>
        ) : hint ? (
          <Text variant="tiny" color="muted">
            {hint}
          </Text>
        ) : null}
      </div>
    );
  }
);

InputField.displayName = 'InputField';

export { InputField };
export type { InputFieldProps };
