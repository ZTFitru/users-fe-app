import React from "react";
import { useNavigate } from 'react-router-dom';
import Popup from "reactjs-popup";

import "./GameplayPopUp.css";

function GameplayPopUp({attributes, gameId }) {

  const {nextToMove, opponentName} = attributes;
  const navigate = useNavigate();

  return (
    <Popup
      trigger={<button className="gameplay-popup-click"></button>}
      modal
      nested
      className="gameplay-popup"
    >
      {(close) => (
        <div className="gameplay-modal">
          <div className="gameplay-content-wrapper">
            <div className="gameplay-content">{`Game with ${opponentName}`}</div>
            <div className="gameplay-content">{`Whose turn: ${nextToMove}`}</div>
          </div>
          <div className="gameplay-button-wrapper">
              <button className="gameplay-button" onClick={() => navigate(`/${gameId}`) }>Ok</button>
            <button className="gameplay-button" onClick={() => close()}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
}

export default GameplayPopUp;
