<template>
  <div id="app">
      <div>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
      <div class="footer" v-if="show">
        <footer-box></footer-box>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import FooterBox from './components/footer/index.vue'

  export default {
    components: {
      FooterBox
    },
    data() {
      return {
        show:true
      }
    },
    watch: {
      $route () {//底部导航栏的显示控制
        if(this.$route.path == '/read/publish'){
          this.show = false
        }else if(this.$route.path == '/read/preview'){
            this.show = false
        }else if(this.$route.path == '/read/msg'){
            this.show = false
        }else if(this.$route.path == '/read/publish/peple'){
            this.show = false
        }else if(this.$route.path == '/read/videoplay'){
            this.show = false
        }else if(this.$route.path == '/read/comment'){
            this.show = false
        }else if(this.$route.path == '/read/publish/location'){
          this.show = false
        }else if(this.$route.path == '/read/recommended/details'){
          this.show = false
        }else if(this.$route.path == '/index/map'){
          this.show = false
        }else if(this.$route.path == '/index/msg'){
          this.show = false
        }else if(this.$route.path == '/index/personal/main'){
          this.show = false
        }else if(this.$route.path == '/index/personal/wallet'){
          this.show = false
        }else if(this.$route.path == '/index/personal/wallet/details'){
          this.show = false
        } else if(this.$route.path == '/index/personal/wallet/closepay'){
          this.show = false
        } else if(this.$route.path == '/index/personal/wallet/closepayadd'){
          this.show = false
        }else if(this.$route.path == '/index/personal/wallet/pwd/noPwd'){
          this.show = false
        }else if(this.$route.path == '/index/personal/wallet/pwd/pwdChange'){
          this.show = false
        }else if(this.$route.path == '/index/personal/wallet/qrcode'){
          this.show = false
        }else if(this.$route.path == '/index/personal/address'){
          this.show = false
        } else if(this.$route.path == '/index/personal/adEdit'){
          this.show = false
        }else if(this.$route.path == '/index/search'){
          this.show = false
        }else if(this.$route.path == '/index/focus/fosearch'){
          this.show = false
        }else if(this.$route.path == '/index/detail'){
          this.show = false
        }else if(this.$route.path == '/index/family/map'){
          this.show = false
        }else if(this.$route.path == '/index/family/acmap'){
          this.show = false
        }else if(this.$route.path == '/index/focus/map'){
          this.show = false
        }else if(this.$route.path == '/index/relative/map'){
          this.show = false
        }else if(this.$route.path == '/index/relative/acmap'){
          this.show = false
        } else if(this.$route.path == '/index/set'){
          this.show = false
        }
        else{
          this.show = true
        }
      }
    }
  }
</script>

<style scoped lang="less">
  #app{
    >div:nth-child(1){
      width: 100%;
      height: 100%;
      margin-bottom:1.2rem;
    }
    .footer{
      position:fixed;
      left:0;
      right:0;
      bottom:0;
      background-color: #fff;
    }
  }
</style>
