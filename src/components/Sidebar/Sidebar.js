import React from "react";
import "./Sidebar.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const Sidebar = ({ onSignOut, onEditProfile }) => {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__user">
        {currentUser.avatar ? (
          <img
            className="sidebar__avatar"
            src={currentUser.avatar}
            alt="user's avatar"
          />
        ) : (
          currentUser.name && (
            <div className="sidebar__avatar_placeholder">
              {currentUser.name[0]}
            </div>
          )
        )}
        <p className="sidebar__username">{currentUser.name}</p>
      </div>
      <button className="sidebar__edit-button" onClick={onEditProfile}>
        Change profile data
      </button>
      <button className="sidebar__logout-button" onClick={onSignOut}>
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
