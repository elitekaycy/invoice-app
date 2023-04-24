import React, { useContext, useState } from 'react';
import './FormsUI.css';
import arrowDown from '../../assets/icon-arrow-down.svg';
import { ThemeContextDefault } from '../../context/ThemeContext';

type DropdownOption = {
  label: string;
  value: number;
};

type DropdownProps = {
  label: string;
  onChange: (value: number) => void;
};

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  onChange,
}): JSX.Element => {
  const theme = useContext(ThemeContextDefault);

  const options: DropdownOption[] = [
    {
      label: 'Net 30 Days',
      value: 30,
    },
    {
      label: 'Net 1 Day',
      value: 1,
    },
    {
      label: 'Net 7 Days',
      value: 7,
    },
    {
      label: 'Net 14 Days',
      value: 14,
    },
  ];
  const [selectedOption, setSelectedOption] = useState(options[0].value);

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = Number(e.target.value);
    setSelectedOption(selectedValue);
    onChange(selectedValue);
  };

  return (
    <div className="flex dropdown-container">
      <label className={'invoice-body-1 label'} htmlFor="dropdown">
        {label}
      </label>
      <br />
      <select
        className={`select invoice-h3-small ${
          theme?.theme === 'light' ? 'select-light' : 'select-dark'
        }`}
        value={selectedOption}
        onChange={handleOptionChange}
      >
        {options.map((option) => (
          <option
            className={`dropdown-option invoice-h3-small ${
              theme?.theme === 'light'
                ? 'dropdown-option-light'
                : 'dropdown-option-dark'
            }`}
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
