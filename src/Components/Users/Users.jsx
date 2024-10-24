import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

// import userData from '../../../mockSearch.json';
// import searchIcon from '../../assets/search_icon.png';
import { postAddFriend } from "../../../apiCalls";
import UserCard from "../UserCard/UserCard";
import "./Users.css";
// import { getUsersIndex } from '../../../apiCalls.jsx'

function Users({ users, isFriends, setIsFriends, userData, userId, handleUserLogin }) {
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

  
  const addFriend = async (user) => {
         try {
          const response = await postAddFriend(userId, user.id); 
          console.log('add my friend --->',response.data)
          if (response.success) {
            // use setIsFriends to update the state of friends list 
            //justFriends is then being passed as the previous state
            setIsFriends(justFriends => {
              //it sees if the user isalready in the list
              if (!justFriends.some(friend => friend.id === user.id)) {
                setAlert(prev => [...prev, `${user.name} has been added as a frien-emime`]);
                setTimeout(() => setAlert(prev => prev.filter(message => message !== `${user.name} has been added as a frien-emime`)), 2000);
                //updates the list with the new user or friend added to the list 
                return [...justFriends, user];
              } else {
                setAlert(prev => [...prev, `${user.name} is already your friend.`]);
                 setTimeout(() => setAlert(prev => prev.filter(message => message !== `${user.name} has been added as a frien-emime`)), 2000);
                 //if  the user is already a friend then it returns the list
                 return justFriends; 
              }
             });
          } else {
            setAlert(prev => [...prev, `Error adding friend: ${response.message}`]);
            setTimeout(() => setAlert(prev => prev.filter(message => message !== `Error adding friend: ${response.message}`)), 2000);
           }
        } catch (error) {
          console.error("Error adding friend:", error);
           setAlert(prev => [...prev, "An error occurred while adding the friend."]);
          setTimeout(() => setAlert(prev => prev.filter(message => message !== "An error occurred while adding the frien-emimes")), 2000);
        }
     };

  const userCards = filterUsers.map((user) => (
    <UserCard
      key={user.id}
      id={user.id}
      user={user}
      username={user.attributes.username}
      avatar={user.attributes.avatar}
      onAddFriend={() => addFriend(user)} // issue here maybe?
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
