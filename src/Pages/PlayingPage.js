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

//misc
import styles from './css/PlayingPage.module.css'
import { isAnswerCloseEnough } from '../functions/mapFunctions'

const PlayingPage = () => {

  //both hold Lat/Lng object to compare for your answer { lat: 28.519306, lng: -81.376668 }
  const [click, setClick] = useState(null)
  const [answer, setAnswer] = useState(null)
  const [location, setLocation] = useState(null)
  const [hint, setHint] = useState(0)
  const [displayHint, setDisplayHint] = useState(true)
  const { user, hover } = useContext(UserContext)
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

  function onSubmit () {
    if(!click) return
    let test = isAnswerCloseEnough(click[0], location)


    if (test) {
      let copy = click
      setClick([copy, location])
    } else if (hint < 2) {
      let x = hint + 1
      setHint(x)
      setClick(null)
      setDisplayHint(true)
    } else return 
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
    if (answer && hint >= 0) {
      setLocation(answer.locations[hint])}
  }, [answer, hint])

  return (
    <div className={styles.playingPage}>
      {displayHint ? <Overlay hint={hint} setDisplayHint={setDisplayHint}/> : null}
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