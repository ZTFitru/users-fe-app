import React from 'react';
import Popup from "reactjs-popup";
import './RemoveFriendPopUp.css';
import { Link } from 'react-router-dom';

function RemoveFriendPopUp({username, onClose, handleRemoveFriend}) {
  return (
    <Popup
      trigger={<button className="remove-friend-popup-click"></button>}
      modal
      nested
      className="remove-friend-popup"
    >
      {(close) => (
        <div className="remove-friend-modal">
          <div className="remove-friend-content">
            Are you sure you want to delete {username} from your freien-emies list?
          </div>
          <div className="remove-friend-button-wrapper">
            <button className="remove-friend-button"
              onClick={()=> {
                handleRemoveFriend(friendId)
                close()
                onClose()
              }}
            >
              Ok
            </button>
            {/* <Link to='/gameId'>
              <button  >Ok</button>
            </Link> */}
            <button className="remove-friend-button" onClick={() => close()}>Cancel</button>
          </div>
        </div>
      )}
    </Popup>
  )
}

export default RemoveFriendPopUp;