import { ThemeContextDefault } from '../../context/ThemeContext';
import './Filter.css'
import React, { useState, useContext, useRef, useEffect } from 'react'
import arrowDown from '../../assets/icon-arrow-down.svg'

interface filterKeywordType {
    filteredKeywords: String[],
    setFilteredKeywords: React.Dispatch<React.SetStateAction<String[]>>
}


export const Filter: React.FC<filterKeywordType> = ({
    filteredKeywords,
    setFilteredKeywords
}): JSX.Element => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const theme = useContext(ThemeContextDefault)
    const dropdownRef = useRef<HTMLDivElement>(null);


    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        window.addEventListener("click", handleOutsideClick);

        return () => {
            window.removeEventListener("click", handleOutsideClick);
        };
    }, [dropdownRef]);


    //ASSIGN A CHECK BOX FILTER OPTION
    const checkAssignFilter = (itemName: string) => {
        if (filteredKeywords.includes(itemName)) {
            setFilteredKeywords(filteredKeywords.filter(keyword => keyword !== itemName))
        } else {
            setFilteredKeywords([...filteredKeywords, String(itemName)])
        }
    }

    const DropdownItem = ({ itemName }: { itemName: string }) => {
        return (
            <div
                onClick={() => checkAssignFilter(itemName)}
                className="dropdown-item">
                <input
                    checked={filteredKeywords.includes(itemName)}
                    onChange={() => checkAssignFilter(itemName)}
                    className='drop-check' type='checkbox' name={String(itemName)} />
                <span className={`invoice-h3-small ${theme?.theme === 'light' ? 'text-light' : 'text-dark'}`}>
                    {itemName}
                </span>
            </div>
        )
    }

    return (
        <div className={`dropdown ${isOpen ? "show" : ""}`} ref={dropdownRef}>
            <div className="dropdown-toggle" onClick={toggleDropdown}>
                <span className={`invoice-h3-small filter-title ${theme?.theme === 'light' ? 'text-light' : 'text-dark'}`}>

                </span>
                <span>
                    <img className={`${isOpen ? 'rotate-down' : ''}`} alt='arrowupordown' src={arrowDown} />
                </span>
            </div>
            <div className={`dropdown-menu ${theme?.theme === 'light' ? 'dropdown-menu-light' : 'dropdown-menu-dark'}`}>
                <DropdownItem itemName='Draft' />
                <DropdownItem itemName='Pending' />
                <DropdownItem itemName='Paid' />
            </div>
        </div>
    );
}