import React, { useState } from 'react';
import GameplayPopUp from '../GameplayPopUp/GameplayPopUp';
import defaultChessImage from '../../assets/chess-with-frienemies-1.svg';
import './MyGameCard.css';

function MyGameCard({ gameId, gameImage, onImageClick }) {
  const [selectedGame, setSelectedGame] = useState(null)

  const gameSlected = (gameId) => {
    setSelectedGame(gameId)
  }

  const closePopUp = () => {
    setSelectedGame(null)
  }
  return (
    <div id={gameId} className='my-games-card-wrapper'>
      <img src={gameImage || defaultChessImage} 
        onClick={gameSlected}      
        alt={gameId}
        onError={event => {
          event.target.src = avatarPlaceholder
          event.onerror = null
        }}
      />{selectedGame && (
          <GameplayPopUp 
          gameId={selectedGame}
          onClose={closePopUp}
        />
      )}
      <h3>{gameId}: game with...</h3> 
    </div>
  )
}

export default MyGameCard;