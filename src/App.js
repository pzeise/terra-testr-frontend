import './App.css';
import UserContext from './UserContext.js'
import AuthenticatePage from './Pages/AuthenticatePage'

import React, { useState } from 'react'

function App() {

  const [authenticated, setAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [hover, setHover] = useState(false)

  return (
    <UserContext.Provider value={{
        user, setUser,
        authenticated, setAuthenticated,
        hover, setHover
    }}>
      <AuthenticatePage />
    </UserContext.Provider>
  );
}

export default App;
