import React from 'react';
import Popup from 'reactjs-popup';
import './GameplayPopUp.css';

function GameplayPopUp() {

  
  return (
    // <div>GameplayPopUp</div>
    <Popup trigger={<button> Trigger</button>} position="right center">
      <div>Popup content here !!</div>
  </Popup>
  )
}

export default GameplayPopUp;