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
    onGetFeedList (data) {
        return axios({
            url: `${BASE_URL}/feed`,
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
    onLogin (data) {
        return axios({
            url: `${BASE_URL}/user/get`,
            method: 'GET',
            params: data
        })
    }
    onGetRssSingle (data) {
        return axios({
            url: `${BASE_URL}/feed/single`,
            method: 'GET',
            params: data
        })
    }
}

export default new Server()
