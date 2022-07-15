import React, {useState, useEffect} from 'react'
import axios from 'axios'

import Header from '../Components/Header'
import Footer from '../Components/Footer'
import PuzzleList from '../Components/PuzzleList'
import styles from './css/MainMenu.module.css'

const MainMenu = () => {
    const [puzzles, setPuzzles] = useState(null)


    useEffect(() => {
          axios.get(process.env.NODE_ENV === 'production'
          ? process.env.REACT_APP_BACK_END_PROD + "/answer"
          : process.env.REACT_APP_BACK_END_DEV + "/answer", 
          {})
          .then(res => setPuzzles(res.data))
          .catch(console.error)
      }, [])
    if (!puzzles) return <img className={styles.gif} src='https://media3.giphy.com/media/VI2UC13hwWin1MIfmi/giphy.gif?cid=ecf05e470roply655zexs6wmhv6i0ul8qqoxu9v72v0m8c35&rid=giphy.gif&ct=g' />
  return (
    <>
        <header>
            <Header/>
        </header>
        <main>
            <PuzzleList puzzles={puzzles} setPuzzles={setPuzzles}/>
        </main>
    </>
  )
}


export default MainMenu