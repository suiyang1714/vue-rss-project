<template>
    <div class="page">
        <div class="main">
            <Search v-model="search" @input="onSearchFeed" placeholder="请输入搜索订阅源关键词，例如：36氪" />
            <div class="search__result">
                <div class="item" v-for="(item, index) in searchList" v-bind:key="index" @click="onSelectFeed(item)">
                    <div class="item__ico"><img :src="item.ico" alt=""></div>
                    <div class="item__title">{{item.title}}</div>
                </div>
            </div>
            <Field v-model="feedData.title"
                   label="订阅源名称"
                   placeholder="" readonly />
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
        <div style="margin: 16px;">
            <Button round block type="info" native-type="submit" @click="onFeedPushCreate()">
                提交
            </Button>
        </div>
    </div>
</template>

<script>
    import { Field, Button, Search, Tag } from 'vant';
    export default {
        name: "index",
        components: {Field, Button, Search, Tag},
        data () {
            return {
                feedData: {},
                search: '',
                searchList: [],
                tags: [],
                tag:''
            }
        },
        created() {
          this.onSearchFeed('')
        },
        methods: {
            onFeedPushCreate () {
                this.$store.dispatch('onFeedPushCreate', {
                    userid: this.$store.state.userInfo._id,
                    feedid: this.feedData.feedid,
                    tags: this.tags
                })
                    .then(res => {
                        console.log(res)
                        this.$router.back()
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            onSearchFeed (val) {
                // if (val !== '') {
                    this.$store.dispatch('onSearchFeed', {
                        search: val
                    })
                        .then(res => {
                            if (res.status === 200) {
                                this.searchList = res.result
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                // }
            },
            onSelectFeed (data) {
                this.search = ''
                this.searchList = []
                this.feedData.title = data.title
                this.feedData.feedid = data._id
            },
            onDeleteTag (index) {
                this.tags.splice(index, 1)
            },
            onAddTag () {
                this.tags.push(this.tag)
                this.tag = ''
            }
        }
    }
</script>

<style scoped lang="scss">
    .page {
        height: 100%;
        display: flex;
        flex-direction: column;
        .main {
            flex: 1;
            overflow-y: scroll;
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
    .search {
        &__result {
            /*background-color: #000;*/
            max-height: 400px;
            overflow-y: scroll;
            .item {
                height: 96px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 24px;
                &__ico {
                    width: 40px;
                    height: 40px;
                    margin-right: 14px;
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
                    /*line-height:40px;*/
                }
            }
        }
    }
</style>
