<template>
    <div class="page">
        <div class="main" v-if="$store.state.current === 0" @scroll="onScroll" ref="list">
            <div class="item" v-for="(item, index) in feeds" :key="index" @click="onOpenDetail(item.link)">
                <div class="item__status">
                    <div class="logo" :style="'background-image: url(' + item.feed.ico + ')'">{{item.feed.title}}</div>
                    <div class="time">{{$moment(item.pubDate).toNow()}}</div>
                </div>
                <div class="item__title">{{item.title}}</div>
                <div class="item__content">{{item.contentSnippet}}</div>
            </div>
        </div>
        <div class="main" v-else-if="$store.state.current === 1">
            <div class="menu">
                <div class="btn" @click="$router.push('/feed/custom')">
                    自定义Feed
                </div>
            </div>
            <div class="rssItem" v-for="(item, index) in feedList" :key="index" @click="$router.push({path: '/feed', query: {feedid: item.feed._id, title: item.feed.title, ico: item.feed.ico, intro: item.feed.intro}})">
                <div class="rssItem__ico"><img :src="item.feed.ico" alt=""></div>
                <div class="rssItem__title">
                    <div class="title">{{item.feed.title}}</div>
                    <div class="intro">{{item.feed.intro}}</div>
                </div>
                <div class="rssItem__arrow"><Icon name="arrow" color="#a9a9a9" size="20"></Icon></div>
            </div>
        </div>
        <div class="main" v-else-if="$store.state.current === 2">
            <div class="user">
                <div class="user__info">
                    <div class="user__info--avatar"><img :src="$store.state.userInfo.avatar" :alt="$store.state.userInfo.name" /></div>
                    <h1>{{$store.state.userInfo.name}}</h1>
                    <p>{{$store.state.userInfo.position}}</p>
                </div>
                <div class="user__con">
                    <!--<div class="user__con&#45;&#45;item" @click="$router.push('/personal/collect')">-->
                        <!--<div class="avatar"><Icon name="star-o" /></div>-->
                        <!--<div class="name">订阅关注</div>-->
                        <!--<div class="btn"><Icon name="arrow" /></div>-->
                    <!--</div>-->
                    <div class="user__con--item" @click="$router.push('/personal/push')">
                        <div class="avatar"><Icon name="fire-o" /></div>
                        <div class="name">订阅推送</div>
                        <div class="btn"><Icon name="arrow" /></div>
                    </div>
                </div>
            </div>
        </div>
        <Tabbar v-model="active" @change="onChange">
            <TabbarItem icon="wap-home-o">订阅</TabbarItem>
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
                feedList: [],
                feeds: [],
                pager: {
                    page: 1,
                    size: 20,
                    total: 0
                },
                loading: true
            }
        },
        created() {
            this.active = this.$store.state.current
            this.onGetFeedList()
            this.onGetUserArticle()
        },
        computed: {
            onUpdateUserInfo () {
                return this.$store.state.userInfo
            }
        },
        watch: {
            onUpdateUserInfo () {
                this.onGetFeedList()
                this.onGetUserArticle()
            }
        },
        methods: {
            onGetFeedList () {
                this.$store.dispatch('onGetFeedList', {
                    userid: this.$store.state.userInfo._id,
                })
                    .then(res => {
                        console.log(res)
                        this.feedList = res.result
                    })
            },
            onGetUserArticle () {
                this.$store.dispatch('onGetUserArticle', {
                    userid: this.$store.state.userInfo._id,
                    size: this.pager.size,
                    page: this.pager.page
                })
                    .then(res => {
                        this.pager.total = Math.ceil(res.total / this.pager.size)
                        this.loading = true
                        this.feeds = [...this.feeds, ...res.result]
                    })
            },
            onOpenDetail (link) {
                // this.$router.push({path: '/feed', query: {rss: item.link}})
                window.location.href = link
            },
            onChange (index) {
                this.$store.state.current = index
            },
            onScroll () {
                let scrollHeight = this.$refs.list.scrollHeight
                let clientHeight = this.$refs.list.clientHeight
                let scrollTop = this.$refs.list.scrollTop
                if (scrollTop >= scrollHeight - clientHeight * 2 && this.loading) {
                    this.loading = false
                    this.pager.page += 1
                    if (this.pager.page <= this.pager.total) {
                        this.onGetUserArticle()
                    }
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .page {
        height: 100%;
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
    .user{
        height: calc(100% - 50px);
        overflow-y: auto;
        background: #f4f4f4;
        &__info{
            position: relative;
            &--avatar{
                background: #aaa;
                text-align: center;
                font-size: 50px;
                color: #fff;
                height: 320px;
                line-height: 320px;
                font-size: 0;
                img{
                    display: inline-block;
                    height: 320px;
                    width: auto;
                }
                &::after{
                    display: block;
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 320px;
                    background: rgba($color: #000000, $alpha: 0.1);
                }
            }
            h1{
                font-size: 46px;
                line-height: 60px;
                position: absolute;
                bottom: 66px;
                left: 20px;
                color: #fff;
            }
            p{
                font-size: 24px;
                line-height: 24px;
                position: absolute;
                bottom: 30px;
                left: 20px;
                color: #fff;
            }
        }
        &__con{
            padding: 32px 0 0;
            &--item{
                background: #fff;
                padding: 32px;
                font-size: 36px;
                border-bottom: 4px solid #eee;
                display: flex;
                align-items: center;
                justify-content: space-between;
                :last-child{
                    border: 0;
                }
                .name{
                    flex: 1;
                    padding-left: 16px;
                }
            }
        }
    }
</style>
