import { createContext } from "react"

const UserContext = createContext({
    authenticated: false,
    user: null,
    hover: false, 
    rerender: 0,
    puzzles: null,
    setAuthenticated: (auth) => {},
    setUser: (user) => {},
    setHover: (hover) => {},
    setRerender: (rerender) => {},
    setPuzzles: (puzzles) => {}
})

export default UserContext