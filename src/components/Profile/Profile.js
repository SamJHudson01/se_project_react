import React, { useContext } from "react";
import "./Profile.css";
import Sidebar from "../Sidebar/Sidebar";
import ClothesSection from "../ClothesSection/ClothesSection";
import { ClothingItemsContext } from "../../contexts/ClothingItemsContext";

const Profile = ({ handleCardClick, handleAddItem }) => {
  const { clothingItems } = useContext(ClothingItemsContext);

  return (
    <div className="profile">
      <Sidebar />
      <ClothesSection
        clothingItems={clothingItems}
        handleCardClick={handleCardClick}
        handleAddItem={handleAddItem}
      />
    </div>
  );
};

export default Profile;
