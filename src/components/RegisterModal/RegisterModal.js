import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({ isOpen, onClose, handleRegister }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(name, avatar, email, password);
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
      <input
        type="text"
        name="name"
        value={name}
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        name="avatar"
        value={avatar}
        placeholder="Avatar URL"
        onChange={(e) => setAvatar(e.target.value)}
      />
      <input
        type="email"
        name="email"
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        name="password"
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
    </ModalWithForm>
  );
}

export default RegisterModal;
