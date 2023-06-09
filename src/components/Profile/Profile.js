import React, { useContext } from "react";
import "./Profile.css";
import Sidebar from "../Sidebar/Sidebar";
import ClothesSection from "../ClothesSection/ClothesSection";
import { ClothingItemsContext } from "../../contexts/ClothingItemsContext";

const Profile = ({
  handleCardClick,
  handleAddItem,
  handleLikeClick,
  onSignOut,
}) => {
  const { clothingItems } = useContext(ClothingItemsContext);

  return (
    <div className="profile">
      <Sidebar onSignOut={onSignOut} />
      <ClothesSection
        clothingItems={clothingItems}
        handleCardClick={handleCardClick}
        handleAddItem={handleAddItem}
        handleLikeClick={handleLikeClick}
      />
    </div>
  );
};

export default Profile;
