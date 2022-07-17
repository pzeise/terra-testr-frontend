import React, {useState} from 'react'
import Header from '../Components/Header'
import LocationForm from '../Components/LocationForm'

import styles from './css/Add.module.css'

const AddLocation = () => {



  return (
    <>
        <header>
            <Header/>
        </header>
        <div className={styles.addContainer}>
            <h1 className={styles.addTitle}>Add a New Location:</h1>
            <h3 className={styles.addSubtitle}>You'll need a City Name, Image link, and three Latitude and Longitude pairs.</h3>
            <h4 className={styles.addSubtitle}>(Remember the final pair needs to be of a landmark!)</h4>
            <LocationForm/>
        </div>
    </>
  )
}


export default AddLocation