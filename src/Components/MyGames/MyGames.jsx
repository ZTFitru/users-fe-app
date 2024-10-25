import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getGamesIndex, getAllGameStats } from "../../../apiCalls";
import MyGameCard from "../MyGameCard/MyGameCard";
import GameplayPopUp from "../GameplayPopUp/GameplayPopUp";
import "./MyGames.css";

function MyGames({ isLogedIn, userData, friendsList }) {
  const userId = userData.id

 
  const [myGames, setMyGames] = useState([]);
  // const { userId } = useParams();
  const navigate = useNavigate();
  // const [gamesList, setGameList] = useState([])
  // const [selectedGame, setSelectedGame] = useState(null)

  useEffect(() => {
    if(isLogedIn && userId) {
      const fetchGamesIndex = async () => {
       try {
         const userGamesData = await getGamesIndex(userId);
        const gameIds = userGamesData.data.map(game => game.id);
        //// --> will want to use gameIds to get game stats
        // const gameStats = await getAllGameStats(gameIds)
        
        //// ****** --> using gameIds that BE has available
        //// ****** --> (erase once both BEs have mathing data)
        const gameStats = await getAllGameStats([1, 2, 3]);
        gameStats[2].data.id = 4;

        //// ****** <-- end of fake code... can delete after BEs game ids match
        gameStats.forEach(({data}) => {
          const gameId = data.id;
          const gameData = userGamesData.data.find(game => game.id === gameId);
          gameData.attributes = {...gameData.attributes, ...data.attributes}
          gameData.attributes.white_player_id = 1;
          //gameData.attributes.white_player_user_name = 'Bob'
        });

         setMyGames(userGamesData.data)
        } catch (err) {
         console.error("Error fetching games data:", err)
        }
       }
      fetchGamesIndex()
    }
  }, [isLogedIn, userId]);

  

  const gamesList = myGames.map(game => {
    if (game.attributes.status === 'active') {
      return (
        <MyGameCard
          key={game.id}
          gameId={game.id}
          attributes={game.attributes}
          gameStatus={game.attributes.status}
          gameImage={game.attributes.avatar}
          userData={userData}
          // onImageClick={()=> gameSlected(game.id) }
        />
      )
    }
});
  
  return (
    <section className="my-games-section">
      <h2 className="my-games-h2">My Games</h2>
      <div className="gmaes-list-wrapper">{gamesList}</div>
    </section>
  );
}

export default MyGames;
