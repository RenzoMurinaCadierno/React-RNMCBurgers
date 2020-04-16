import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://rnmcburgers.firebaseio.com/'
})

export default instance