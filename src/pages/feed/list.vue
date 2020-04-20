<template>
    <div class="page">
        <div class="main"  @scroll="onScroll" ref="list">
            <div class="rssItem">
                <div class="rssItem__ico"><img :src="rss.ico" alt=""></div>
                <div class="rssItem__title">
                    <div class="title">{{rss.title}}</div>
                    <div class="intro">{{rss.intro}}</div>
                </div>
                <div class="rssItem__arrow"><Icon name="star" :color="iconColor" size="20" @click.stop="onFollow()"></Icon></div>
            </div>
            <div class="item" v-for="(item, index) in feeds" :key="index" @click="onOpenDetail(item.link)">
                <div class="item__status">
                    <div class="logo">
                        <img class="img" :src="item.feed.ico" />
                        <span class="txt">{{item.feed.title}}</span>
                    </div>
                    <div class="time">{{$moment(item.isoDate).toNow()}}</div>
                </div>
                <div class="item__title">{{item.title}}</div>
                <div class="item__content">{{item.contentSnippet}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import { Icon } from 'vant';
    export default {
        name: "index",
        components: {Icon},
        data() {
            return {
                iconColor: '#a9a9a9',
                rss: {},
                active: 0,
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
            console.log(this.$route.query)
            this.rss = {
                title: this.$route.query.title,
                ico: this.$route.query.ico,
                intro: this.$route.query.intro
            }
            // this.onSearchFollow()
            this.onGetArticles()
        },
        methods: {
            onGetArticles () {
                this.$store.dispatch('onGetArticles', {
                    feedid: this.$route.query.feedid,
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
                if (link) {
                    window.location.href = link
                }
                // this.$router.push({path: '/feed/detail', query: {content: content}})
            },
            onSearchFollow () {
                this.$store.dispatch('onSearchFollow', {
                    userid: this.$store.state.userInfo.userid,
                    websiteId: this.$route.query.websiteId
                })
                    .then(res => {
                        console.log(res)
                        if (res.followed) {
                            this.iconColor = '#F3B24F'
                        } else {
                            this.iconColor = '#a9a9a9'
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            onFollow () {
                console.log({
                    userid: this.$store.state.userInfo.userid,
                    websiteId: this.$route.query.websiteId
                })
                this.$store.dispatch('onFollow', {
                    userid: this.$store.state.userInfo.userid,
                    websiteId: this.$route.query.websiteId
                })
                    .then(res => {
                        console.log(res)
                        if (res.followed) {
                            this.iconColor = '#F3B24F'
                        } else {
                            this.iconColor = '#a9a9a9'
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            onScroll () {
                let scrollHeight = this.$refs.list.scrollHeight
                let clientHeight = this.$refs.list.clientHeight
                let scrollTop = this.$refs.list.scrollTop
                if (scrollTop >= scrollHeight - clientHeight * 2 && this.loading) {
                    console.log(123)
                    this.loading = false
                    this.pager.page += 1
                    if (this.pager.page <= this.pager.total) {
                        this.onGetArticles()
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
                /*.logo {*/
                /*color: #ababab;*/
                /*padding-left: 30px;*/
                /*background: no-repeat left center;*/
                /*background-size: 24px 24px;*/
                /*}*/
                .logo {
                    display: flex;
                    align-items: center;
                    .img {
                        width: 24px;
                        height: 24px;
                        margin-right: 10px;
                    }
                    .txt {
                        color: #ababab;
                    }
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
    }
    .rssItem {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        height: 240px;
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
</style>
