import React, { useContext } from 'react'
import './FormsUI.css'
import { ThemeContextDefault } from '../../context/ThemeContext'

interface TextFieldProps {
    label: string,
    value: string,
    error: boolean,
    handleChange: (e: any) => void
}

export const TextFieldDefault: React.FC<TextFieldProps> = ({ label, value, handleChange }: TextFieldProps):JSX.Element => {

    const theme = useContext(ThemeContextDefault)

    return ( 
        <div className='text-field-container'>
            <label className='invoice-body-1 label' htmlFor={String(label)}>{label}</label>
            <br />
            <br />
            <input value={value}
            onChange={(e) => handleChange(e)}
            className={`text-field ${theme?.theme === 'light' ? 'text-field-light': 'text-field-dark'}`} name={label} id={label} type="text" required />
        </div>
    )
}