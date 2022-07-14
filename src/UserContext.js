import { createContext } from "react"

const UserContext = createContext({
    authenticated: false,
    user: null,
    hover: false, 
    setAuthenticated: (auth) => {},
    setUser: (user) => {},
    setHover: (user) => {}
})

export default UserContext