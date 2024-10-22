import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

// import searchIcon from "../../assets/search_icon.png";
import UserCard from "../UserCard/UserCard";
import RemoveFriendPopUp from "../RemoveFriendPopUp/RemoveFriendPopUp";
import StartGamePopUp from "../StartGamePopUp/StartGamePopUp";
import { useParams } from "react-router-dom";
import "./Friends.css";

function Friends({ isFriends, removeFriend }) {
  const [searchFriend, setSearchFriend] = useState("");
  const { logedInUsername } = useParams();
  //   console.log(logedInUsername)
  // const [alert, setAlert] = useState([])

  const filterFriend = isFriends.filter((friend) =>
    friend.attributes.username
      .toLowerCase()
      .includes(searchFriend.toLowerCase())
  );

  const friendList = isFriends.map((friend) => (
    <UserCard
      user={friend}
      removeFriend={removeFriend}
      isFriend={true}
      username={friend.attributes.username}
    />
  ));

  return (
    <section className="friends-section">
      <h2 className="friends-h2">{logedInUsername} Frien-EMIES</h2>
      <p className="friends-instructions">Click the - to remove a friend</p>
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
