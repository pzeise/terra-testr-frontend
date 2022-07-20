import React from 'react'
import styles from './css/delete.module.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ConfirmDelete = ({id, setAskDelete}) => {

    const nav = useNavigate()

    function cancelDelete (e) {
        e.preventDefault()
        setAskDelete(false)
    }

    async function handleDelete (e) {
        e.preventDefault()
        axios.delete((process.env.NODE_ENV === 'production'
            ? process.env.REACT_APP_BACK_END_PROD
            : process.env.REACT_APP_BACK_END_DEV) + `/answer/${id}`, {})
        .then(element => {
            nav('/')
        })
    }

  return (
    <div className={styles.deleteContainer}>
        <div className={styles.confirmDelete} onClick={handleDelete}>Delete</div>
        <div className={styles.cancelDelete} onClick={cancelDelete}>Cancel</div>
    </div>
  )
}

export default ConfirmDelete