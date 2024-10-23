import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { getGamesIndex } from '../../../apiCalls';
import MyGameCard from '../MyGameCard/MyGameCard';
import GameplayPopUp from '../GameplayPopUp/GameplayPopUp';
import './MyGames.css';

function MyGames({isLogedIn}) {
  // console.log('------> ',myGames)
  const [myGames, setMyGames] = useState([]);
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if(isLogedIn && userId) {
      const fetchGamesIndex = async () => {
        try {
          // const userId = 1
          const userGamesData = await getGamesIndex(userId);

console.log('API Response:', userGamesData)

          setMyGames(userGamesData.data)

console.log(userGamesData.data)

      } catch (err) {
        console.error('Error fetching user data:', err);
        // navigate(`/error/${err.status || 500}`, {
        //   state: { message: err.message || 'An unexpected error occurred.' }
        // })
      }
    }
    fetchGamesIndex()
    } 
  }, [isLogedIn, userId, navigate])


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
    </section>
  )
}

export default MyGames;