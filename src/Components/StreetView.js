import React, {useState, useEffect, useRef} from 'react'
import { GoogleMap, useLoadScript, StreetViewPanorama, StreetViewService } from '@react-google-maps/api'
import SubmissionBox from './SubmissionBox'


const StreetView = () => {

    const [answer, setAnswer] = useState(null)


    // const { isLoaded } = useLoadScript({
    //     googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
    // })

    const mapContainerStyle = {
        height: "400px",
        width: "800px"
      };

    useEffect(() => {
        setAnswer("28.519306,-81.376668")
    }, [])

    // if(!isLoaded) return <div>tis broke</div>

  return (
    <>
    <div>
        <h1>MAPS!</h1>
        <p>Please see map below</p>
        {/* <iframe
            width="600"
            height="450"
            style={{ border: 0 }}
            loading="lazy"
            allowfullscreen
            src={`https://www.google.com/maps/embed/v1/streetview?key=${process.env.REACT_APP_MAPS_API_KEY}&location=${answer}&heading=210&pitch=10&fov=35`}
            disableDefaultUI="true"
        /> */}
    </div>
    <SubmissionBox/>
    </>
  )
}

export default StreetView