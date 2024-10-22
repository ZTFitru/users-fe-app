import React from 'react';

import searchIcon from '../../assets/search_icon.png';
import RemoveFriendPopUp from '../RemoveFriendPopUp/RemoveFriendPopUp';
import StartGamePopUp from '../StartGamePopUp/StartGamePopUp';
import './Friends.css';

function Friends() {
    return (
        <section>
            <h2>My Frien-EMIES</h2>
            <p>Click the - to remove a friend</p>
            <img src={searchIcon} alt="search magnifying glass" />
            <input
                type='search'
                placeholder='search'
                name='search-frien-emies'
                spellCheck='true'
                autoCorrect='on'
                onChange={(e) => handleSearch(e.target.value)}
            />
            <div>
                {/* user cards here, 
                user card state needs to live on app 
                to be passed to users and friends */}
            </div>
        </section>
    )
}

export default Friends;