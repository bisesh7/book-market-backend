import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const ModalCloseButton = (props) => {
  return (
    <div>
      <a
        href="#close"
        className="modal-close-button"
        onClick={(e) => {
          props.setModal(false);
        }}
      >
        <FontAwesomeIcon icon={faTimes} />{" "}
      </a>
    </div>
  );
};

export default ModalCloseButton;
