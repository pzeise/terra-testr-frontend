import React, {useState, useEffect, useRef} from 'react'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import SubmissionBox from './SubmissionBox'


const StreetView = () => {


    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
    })

    // useEffect(() => {
    //     if (ref.current && !map) {
    //         setMap(new window.google.maps.Map(ref.current, {
    //             center: { lat: -34.397, lng: 150.644 },
    //             zoom: 8,
    //           }))
    //     }
    // }, [ref, map])

    if(!isLoaded) return <div>tis broke</div>

  return (
    <>
    <SubmissionBox/>
    {/* <div>ref={ref}</div> */}
    </>
  )
}

export default StreetView