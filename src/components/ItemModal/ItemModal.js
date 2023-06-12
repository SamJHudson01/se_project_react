import React, { useContext } from "react";
import "./ItemModal.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const ItemModal = ({ clothingItem, close, deleteItem }) => {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = clothingItem.owner._id === currentUser._id;
  const itemDeleteButtonClassName = `item-modal__delete ${
    isOwn ? "item__delete-button_visible" : "item__delete-button_hidden"
  }`;

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
              className={itemDeleteButtonClassName}
              onClick={() => deleteItem(clothingItem._id)}
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
