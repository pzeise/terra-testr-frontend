import React, { useState, useEffect, useRef } from "react";
import styles from "../Pages/css/PlayingPage.module.css";

const StreetView = ({ location, displayOptions }) => {
  const ref = useRef(null);
  const [map, setMap] = useState();
  const [oldHint, setOldHint] = useState(null);
  const [oldoptions, setOldOptions] = useState(null);
  useEffect(() => {
    if (
      ref.current &&
      (!oldHint ||
        location._id !== oldHint._id ||
        displayOptions.unlock !== oldoptions.unlock)
    ) {
      setMap(
        new window.google.maps.StreetViewPanorama(ref.current, {
          position: location,
          addressControl: false,
          fullscreenControl: false,
          zoomControl: false,
          clickToGo: displayOptions.unlock,
          linksControl: displayOptions.unlock,
        })
      );
      setOldHint(location);
      setOldOptions(displayOptions);
    }
  }, [ref, location, displayOptions]);

  return (
    <>
      <div className={styles.streetView} ref={ref} />
    </>
  );
};

export default StreetView;
