import React, { useState } from "react";
import ModalWithForm from "./ModalWithForm";

function LoginModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(email, password);
  };

  return (
    <ModalWithForm
      name="login"
      title="Login"
      isOpen={isOpen}
      onCloseModal={onClose}
      onSubmit={handleSubmit}
    >
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

export default LoginModal;
