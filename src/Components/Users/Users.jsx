import React from 'react';
import userData from '../../../mockSearch.json'
import UserCard from '../UserCard/UserCard';
import './Users.css';

function Users() {
  // const [allUsers, setAllUsers] = useState([])
  const [searchUser, setSearchUser] = useState('')

  const filterUsers = userData.data.filter(user => 
    user.attributes.username.toLowerCase().includes(searchUser)
  )


  return (
    <div>
      <h2>Users</h2>
      <input 
        type="text"
        placeholder='Search User...'
        value={searchUser}
        onChange={(e)=> setSearchUser(e.target.value)}
        />
        <div>
          {filterUsers.map(user => (
            <UserCard 
              key={user.id}
              user={user}
            />
          ))}
        </div>
    </div>
  )
}

export default Users;