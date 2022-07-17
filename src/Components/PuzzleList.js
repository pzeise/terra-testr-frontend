import React, {useEffect, useContext, useState} from 'react'
import styles from './css/puzzleList.module.css'
import UserContext from '../UserContext'
import { Link } from 'react-router-dom'


const PuzzleList = () => {
    const {user, puzzles, setPuzzles} = useContext(UserContext)
    // const [scroll, setScroll] = useState(1)

    // function handleScroll () {
    //     console.log('scrolling')
    //     if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
    //     setScroll(scroll+1)
    // }

    // useEffect(() => {
    //     console.log('sorting puzzle list')
    //     let runningList = puzzles
    //     runningList.forEach(puzzle => {
    //         let x = user.completed.find(el => el.id === puzzle._id)
    //         if (x) {
    //             puzzle.show = true
    //             puzzle.hint = x.hints
    //         } else puzzle.show = false
    //     })
    //     setPuzzles([...runningList])
    // }, [user])


    // useEffect(() => {
    //     console.log('setting scroll')
    //     window.addEventListener('scroll', handleScroll)
    //     return () => window.removeEventListener('scroll', handleScroll)
    // }, [])

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
                            <h3>{puzzle.show ? puzzle.endState.title : 'Mystery Loaction'}</h3>
                            {puzzle.show ? <h4>{`Found in ${puzzle.hint}` + (puzzle.hint > 1? ' hints' : ' hint')}</h4> : null}
                        </div>
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