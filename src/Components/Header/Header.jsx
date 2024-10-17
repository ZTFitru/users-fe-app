import React, { useState } from 'react';
import { Link } from "react-router-dom";
import chessLogo2 from '../../assets/chess-with-frienemies-2.svg';
import { FaTimes } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";


import './Header.css';

function Header({ userLogOut }) {
    const [isOpen, setIsOpen] = useState(false);

    const displayMenu = () => {
        setIsOpen(!isOpen)
    }

    return (
        <header>
            <img src={chessLogo2} alt='chess pieces' className='header-logo'/>
            <h1 className='header-h1'><span className='header-chess-with'>Chess with </span><span className='header-frien-emies'>Frien-EMIMES</span></h1>
            <div onClick={displayMenu} className='hamburger-menu'>
                {isOpen ? <FaTimes /> : <GiHamburgerMenu />}
            </div>
            <nav>
                <ul className={`header-link ${isOpen ? 'open' : ''}`}>
                    <li><Link to='/users/:userId' onClick={()=> setIsOpen(false)}>Users</Link></li>
                    <li onClick={()=> setIsOpen(false)}>Frien-EMIES</li>
                    <li onClick={()=> setIsOpen(false)}>Games</li>
                    <li>
                        <button onClick={userLogOut}>Sign Out</button>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;