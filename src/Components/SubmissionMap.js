import React, { useEffect, useState, useRef, Children } from 'react'
import { useDeepCompareEffectForMaps } from '../functions/mapFunctions';
import styles from './css/submission.module.css'

const SubmissionMap = ({ onClick, onIdle, children, style, ...options }) => {

    const ref = useRef(null);
    const [map, setMap] = useState();
    
    useEffect(() => {
      if (ref.current && !map) {
        console.log('we in')
        console.log(ref.current)
        setMap(new window.google.maps.Map(ref.current, {
            zoom: 2,
            center: { lat: 0, lng: 0 },
            disableDefaultUI: true,
          }));
      }
    }, [ref, map]);

    useEffect(() => {
        if (map) {
          ["click", "idle"].forEach((eventName) =>
          window.google.maps.event.clearListeners(map, eventName)
          );
          if (onClick) {
            map.addListener("click", onClick);
          }
    
          if (onIdle) {
            map.addListener("idle", () => onIdle(map));
          }
        }
      }, [map, onClick, onIdle]);

    useDeepCompareEffectForMaps(() => {
        if (map) {
          map.setOptions(options);
        }
      }, [map, options]);

  return (
  <>
    <div>
        <div className={styles.mapContainer} ref={ref} />
        {Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { map })
          }
        })}
    </div>
    </>
  )
}

export default SubmissionMap