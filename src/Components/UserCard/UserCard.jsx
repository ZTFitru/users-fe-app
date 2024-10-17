import React from 'react';

import './UserCard.css';

function UserCard({ user }) {
  return (
    <div>
      <img src={user.avatar} alt="" />
      <h2>{user.username}</h2>
    </div>
  )
}

export default UserCard;