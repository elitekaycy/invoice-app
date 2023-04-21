import React, { useContext } from 'react';
import './FormsUI.css';
import { ThemeContextDefault } from '../../context/ThemeContext';

interface TextFieldProps {
  label: string;
  value: string;
  error: boolean;
  handleChange: (e: any) => void;
}

export const TextFieldDefault: React.FC<TextFieldProps> = ({
  label,
  value,
  error,
  handleChange,
}: TextFieldProps): JSX.Element => {
  const theme = useContext(ThemeContextDefault);

  return (
    <div className="text-field-container">
      <label className="invoice-body-1 label" htmlFor={String(label)}>
        <span className={`${error ? 'label-error' : ''}`}>{label}</span>
        <span className={`${error ? 'label-error' : 'unlabel-error'}`}>
          {'cant be empty'}
        </span>
      </label>
      <br />
      <input
        value={value}
        onChange={(e) => handleChange(e)}
        className={`text-field ${
          theme?.theme === 'light'
            ? error
              ? 'text-field-error-light'
              : 'text-field-light'
            : !error
            ? 'text-field-dark'
            : 'text-field-error-dark'
        }`}
        name={label}
        id={label}
        type="text"
      />
    </div>
  );
};
