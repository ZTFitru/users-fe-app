import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useParams, useNavigate } from "react-router-dom";

import { getFriendsIndex, deleteFriend, postStartGame } from "../../../apiCalls";
import UserCard from "../UserCard/UserCard";
import "./Friends.css";

function Friends({ userData }) {
  
  const [searchFriend, setSearchFriend] = useState("");
  const [friendsList, setFriendsList] = useState([]);
  const [startNewGame, setStartNewGame] = useState([]);
  const { loggedInUsername } = useParams();
  const navigate = useNavigate();

  const userId = userData.id;

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const friendsData = await getFriendsIndex(userId);
        setFriendsList(friendsData.data);
      } catch (err) {
      }
    };
    fetchFriends();
  }, [userId, setFriendsList]);

  const handleRemoveFriend = async (friendId) => {
    try {
      const resData = await deleteFriend(userId, friendId);
      setFriendsList(friendsList.filter((aFriend) => aFriend.id !== friendId));
    } catch (err) {
      console.error("Error removing friend:", err);
    }
  };

  const handleStartNewGame = async (friendId, friendName) => {
    console.log('friend id and friend name', friendId, friendName)
    try {
      const resData = await postStartGame(userId, friendId, userData.username, friendName)
      console.log('resdata in friends ---->', resData.data)
      setStartNewGame(resData.data)
      navigate(`../../${resData.data.game_id}`)
    } catch (err) {
      console.error("Error starting a game", err)
    }
  };
  
  const filterFriend = friendsList.filter((friend) =>
    friend.attributes.username
      .toLowerCase()
      .includes(searchFriend.toLowerCase())
  );

  const friendList = filterFriend.map((friend) => (
    <UserCard
      key={friend.id}
      friendId={friend.id}
      user={friend}
      isFriend={true}
      username={friend.attributes.username}
      avatar={friend.attributes.avatar}
      handleStartNewGame={handleStartNewGame}
      handleRemoveFriend={handleRemoveFriend}
    />
  ));

  return (
    <section className="friends-section">
      <h2 className="friends-h2">{loggedInUsername} Frien-EMIES</h2>
      <p className="friends-instructions">Click the - to remove a friend</p>
      <p className='challenge-to-game-instructions'>Select a frien-emie to challenge them to a game.</p>
      <div className="search-friends-wrapper">
        <FontAwesomeIcon icon={faSearch} className="friends-search-icon" />
        <input
          className="search-friends-input"
          type="search"
          placeholder="search frien-EMIES"
          name="search-frien-emies"
          spellCheck="true"
          autoCorrect="on"
          value={searchFriend}
          onChange={(e) => setSearchFriend(e.target.value)}
        />
      </div>
      <div>
        {filterFriend.length === 0 ? (
          <p>You need more frien-emimes</p>
        ) : (
          <div className="friends-list-container">{friendList}</div>
        )}
      </div>
    </section>
  );
}

export default Friends;
