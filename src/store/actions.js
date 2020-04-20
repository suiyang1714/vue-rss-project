import Server from './server'

export default {
    async onGetUserArticle ({state}, data) {
        const res = await Server.onGetUserArticle(data)

        console.log(state)
        return res.data
    },
    async onGetFeedList ({state}, data) {
        const res = await Server.onGetFeedList(data)

        console.log(state)
        return res.data
    },
    async onFeedPushCreate ({state}, data) {
        const res = await Server.onFeedPushCreate(data)

        console.log(state)
        return res.data
    },
    async onGetArticles ({state}, data) {
        const res = await Server.onGetArticles(data)

        console.log(state)
        return res.data
    },
    async onLogin ({state}, data) {
        let res;
        if (data.code) {
            let d = await Server.onLogin(data);
            state.userInfo = d.data.result;
            localStorage.setItem('userInfo', JSON.stringify(d.result));
            res = d.data.result;
        } else {
            res = JSON.parse(localStorage.getItem('userInfo'));
        }
        state.userInfo = res;
        return res
    },
    async onSearchFeed ({state}, data) {
        const res = await Server.onSearchFeed(data)

        console.log(state)
        return res.data
    },
    async onGetUserFeedPush ({state}, data) {
        const res = await Server.onGetUserFeedPush(data)

        console.log(state)
        return res.data
    },
    async onUpdateFeedTag ({state}, data) {
        const res = await Server.onUpdateFeedTag(data)

        console.log(state)
        return res.data
    }
}
