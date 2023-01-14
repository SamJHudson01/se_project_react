import React, { useState } from "react";
import "./Profile.css";
import Sidebar from "./Sidebar";
import ClothesSection from "./ClothesSection";

const Profile = () => {
  const [clothingItems, setClothingItems] = useState([]);

  return (
    <div className="profile">
      <Sidebar />
      <ClothesSection clothingItems={clothingItems} />
    </div>
  );
};

export default Profile;
