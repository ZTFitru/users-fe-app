import React from 'react';
import { Link } from 'react-router-dom';

import knightIcon from '../../assets/knight.png';
import peopleIcon from '../../assets/user-account.png';
import statIcon from '../../assets/trophy.png';
import './Footer.css';

function Footer() {
    return (
        <footer>
            <div>
                <ul>
                    <li>
                        <Link>
                            <img src={knightIcon} alt="see My Games" className='footer-icons' />
                            Games
                        </Link>
                    </li>
                    <li>
                        <Link>
                            <img src={peopleIcon} alt="see my Frien-emies list" />
                            Frien-EMIES
                        </Link>
                    </li>
                    <li>
                        <Link>
                            <img src={statIcon} alt="see my game statistics" />
                            Statistics
                        </Link>
                    </li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer;