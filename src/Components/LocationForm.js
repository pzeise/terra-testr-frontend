import React, {useState, useContext} from 'react'
import styles from './css/locationForm.module.css'
import UserContext from '../UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const LocationForm = () => {

    const nav = useNavigate()
    const {user, rerender, setRerender, puzzles, setPuzzles} = useContext(UserContext)

    const [formState, setFormState] = useState({user: user._id})
    const [newLoc, setNewLoc] = useState({})
    const [entry, setEntry] = useState(0)

    const handleChange = e => {
        setFormState({...formState, [e.target.id]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        console.log('submitted')
        if (formState !== newLoc){
            setNewLoc(formState)
            setEntry(entry+1)
        }
    }

    async function handlePost (e) {
        e.preventDefault()
        axios.post((process.env.NODE_ENV === 'production'
            ? process.env.REACT_APP_BACK_END_PROD
            : process.env.REACT_APP_BACK_END_DEV) + `/answer`, newLoc)
        .then(element => {
            console.log(element)
            setPuzzles([...puzzles, element])
            setRerender(rerender+1)
            nav('/')
        })
    }

    return (
        <div className={styles.formContainer}>
            {newLoc.title ? 
            <h2 className={styles.formTitle}>{newLoc.title}</h2> : null}
            {newLoc.image ? 
            <div className={styles.formImage}>
                <img className={styles.formImageActual} 
                    src={newLoc.image}
                    alt='Location'></img>
            </div> : null}
            {newLoc.Lng1 ? 
            <>
                <div>First Location:</div>
                <div>{`Latitude: ${newLoc.Lat1}, Longitude: ${newLoc.Lng1}`}</div>
            </>
            : null}
            {newLoc.Lng2 ? 
            <>
                <div>Second Location:</div>
                <div>{`Latitude: ${newLoc.Lat2}, Longitude: ${newLoc.Lng2}`}</div>
            </>
            : null}
            {newLoc.Lng3 ? 
            <>
                <div>Landmark Location:</div>
                <div>{`Latitude: ${newLoc.Lat3}, Longitude: ${newLoc.Lng3}`}</div>
            </>
            : null}
            {entry < 1 ? 
            <form>
                <div className={styles.formInputs}>                
                    <label htmlFor="title">Location:</label>
                    <input 
                        type="text"
                        placeholder="City, Country"
                        id="title"
                        onChange={handleChange}
                        value={formState.title}
                    />
                </div>
                <div className={styles.formInputs}>
                    <label htmlFor="image">Image Link:</label>
                    <input 
                        type="text"
                        placeholder="Direct link to image"
                        id="image"
                        onChange={handleChange}
                        value={formState.image}
                    />
                </div>
                {formState.image && formState.title 
                ? <button className={styles.formNext} onClick={handleSubmit}>Next</button> 
                : null}
            </form> : null}
            {entry > 0 && entry < 4 ? 
            <form>
                <div className={styles.formInputs}>                
                    <label htmlFor={`Lat${entry}`}>Latitude:</label>
                    <input 
                        type="text"
                        placeholder=""
                        id={`Lat${entry}`}
                        onChange={handleChange}
                        value={formState[`Lat${entry}`]}
                    />
                </div>
                <div className={styles.formInputs}>
                    <label htmlFor={`Lng${entry}`}>Longitude:</label>
                    <input 
                        type="text"
                        placeholder=""
                        id={`Lng${entry}`}
                        onChange={handleChange}
                        value={formState[`Lng${entry}`]}
                    />
                </div>
                {formState[`Lng${entry}`] && formState[`Lat${entry}`] 
                ? <button className={styles.formNext} onClick={handleSubmit}>Next</button> 
                : null}
            </form> : null}
            {entry > 3 ? 
            <button className={styles.formNext} onClick={handlePost}>Save</button> //real shit here
            : null }
        </div>
    )
}

export default LocationForm