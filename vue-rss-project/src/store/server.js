import axios from 'axios'
import { BASE_URL } from '../config'

class Server {
    // 用户参加许愿
    onJoinWishing (data) {
        return axios({
            url: `${BASE_URL}/record/wishing`,
            method: 'POST',
            data: data,
            transformRequest: [function(data) {
                let ret = ''
                for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
            }]
        })
    }
}

export default new Server()
