import React, { useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

import UserContext from "../UserContext.js";
import LoginPage from "./LoginPage.js";
import PlayingPage from "./PlayingPage.js";
import MainMenu from "./MainMenu.js";
import AddLocation from "./AddLocation.js";

const AuthenticatePage = () => {
  const { authenticated, rerender, setAuthenticated, setUser } =
    useContext(UserContext);

  useEffect(() => {
    axios
      .get(
        process.env.NODE_ENV === "production"
          ? process.env.REACT_APP_BACK_END_PROD + "/user/me"
          : process.env.REACT_APP_BACK_END_DEV + "/user/me",
        {
          withCredentials: true,
          headers: { token: JSON.parse(localStorage.getItem("token")) },
        }
      )
      .then((response) => {
        const { authenticated, user } = response.data;
        setAuthenticated(authenticated);
        setUser(user);
      });
  }, [rerender]);

  return (
    <>
      {authenticated ? (
        <div>
          <main>
            <div className="bodyContainerLayout">
              <div className="bodyContentLayout">
                <Routes>
                  <Route path="/" element={<MainMenu />} />
                  <Route path="/play/:id" element={<PlayingPage />} />
                  <Route path="/add" element={<AddLocation />} />
                </Routes>
              </div>
            </div>
          </main>
        </div>
      ) : (
        <div>
          <LoginPage />
        </div>
      )}
    </>
  );
};

export default AuthenticatePage;
