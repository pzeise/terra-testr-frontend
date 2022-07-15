import React from 'react'
import styles from './css/overlay.module.css'
import {useNavigate} from 'react-router-dom'

const WinOverlay = ({answer}) => {
    const nav = useNavigate()
    function handleClick () {
        nav('/')
    }

    return (
        <div className={styles.overlayContainer} onClick={handleClick} style={{cursor: 'pointer'}}>
            <div className={styles.overlayCanvas}></div>
            <div className={styles.overlayTitle}>Congrats You Got it!</div>
            <div className={styles.overlayCounter}>{answer.endState.title}</div>
            <div className={styles.overlayFootnote}>Click anywhere to return</div>
        </div>
    )
}

export default WinOverlay