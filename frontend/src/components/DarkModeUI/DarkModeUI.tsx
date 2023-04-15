import moon from '../../assets/icon-moon.svg'
// import sun from '../../assets/icon-sun.svg'
import './DarkModeUI.css'
import React from 'react'

export const DarkModeUI = () : JSX.Element => {
    return (
      <img className='dark-mode-img' src={moon} alt="light or dark mode" />
    )
}