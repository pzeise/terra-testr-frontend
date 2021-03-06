import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Header from '../Components/Header'
import PuzzleList from '../Components/PuzzleList'
import styles from './css/MainMenu.module.css'
import UserContext from '../UserContext'

const MainMenu = () => {
    const {user, puzzles, setPuzzles} = useContext(UserContext)
    const [random, setRandom] = useState(null)


    useEffect(() => {
          axios.get((process.env.NODE_ENV === 'production'
          ? process.env.REACT_APP_BACK_END_PROD
          : process.env.REACT_APP_BACK_END_DEV) + `/answer/forUser/${user._id}`, 
          {})
          .then(res => setPuzzles(res.data))
          .catch(console.error)
      }, [])
    
    //pick random quiz
    useEffect(() => {
      if(puzzles && "show" in puzzles[0]) {
        let x = [...puzzles.sort((a, b) => {
          if (a.show || !b.show) return -1
          else return 1
        })]

        let idx_low = x.findIndex(element => !element.show)
        let idx_final = Math.floor(Math.random() * (x.length - idx_low) ) + idx_low
        setRandom(x[idx_final])
      }
    }, [puzzles])



    if (!puzzles) return <img className={styles.gif} src='https://media3.giphy.com/media/VI2UC13hwWin1MIfmi/giphy.gif?cid=ecf05e470roply655zexs6wmhv6i0ul8qqoxu9v72v0m8c35&rid=giphy.gif&ct=g' />
    return (
      <>
          <header>
              <Header/>
          </header>
          <main>
            <div className={styles.topOfPage}>
              <h2>Get ready to explore!</h2>
              <h1>Terra Testr</h1>
              <div>Observe your surroundings and make guesses as to where you are! Each game consists of 3 hints within 10km of each other and the final hint will always be a landmark. Win the game by guessing within 50km of any hint. Most importantly: Have fun!</div>
              {random ? 
              <Link to={`/play/${random._id}`} style={{textDecoration: 'none'}}>
                <div className={styles.randomButton}>Jump Right in</div>
              </Link> : null}
            </div>
              <PuzzleList/>
          </main>
      </>
    )
}


export default MainMenu