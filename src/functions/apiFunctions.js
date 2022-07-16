import axios from "axios"



export function saveAnswer(answer) {
    axios.post((process.env.NODE_ENV === 'production'
            ? process.env.REACT_APP_BACK_END_PROD
            : process.env.REACT_APP_BACK_END_DEV) + `/answer/${user._id}/${answer._id}/${hint+1}`)
          .then(user => {
            return user
          })
          .catch(console.error)
  }