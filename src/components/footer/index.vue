<template>
  <div class="tab">
    <router-link :key="index" v-for="(item,index) in img" tag="div" class="tab-item" :to="item.to">
      <div class="tab-link" @touchstart="imgChange(index)" :class="ids===index?'active':''">
        <div>
          <img v-show='item.imgShow' :src="item.src" >
          <img v-show='!item.imgShow' :src="item.srcR">
        </div>
        <span >{{item.content}}</span>
      </div>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        ids:0,
        img: [
          {
            src:require('./img/index.png'),
            srcR:require('./img/index-red.png'),
            to : '/index',
            imgShow:false,
            content: '主页'
          },
          {
            src:require('./img/read.png'),
            srcR:require('./img/read-red.png'),
            imgShow:true,
            to : '/read',
            content: '发现'
          },
          {
            src:require('./img/service.png'),
            srcR:require('./img/service-red.png'),
            imgShow:true,
            to : '/service',
            content: '服务'
          },
          {
            src:require('./img/device.png'),
            srcR:require('./img/device-red.png'),
            imgShow:true,
            to : '/device',
            content: '设备'
          }
        ]
      }
    },
    methods: {
      imgChange (index){
        for (var i=0;i<this.img.length;i++){
          this.img[i].imgShow = true;
        }
        this.img[index].imgShow = !this.img[index].imgShow
        this.ids = index
        if (index == 1){
          this.$store.commit('readTab','0')
        }
      }
    }
  }
</script>

<style scoped lang="less">
 @import '~less/variable';

  .tab{
    display: flex;
    // height: 98/100rem;
    text-align: center;
    img{
      width: 48/100rem;
    }
    .tab-item{
      flex: 1;
      text-align: center;
      border-top:1px solid @border;
      border-right:1px solid @border;
      padding:12/100rem 0;
      span{
        padding:12/100rem 0;
        font-size:24/100rem;
      }
    }
    .tab-item:last-child{
      border-right:none;
    }
    div.active{
      color:@fs-i ;
    }
  }
</style>