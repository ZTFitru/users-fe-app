import React from 'react';

import './UserCard.css';

function UserCard({ user }) {
  return (
    <div>
      <img src={user.avatar} alt="" />
      <h3>{user.username}</h3>
    </div>
  )
}

export default UserCard;