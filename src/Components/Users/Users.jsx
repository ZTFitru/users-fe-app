import React from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

// import userData from '../../../mockSearch.json';
// import searchIcon from '../../assets/search_icon.png';
import UserCard from '../UserCard/UserCard';
import './Users.css';
// import { getUsersIndex } from '../../../apiCalls.jsx'

function Users({ users, isFriends, setIsFriends }) {
  // console.log('-----> ', users)
  const [searchUser, setSearchUser] = useState('')
  const [alert, setAlert] = useState([])

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
  const addFriend = (user)=> {
    setIsFriends(justFriends => {
      if(!justFriends.some(friend => friend.id === user.id)) {
        setAlert(message => [...message, `${user.attributes.username} has been added as a frien-emimes`])
        setTimeout(() => setAlert(previous => previous.filter(message => message !== `${user.attributes.username} has been added as a frien-emimes`)), 2000);
        return [...justFriends, user]
      } else {
        setAlert(message => [...message, `${user.attributes.username} has already been added as a frien-emimes`])
        setTimeout(() => setAlert(previous => previous.filter(message => message !== `${user.attributes.username} has already been added as a frien-emimes`)), 2000);
        return justFriends
      }
    })
  }


  const userCards = filterUsers.map(user => (
    <UserCard
      key={user.id}
      id={user.id}
      user={user}
      username={user.attributes.username}
      avitar={user.attributes.avatar}
      onAddFriend={()=> addFriend(user)}
    />
  ))

  return (
    <section className='users-section'>
      <h2 className='users-h2'>Search New Frien-EMIES</h2>
      <p className='users-instructions'>Click the + to add a friend</p>
      <div className='search-users-wrapper'>
        <FontAwesomeIcon icon={faSearch} className="users-search-icon" />
        <input
          className='search-users-input'
          type="text"
          placeholder='Search new frien-EMIES...'
          name="search-new-frien-emies"
          spellCheck="true"
          autoCorrect="on"
          value={searchUser}
          onChange={(e) => setSearchUser(e.target.value)}
        />
      </div>
      {alert.map((message, index)=> (
        <div key={index}>{message}</div>
      ))}
      <div className='user-cards-container'>
        {userCards}
      </div>
    </section>
  )
}

export default Users;