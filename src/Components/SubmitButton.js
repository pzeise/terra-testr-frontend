import React, {useContext} from 'react'
import styles from '../Pages/css/PlayingPage.module.css'
import UserContext from '../UserContext'

const SubmitButton = ({click, onSubmit}) => {

    const {hover, setHover} = useContext(UserContext)

    const setHoverOn = e => {
        setHover(true)
    }

    const setHoverOff = e => {
        setHover(false)
    }



  return (
    <button onClick={() => onSubmit()} 
    className={
        hover 
        ? styles.submitActive 
        : styles.submitDull}
    onMouseEnter={setHoverOn} onMouseLeave={setHoverOff}>
            {click 
            ? 'Submit your guess?' 
            : 'Make your Guess'}
    </button>
  )
}

export default SubmitButton
