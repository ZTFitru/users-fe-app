import React from 'react';
import { FaTrophy } from "react-icons/fa6";
import { GiRibbonMedal } from "react-icons/gi";
import { BsEmojiAngryFill } from "react-icons/bs";
import './Stats.css';

function Stats() {

  
  return (
    <section className='stat-section'>
      <h2>Your frien-emies will never catch you!</h2>
      <div className='stat-box'>
        <FaTrophy className='stat-icon' />
        <div className="stat-text">
          <span>[number] Games Won!</span>
          <p>You're on a roll!</p>
        </div>
      </div>

      <div className='stat-box'>
        <GiRibbonMedal className='stat-icon' />
        <div className="stat-text">
          <span>You've bested [username] [number] times!</span>
          <p>Favorite Competitor</p>
        </div>
      </div>
      <div className='stat-box'>
        <BsEmojiAngryFill className='stat-icon'/>
        <div className="stat-text">
          <span>[username] has beaten you [number] times!</span>
          <p>Losingest Pairing</p>
        </div>
      </div>
    </section>
  )
}

export default Stats;