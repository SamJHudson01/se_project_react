import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./AddItemModal.css";

const AddItemModal = ({ isOpen, onAddItem, onCloseModal }) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  useEffect(() => {
    setName("");
    setImageUrl("");
    setWeather("");
  }, [isOpen]);


  function handleSubmit(e) {
    e.preventDefault();
    const item = { name: name, imageUrl: imageUrl, weather: weather };
    onAddItem(item);
  }

  return (
    <ModalWithForm
      name="add-garment-modal"
      title="Add Item"
      isOpen={isOpen}
      onCloseModal={onCloseModal}
      onSubmit={handleSubmit}
    >
      <p className="modal__input-label">Name</p>
      <input
        type="text"
        id="garment-name"
        name="name"
        className="modal__input"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        required
      />
      <p className="modal__input-label">Image</p>
      <input
        type="url"
        id="garment-image-url"
        name="imageUrl"
        className="modal__input"
        placeholder="Image URL"
        onChange={(e) => setImageUrl(e.target.value)}
        value={imageUrl}
        required
      />
      <p className="modal__input-label">Weather</p>
      <div className="modal__radio-container">
        <label className="modal__radio-label">
          <input
            type="radio"
            name="weather"
            value="hot"
            onChange={(e) => setWeather(e.target.value)}
            checked={weather === "hot"}
          />
          <div className="circle"></div>
          <span className="modal__radio-item-text">Hot</span>
        </label>
        <label className="modal__radio-label">
          <input
            type="radio"
            name="weather"
            value="warm"
            onChange={(e) => setWeather(e.target.value)}
            checked={weather === "warm"}
          />
          <div className="circle"></div>
          <span className="modal__radio-item-text">Warm</span>
        </label>
        <label className="modal__radio-label">
          <input
            type="radio"
            name="weather"
            value="cold"
            onChange={(e) => setWeather(e.target.value)}
            checked={weather === "cold"}
          />
          <div className="circle"></div>
          <span className="modal__radio-item-text">Cold</span>
        </label>
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;
