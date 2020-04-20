import axios from 'axios'
import { BASE_URL } from '../config'

class Server {
    onGetUserArticle (data) {
        return axios({
            url: `${BASE_URL}/feed/user/article`,
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
    onFeedPushCreate (data) {
        return axios({
            url: `${BASE_URL}/feed/push/create`,
            method: 'POST',
            data: data
        })
    }
    onLogin (data) {
        return axios({
            url: `${BASE_URL}/user/get`,
            method: 'GET',
            params: data
        })
    }
    onGetArticles (data) {
        return axios({
            url: `${BASE_URL}/feed/single/article`,
            method: 'GET',
            params: data
        })
    }
    onGetUserFeedPush (data) {
        return axios({
            url: `${BASE_URL}/feed/push/user/list`,
            method: 'GET',
            params: data
        })
    }
    onSearchFeed (data) {
        return axios({
            url: `${BASE_URL}/feed/search`,
            method: 'GET',
            params: data
        })
    }
    onUpdateFeedTag (data) {
        return axios({
            url: `${BASE_URL}/feed/push/update`,
            method: 'POST',
            data: data
        })
    }
}

export default new Server()
