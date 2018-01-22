<template>
  <div class="buying">
    <div>
      <div>
        <p>热门榜单</p>
        <span>已经开抢</span>
      </div>
      <div>
        <div>
          <router-link tag='div' class="item-tab" :key="index" v-for="(item,index) in buying" :to="item.to">
            <div @click="buyClick(index)" :class="ids===index?'active':''">
              <p>{{item.p}}</p>
              <span>{{item.span}}</span>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        ids:0,
        buying:[
          {
            to:'/service',
            p:'8月17号',
            span:'已经开抢'
          },
          {
            to:'/service',
            p:'8月18号',
            span:'即将开场'
          },
          {
            to:'/service',
            p:'8月19号',
            span:'即将开场'
          },
          {
            to:'/service',
            p:'8月20号',
            span:'即将开场'
          },
          {
            to:'/service',
            p:'8月21号',
            span:'即将开场'
          }
        ]
      }
    },
    methods: {
      buyClick (index){
        this.ids = index
      }
    }
  }
</script>

<style scoped lang="less">
  @import '~less/variable';
  .buying{
    >div:nth-child(1) {
      height: 1rem;
      text-align: center;
      margin-top:0.3rem;
      background-color: #313131;
      >div:nth-child(1){
        float: left;
        width:1.76rem;
      }
      >div:nth-child(2){
        margin-left:1.76rem;
        height: 1rem;
        overflow: hidden;
        white-space: nowrap;
        >div{
          overflow-x: scroll;
          height:2rem;
        }
        .item-tab{
          display: inline-block;
          width:1.76rem;
          height: 1rem;
        }
      }
      p{
        font-size: 0.36rem;
        font-weight: bold;
        color: #fff;
      }
      span{
        font-size: 0.3rem;
        color: #fff;
      }
    }
    div.active{
      background-color: #EC4D3C;
      border-radius: 0.1rem;
    }
  }
</style>