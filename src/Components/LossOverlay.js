import React from 'react'
import styles from './css/overlay.module.css'
import {useNavigate} from 'react-router-dom'

const LossOverlay = ({distance}) => {
    const nav = useNavigate()
    function handleClick () {
        nav('/')
    }

    return (
        <div className={styles.overlayContainer} onClick={handleClick} style={{cursor: 'pointer'}}>
            <div className={styles.overlayCanvas}></div>
            <div className={styles.overlayTitle}>Not Quite... Try Again!</div>
            <div className={styles.overlayCounter}>{`You were ${distance}km from the location`}</div>
            <div className={styles.overlayFootnote}>Click anywhere to return</div>
        </div>
    )
}

export default LossOverlay