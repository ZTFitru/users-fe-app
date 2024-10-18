import React from 'react';
import userData from '../../../mockSearch.json'
import UserCard from '../UserCard/UserCard';
import './Users.css';

function Users() {
  // const [searchUser, setSearchUser] = useState('')

  // const filterUsers = userData.data.filter(user => 
  //   user.attributes.username.toLowerCase().includes(searchUser.toLowerCase())
  // )

  const myData = userData.data
  console.log(myData)

  // const filterUsers = myData.filter(user => 
  //   user.attributes.username.toLowerCase().includes(searchUser.toLowerCase())
  // )

  return (
    <div>
      <h2>Search New Frien-EMIES</h2>
      {/* <input 
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
              avitar={user.avitar}
            />
          ))}
        </div> */}
        {myData.map((user, index) => {
          return (
            <div key={index}>
              <p>{user.attributes.username}</p>
            </div>
          )
        })}
    </div>
  )
}

export default Users;