<template>
  <div class="service">
    <div>
      <service-tab></service-tab>
    </div>
    <div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import ServiceTab from '@/components/service-tab'

  export default {
    components:{
      ServiceTab
    }
  }
</script>

<style scoped lang="less">
  @import '~less/variable';
  .service{
    >div:nth-child(2){
      position: absolute;
      left: 0;
      top:0.9rem;
      right: 0;
      bottom:1.2rem;
      overflow: auto;
    }
  }
</style>