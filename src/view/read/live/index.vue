<template>
  <div class="video">
    <div :key="index" v-for="(item,index) in datas">
      <Row>
        <Col span='24'>
          <p>
            {{item.title}}
          </p>
          <div class="title">
            <img v-show="item.show" src="./img/liveing.png" alt="">
            <img v-show="!item.show" src="./img/lived.png" alt="">
          </div>
          <div class="imgs">
            <img :src="item.img" alt="">
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div>
            <p>
              <span>{{item.mount}}人</span>观看
            </p>
          </div>
          <div>
            <img :src="item.src" alt="">
            <span>{{item.name}}</span>
          </div>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        datas:[
          {
            title:'',
            img:require('./img/kejie.png'),
            src:require('./img/xinlang.png'),
            name:'健康网',
            mount:6280,
            show:true
          },
          {
            title:'日本失联女教师可能搭乘中国人车辆 可通过微 信寻找线索',
            img:require('./img/nv.png'),
            src:require('./img/haiwai.png'),
            name:'海外网',
            mount:6280,
            show:false
          }
        ]
      }
    }
  }
</script>

<style scoped lang="less">
  @import '~less/variable';

  .video{
    padding:0.12rem 0.2rem;
    img{
      max-width: 100%;
    }
    >div{
      border-radius: 0.1rem;
      box-shadow: 0.02rem 0.02rem 0.02rem 0.02rem @border;
      margin-bottom: 0.2rem;
      >div:nth-child(1) {
        position: relative;
        // 文字
        p{
          position: absolute;
          bottom:0.2rem;
          left:0.2rem;
          right: 0.5rem;
          font-size: 0.34rem;
          color:@color-l;
        }
        // 直播位置
        .title{
          position: absolute;
          top:0;
          right: 0;
        }
        // 图片自适应
        .imgs img{
          width: 100%;
          height: 100%;
        }
      }
      >div:nth-child(2) {
        // 右下角
        >div>div:nth-child(1) {
          float: right;
          line-height: 0.66rem;
          padding-right: 0.2rem;
          p{
            span{
              color:@fs-i;
            }
            font-size: 0.3rem;
            vertical-align: middle;
          }
        }
        // 左下角
        >div>div:nth-child(2) {
          font-size: 0.3rem;
          vertical-align: middle;
        }
      }
    }
  }
</style>