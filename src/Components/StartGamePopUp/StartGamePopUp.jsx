import React from "react";
import Popup from "reactjs-popup";
import GamePlay from "../GamePlay/GamePlay";
import { Link } from 'react-router-dom';
import "./StartGamePopUp.css";

function StartGamePopUp({ isFriend, username, handleStartNewGame, id }) {
  return (
    <Popup
      trigger={<button className="start-game-popup-click"></button>}
      modal
      nested
      className="start-game-popup"
    >
      {(close) => (
        <div className="start-game-modal">
          <div className="start-game-content">
            Start game with {username}
          </div>
          <div className="start-game-button-wrapper">
              <button className="start-game-button" onClick={() => handleStartNewGame(id)}>Ok</button>
            <button className="start-game-button" onClick={() => close()}>Cancel</button>
          </div>
        </div>
      )}
    </Popup>
  );
}

export default StartGamePopUp;
