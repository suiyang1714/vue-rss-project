import Server from './server'

export default {
    async onGetRSSList ({state}, data) {
        const res = await Server.onGetRSSList(data)

        console.log(state)
        return res.data
    },
    async onGetFeedList ({state}, data) {
        const res = await Server.onGetFeedList(data)

        console.log(state)
        return res.data
    },
    async onCheckRss ({state}, data) {
        const res = await Server.onCheckRss(data)

        console.log(state)
        return res.data
    },
    async onLogin ({state}, data) {
        const res = await Server.onLogin(data)

        console.log(state)
        return res.data
    },
    async onGetRssSingle ({state}, data) {
        const res = await Server.onGetRssSingle(data)

        console.log(state)
        return res.data
    }
}
