<template>
  <div>
    <div class="tabs">
      <router-link :key="index" v-for="(item,index) in tabs" tag="div" class="tab-item" :to="item.url"  >
        <span @click="serviceTabClick(index)" :class="index===ids?'active':''">{{item.content}}</span>
      </router-link>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        ids:0,
        tabs : [
          {
            url: '/service',
            content: '限时抢购'
          },
          {
            url: '/service/purchase',
            content: '购买记录'
          },
          {
            url: '/service/history',
            content: '往期抢购'
          }
        ]
      }
    },
    methods: {
      serviceTabClick(index) {
        this.ids = index
      }
    }
  }
</script>

<style scoped lang="less">
 @import '~less/variable';
  .tabs{
    display: flex;
    height: 90/100rem;
    line-height: 88/100rem;
    box-shadow: 0.02rem 0.02rem 0.02rem #dadada;
    background-color: #fff;
    padding:0 1rem;
    .tab-item{
      flex: 1;
      text-align: center;
      >span{
        font-size: 36/100rem;
        padding-bottom:20/100rem;
      }
    }
    span.active{
      color:#EC4D3C;
      border-bottom:4/100rem solid #EC4D3C;
    }
  }
</style>