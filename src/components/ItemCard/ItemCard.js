import React, { useContext } from "react";
import "./ItemCard.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const ItemCard = ({ clothingItem, handleCardClick, handleLikeClick }) => {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = clothingItem.likes.some(
    (user) => user._id === currentUser._id
  );
  const itemLikeButtonClassName = `itemCard__like-button ${
    isLiked ? "itemCard__like-button_liked" : ""
  }`;

  const handleLike = (event) => {
    event.stopPropagation();
    handleLikeClick({
      id: clothingItem._id,
      isLiked: isLiked,
      user: currentUser._id,
    });
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
