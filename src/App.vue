<template>
  <div id="app">
    <div v-if="isLogin" style="height: 100%;">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import {DEVELOP} from './config'
  export default {
    name: 'App',
    data () {
      return {
        isLogin: false
      }
    },
    created () {
      let code = this.base_getUrl('code');
      console.log(code)
      if (code) {
        this.$store.dispatch('onLogin', {
          code: code
        })
                .then(res => {
                  console.log(res)
                  this.isLogin = true;
                })
                .catch(err => {
                  console.log(err)
                })
      }else if(!DEVELOP){
        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=ww8d0e994b898e7746&redirect_uri=http://h5.snailsleep.net/rssproject/&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect'
      }else{
        this.isLogin = true;
      }
    },
    methods: {
      base_getUrl(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
      }
    }
  }
</script>

<style>
  html,body,#app{
    width: 100%;
    min-height: 100%;
  }
  #app>.main{
    height: 100%;
    overflow-y: auto;
    background: #f4f4f4;
    -webkit-overflow-scrolling: touch;
  }
</style>
