import React, {useState} from 'react'
import Header from '../Components/Header'
import LocationForm from '../Components/LocationForm'
import { useParams } from 'react-router'

import styles from './css/Add.module.css'

const AddLocation = () => {

  const {id} = useParams()

  return (
    <>
        <header>
            <Header/>
        </header>
        <div className={styles.addContainer}>
            <h1 className={styles.addTitle}>{id ? 'Edit your Location' : 'Add a New Location'}</h1>
            <h3 className={styles.addSubtitle}>You'll need a City Name, Image link, and three Latitude and Longitude pairs.</h3>
            <h4 className={styles.addSubtitle}>(Remember the final pair needs to be of a landmark!)</h4>
            <LocationForm id={id}/>
        </div>
    </>
  )
}


export default AddLocation