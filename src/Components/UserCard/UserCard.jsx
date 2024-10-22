import React from 'react';

import './UserCard.css';

function UserCard({ avatar, id, username }) {
  return (
    <div id={id}>
      <img src={avatar} alt='' />
      <h3>{username}</h3>
    </div>
  )
}

export default UserCard;