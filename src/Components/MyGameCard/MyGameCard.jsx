import React from 'react';

import defaultChessImage from '../../assets/chess-with-frienemies-1.svg';
import './MyGameCard.css';

function MyGameCard({ gameId, gameImage }) {
  return (
    <div id={gameId} className='my-games-card-wrapper'>
      <img src={gameImage || defaultChessImage} 
        alt={gameId}
        onError={event => {
          event.target.src = avatarPlaceholder
          event.onerror = null
        }}
      />
      <h3>{gameId}</h3> 
      {/* we need to write in game with a friends name, what does this look like on the BE? */}
    </div>
  )
}

export default MyGameCard;