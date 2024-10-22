import React from 'react';
import { useState } from 'react';
import { FaUserPlus } from "react-icons/fa";
import { FaUserMinus } from "react-icons/fa";

import StartGamePopUp from '../StartGamePopUp/StartGamePopUp';
import RemoveFriendPopUp from '../RemoveFriendPopUp/RemoveFriendPopUp';
import avatarPlaceholder from '../../assets/avatar_placeholder.png';
import './UserCard.css';

function UserCard({ user, avatar, id, username, onAddFriend, isFriend, removeFriend }) {
  const [iconColor, setIconColor] = useState('black');

  const checkImageBrightnessInIconArea = (imgElement, iconSize = {width: 32, height: 32}) => {
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


  return (
    <div id={id} className='user-card-wrapper'>
      <StartGamePopUp isFriend={isFriend} />
      <div>
        {!isFriend ? (
          <i onClick={()=> onAddFriend(user)}>
            <FaUserPlus color={iconColor}/>
          </i>
        ) : (
          <i onClick={()=> removeFriend(user)} >
            {/* <StartGamePopUp /> */}
            <FaUserMinus color={iconColor} />
          </i>
        )}
      </div>
      <img src={avatar || avatarPlaceholder} 
        alt='' 
        // onClick={<StartGamePopUp />}
        onLoad={handleImageLoad}        
        onError={event => {
          event.target.src = avatarPlaceholder
          event.onerror = null
        }}
        // {isPopupVisible && <StartGamePopUp onClose={closePopup} />}
        // onClick={handleImageClick} // is this correct??
        />
      <h3 className='user-name-h3'>{username}</h3>
    </div>
  )
}

export default UserCard;