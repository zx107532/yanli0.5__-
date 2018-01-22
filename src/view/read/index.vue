<template>
  <div>
    <read-tab v-if="show"></read-tab>
    <div class="read">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import ReadTab from '@/components/read-tab'

  export default {
    components:{
      ReadTab
    },
    data() {
      return {
        show :true
      }
    },
    watch: {
      $route () {
        if(this.$route.path =='/read/publish'){
          this.show = false
        }else if(this.$route.path == '/read/msg'){
          this.show = false
        }else if(this.$route.path =='/read/preview'){
            this.show = false
        }else if(this.$route.path == '/read/videoplay'){
            this.show = false
        }else if(this.$route.path == '/read/publish/peple'){
            this.show = false
        }else if(this.$route.path == '/read/recommended/details'){
          this.show = false
        }else if(this.$route.path == '/read/publish/location'){
          this.show = false
        }else if(this.$route.path == '/read/search'){
          this.show = false
        }else if(this.$route.path == '/read/search/peripherys'){
          this.show = false
        }else if(this.$route.path == '/read/comment'){
            this.show = false
        }else{
          this.show = true
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import '~less/variable';
</style>
