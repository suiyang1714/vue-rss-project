import Server from './server'

export default {
    async onGetRSSList ({state}, data) {
        const res = await Server.onGetRSSList(data)

        console.log(state)
        return res.data
    },
    async onCheckRss ({state}, data) {
        const res = await Server.onCheckRss(data)

        console.log(state)
        return res.data
    }
}
