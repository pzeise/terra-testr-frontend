import axios from "axios"



export async function saveAnswer(answer) {
    console.log('in save answer')
    console.log(answer)
    axios.post((process.env.NODE_ENV === 'production'
            ? process.env.REACT_APP_BACK_END_PROD
            : process.env.REACT_APP_BACK_END_DEV) + `/answer`, answer)
          .then(res => {
            console.log(res)
            return res.data
          })
          .catch(console.error)
  }