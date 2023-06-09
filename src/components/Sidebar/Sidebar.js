import React from "react";
import "./Sidebar.css";
import avatarPath from "../../images/avatar-image.png";

const Sidebar = ({ onSignOut }) => {
  return (
    <div className="sidebar">
      <div className="sidebar__user">
        <img className="sidebar__avatar" src={avatarPath} alt="user's avatar" />
        <p className="sidebar__username">Terrence Tegegne</p>
      </div>
      <button className="sidebar__edit-button">Change profile data</button>
      <button className="sidebar__logout-button" onClick={onSignOut}>
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
