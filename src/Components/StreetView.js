import React, {useState, useEffect, useRef} from 'react'
import styles from '../Pages/css/PlayingPage.module.css'


const StreetView = (location) => {

    const ref = useRef(null);
    const [map, setMap] = useState();
    const [oldHint, setOldHint] = useState(null);
    
    useEffect(() => {
      if (ref.current && (!oldHint || location.location._id !== oldHint.location._id)) {
        setMap(new window.google.maps.StreetViewPanorama(ref.current, {
          position: location.location,
          clickToGo: false,
          addressControl: false,
          fullscreenControl: false,
          zoomControl: false,  
          }));
        setOldHint(location)
      }
    }, [ref, location]);
    

  return (
    <>
      <div className={styles.streetView} ref={ref} />
    </>
  )
}

export default StreetView