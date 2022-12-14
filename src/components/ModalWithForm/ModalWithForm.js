import React from "react";
import "./ModalWithForm.css";

const ModalWithForm = (props) => {
  return (
    <div className="modal">
      <div className="modal__overlay" onClick={props.close}>
        <div className="modal__container" onClick={(e) => e.stopPropagation()}>
          <button
            className="modal__close-button"
            type="button"
            onClick={props.close}
          ></button>
          <form name={props.name} className="modal__form" id={props.name}>
            <p className="modal__form-title">{props.title}</p>
            {props.children}
            <button className="modal__form-submit-button" type="submit">
              {props.buttonText}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalWithForm;
