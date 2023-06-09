import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ isOpen, onClose, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin({ email, password })
      .then(() => {
        setErrorMessage(""); // clear the error message on successful login
      })
      .catch((error) => {
        setErrorMessage(
          "Failed to login, please check your credentials and try again."
        );
      });
  };

  return (
    <ModalWithForm
      name="login"
      title="Login"
      isOpen={isOpen}
      onCloseModal={onClose}
      onSubmit={handleSubmit}
    >
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
      {errorMessage && <p className="modal__error-message">{errorMessage}</p>}
    </ModalWithForm>
  );
}

export default LoginModal;
