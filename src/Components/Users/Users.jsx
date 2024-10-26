import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { postAddFriend } from "../../../apiCalls";
import UserCard from "../UserCard/UserCard";
import "./Users.css";

function Users({ userData, users, setIsFriends}) {
  
  const [searchUser, setSearchUser] = useState("");
  const [alert, setAlert] = useState([]);
  const userId = userData.id

  const filterUsers = users.filter((user) =>
    user.attributes.username.toLowerCase().includes(searchUser.toLowerCase())
  );
  
  const addFriend = async (friend ) => {
    if (!friend || !friend.id) {
      console.error("Invalid friend data", friend);
      setAlert(prev => [...prev, "Friend data is invalid or missing."]);
      setTimeout(() => setAlert(prev => prev.filter(msg => msg !== "Friend data is invalid or missing.")), 2000);
    }
    
    try {
      const response = await postAddFriend(userId, friend.id);
      if (response && response.success) {
          setIsFriends(justFriends => {
              if (!justFriends.some(aFriend => aFriend.id === friend.id)) {
                  const message = `${friend.name} has been added as a frien-emime`;
                  setAlert(prev => [...prev, message]);
                  setTimeout(() => setAlert(prev => prev.filter(msg => msg !== message)), 2000);
                  return [...justFriends, friend];
              } else {
                  const message = `${friend.name} is already your friend.`;
                  setAlert(prev => [...prev, message]);
                  setTimeout(() => setAlert(prev => prev.filter(msg => msg !== message)), 2000);
                  return justFriends; 
              }
          });
      } else {
          const errorMessage = `Friend added.`;
          setAlert(prev => [...prev, errorMessage]);
          setTimeout(() => setAlert(prev => prev.filter(msg => msg !== errorMessage)), 2000);
      }
  } catch (error) {
      console.error("Error adding friend:", error);
      setAlert(prev => [...prev, "Already a friend."]);
      setTimeout(() => setAlert(prev => prev.filter(msg => msg !== "Already a friend.")), 2000);
  }
};

  const userCards = filterUsers.map((user) => (
    <UserCard
      key={user.id}
      id={user.id}
      user={user}
      username={user.attributes.username}
      avatar={user.attributes.avatar}
      onAddFriend={()=> {
        addFriend(user)
      }}
    />
  ));

  return (
    <section className="users-section">
      <h2 className="users-h2">Search New Frien-EMIES</h2>
      <p className="users-instructions">Click the + to add a friend</p>
      <div className="search-users-wrapper">
        <FontAwesomeIcon icon={faSearch} className="users-search-icon" />
        <input
          className="search-users-input"
          type="text"
          placeholder="Search new frien-EMIES..."
          name="search-new-frien-emies"
          spellCheck="true"
          autoCorrect="on"
          value={searchUser}
          onChange={(e) => setSearchUser(e.target.value)}
        />
      </div>
      {alert.map((message, index) => (
        <div key={index}>{message}</div>
      ))}
      <div className="user-cards-container">{userCards}</div>
    </section>
  );
};

export default Users;
