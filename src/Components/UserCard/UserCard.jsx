import React from 'react';
import { useState } from 'react';
import { FaUserPlus } from "react-icons/fa";
import { FaUserMinus } from "react-icons/fa";

import StartGamePopUp from '../StartGamePopUp/StartGamePopUp';
import RemoveFriendPopUp from '../RemoveFriendPopUp/RemoveFriendPopUp';
import avatarPlaceholder from '../../assets/avatar_placeholder.png';
import './UserCard.css';

function UserCard({ user, avatar, id, username, onAddFriend, isFriend, handleStartNewGame, handleRemoveFriend, friendId }) {
  
  const [iconColor, setIconColor] = useState('black');
  const [popUp, setPopUp] = useState(false)
  // console.log(handleStartNewGame)

  const checkImageBrightnessInIconArea = (imgElement, iconSize = { width: 32, height: 32 }) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = iconSize.width;
    canvas.height = iconSize.height;

    const iconX = imgElement.width * 0.95 - iconSize.width;
    const iconY = imgElement.height * 0.03;

    context.drawImage(
      imgElement,
      iconX, iconY, iconSize.width, iconSize.height,
      0, 0, iconSize.width, iconSize.height
    );

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    let r, g, b, avg;
    let colorSum = 0;

    for (let i = 0; i < data.length; i += 4) {
      r = data[i];
      g = data[i + 1];
      b = data[i + 2];
      avg = (r + g + b) / 3;
      colorSum += avg;
    }

    const brightness = colorSum / (data.length / 4);

    setIconColor(brightness > 128 ? 'black' : 'white')
  };

  const handleImageLoad = (event) => {
    checkImageBrightnessInIconArea(event.target)
  };

  const removeFriendClick = () => {
    setPopUp(true)
  };

  const closeRemovePopUp = () => {
    setPopUp(false)
  };

  return (
    <div id={id} className='user-card-wrapper'>
      <div>
        {!isFriend ? (
          <i onClick={() => onAddFriend(user)}>
            <FaUserPlus color={iconColor} />
          </i>
        ) : (
          <i onClick={removeFriendClick} >
            <FaUserMinus color={iconColor} />
          </i>
        )}
      </div>
      {isFriend && <StartGamePopUp username={username} handleStartNewGame={handleStartNewGame} id={friendId} />} {/* id={id} before  */}
      {/*  */}
      <img src={avatar || avatarPlaceholder}
        alt={username}
        crossOrigin="anonymous"
        onLoad={handleImageLoad}
        onError={event => {
          event.target.src = avatarPlaceholder
          event.onerror = null
        }}
      />
      <h3 className='user-name-h3'>{username}</h3>
      {popUp && (<RemoveFriendPopUp
        username={username}
        onClose={closeRemovePopUp}
        handleRemoveFriend={handleRemoveFriend}
        friendId={friendId}
      />
      )}
    </div>
  )
}

export default UserCard;