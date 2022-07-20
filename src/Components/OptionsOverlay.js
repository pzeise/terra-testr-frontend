import React, { useState } from "react";
import styles from "./css/options.module.css";
import { useNavigate } from "react-router-dom";

const OptionsOverlay = ({ displayOptions, setDisplayOptions }) => {
  const [spin, setSpin] = useState(false);
  const [show, setShow] = useState(false);
  const nav = useNavigate();

  const setSpinOn = (e) => {
    setSpin(true);
  };

  const setSpinOff = (e) => {
    setSpin(false);
  };

  const setShowOptionsOn = (e) => {
    setShow(true);
  };

  const setShowOptionsOff = (e) => {
    setShow(false);
  };

  const exitGame = (e) => {
    nav("/");
  };

  const toggleCamera = (e) => {
    console.log(e);
    setDisplayOptions((x) => ({
      ...x,
      unlock: !e.target.checked,
    }));
  };

  return (
    <>
      <div className={show ? styles.optionsContainer : styles.optionsHidden}>
        <div className={styles.options}>
          <h1>Options</h1>
          <div className={styles.cameraLock}>
            <label className={styles.switch}>
              <input
                className={styles.switchInput}
                type="checkbox"
                checked={!displayOptions.unlock}
                onChange={toggleCamera}
              />
              <span className={styles.slider}></span>
            </label>
            <h4>Lock Camera</h4>
          </div>
          <div className={styles.optionButtons}>
            <div className={styles.optionOkButton} onClick={setShowOptionsOff}>
              Done
            </div>
            <div className={styles.optionExitButton} onClick={exitGame}>
              Leave Game
            </div>
          </div>
        </div>
      </div>

      <div
        className={spin ? styles.optionGearSpin : styles.optionGear}
        onMouseEnter={setSpinOn}
        onMouseLeave={setSpinOff}
        onClick={setShowOptionsOn}
      >
        <img
          className={styles.optionGearActual}
          src="/gear.svg"
          alt="Add Marker"
        ></img>
      </div>
    </>
  );
};

export default OptionsOverlay;
