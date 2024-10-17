import React, { useState } from 'react';

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
            <img src={chessLogo2} alt='chess pieces' />
            <h1><span>Chess with </span><span>Frien-EMIMES</span></h1>
            <div onClick={displayMenu}>
                {isOpen ? <FaTimes /> : <GiHamburgerMenu />}
            </div>
            <nav>
                <ul>
                    <li>
                        <button onClick={userLogOut}>Sign Out</button>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;