<template>
    <div class="page">
        <div class="logo"><img src="../../assets/logo@3x.png" alt=""></div>
        <div class="flex">
            <div class="item" v-for="(item, index) in feedList" v-bind:key="index" @click="onSelectWebsite(index)">
                <div class="item__ico"><img :src="item.feed.ico" alt=""></div>
                <div class="item__title">{{item.feed.title}}</div>
                <div class="item__status"><van-switch v-model="item.pushed" @click.stop="onSwitch(item)" size="24" ></van-switch></div>
            </div>
        </div>
        <div class="flex">
            <Field
                    v-model="tag"
                    rows="1"
                    autosize
                    label="关键词"
                    type="textarea"
                    placeholder="请输入关键词"
            >
                <template #button>
                    <Button size="small" type="info" @click="onAddTag()">新增</Button>
                </template>
            </Field>
            <div class="tags">
                <Tag type="primary" size="medium" v-for="(item, index) in tags" v-bind:key="index" closeable @close="onDeleteTag(index)" >{{item}}</Tag>
            </div>

        </div>
    </div>
</template>

<script>
    import { Field, Tag, Button } from 'vant';
    export default {
        name: "index",
        components: {Field, Tag, Button},
        data () {
            return {
                feedList: [],
                active: 0,
                result: [],
                tags: [],
                tag: ''
            }
        },
        created () {
            this.onGetUserFeedPush()
        },
        methods: {
            onSelectWebsite (index) {
                console.log(index)
                this.active = index
            },
            onGetUserFeedPush () {
                this.$store.dispatch('onGetUserFeedPush', {
                    userid: this.$store.state.userInfo._id
                })
                    .then(res => {
                        this.feedList = res.result
                        this.tags = this.feedList[this.active].tags
                    })
            },
            onSwitch (item) {
                this.$store.dispatch('onArticlePush', {
                    websiteid: item._id,
                    userid: this.$store.state.userInfo._id,
                    pushed: item.follow[0].pushed
                })
                    .then(res => {
                        console.log(res)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            onCheckbox (val) {
                this.$store.dispatch('onArticlePushTags', {
                    websiteid: this.followList[this.tagsActive]._id,
                    userid: this.$store.state.userInfo._id,
                    tags: val
                })
                    .then(res => {
                        console.log(res)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            // 删除标签
            onDeleteTag (index) {
                this.tags.splice(index, 1)
                this.onUpdateFeedTag()
            },
            onAddTag () {
                this.tags.push(this.tag)
                this.tag = ''
                this.onUpdateFeedTag()
            },
            onUpdateFeedTag () {
                this.$store.dispatch('onUpdateFeedTag', {
                    pushid: this.feedList[this.active]._id,
                    tags: this.tags
                })
                    .then(res => {
                        console.log(res)
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
        height: 100%;
        display: flex;
        flex-direction: column;
        .logo {
            padding-top: 70px;
            text-align: center;
            img {
                display: inline-block;
                width: 160px;
                height: 321px;
            }
        }
        .flex {
            flex: 1;
            overflow-y: scroll;
            border-bottom: 1px solid grey;
            padding: 0 24px;
            .item {
                height: 96px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                /*padding: 0 24px;*/
                &__ico {
                    width: 40px;
                    height: 40px;
                    margin-right: 12px;
                    img {
                        display: block;
                        width: 40px;
                        height: 40px;
                    }
                }
                &__title {
                    flex: 1;
                    font-size:34px;
                    font-weight: bold;
                    color:rgba(51,51,51,1);
                    line-height:48px;
                }
            }
            .van-checkbox {
                height: 96px;
                font-size:30px;
                color:rgba(51,51,51,1);
                line-height:42px;
            }
            .tags {
                display: flex;
                flex-wrap: wrap;
                padding: 24px;
                .van-tag {
                    height: 44px;
                    margin-bottom: 12px;
                    margin-right: 24px;
                }
            }
        }
    }
</style>
