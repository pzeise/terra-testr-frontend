import React, { useContext, useState } from 'react'
import styles from './css/puzzleList.module.css'
import UserContext from '../UserContext'
import { Link } from 'react-router-dom'


const PuzzleList = () => {
    const {user, puzzles} = useContext(UserContext)
    const [spin, setSpin] = useState({})

    const setSpinOn = (e) => {
        console.log(e._targetInst.key)
        let key = e._targetInst.key
        let update = {}
        update[key] = true
        console.log(update)
        setSpin(update);
      };
    
      const setSpinOff = (e) => {
        setSpin({});
      };

    return (
        <section className={styles.container}>
            {puzzles.map((puzzle, idx) => (
                <Link to={`/play/${puzzle._id}`} key={idx} style={{textDecoration: 'none'}}>
                    <div className={styles.card}>
                        <div className={styles.cardImage}>
                            <img className={styles.cardImageActual} 
                                 src={puzzle.show ? puzzle.endState.image : '/globe.png'} 
                                 alt={puzzle.show ? puzzle.endState.title : 'Mystery'}></img>
                        </div>
                        <div className={styles.cardTitle}>
                            <h3>{puzzle.show ? puzzle.endState.title : 'Mystery Location'}</h3>
                            {puzzle.show ? <h4>{`Found in ${puzzle.hints}` + (puzzle.hints > 1? ' hints' : ' hint')}</h4> : null}
                        </div>
                        {puzzle.owner.some(id => id === user._id) 
                        ? <Link to={`/add/${puzzle._id}`} style={{textDecoration: 'none'}}>
                            <div
                                className={spin[idx] ? styles.editGearSpin : styles.editGear}
                                onMouseEnter={setSpinOn}
                                onMouseLeave={setSpinOff}
                                key={idx}
                            >
                                <img
                                    className={styles.editGearActual}
                                    src="/gear.svg"
                                    alt="Add Marker"
                                    key={idx}
                                ></img>
                            </div>
                        </Link> : null}
                    </div>
                </Link>
            ))}
            <Link to={`/add`} style={{textDecoration: 'none'}}>
                <div className={styles.card}>
                    <div className={styles.cardImage}>
                        <img className={styles.cardImageActual} 
                                src='/addMarker.svg' 
                                alt='Add Marker'></img>
                    </div>
                    <div className={styles.cardTitle}>
                        <h3>Add a Location?</h3>
                    </div>
                </div>
            </Link>
        </section>
    )
}


export default PuzzleList