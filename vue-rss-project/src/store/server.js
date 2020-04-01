import axios from 'axios'
import { BASE_URL } from '../config'

class Server {
    onGetRSSList (data) {
        return axios({
            url: `${BASE_URL}/rss`,
            method: 'GET',
            params: data
        })
    }
    onCheckRss (data) {
        return axios({
            url: `${BASE_URL}/rss/check`,
            method: 'GET',
            params: data
        })
    }
}

export default new Server()
