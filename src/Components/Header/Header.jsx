import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

import chessLogo2 from '../../assets/chess-with-frienemies-2.svg';

import './Header.css';

function Header({ userLogOut, logedInUsername, userData }) {
    const [isOpen, setIsOpen] = useState(false);

    const userId = userData.id;

    const displayMenu = () => {
        setIsOpen(!isOpen)
    }


    // logedInUsername
    return (
        <header>
            <Link to='/:username/my_games/'>
                <img src={chessLogo2} alt='chess pieces' className='header-logo'/> 
            </Link>
            <h1 className='header-h1'><span className='header-chess-with'>Chess with </span><span className='header-frien-emies'>Frien-EMIES</span></h1>
            <div onClick={displayMenu} className='hamburger-menu'>
                {isOpen ? <FaTimes /> : <GiHamburgerMenu />}
            </div>
            <nav>
                <ul className={`header-link ${isOpen ? 'open' : ''}`}>
                    <li className='nav-link-a'><Link to='search/frien-emies' onClick={()=> setIsOpen(false)}>Users</Link></li>
                    <li className='nav-link-a'><Link to={`/${userId}/frien-emies`} onClick={()=> setIsOpen(false)}>Frien-EMIES</Link></li>
                    <li className='nav-link-a'><Link to='/gameId' onClick={()=> setIsOpen(false)}>Games</Link></li>
                    <li>
                        <button onClick={userLogOut}>Sign Out</button>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;