import React from "react";
import Popup from "reactjs-popup";
// import { useParams } from "react-router-dom";
import GamePlay from "../GamePlay/GamePlay";
import { Link } from 'react-router-dom';
import "./StartGamePopUp.css";

function StartGamePopUp({ isFriend }) {
  return (
    <Popup
      trigger={<button className="start-game-popup-click"></button>}
      modal
      nested
      className="start-game-popup"
    >
      {(close) => (
        <div className="modal">
          <div className="content">
            Start game with
            {isFriend}
          </div>
          <div className="start-game-button-wrapper">
            <Link to='/gameId'>
              <button className="start-game-button" >Ok</button>
            </Link>
            <button className="start-game-button" onClick={() => close()}>Cancel</button>
          </div>
        </div>
      )}
    </Popup>
  );
}

export default StartGamePopUp;
