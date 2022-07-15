import React, {useState, useEffect} from 'react'
import styles from './css/overlay.module.css'

const Overlay = ({hint, setDisplayHint}) => {
    const [sec, setSec] = useState(0)

    function tick () {
        setSec(sec+1)
    }

    useEffect(() => {
        const timerId = setInterval(() => tick(), 1000)
        return () => clearInterval(timerId)
    })

    useEffect(() => {
        if (sec > 2) setDisplayHint(false)
    })

    return (
        <div className={styles.overlayContainer}>
            <div className={styles.overlayCanvas}></div>
            {sec === 0 ? <div className={styles.overlayTitle}>GET READY!</div> : null}
            {sec === 1 ? <div className={styles.overlayTitle}>GET SET!</div> : null}
            {sec === 2 ? <div className={styles.overlayTitle}>GO!</div> : null}
        </div>
    )
}


export default Overlay