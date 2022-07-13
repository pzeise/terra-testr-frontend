import React, { useEffect, useState, useRef, Children } from 'react'
import { useDeepCompareEffectForMaps } from '../functions/mapFunctions';
import styles from './css/submission.module.css'

const SubmissionMap = ({ onClick, onIdle, children, style, ...options }) => {

    const ref = useRef(null);
    const [map, setMap] = useState();
    const [hover, setHover] = useState(false);
    
    useEffect(() => {
      if (ref.current && !map) {
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

    const setHoverOn = e => {
        setHover(true)
    }

    const setHoverOff = e => {
        setHover(false)
    }

  return (
  <>
    <div>
        <div className={hover ? styles.guessing : styles.mapContainer} ref={ref} onMouseEnter={setHoverOn} onMouseLeave={setHoverOff} />
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