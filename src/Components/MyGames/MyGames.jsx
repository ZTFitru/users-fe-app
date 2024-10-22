import React from 'react';

import MyGameCard from '../MyGameCard/MyGameCard';
import GameplayPopUp from '../GameplayPopUp/GameplayPopUp';
import './MyGames.css';

function MyGames({myGames}) {
  console.log('------> ',myGames)

const gamesList = myGames.map(game => (
  <MyGameCard 
    key={game.attributes.game_id}
    gameId={game.attributes.game_id}
    gameImage={game.attributes.avatar}
  />
));

  return (
    <section className='my-games-section'>
      <h2 className='my-games-h2'>My Games</h2>
      <div>{gamesList}</div>
      {/* <Popup trigger={<button> Trigger</button>} position="right center">
        <div>Popup content here !!</div>
      </Popup> */}
    </section>
  )
}

export default MyGames;