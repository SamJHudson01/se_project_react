import React from "react";
import "./Header.css";
import logoPath from "../../images/logo.svg";
import avatarPath from "../../images/avatar-image.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

const Header = ({ weatherData, handleAddItem }) => {
  const currentDateLong = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const currentDateShort = new Date().toLocaleString("default", {
    month: "short",
    day: "numeric",
  });

  const username = "Terrence Tegegne";

  return (
    <header className="header">
      <div className="header__container-left">
        <Link to="/">
          <img className="header__logo" src={logoPath} alt="logo" />
        </Link>
        <p className="header__date-location-long">{`${currentDateLong}, ${weatherData}`}</p>
        <p className="header__date-location-short">{`${currentDateShort}, ${weatherData}`}</p>
      </div>
      <div className="header__container-right">
        <ToggleSwitch />
        <button className="header__add-button" onClick={handleAddItem}>
          + Add Clothes
        </button>
        <Link to="/profile" className="header__user-info">
          <p className="header__user">{username}</p>
          <img
            src={avatarPath}
            alt="user's avatar"
            className="header__avatar"
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
