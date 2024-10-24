import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useParams, useNavigate } from "react-router-dom";

import {
  getFriendsIndex,
  postAddFriend,
  deleteFriend,
} from "../../../apiCalls";
import UserCard from "../UserCard/UserCard";
import RemoveFriendPopUp from "../RemoveFriendPopUp/RemoveFriendPopUp";
import StartGamePopUp from "../StartGamePopUp/StartGamePopUp";
import "./Friends.css";

function Friends({ isFriends, userId }) {
  const [searchFriend, setSearchFriend] = useState("");
  const [friendsList, setFriendsList] = useState([]);
  const { logedInUsername } = useParams();
  // const { userId } = useParams();
  const navigate = useNavigate();
  //   console.log(logedInUsername)
  // const [alert, setAlert] = useState([])

  // useEffect(() => {
  //   const fetchFriends = async () => {
  //     try {
  //       const friendsData = await getFriendsIndex(userId);
  //       setFriendsList(friendsData);

  //       console.log("Friends DATA->>>>>", friendsData);
  //     } catch (err) {
  //       console.error("Error fetching friends data:", err);
  //       // navigate(`/error/${err.status || 500}`, {
  //       //   state: { message: err.message || "An unexpected error occurred." },
  //       // });
  //     }
  //   };
  //   fetchFriends();
  // }, [userId]);

  /* replaced by the function handleRemoveFriend
  const removeFriend = (user)=> {
    setIsFriends(allFriends => allFriends.filter(friend => friend.id !== user.id))
  }
const removeFriend = async (friendId) => {
  try {
    const resData = await deleteFriend(userId, friendId);
    setFriendsList(friendsList.filter(friend => friend.id !== friendId));

    console.log("Friend removed:", resData);
    
  } catch (err) {
    console.error('Error removing friend:', err);
  }
};
*/

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const friendsData = await getFriendsIndex(userId);
        setFriendsList(friendsData.data);
        console.log("Friends DATA->>>>>", friendsData);
      } catch (err) {
        console.error("Error fetching friends data:", err);
      }
    };
    fetchFriends();
  }, [userId, setFriendsList]);

  const handleRemoveFriend = async (friend) => {
    const friendId = friend.id;
    console.log(friendId);
    try {
      const resData = await deleteFriend(userId, friendId);
      console.log("Friend removed:", resData);

      setFriendsList(friendsList.filter((aFriend) => aFriend.id !== friendId));
    } catch (err) {
      console.error("Error removing friend:", err);
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
      id={friend.id}
      user={friend}
      removeFriend={handleRemoveFriend}
      isFriend={true}
      username={friend.attributes.username}
      avatar={friend.attributes.avatar}
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
