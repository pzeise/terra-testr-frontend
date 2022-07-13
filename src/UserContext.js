import { createContext } from "react"

const UserContext = createContext({
    authenticated: false,
    user: null,
    setAuthenticated: (auth) => {},
    setUser: (user) => {}
})

export default UserContext