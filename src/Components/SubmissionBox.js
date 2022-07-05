import React, {useState, useEffect} from 'react'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import styles from './css/submission.module.css'

const SubmissionBox = () => {
    const [guess, setGuess] = useState(null)
    const [center, setCenter] = useState()

    const mapClicked = (coord) => {
        console.log(coord)
        const {latLng} = coord
        const lat = latLng.lat()
        const lng = latLng.lng()
        setGuess({lat, lng})
    }

    useEffect(() => {
        setCenter({lat: 0, lng:0})
    }, [])

  return (
    <GoogleMap
        zoom={3}
        center={center}
        mapContainerClassName={styles.mapContainer}
        onClick={mapClicked}
    >
        {guess ? <Marker title="" name="" position={guess}/> : null}
    </GoogleMap>
  )
}

export default SubmissionBox