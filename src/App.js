import './App.css';
import UserContext from './UserContext.js'
import AuthenticatePage from './Pages/AuthenticatePage'

import React, { useState } from 'react'

function App() {

  const [authenticated, setAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  return (
    <UserContext.Provider value={{
        user, setUser,
        authenticated, setAuthenticated
    }}>
      <AuthenticatePage />
    </UserContext.Provider>
  );
}

export default App;
