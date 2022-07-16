//Middleware
import React, {useState, useEffect, useContext} from 'react'
import { Wrapper, Status } from '@googlemaps/react-wrapper'
import axios from 'axios'
import qs from 'qs'
import { useParams } from 'react-router'

//Components
import StreetView from '../Components/StreetView'
import SubmissionMap from '../Components/SubmissionMap'
import Marker from '../Components/Marker'
import UserContext from '../UserContext'
import SubmitButton from '../Components/SubmitButton'
import Overlay from '../Components/Overlay'
import WinOverlay from '../Components/WinOverlay'
import LossOverlay from '../Components/LossOverlay'

//misc
import styles from './css/PlayingPage.module.css'
import { measureDistance, recordWin } from '../functions/mapFunctions'

const PlayingPage = () => {

  //both hold Lat/Lng object to compare for your answer { lat: 28.519306, lng: -81.376668 }
  const [click, setClick] = useState(null)
  const [answer, setAnswer] = useState(null)
  const [location, setLocation] = useState(null)
  const [hint, setHint] = useState(0)
  const [distance, setDistance] = useState(null)
  const [displayHint, setDisplayHint] = useState(true)
  const [displayWin, setDisplayWin] = useState(false)
  const [displayLoss, setDisplayLoss] = useState(false)
  const { user, hover, reRender, setRerender } = useContext(UserContext)
  const answerID = useParams()
    
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

  async function updateUserOnWin () {
    recordWin(user, answer, hint)
    .then(element => {
      setRerender(reRender+1)})
    .catch(console.error)
  }

  function onSubmit () {
    if(!click) return
    let test = measureDistance(click[0], location)
    setDistance(test.toLocaleString("en-US"))

    let x = hint + 1
    setHint(x)

    if (test < 10000) {
      let copy = click
      setClick([copy, location])
      setDisplayWin(true)
      updateUserOnWin()
    } else if (hint < 2) {
      setClick(null)
      setDisplayHint(true)
    } else setDisplayLoss(true) 
  }

  useEffect(() => {
    if (!answer && user) {
      axios.get((process.env.NODE_ENV === 'production'
      ? process.env.REACT_APP_BACK_END_PROD
      : process.env.REACT_APP_BACK_END_DEV) + `/answer/${answerID.id}`, {})
      .then(res => {
        setAnswer(res.data)
      })
    }
  }, [user])

  useEffect(() => {
    if (answer && hint >= 0 && !displayWin && !displayLoss) {
      setLocation(answer.locations[hint])}
  }, [answer, hint])

  return (
    <div className={styles.playingPage}>
      {displayHint ? <Overlay hint={hint} setDisplayHint={setDisplayHint} distance={distance}/> : null}
      {displayWin ? <WinOverlay answer={answer} distance={distance}/> : null}
      {displayLoss ? <LossOverlay distance={distance}/> : null}
        <Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY} render={render}>
          {location ? <StreetView 
                        location={location}
                        key={hint}
                        className={styles.streetView}
                        /> 
                      : null}
          <SubmitButton onSubmit={onSubmit} click={click} hover={hover}/>
            <SubmissionMap onClick={onClick} className={styles.submissionBox}>
              {click ? click.map((mark, idx) => <Marker position = {mark} key={idx}/>) : null}
            </SubmissionMap>
        </Wrapper>
        
    </div>
  )
}

export default PlayingPage