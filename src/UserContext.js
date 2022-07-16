import { createContext } from "react"

const UserContext = createContext({
    authenticated: false,
    user: null,
    hover: false, 
    rerender: 0,
    setAuthenticated: (auth) => {},
    setUser: (user) => {},
    setHover: (user) => {},
    setRerender: (user) => {}
})

export default UserContext