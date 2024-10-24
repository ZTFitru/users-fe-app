import { MdLocationPin } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { FaBell } from "react-icons/fa6";
import { FaGlobe } from "react-icons/fa";
import { IoMdHeart } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";

import "./Profile.css";

function Profile({ userData }) {
  return (
    <section className="settings-section">
      <img src={userData.avatar} />
      <h2>{userData.name}</h2>
      <div className="setting-wrapper">
        <MdLocationPin className="ion"/>
        <p>Location</p>
      </div>

      <div className="main-settings">
        <div className="setting-wrapper">
          <IoPerson className="ion"/>
          <p>Personal Information</p>
        </div>
        <div className="setting-wrapper">
          <FaBell className="ion"/>
          <p>Notifications</p>
        </div>
        <div className="setting-wrapper">
          <FaGlobe className="ion"/>
          <p>Whishlist</p>
        </div>
        <div className="setting-wrapper">
          <IoMdHeart className="ion"/>
          <p>Saved</p>
        </div>
      </div>
      <div className="setting-wrapper">
        <IoMdSettings className="ion"/>
        <p>Settings</p>
      </div>
    </section>
  );
}

export default Profile;
