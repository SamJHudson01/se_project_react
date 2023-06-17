import React, { useState, useContext, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const EditProfileModal = ({ isOpen, onCloseModal, onEditProfile }) => {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (currentUser && isOpen) {
      setName(currentUser.name);
      setAvatar(currentUser.avatar);
    }
  }, [currentUser, isOpen]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onEditProfile({ name, avatar });
  };

  return (
    <ModalWithForm
      name="edit-profile"
      title="Edit profile"
      isOpen={isOpen}
      onCloseModal={onCloseModal}
      onSubmit={handleSubmit}
    >
      <p className="modal__input-label">Your Name</p>
      <input
        type="text"
        id="user-name"
        name="name"
        className="modal__input"
        placeholder="Your name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        required
      />
      <p className="modal__input-label">Avatar URL</p>
      <input
        type="url"
        id="user-avatar-url"
        name="avatar"
        className="modal__input"
        placeholder="Avatar URL"
        onChange={(e) => setAvatar(e.target.value)}
        value={avatar}
      />
    </ModalWithForm>
  );
};

export default EditProfileModal;
