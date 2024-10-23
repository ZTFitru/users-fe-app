import React from 'react';
import { FaTrophy } from "react-icons/fa6";
import { GiRibbonMedal } from "react-icons/gi";
import { BsEmojiAngryFill } from "react-icons/bs";
import './Stats.css';

function Stats() {

  //will need games won
  //will need user name with the less wins and amount won
  //will need user name with the most wins
  return (
    <section>
      <h2>Your frien-emies will never catch you!</h2>
      <div className='stat-box'>
        <FaTrophy />
        {/* <p>[amount won]Games Won! </p> */}
        <span>[amount won]Games Won! </span>
        <p>You're on a roll!</p>
      </div>
      <div className='stat-box'>
        <GiRibbonMedal />
        {/* <p>You've bested [insert user name] [amount won] times </p> */}
        <span>You've bested [insert user name] [amount won] times </span>
        <p>Favorite Competitor</p>
      </div>
      <div className='stat-box'>
        <BsEmojiAngryFill />
        {/* <p>has beaten you [amount lost] times!</p> */}
        <span>has beaten you [amount lost] times!</span>
        <p>Losingest Pairing</p>
      </div>
    </section>
  )
}

export default Stats;