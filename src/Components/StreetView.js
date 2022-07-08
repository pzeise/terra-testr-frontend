import React, {useState, useEffect, useRef} from 'react'
import styles from './css/submission.module.css'


const StreetView = (location) => {

    const ref = useRef(null);
    const [map, setMap] = useState();
    
    useEffect(() => {
      if (ref.current && !map) {
        setMap(new window.google.maps.StreetViewPanorama(ref.current, {
          position: location.location,
          clickToGo: false,
          addressControl: false,
          fullscreenControl: false          
          }));
      }
    }, [ref, map]);
    

  return (
    <>
      <div className={styles.mapContainer} ref={ref} />
    </>
  )
}

export default StreetView