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
    
    console.log(myGames)
  //   setGameList(myGames.map((game) => {
  //     console.log('hello',game)
  // }))
  }, [isLogedIn, userId]);

  // const userIsLoggedIn = () => {
  //   setIsLoggedIn(true)
  // };

  // const gameSlected = (gameId) => {
  //   setSelectedGame(gameId)
  // }

  // const closePopUp = () => {
  //   setSelectedGame(null)
  // }

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
  // useEffect(() => {}, [myGames])

  // console.log('game list', gamesList)

  // const gameSlected = (gameId) => {
  //   setSelectedGame(gameId)
  // }

  // const closePopUp = () => {
  //   setSelectedGame(null)
  // }

  return (
    <section className="my-games-section">
      <h2 className="my-games-h2">My Games</h2>
      <div className="gmaes-list-wrapper">{gamesList}</div>
      {/* {selectedGame && (
        <GameplayPopUp 
          gameId={selectedGame}
          onClose={closePopUp}
        />
      )} */}
      {/* <GameplayPopUp /> */}
    </section>
  );
}

export default MyGames;
