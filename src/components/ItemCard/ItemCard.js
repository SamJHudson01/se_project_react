import React, { useContext } from "react";
import "./ItemCard.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const ItemCard = ({ clothingItem, handleCardClick, handleLikeClick }) => {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = currentUser
    ? clothingItem.likes.includes(currentUser._id)
    : false;

  const itemLikeButtonClassName = `itemCard__like-button ${
    isLiked ? "itemCard__like-button_liked" : ""
  }`;

  const handleLike = (event) => {
    event.stopPropagation();
    handleLikeClick(clothingItem._id, isLiked, currentUser._id);
    console.log(clothingItem.likes);
  };

  return (
    <div
      className="itemCard"
      onClick={() => handleCardClick(clothingItem)}
      style={{
        backgroundImage: `url(${clothingItem.imageUrl})`,
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="itemCard__title-box">
        <div className="itemCard__title-container">
          <p className="itemCard__title">{clothingItem.name}</p>
        </div>
        {currentUser && (
          <button
            className={itemLikeButtonClassName}
            type="button"
            onClick={handleLike}
          />
        )}
      </div>
    </div>
  );
};

export default ItemCard;
