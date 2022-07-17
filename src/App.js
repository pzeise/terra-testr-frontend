import './App.css';
import UserContext from './UserContext.js'
import AuthenticatePage from './Pages/AuthenticatePage'

import React, { useState } from 'react'

function App() {

  const [authenticated, setAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [hover, setHover] = useState(false)
  const [rerender, setRerender] = useState(0)
  const [puzzles, setPuzzles] = useState(null)

  return (
    <UserContext.Provider value={{
        user, setUser,
        authenticated, setAuthenticated,
        hover, setHover,
        rerender, setRerender,
        puzzles, setPuzzles
    }}>
      <AuthenticatePage />
    </UserContext.Provider>
  );
}

export default App;
