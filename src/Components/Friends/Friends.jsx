import React from 'react';
import UserCard from '../UserCard/UserCard';
import searchIcon from '../../assets/search_icon.png';
import RemoveFriendPopUp from '../RemoveFriendPopUp/RemoveFriendPopUp';
import StartGamePopUp from '../StartGamePopUp/StartGamePopUp';
import { useState } from 'react';
import './Friends.css';

function Friends({ isFriends, removeFriend}) {

    const [searchFriend, setSearchFriend] = useState('')
    // const [alert, setAlert] = useState([])

    const filterFriend = isFriends.filter(friend =>
        friend.attributes.username.toLowerCase().includes(searchFriend.toLowerCase())
    )

    const friendList = isFriends.map(friend => (
        <UserCard
            user={friend}
            removeFriend={removeFriend}
            isFriend={true} 
            username={friend.attributes.username}
        />
    ))

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
                value={searchFriend}
                onChange={(e) => setSearchFriend(e.target.value)}
            />
            <div>
                {filterFriend.length === 0 ? (
                    <p>You need more frien-emimes</p>
                ):(
                    <div>
                        {friendList}
                    </div>
                )}
            </div>
            {/* <ul>
                {filterFriend.length > 0 ? (
                filterFriend.map(friend => (
                    <li key={friend.id}>
                        <UserCard
                            user={friend}
                            removeFriend={removeFriend}
                            isFriend={true} 
                            username={friend.attributes.username}
                        />
                    </li>
                ))
            ) : (
                <li>No friends found.</li>
            )}
            </ul> */}
        </section>
    )
}

export default Friends;