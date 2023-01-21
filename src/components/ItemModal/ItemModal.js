import React from "react";
import "./ItemModal.css";

const ItemModal = ({ clothingItem, close, deleteItem }) => {
  return (
    <div className="item-modal">
      <div className="item-modal__overlay" onClick={close}>
        <div
          className="item-modal__container"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="item-modal__close-button"
            type="button"
            onClick={close}
          ></button>
          <div
            className="item-modal__image"
            style={{
              backgroundImage: `url(${clothingItem.imageUrl})`,
              backgroundSize: "cover",
            }}
          ></div>
          <div className="item-modal__text-container">
            <p className="item-modal__title">{clothingItem.name}</p>
            <p className="item-modal__weather-type">
              Weather: {clothingItem.weather}
            </p>
            <button
              className="item-modal__delete"
              onClick={() => deleteItem(clothingItem.id)}
            >
              Delete item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
