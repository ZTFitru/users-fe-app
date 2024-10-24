import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getGamesIndex } from "../../../apiCalls";
import MyGameCard from "../MyGameCard/MyGameCard";
import GameplayPopUp from "../GameplayPopUp/GameplayPopUp";
import "./MyGames.css";

function MyGames({ isLogedIn, userData, friendsList }) {
  const userId = userData.id

  console.log('My game user id------> ',userId)
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
         console.log('this my games ----->', userGamesData)
         setMyGames(userGamesData.data)
        } catch (err) {
         console.error("Error fetching games data:", err)
        }
       }
      fetchGamesIndex()
    }
  }, [isLogedIn, userId]);

  // const friendIdGameId = friendsList.find(friend => friend.id === game.id)

  const gamesList = myGames.map(game => {
    if (game.attributes.status === 'active') {
      return (
        <MyGameCard
          key={game.id}
          gameId={game.id}
          gameStatus={game.attributes.status}
          gameImage={game.attributes.avatar}
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
