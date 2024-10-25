import React from "react";
import { lazy, Suspense } from "react";
const Game = lazy(() => import("chess_components/Game"));

import "./GamePlay.css";

function GamePlay({ gameId, playerId }) {
  return (
    <div className="main-game-area">
      <div className="game-area-user">
        <Suspense fallback={<div>Loading...</div>}>
          <Game gameId={gameId} playerId={playerId} />
        </Suspense>
      </div>
    </div>
  );
}

export default GamePlay;
