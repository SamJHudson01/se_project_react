import React, { useState, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const EditProfileModal = ({ isOpen, onCloseModal, handleProfileUpdate }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [avatar, setAvatar] = useState(currentUser.avatar);

  const handleSubmit = (event) => {
    event.preventDefault();
    handleProfileUpdate({ name, avatar });
  };

  return (
    <ModalWithForm
      name="edit-profile"
      title="Edit profile"
      isOpen={isOpen}
      onCloseModal={onCloseModal}
      onSubmit={handleSubmit}
    >
      <label className="modal__input-label">
        Your Name
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="modal__input"
          placeholder="Your name"
        />
      </label>
      <label className="modal__input-label">
        Avatar URL
        <input
          type="text"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          className="modal__input"
          placeholder="Avatar URL"
        />
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
