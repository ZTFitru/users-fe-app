import React from 'react';
import { useState } from 'react';
// import userData from '../../../mockSearch.json';
import searchIcon from '../../assets/search_icon.png';
import UserCard from '../UserCard/UserCard';
import './Users.css';
// import { getUsersIndex } from '../../../apiCalls.jsx'

function Users({ users }) {
  console.log('-----> ', users)
  const [searchUser, setSearchUser] = useState('')





  const filterUsers = users.filter(user =>
    user.attributes.username.toLowerCase().includes(searchUser.toLowerCase())
  )

  // const myData = userData.data
  // console.log(myData)

  // const filterUsers = myData.filter(user => 
  //   user.attributes.username.toLowerCase().includes(searchUser.toLowerCase())
  // )

  // notfication if the user has been added to the friends list or not
  // const addFriend = ()=> {

  // }
  const userCards = filterUsers.map(user => (
    <UserCard
      key={user.id}
      id={user.id}
      user={user}
      username={user.attributes.username}
      avitar={user.attributes.avatar}
    />
  ))

  return (
    <div>
      <h2>Search New Frien-EMIES</h2>
      <p>Click the + to add a friend</p>
      <img src={searchIcon} alt="search magnifying glass" />
      <input
        type="text"
        placeholder='Search User...'
        value={searchUser}
        onChange={(e) => setSearchUser(e.target.value)}
      />
      <div>
        {userCards}
      </div>
      {/* {users.map((user, index) => {
          return (
            <div key={index}>
              <img src={user.attributes.avatar} alt="" />
              <p>{user.attributes.username}</p>
            </div>
          )
        })}  */}
    </div>
  )
}

export default Users;