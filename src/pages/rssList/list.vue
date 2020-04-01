<template>
    <div>
        <div class="main">
            <div class="item" v-for="(item, index) in feeds.items" :key="index" @click="onOpenDetail(item.content)">
                <div class="item__status">
                    <div class="logo" :style="'background-image: url(' + $route.query.ico +')'">{{feeds.title}}</div>
                    <div class="time">{{$moment(item.isoDate).toNow()}}</div>
                </div>
                <div class="item__title">{{item.title}}</div>
                <div class="item__content">{{item.contentSnippet}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    // import {Icon } from 'vant';
    export default {
        name: "index",
        // components: {Icon},
        data() {
            return {
                active: 0,
                feeds: []
            }
        },
        created() {
            console.log(this.$route.query)
            this.onGetRSSList()
        },
        methods: {
            onGetRSSList () {
                this.$store.dispatch('onGetRSSList', {
                    feed: this.$route.query.rss
                })
                    .then(res => {
                        console.log(res)
                        this.feeds = res.result
                    })
            },
            onOpenDetail (content) {
                this.$router.push({path: '/rssList/detail', query: {content: content}})
                // window.location.href = link
            }
        }
    }
</script>

<style scoped lang="scss">
    .main {
        background-color: #f9f9f9;
        padding: 32px 32px 100px;
        min-height: 100%;
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
    }
</style>
