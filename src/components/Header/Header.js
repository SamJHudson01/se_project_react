import React from "react";
import "./Header.css";
import logoPath from "../../images/logo.svg";
import avatarPath from "../../images/avatar-image.png";

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
        <img className="header__logo" src={logoPath} alt="logo" />
        <p className="header__date-location-long">{`${currentDateLong}, ${weatherData}`}</p>
        <p className="header__date-location-short">{`${currentDateShort}, ${weatherData}`}</p>
      </div>
      <div className="header__container-right">
        <button className="header__add-button" onClick={handleAddItem}>
          + Add Clothes
        </button>
        <p className="header__user">{username}</p>
        <img src={avatarPath} alt="user's avatar" className="header__avatar" />
      </div>
    </header>
  );
};

export default Header;
