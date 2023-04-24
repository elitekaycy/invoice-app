import React, { useState, useRef, useContext } from 'react';
import './FormsUI.css';
import dateImg from '../../assets/icon-calendar.svg';
import { ThemeContextDefault } from '../../context/ThemeContext';

type DatePickerProps = {
  label: string;
  onChange: (e: any) => void;
};

const Datepicker: React.FC<DatePickerProps> = ({
  label,
  onChange,
}: DatePickerProps): JSX.Element => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toDateString()
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const theme = useContext(ThemeContextDefault);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  function handleDivClick() {
    inputRef.current?.click();
  }

  return (
    <div className="flex">
      <label className={'invoice-body-1 label'} htmlFor="dropdown">
        {label}
      </label>
      <br />
      <input
        ref={inputRef}
        className={`input-date-picker ${
          theme?.theme === 'light' ? 'input-light' : 'text-field-dark'
        }`}
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        min="2021-01-01"
        max="2023-12-31"
      />
      {/* <div className={`input-date-picker ${theme?.theme === 'light' ? 'input-light': 'text-field-dark'}`} onClick={handleDivClick}>
         <span className={`invoice-h3-small ${theme?.theme === 'light' ?  'date-title-light' : 'date-title-dark'}`}>{selectedDate}</span>
         <span><img src={dateImg} alt="datepicker"/></span>     
       </div>       */}
    </div>
  );
};

export default Datepicker;
