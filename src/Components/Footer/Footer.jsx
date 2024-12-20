import React from 'react';
import { Link } from 'react-router-dom';

import knightIcon from '../../assets/knight.png';
import peopleIcon from '../../assets/user-account.png';
import statIcon from '../../assets/trophy.png';
import './Footer.css';

function Footer({userData}) {

    const userId = userData.id

    return (
        <footer>
            <Link to={`/${userId}/my_games/`} className='footer-links'>
                <img src={knightIcon} alt="see My Games" className='footer-icons' />
                <div className='footer-label'>Games</div>
            </Link>
            <Link to={`/${userId}/frien-emies`} className='footer-links'>
                <img src={peopleIcon} alt="see my Frien-emies list" />
                <div className='footer-label'>Frien-EMIES</div>
            </Link>
            <Link to={`/${userId}/statistics`} className='footer-links'>
                <img src={statIcon} alt="see my game statistics" />
                <div className='footer-label'>Statistics</div>
            </Link>
        </footer>
    )
}

export default Footer;