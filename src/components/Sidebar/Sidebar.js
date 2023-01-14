import React from "react";
import "./Sidebar.css";
import avatarPath from "../../images/avatar-image.png";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatarPath} alt="user's avatar" />
      <p className="sidebar__username">Terrence Tegegne</p>
    </div>
  );
};

export default Sidebar;
