# Terra-Testr-Frontend

**Project Description**<br />
The frontend for a reimagining of the game GeoGuesser, where you take on puzzles of three increasingly easier hints instead of GeoGuesser's format of earning points. The goal of the game is to guess within 50km of the hint you're currently on, each of the hints are located in increasingly populated area's with the final hint being in front of some sort of landmark. Each guess has a chance to win, with feedback on distance to the location if you were wrong.

**Link to Deployed API**<br />
Live version deployed to Heroku at: https://terra-testr.netlify.app/

**Technologies Used**<br />
React, HTML5, CSS3, Javascript, Google Maps API, Google Streetview API, Google Distance API, Google oAuth 2.0

**Link to Frontend Application**<br />
Frontend Live Application: https://terra-testr-backend.herokuapp.com/<br />
Frontend GitHub: https://github.com/pzeise/terra-testr-backend

**Application Functionality**<br />
Note, some differences in coloring from deployed application may be noticed in gifs below due to screen recording limitations. 

**Unsolved Problems**<br />
Due to cross-domain restrictions and chosen deployment applications (Netlify and Heroku) being on the public-suffix list, we were unable to deploy our original authentication method. We originally set HTTP cookies to maintain user authentication sessions, but due to domain restrictions were unable to set cookies and switched to local storage user session validation. 

**Installation Instructions**<br />
1. Fork and clone down this repository.
2. Install required packages using `npm i`.
3. Obtain an API key from the Google Maps API site. 
4. Assign the following env variables in an .env file at your root:
    - DEV_DB_URL: Your development database URL.
    - DB_URL: Your production database URL (if deploying).
    - REACT_APP_FRONT_END_DEV: Your frontend dev URL (default: http://localhost:3000/)
    - REACT_APP_BACK_END_DEV: Your backend dev URL (default: http://localhost:4000/)
    - REACT_APP_MAPS_API_KEY: Your google API Key
    - CLIENT_ID: Your google Client ID
5. Run the backend API by following the instructions in the repo linked above. 
6. Test the app functionality by running `npx nodemon server.js` to start the server. 

**Authors / Contributors**<br />
Phil Zeise
