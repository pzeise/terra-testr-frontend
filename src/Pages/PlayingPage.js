import React, {useState, useEffect} from 'react'
import StreetView from '../Components/StreetView'
import TestingThings from '../Components/TestingThings'
import Marker from '../Components/Marker'
import { Wrapper, Status } from '@googlemaps/react-wrapper'

const PlayingPage = () => {

  const [click, setClick] = useState(null)
    
  const render = (status) => {
    // eslint-disable-next-line default-case
    switch (status) {
      case Status.LOADING:
        return <h1>Loading</h1>
      case Status.FAILURE:
        return <h1>Error</h1>
      case Status.SUCCESS:
        return <TestingThings/>
    }
  }

  function onClick(e) {
    setClick(e.latLng)
  }

  return (
    <>
        <Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY} render={render}>
            <TestingThings onClick={onClick}>
              <Marker position = {click}/>
            </TestingThings>
        </Wrapper>
        
    </>
  )
}

export default PlayingPage