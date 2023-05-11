import React, { useState, useRef, useContext } from 'react';
import './FormsUI.css';
import dateImg from '../../assets/icon-calendar.svg';
import { ThemeContextDefault } from '../../context/ThemeContext';

type DatePickerProps = {
  label: string;
  value: Date,
  onChange: (e: any) => void;
};

const Datepicker: React.FC<DatePickerProps> = ({
  label,
  value,
  onChange,
}: DatePickerProps): JSX.Element => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const inputRef = useRef<HTMLInputElement>(null);
  const theme = useContext(ThemeContextDefault);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(new Date(event.target.value));
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
        className={`input-date-picker ${theme?.theme === 'light' ? 'input-light' : 'text-field-dark'
          }`}
        type="date"
        value={value.toISOString().slice(0, 10) || (new Date()).toDateString().slice(0, 10)}
        onChange={(e) => onChange(e)}
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
