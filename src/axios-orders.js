import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://myburgerapp-d20b7.firebaseio.com/'
})

export default instance