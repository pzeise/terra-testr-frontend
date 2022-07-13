import React, { useEffect, useContext } from 'react'
import UserContext from '../UserContext'
import { GoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import styles from './css/Login.module.css'

function LoginPage() {
    const { setAuthenticated, setUser } = useContext(UserContext)

    const handleLogin = async googleData => {
        axios.post(process.env.NODE_ENV === 'production'
            ? process.env.REACT_APP_BACK_END_PROD + "/user/login"
            : process.env.REACT_APP_BACK_END_DEV + "/user/login", {
            token: googleData.credential,
            credential: true
        }, {
            withCredentials: true,
            crossDomain: true,
            xhrFields: { withCredentials: true },
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": process.env.NODE_ENV === 'production'
                    ? process.env.REACT_APP_BACK_END_PROD
                    : process.env.REACT_APP_BACK_END_DEV
            }
        }).then(response => {
            localStorage.setItem('token', JSON.stringify(response.data.token))
            setUser(response.data.user)
            setAuthenticated(true)
        })
    }
    console.log(`${process.env.REACT_APP_BACK_END_DEV}`)
    console.log(process.env.REACT_APP_CLIENT_ID)

    return (
        <div className={styles.loginPage}>
            <h1 className={styles.title}>Terra Testr</h1>
            <div className={styles.container}>
                <div className={styles.leftContainer}>
                    <h2 className={styles.signUp}>Log In To Start Playing!</h2>
                    <GoogleLogin
                        clientId='855851051556-ieno6rc3uhpui76osu4ajcm7fko3f7t8.apps.googleusercontent.com'
                        buttonText="Log in with Google"
                        onSuccess={handleLogin}
                        onFailure={handleLogin}
                        cookiePolicy={'single_host_origin'}
                    />
                    <br />
                    <a className={styles.signIn}>Sign in above via your Google Account</a>
                </div>
                {/* <div className={styles.rightContainer}>
                    IMG Source: https://media1.giphy.com/media/1BWKyYQX2K55GwiUPc/giphy.gif?cid=ecf05e47eiw9b5x072c8bk6ivovo5jj1nb256ju5dn6jr4pr&rid=giphy.gif&ct=g
                    <img className={styles.gif} src='/cozy.gif' />
                </div> */}
            </div>
        </div>
    )
}

export default LoginPage