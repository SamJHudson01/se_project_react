import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({ isOpen, onClose, handleRegister }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    handleRegister({ name, avatar, email, password });
  };

  return (
    <ModalWithForm
      name="register"
      title="Sign Up"
      isOpen={isOpen}
      onCloseModal={onClose}
      onSubmit={handleSubmit}
    >
      <p className="modal__input-label">Name</p>
      <input
        type="text"
        name="name"
        value={name}
        placeholder="Name"
        className="modal__input"
        onChange={(e) => setName(e.target.value)}
      />
      <p className="modal__input-label">Avatar URL</p>
      <input
        type="text"
        name="avatar"
        value={avatar}
        placeholder="Avatar URL"
        className="modal__input"
        onChange={(e) => setAvatar(e.target.value)}
      />
      <p className="modal__input-label">Email</p>
      <input
        type="email"
        name="email"
        value={email}
        placeholder="Email"
        className="modal__input"
        onChange={(e) => setEmail(e.target.value)}
      />
      <p className="modal__input-label">Password</p>
      <input
        type="password"
        name="password"
        value={password}
        placeholder="Password"
        className="modal__input"
        onChange={(e) => setPassword(e.target.value)}
      />
    </ModalWithForm>
  );
}

export default RegisterModal;
