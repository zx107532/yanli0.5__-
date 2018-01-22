<template>
  <div class="video">
    <span @click="back()">
      <Icon type="chevron-left" color="#fff"></Icon>
    </span>
    <section>
      <video   autoplay  :src="'http://182.151.104.205:16000/elderly'+data.videoURL" controls preload></video>
    </section>
    <Row>
      <Col span="2" >
        <span @click="personal">
          <img :src="data.userPhoto" style="width: 100%;border-radius: 50%"/>
        </span>
      </Col>
      <Col span="6" offset="1">
      <div @click="personal" class="name">
        <span style="font-size: 0.3rem;color: black">{{data.userName}}</span>
        <span style="font-size: 0.2rem;color: black">{{data.fans}}</span>
      </div>
      </Col>
      <Col offset="18">
      <span>
        <img :src="data.headRightImg"/>
      </span>
      </Col>
    </Row>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data(){
      return {
        data:''
      }
    },
    props:["datas"],
    methods:{
      back(){
        this.$router.back(-1)
      },
      personal: function () {//往人物动态跳转并传递作者ID
        this.$router.push({path:'/index/detail'})
        this.$store.commit('userId',this.datas[0].userId)
      },
      ce(){
        this.data = this.datas[0];
//        console.log(this.data);
        let data = {
          id:this.$store.state.resourceID
        }
        this.$ajax.video(data).then(msg=>{
          this.data = msg
          console.log(msg)
        })
      }
    },
    activated(){
      this.ce()
    }
  }
</script>
<style scoped lang="less">
  @import '~less/variable';
  .video{
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 255;
    overflow: hidden;
    >span{
      font-size: 0.34rem;
      position: absolute;
      top: 0.2rem;
      left: 0.1rem;
      z-index: 256;
    }
    >section{
  /*margin-top: -0.34rem;*/
      background: #000;
      video{
        height: 4rem;
        margin-left: 50%;
        transform: translateX(-50%);
        zoom: 2;
      }
    }
    >div{
      padding-top: 0.2rem;
      background: #fff;
      border-bottom: 1px solid @fs-l;
    }
  }
  .name{
    span{
      line-height: 0.8rem;
      display: block;
    }
  }
</style>
