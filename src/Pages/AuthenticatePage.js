import React, { useEffect, useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'


import UserContext from '../UserContext.js'
import LoginPage from './LoginPage.js'
import PlayingPage from './PlayingPage.js'

const AuthenticatePage = () => {
    const { authenticated, setAuthenticated, setUser } = useContext(UserContext)

    useEffect(() => {
        axios.get(process.env.NODE_ENV === 'production'
            ? process.env.REACT_APP_BACK_END_PROD + "/user/me"
            : process.env.REACT_APP_BACK_END_DEV + "/user/me",
            {
                withCredentials: true,
                headers: { token: JSON.parse(localStorage.getItem('token')) }
            }).then(response => {
                const { authenticated, user } = response.data
                setAuthenticated(authenticated)
                setUser(user)
            })
    }, [])


  return (
    <>
        {authenticated
            ?
            <div>
                <main>
                    <div className='bodyContainerLayout'>
                        <div className='bodyContentLayout'>
                            <Routes>
                                <Route path='/' element={<PlayingPage/>} />
                            </Routes>
                        </div>
                    </div>
                </main>
            </div>
            :
            <div>
                <LoginPage />
            </div>
        }
    </>
  )
}

export default AuthenticatePage