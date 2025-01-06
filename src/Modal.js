import React, { useRef } from "react";
import ReactDom from "react-dom";
import "./App.css";

export const Modal = ({ setShowModal, modalTopic, theme, currentTheme}) => {
  const modalArea = useRef();
  const closeModal = (e) => {
    if (e.target === modalArea.current) {
      setShowModal(false);
    }
  };
  if (modalTopic === "help") {
    return ReactDom.createPortal(
      <div className={`modal-container ${currentTheme}`} ref={modalArea} onClick={closeModal}>
        <div className="modal-content">
          <button onClick={() => setShowModal(false)}>X</button>
          <h2>How to Play</h2>
          <ul>
            <li>Try to get the highest score by guessing if each headline is real or was generated by AI.</li>
            <li>If you want to restart your game, click the "Restart" button below the "Real" and "Fake" buttons.</li>
            <li>When viewing your results, click the "Share This Headline" button to share the headline with your others or on social media.</li>
            <li>Click the settings button in the corner to switch themes or get support.</li>
            <li>Five new headlines are released each day at midnight.</li>
          </ul>
        </div>
      </div>,
      document.getElementById("portal")
    );
  } else if (modalTopic === "settings") {
    return ReactDom.createPortal(
      <div className={`modal-container ${currentTheme}`} ref={modalArea} onClick={closeModal}>
        <div className="modal-content">
            <button onClick={() => setShowModal(false)}>X</button>
            <h2>Settings</h2>

                <span>Dark Mode: </span><button className="change-theme" onClick={theme}>{currentTheme === "light" ? <span>Enable</span> : <span>Disable</span>}</button><br/>
                <span>Clear Data: </span><button className="change-theme" onClick={() => {localStorage.removeItem("user_data"); window.location.reload()}}>Clear Data</button><br/>
                <span>Have any feedback? Contact us <a href="mailto:bob@bob-brown.com">here</a>.</span>
            
        </div>
      </div>,
      document.getElementById("portal")
    );
  }
};