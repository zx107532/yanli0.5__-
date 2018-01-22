<template>
  <div class="publish">
    <!-- 标题区域 -->
   <div class="title">
    <Row>
      <Col span="3">
        <div @click="$router.back()">
          <p>取消</p>
        </div>
      </Col>
      <Col span="18">
        <b>内容</b>
      </Col>
      <Col span="3">
        <div >
          <span @click="publish()">发表</span>
        </div>
      </Col>
    </Row>
   </div>
   <!-- 内容区域 -->
   <div class="content">
    <Row>
      <Col span="24">
        <textarea type="tel" placeholder="写点什么吧" v-model="msg"></textarea>
      </Col>
      <Col span="24">
        <div id="F_CKJLB" class="phone" @click="showActionSheet($event.currentTarget)">
          <img src="./img/phone.png" alt="">
        </div>
        <!--<input type="file" value="5555" id="file" multiple="multiple" required="required">-->
      </Col>
       <Col span="24">
        <input type="hidden" id="ckjl.id" name="ckjl.id" value="429">
        <div class="imgs" v-for="(imgs,index) in phone">
            <span @click="delImg(index)">
                <Icon type="close-circled" color="#fff"></Icon>
            </span>

          <img :src="imgs.src" alt="" id="imgs" width="100%">
        </div>
        <!--<div class="videoImg" v-for="(videoimg,index) in video">-->
            <!--<img :src="videoimg.imgSrc" width="200px" height="200px" @click="videopaly()">-->
            <!--&lt;!&ndash;<video :src="videoimg.videoSrc" autoplay controls></video>&ndash;&gt;-->
        <!--</div>-->
      </Col>
    </Row>
   </div>
   <!-- 位置 -->
   <div class="loc">
    <Row>
      <Col span="3">
        <p>位置</p>
      </Col>
        <Col span="19">
         <!--<p @click="loca()">{{position.city}}{{position.district}}{{position.street}}{{position.streetNum}}</p>-->

        </Col>
      <Col span="2">
        <router-link tag="div" to="/read/publish/map">
          <img src="./img/left.png" alt="">
        </router-link>
      </Col>
    </Row>
   </div>
   <!-- 阴影部分 -->
   <div class="shadow">
     <Row>
       <Col span="24"></Col>
     </Row>
   </div>
   <!-- 公开 -->
   <div class="open">
    <Row>
      <Col span="18">
        <p>公开的人</p>
      </Col>
      <Col span="4">
        <router-link tag="span" to="/read/publish/peple">
          所有人
        </router-link>
      </Col>
      <Col span="2">
        <router-link tag="div" to="/read/publish/peple">
          <img src="./img/left.png" alt="">
        </router-link>
      </Col>
    </Row>
   </div>
      <div @click="phongShow" id="camrea"></div>
      <!--<canvas id="canvas" class="canvas"></canvas>-->
    <!--<div @click="showw" class="modal" v-bind:class="display?'show':''">-->
        <!--<div>-->
            <!--<div>-->
                <!--拍摄照片或视频-->
            <!--</div>-->
            <!--<div @click="gallery">-->
                <!--从相册选择-->
            <!--</div>-->
        <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script type="text/ecmascript-6">
    import {fun} from '@/common/js/camera.js'
    import {d} from '@/common/js/base/baidu/dituzhuanhuan.js'
//    import {loca} from '@/common/js/base/location.js'
  var imgs;
  export default {
    data () {
      return {
       msg:'',
        display:'',
        imgRoute:'',
        phone:'',
      }
    },
    methods: {
      back(){
          this.$router.back(-1)
      },
      pos(){
//        if(this.$store.state.position!=''){
//          this.position = this.$store.state.position
//        }
//        this.$options.methods.con()
      },
      loca(){
        this.$router.push("/read/publish/location")
      },
      showActionSheet(conf){
        this.$store.commit('camera',conf);
        if(this.phone.length>=9){
          plus.nativeUI.alert('图片不能超过9张');
          return false
        }
        fun.showActionSheet();
        var ss = document.getElementById('camrea');

        setInterval(function () {
          ss.click()
        },500)
      },
      phongShow(){
        this.phone = this.$store.state.phone
      },
      delPhone(){
        this.phone = ''
        this.$store.state.phone = ''
      },
      delImg(index){
          var so = this
          var bts = ["是","否"]
          plus.nativeUI.confirm("是否删除图片?",function (e) {
              var i = e.index
              if(i==0){
                  so.phone.splice(index,1)
                  so.$store.state.phone.splice(index,1)
              }
          },"删除",bts)
      },
//        videopaly(){//往视频播放跳转
//          this.$router.push({name:'videoplay'})
//        },
        publish(){
          let msg = this.msg
//          loca.onPlusReady()
          this.$loca.onPlusReady
          setTimeout(function () {
            fun.upload(msg);
          },500)

          this.$store.state.phone = [];
          this.$store.state.videoEntry = [];
          this.msg = ''
        }


    },
    activated(){
      this.pos()
    }


  }
</script>

<style scoped lang="less">
  @import '~less/variable';

  .publish{
    // 标题区域
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: scroll;
    background: @bgcolor-body;
    .title{
      font-size: 0.36rem;
      height: 0.9rem;
      line-height: 0.9rem;
      text-align: center;
      padding:0  0.2rem;
      border-bottom:0.01rem solid @border;
      p{
        color: @fs-l;
      }
      b{
        color: @color-i;
        font-weight: normal;
        font-size: 0.42rem;
      }
      span{
        color: @fs-i;
      }
    }
    // 内容区域
    .content{
      padding:0.2rem;
      font-size: 0.36rem;
      border-bottom:0.01rem solid @border;
      // 多行文本域
      textarea{
        width: 100%;
        height: 2.9rem;
        border: none;
        resize: none;
        outline: none;
      }
      ::-webkit-input-placeholder{
        color:@border;
      }    /* 使用webkit内核的浏览器 */
      :-moz-placeholder{
        color:@border
      }                  /* Firefox版本4-18 */
      ::-moz-placeholder{
        color:@border
      }                  /* Firefox版本19+ */
      :-ms-input-placeholder{
        color:@border
      }           /* IE浏览器 */
      .phone{
        width:1.9rem;
        height:1.9rem;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
    // 阴影部分
    .shadow{
      height: 0.32rem;
      background-color: #F7F7F9;
    }
    // 位置区域
    .loc,.open{
      font-size: 0.34rem;
      line-height: 0.9rem;
      padding-left: 0.3rem;
    }
      .loc>div{
          >div:nth-child(2){
              height: 0.9rem;
              text-align: right;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: normal;
          }
      }
    // 公开区域
    .open{
      span{
        color:@fs-l;
      }
    }
      .modal{
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.5);
          position: fixed;
          display: none;
          top:0;
          >div{
              background: white;
              width: 70%;
              margin: 0 auto;
              margin-top: 50%;
              >div{
                  height: 0.9rem;
                  line-height: 0.9rem;
                  font-size: 0.34rem;
                  padding-left: 0.2rem;
              }
              >div:nth-child(1){
                  border-bottom: 1px solid silver;
              }
          }
      }
      .imgs{
          float: left;
          margin-left: 0.05rem;
          position: relative;
          width: 32%;
          height: 2.2rem;
          >span{
              position: absolute;
              /*background: white;*/
              top:0;
              right:0;
              z-index: 200;
              /*border-radius: 60%;*/
          }
          img{
              max-width: 100%;
              max-height: 100%;
              width: 100%;
              height: 100%;
          }
      }
  }
</style>
