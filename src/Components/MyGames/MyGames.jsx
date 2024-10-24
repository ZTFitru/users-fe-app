import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getGamesIndex } from "../../../apiCalls";
import MyGameCard from "../MyGameCard/MyGameCard";
import GameplayPopUp from "../GameplayPopUp/GameplayPopUp";
import "./MyGames.css";

function MyGames({ isLogedIn, userData }) {
  const userId = userData.id

  console.log('My game user id------> ',userId)
  const [myGames, setMyGames] = useState([]);
  // const { userId } = useParams();
  const navigate = useNavigate();
  // const [gamesList, setGameList] = useState([])

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
    
    console.log(myGames)
  //   setGameList(myGames.map((game) => {
  //     console.log('hello',game)
  // }))
  }, [isLogedIn, userId]);

  // const userIsLoggedIn = () => {
  //   setIsLoggedIn(true)
  // };
  const gamesList = myGames.map(game => (
    <MyGameCard
      key={game.attributes.game_id}
      gameId={game.attributes.game_id}
      gameImage={game.attributes.avatar}
    />
  ));
  // useEffect(() => {}, [myGames])

  console.log('game list', gamesList)

  

  return (
    <section className="my-games-section">
      <h2 className="my-games-h2">My Games</h2>
      <div>{gamesList}</div>
      {/* <GameplayPopUp /> */}
    </section>
  );
}

export default MyGames;
