//Middleware
import React, {useState, useEffect} from 'react'
import { Wrapper, Status } from '@googlemaps/react-wrapper'

//Components
import StreetView from '../Components/StreetView'
import SubmissionMap from '../Components/SubmissionMap'
import Marker from '../Components/Marker'

//Functions
import { isAnswerCloseEnough } from '../functions/mapFunctions'

const PlayingPage = () => {

  //both hold Lat/Lng object to compare for your answer
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
    setClick([e.latLng])
  }

  function onSubmit () {
    console.log('here we go')
    // const answerLatLng = new window.google.maps.LatLng(answer.lat, answer.lng)
    let test = isAnswerCloseEnough(click[0], answer)
    console.log(test)

    if (test) {
      let copy = click
      setClick([copy, answer])
    }
  }

  return (
    <>
        <Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY} render={render}>
          <h2>this is the Street View</h2>
          <StreetView location={answer}/>
          <h2>This is the submission</h2>
          {click ? <button onClick={onSubmit}>ready to submit?</button> : null}
            <SubmissionMap onClick={onClick}>
              {click ? click.map(mark => <Marker position = {mark} />) : null}
            </SubmissionMap>
        </Wrapper>
        
    </>
  )
}

export default PlayingPage