import React from "react";
import { useEffect, useState } from "react";

import { getGamesIndex, getAllGameStats } from "../../../apiCalls";
import MyGameCard from "../MyGameCard/MyGameCard";
import "./MyGames.css";

function MyGames({ isLoggedIn, userData }) {
  const [myGames, setMyGames] = useState([]);
  const userId = userData.id

  useEffect(() => {
    if (isLoggedIn && userId) {
      const fetchGamesIndex = async () => {
        try {
          const userGamesData = await getGamesIndex(userId);
          const gameIds = userGamesData.data.map(game => game.id);
          const gameStats = await getAllGameStats(gameIds)
          gameStats.forEach((game) => {
            if (game && game.data) {
              const data = game.data;
              const gameId = data.id;
              const gameData = userGamesData.data.find(game => game.id === gameId);
              gameData.attributes = { ...gameData.attributes, ...data.attributes }
            }
          });

          setMyGames(userGamesData.data)
        } catch (err) {
          console.error("Error fetching games data:", err)
        }
      }
      fetchGamesIndex()
    }
  }, [isLoggedIn, userId]);

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
        />
      )
    }
  });

  return (
    <section className="my-games-section">
      <h2 className="my-games-h2">My Games</h2>
      <div className="games-list-wrapper">{gamesList}</div>
    </section>
  );
}

export default MyGames;
