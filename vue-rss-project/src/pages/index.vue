<template>
    <div class="page">
        <div class="main" v-if="$store.state.current === 0">
            <div class="item" v-for="(item, index) in feeds.items" :key="index" @click="onOpenDetail(item.link)">
                <div class="item__status">
                    <div class="logo" style="background-image: url('https://36kr.com/favicon.ico')">{{feeds.title}}</div>
                    <div class="time">{{$moment(item.isoDate).toNow()}}</div>
                </div>
                <div class="item__title">{{item.title}}</div>
                <div class="item__content">{{item.contentSnippet}}</div>
            </div>
        </div>
        <div class="main" v-else-if="$store.state.current === 1">
            <div class="menu">
                <div class="btn" @click="$router.push('/rsslist/custom')">
                    自定义Feed
                </div>
            </div>
            <div class="rssItem" v-for="(item, index) in rssList" :key="index" @click="$router.push({path: '/rssList', query: {rss: item.feed, ico: item.ico}})">
                <div class="rssItem__ico"><img :src="item.ico" alt=""></div>
                <div class="rssItem__title">
                    <div class="title">{{item.title}}</div>
                    <div class="intro">{{item.intro}}</div>
                </div>
                <div class="rssItem__arrow"><Icon name="arrow" color="#a9a9a9" size="20"></Icon></div>
            </div>
        </div>
        <Tabbar v-model="active" @change="onChange">
            <TabbarItem icon="home-o">订阅</TabbarItem>
            <TabbarItem icon="home-o">订阅源</TabbarItem>
            <TabbarItem icon="ellipsis">其他</TabbarItem>
        </Tabbar>
    </div>
</template>

<script>
    import { Tabbar, TabbarItem, Icon } from 'vant';
    export default {
        name: "index",
        components: {Tabbar, TabbarItem, Icon},
        data() {
            return {
                active: 0,
                rssList: [
                    {
                        title: '知乎每日精选',
                        ico: 'http://img.printf520.com/img/zhihu.ico',
                        intro: '中文互联网最大的知识平台，帮助人们便捷地分享彼此的知识、经验和见解。',
                        feed: 'https://www.zhihu.com/rss'
                    },
                    {
                        title: '36氪',
                        ico: 'https://36kr.com/favicon.ico',
                        intro: '让一部分人先看到未来',
                        feed: 'https://www.36kr.com/feed'
                    },
                    {
                        title: 'IT之家',
                        ico: 'https://www.ithome.com/favicon.ico',
                        intro: 'IT之家 - 软媒旗下网站',
                        feed: 'https://www.ithome.com/rss/'
                    },
                    // {
                    //     title: ' V2EX',
                    //     ico: 'https://v2ex.com/static/img/icon_rayps_64.png',
                    //     intro: 'V2EX 是一个关于分享和探索的地方',
                    //     feed: 'https://www.v2ex.com/index.xml'
                    // },
                    {
                        title: '少数派',
                        ico: 'https://cdn.sspai.com/sspai/assets/img/favicon/icon.ico',
                        intro: '少数派致力于更好地运用数字产品或科学方法，帮助用户提升工作效率和生活品质',
                        feed: 'https://sspai.com/feed'
                    }
                ],
                feeds: []
            }
        },
        created() {
            this.active = this.$store.state.current
            this.onGetRSSList()
        },
        methods: {
            onGetRSSList () {
                this.$store.dispatch('onGetRSSList')
                    .then(res => {
                        console.log(res)
                        this.feeds = res.result
                    })
            },
            onOpenDetail (link) {
                // this.$router.push({path: '/rssList', query: {rss: item.link}})
                window.location.href = link
            },
            onChange (index) {
                this.$store.state.current = index
            }
        }
    }
</script>

<style scoped lang="scss">
    .page {
        min-height: 100%;
        display: flex;
        flex-direction: column;
    }
    .main {
        background-color: #f9f9f9;
        padding: 32px 32px 100px;
        flex: 1;
        overflow-y: scroll;
        .item {
            padding-bottom: 20px;
            border-bottom: 2px solid #f3f3f3;
            margin-bottom: 20px;
            &__status {
                display: flex;
                justify-content: space-between;
                font-size: 24px;
                margin-bottom: 20px;
                .logo {
                    color: #ababab;
                    padding-left: 30px;
                    background: no-repeat left center;
                    background-size: 24px 24px;
                }
                .time {
                    color: #a9a9a9
                }
            }
            &__title {
                color: #070707;
                font-size: 32px;
                line-height: 48px;
                margin-bottom: 10px;
            }
            &__content {
                color: #5a5a5a;
                font-size: 28px;
                overflow : hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 4;
                -webkit-box-orient: vertical;
            }
        }
        .rssItem {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
            height: 120px;
            &__ico {
                width: 40px;
                height: 40px;
                margin-right: 20px;
                img {
                    display: block;
                    width: 40px;
                    height: 40px;
                }
            }
            &__title {
                flex: 1;
                .title {
                    color: #070707;
                    font-size: 32px;
                    line-height: 40px;
                    margin-bottom: 5px;
                }
                .intro {
                    color: #5a5a5a;
                    font-size: 28px;
                    overflow : hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
            }
            &__arrow {
                width: 100px;
                display: flex;
                align-items: center;
                justify-content: flex-end;
            }
        }
        .menu {
            margin-bottom: 20px;
            text-align: right;
            .btn {
                display: inline-block;
                text-align: center;
                width: 200px;
                border-bottom: 2px solid #5a5a5a;
                height: 40px;
                font-size: 28px;
                line-height: 40px;
                color: #5a5a5a;
            }
        }
    }
</style>
