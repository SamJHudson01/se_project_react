import React, { useContext } from "react";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const ClothesSection = ({
  clothingItems,
  handleCardClick,
  handleAddItem,
  handleLikeClick,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const items = Array.isArray(clothingItems)
    ? clothingItems
    : Array.from(clothingItems);

  const userClothingItems = items.filter(
    (item) => item.owner._id === currentUser._id
  );

  return (
    <div className="clothes-section">
      <div className="clothes-section__text-container">
        <p className="clothes-section__title">Your items</p>
        <button className="clothes-section__add-button" onClick={handleAddItem}>
          + Add new
        </button>
      </div>
      <div className="clothes-section__grid">
        {userClothingItems.map((item) => (
          <ItemCard
            key={item._id}
            clothingItem={item}
            handleCardClick={handleCardClick}
            handleLikeClick={handleLikeClick} // make sure you pass the correct function
          />
        ))}
      </div>
    </div>
  );
};

export default ClothesSection;
