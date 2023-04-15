import './SideNav.css'
import logo from '../../assets/logo.svg'
import avatar from '../../assets/image-avatar.jpg'
import React from 'react'
import { DarkModeUI } from '../DarkModeUI/DarkModeUI'
import { useState, useEffect } from 'react'

export const SideNav = (): JSX.Element => {

    const [matches, setMatches] = useState<boolean>(window.matchMedia("(max-width: 768px)").matches)

    useEffect(() => {
        window
        .matchMedia("(max-width: 768px)")
        .addEventListener('change', e => setMatches( e.matches ));
    })

    return  (
        <div className={`${!matches ? 'sidebar' : 'navbar'}`}>
            <div className='logo-container'>
                 <img className='logo' src={logo} alt="invoice page logo"/>
                 <div className='logo-mirage'></div>
            </div>

            <div className="sidebar-bottom">
                <div className='sidebar-darkmode-container'>
                    <DarkModeUI />
                </div>
                <div className='sidebar-avatar'>
                    <img className='avatar' alt="invoice avatar" src={avatar}/>
                </div>
            </div>
        </div>
    )
}