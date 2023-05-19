import React, { useContext, useState, useEffect, useRef } from 'react';
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
  const [isOpen, setIsOpen] = useState<boolean>(true)

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
  const [selectLabel, setSelectedLabel] = useState(options[0].label)
  const dropdownSelectRef = useRef<HTMLDivElement>(null)

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = Number(e.target.value);
    setSelectedOption(selectedValue);
    onChange(selectedValue);
  };


  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownSelectRef.current && !dropdownSelectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [dropdownSelectRef]);

  return (
    <div className="flex dropdown-container">
      <label className={'invoice-body-1 label'} htmlFor="dropdown">
        {label}
      </label>
      <br />
      <div className={`dropdown-select ${isOpen ? "show" : ""}`} ref={dropdownSelectRef}>
        <div
          className={`select-drop invoice-h3-small ${theme?.theme === 'light' ? 'select-light' : 'select-dark'}`}
          onClick={() => { setIsOpen(!isOpen) }}
        >
          <span>{selectLabel}</span>
          <span><img src={arrowDown} alt="arrowdown" /></span>
        </div>
        {isOpen ? (
          <div className={`dropdown-menu-due ${theme?.theme === 'light' ? 'dropdown-menu-light' : 'dropdown-menu-dark'}`}>
            {options.length > 0 && options.map(option => (
              <div
                key={option?.value}
                onClick={() => {
                  setSelectedOption(option?.value)
                  setSelectedLabel(option?.label)
                  onChange(selectedOption)
                  setIsOpen(false)
                }}
                className={`invoice-h3-small dropdown-option ${theme?.theme === 'light' ? 'drop-light' : 'drop-dark'}`}>
                {option.label}
              </div>
            ))}
          </div>
        ) : ''}

      </div>
      {/* <select
        className={`select invoice-h3-small ${theme?.theme === 'light' ? 'select-light' : 'select-dark'
          }`}
        value={selectedOption}
        onChange={handleOptionChange}
      >
        {options.map((option) => (
          <option
            className={`dropdown-option invoice-h3-small ${theme?.theme === 'light'
              ? 'dropdown-option-light'
              : 'dropdown-option-dark'
              }`}
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select> */}
    </div>
  );
};
