import React, {useContext, useEffect} from 'react'
import styles from './css/header.module.css'
import UserContext from '../UserContext'

const Header = props => {
  const {setAuthenticated, setUser} = useContext(UserContext)

  function logOut () {
    localStorage.removeItem('token')
    setAuthenticated(false)
    setUser(null)
  }



  return (
    <div className={styles.headerContainer}>
      <a href={process.env.NODE_ENV === 'production'
                ? process.env.REACT_APP_FRONT_END_PROD
                : process.env.REACT_APP_FRONT_END_DEV}>
                  <h1 className={styles.pageTitle}>Terra Testr</h1>
                </a>
    </div>
  )
}


export default Header