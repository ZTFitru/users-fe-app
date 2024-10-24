import React from "react";
import { lazy, Suspense } from "react";
const Game = lazy(() => import("chess_components/Game"));

import "./GamePlay.css";

function GamePlay({ gameId, playerId }) {
  return (
    <div className="game-area-user">
      {/* <h2>{gameId}</h2> */}
      <Suspense fallback={<div>Loading...</div>}>
        <Game gameId={gameId} playerId={playerId} />
      </Suspense>
    </div>
  );
}

export default GamePlay;
