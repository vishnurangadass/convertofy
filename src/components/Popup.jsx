import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "./Popup.css";

const Popup = ({heading, label,}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    const body = document.querySelector(".main-container");
    setIsOpen(true);
    document.body.style.overflow = "hidden";
    body.style.opacity = "0.25"; // Set the opacity to 0.5
  };
  const handleClose = () => {
    const body = document.querySelector(".main-container");
    setIsOpen(false);
    document.body.style.overflow = "auto";
    body.style.opacity = "1";
  };
  return (
    <div>
        <button className="btn btn-primary" onClick={handleOpen}>
          Open Popup
        </button>
        {isOpen && (
          <div className="modal-form">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Popup Title</h2>
                <FontAwesomeIcon icon={faXmark} style={{ color: "#e31c5f" }} onClick={handleClose} />
              </div>
              <div className="modal-body">
                <p>This is a sample popup content.</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-warning" onClick={handleClose}>Cancel</button>
                <button className="btn btn-primary">Confirm</button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default Popup;
