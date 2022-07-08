import React, {useState, useEffect} from 'react'
import StreetView from '../Components/StreetView'
import SubmissionMap from '../Components/SubmissionMap'
import Marker from '../Components/Marker'
import { Wrapper, Status } from '@googlemaps/react-wrapper'

const PlayingPage = () => {

  const [click, setClick] = useState(null)
  const [answer, setAnswer] = useState({ lat: 28.519306, lng: -81.376668 })
    
  const render = (status) => {
    // eslint-disable-next-line default-case
    switch (status) {
      case Status.LOADING:
        return <h1>Loading</h1>
      case Status.FAILURE:
        return <h1>Error</h1>
      case Status.SUCCESS:
        return <SubmissionMap/>
    }
  }

  function onClick(e) {
    setClick(e.latLng)
  }

  return (
    <>
        <Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY} render={render}>
          <h1>this is the Street View</h1>
          <StreetView location={answer}/>
          <h1>This is the submission</h1>
            <SubmissionMap onClick={onClick}>
              <Marker position = {click}/>
            </SubmissionMap>
        </Wrapper>
        
    </>
  )
}

export default PlayingPage