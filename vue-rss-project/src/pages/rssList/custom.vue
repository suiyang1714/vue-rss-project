<template>
    <div class="page">
        <Field
                v-model="rssData.feed"
                center
                clearable
                label="订阅源"
                placeholder="请输入订阅源"
        >
            <template #button>
                <Button size="small" type="info" @click="onCheckRss()">检测Feed</Button>
            </template>
        </Field>
        <Field v-model="rssData.title"
               label="订阅源名称"
               placeholder="请输入订阅源名称" />
        <Field
                v-model="rssData.intro"
                rows="1"
                autosize
                label="订阅源描述"
                type="textarea"
                placeholder="请输入订阅源描述"
        />
        <div style="margin: 16px;">
            <Button round block type="info" native-type="submit" @click="onsubmit()">
                提交
            </Button>
        </div>
    </div>
</template>

<script>
    import { Field, Button } from 'vant';
    export default {
        name: "index",
        components: {Field, Button},
        data () {
            return {
                rssData: {
                    feed: '',
                    title: '',
                    intro: ''
                },
                rssSuccess: false
            }
        },
        methods: {
            onCheckRss () {
                this.$store.dispatch('onCheckRss', {
                    feed: this.rssData.feed
                })
                    .then(res => {
                        if (res.status === 200) {
                            this.rssSuccess = true
                            this.$toast('该订阅源有效')
                        } else {
                            this.rssSuccess = false
                            this.$toast('该订阅源无效')
                        }
                    })
                    .catch(err => {
                        this.$toast('该订阅源无效')
                        console.log(err)
                    })
            },
            onsubmit () {
                if (this.rssSuccess) {
                    this.$toast('开发ing')
                } else {
                    this.$toast('订阅源未检测或者无效，请重新输入或检测')
                }
            }
        }
    }
</script>

<style scoped>

</style>
