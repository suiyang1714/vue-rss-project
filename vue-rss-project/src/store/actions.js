import Server from './server'

export default {
    async onJoinWishing ({state}, data) {
        const res = await Server.onJoinWishing(data)

        console.log(state)
        return res.data
    }
}
