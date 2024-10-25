import React from "react";
import { lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
const Game = lazy(() => import("chess_components/Game"));

import "./GamePlay.css";

function GamePlay({ playerId }) {
const { gameId } = useParams()

  return (
    <div className="main-game-area">
      <div className="game-area-user">
        <Suspense fallback={<div>Loading...</div>}>
          <Game gameId={gameId} playerId={Number(playerId)} />
        </Suspense>
      </div>
    </div>
  );
}

export default GamePlay;
