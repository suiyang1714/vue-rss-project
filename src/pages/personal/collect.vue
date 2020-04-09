<template>
    <div class="page">
        <div class="rssItem" v-for="(item, index) in rssList" :key="index" @click="$router.push({path: '/rssList', query: {websiteId: item._id}})">
            <div class="rssItem__ico"><img :src="item.ico" alt=""></div>
            <div class="rssItem__title">
                <div class="title">{{item.title}}</div>
                <div class="intro">{{item.intro}}</div>
            </div>
            <div class="rssItem__arrow"><Icon name="star" :color="iconColor" size="20" @click.stop="onFollow(item._id)"></Icon></div>
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
                iconColor: '#F3B24F',
                rssList: [],
                feeds: []
            }
        },
        created () {
            this.onGetFollowList()
        },
        methods: {
            onGetFollowList () {
                this.$store.dispatch('onGetFollowList', {
                    userid: this.$store.state.userInfo.userid
                })
                    .then(res => {
                        this.rssList = res.result
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            onFollow (id) {
                this.$store.dispatch('onFollow', {
                    userid: this.$store.state.userInfo.userid,
                    websiteId: id
                })
                    .then(res => {
                        console.log(res)
                        this.onGetFollowList()
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        }
    }
</script>

<style scoped lang="scss">
    .page {
        /*background-color: #f9f9f9;*/
        padding: 32px 32px 100px;
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
</style>
