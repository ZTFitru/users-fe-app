import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

// import userData from '../../../mockSearch.json';
import { postAddFriend } from "../../../apiCalls";
import UserCard from "../UserCard/UserCard";
import "./Users.css";
// import { getUsersIndex } from '../../../apiCalls.jsx'




function Users({ users, isFriends, setIsFriends, userData, userId, friendsList }) {
  // console.log('-----> ', users)
  const [searchUser, setSearchUser] = useState("");
  const [alert, setAlert] = useState([]);
  // console.log(userId)
  // handleUserLogin={handleUserLogin}

  /**
     const addFriendWithPost = async (friendId) => {
  try {
    const newFriend = await postAddFriend(userId, friendId);
    setFriendsList([...friendsList, newFriend]);

  } catch (err) {
    console.error('Error adding friend:', err);
  }
};
   */



  const filterUsers = users.filter((user) =>
    user.attributes.username.toLowerCase().includes(searchUser.toLowerCase())
  );

  

  // const addFriend = async (friendId) => {
  //   try {
  //     const newFriend = await postAddFriend(userId, friendId);
  //     console.log(newFriend);
  //     setIsFriends((justFriends) => {
  //       if (!justFriends.some((friend) => friend.id === user.id)) {
  //         setAlert((message) => [
  //           ...message,
  //           `${newFriend.attributes.username} has been added as a frien-emimes`,
  //         ]);
  //         setTimeout(
  //           () =>
  //             setAlert((previous) =>
  //               previous.filter(
  //                 (message) =>
  //                   message !==
  //                   `${users.attributes.username} has been added as a frien-emimes`
  //               )
  //             ),
  //           2000
  //         );
  //         return [...justFriends, newFriend];
  //       } else {
  //         setAlert((message) => [
  //           ...message,
  //           `${newFriend.attributes.username} has already been added as a frien-emimes`,
  //         ]);
  //         setTimeout(
  //           () =>
  //             setAlert((previous) =>
  //               previous.filter(
  //                 (message) =>
  //                   message !==
  //                   `${users.attributes.username} has already been added as a frien-emimes`
  //               )
  //             ),
  //           2000
  //         );
  //         return justFriends;
  //       }
  //     });
  //   } catch (err) {
  //     console.log("Error adding friend: ", err);
  //   }
  // };
  
  const addFriend = async (friend ) => {
    console.log('Friend to add:', friend);
    console.log('userId:', userId);
    
    if (!friend || !friend.id) {
      console.error("Invalid friend data", friend);
      setAlert(prev => [...prev, "Friend data is invalid or missing."]);
      setTimeout(() => setAlert(prev => prev.filter(msg => msg !== "Friend data is invalid or missing.")), 2000);
      return;
    }
    
    try {
      const response = await postAddFriend(userId, friend.id);
      console.log('add a freind api ---->', response)
      // console.log('user id', userId) // this doesn't show up in the console
      console.log(`Sending POST request to add friend with userId: ${userId} and friendId: ${friend.id}`);
      if (response && response.success) {
          // use setIsFriends to update the state of friends list 
          //justFriends is then being passed as the previous state
          setIsFriends(justFriends => {
            //it sees if the user isalready in the list
              if (!justFriends.some(friend => friend.id === user.id)) {
                  const message = `${user.name} has been added as a frien-emime`;
                  setAlert(prev => [...prev, message]);
                  setTimeout(() => setAlert(prev => prev.filter(msg => msg !== message)), 2000);
                  return [...justFriends, user];
              } else {
                  const message = `${user.name} is already your friend.`;
                  setAlert(prev => [...prev, message]);
                  setTimeout(() => setAlert(prev => prev.filter(msg => msg !== message)), 2000);
                  //if  the user is already a friend then it returns the list
                  return justFriends; 
              }
          });
      } else {
          const errorMessage = `Error adding friend: ${response.message || 'Unknown error'}`;
          setAlert(prev => [...prev, errorMessage]);
          setTimeout(() => setAlert(prev => prev.filter(msg => msg !== errorMessage)), 2000);
      }
  } catch (error) {
      console.error("Error adding friend:", error);
      // setAlert(prev => [...prev, "An error occurred while adding the friend."]);
      setAlert(prev => [...prev, "Already a friend."]);
      // setTimeout(() => setAlert(prev => prev.filter(msg => msg !== "An error occurred while adding the friend.")), 2000);
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
        console.log('Please add me:', user)
        addFriend(user)
      }}
      // onAddFriend={() => addFriend(user)} // issue here maybe?
    />
  ));

  // console.log(userCards)

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
}

export default Users;
