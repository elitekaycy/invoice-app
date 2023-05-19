import React, { useContext } from 'react';
import './FormsUI.css';
import { ThemeContextDefault } from '../../context/ThemeContext';
import { type } from 'os';

// wrap represents whether the width should be fixed or not

interface TextFieldProps {
  label: string;
  value: string;
  error: boolean;
  wrap: boolean;
  type: string
  responsive: boolean; // represents whether the input should be responsive
  handleChange: (e: any) => void;
}

export const TextFieldDefault: React.FC<TextFieldProps> = ({
  label,
  value,
  error,
  handleChange,
  wrap,
  responsive,
  type
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
        onChange={(e) => {
          e.preventDefault;
          handleChange(e);
        }}
        className={`
        ${wrap && responsive
            ? 'text-field-wrap-responsive'
            : wrap && !responsive
              ? 'text-field-wrap'
              : responsive && !wrap
                ? 'text-field-responsive'
                : 'text-field-responsive'
          }
        text-field ${theme?.theme === 'light'
            ? error
              ? 'text-field-error-light'
              : 'text-field-light'
            : !error
              ? 'text-field-dark'
              : 'text-field-error-dark'
          }`}
        name={label}
        id={label}
        type={type}
      />
    </div>
  );
};
