<template>
  <div class="msg">
    <div class="header">
      <Row>
        <Col span="2">
        <div tag="div" @click="back">
            <span>
              <Icon type="chevron-left"></Icon>
            </span>
        </div>
        </Col>
        <Col span="2" offset="20">
        <p>
          <Icon type="more"></Icon>
        </p>
        </Col>
      </Row>
    </div>
    <div class="msgcontent">
      <Row>
        <Col span="2">
          <span>
            <img :src="datas.userPhoto">
          </span>
        </Col>
        <Col span="20" offset="1">
          <span>{{datas.userName}}</span><br>
          <span>{{datas.time.hour}}:{{datas.time.minute}}·{{datas.address}}</span>
          <span>{{datas.positionDetail}}</span>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <p style="word-wrap: break-word">{{datas.detail}}</p>
        </Col>
        <Col >
          <div v-for="item in imgs" :style="{width:width,height:height}">
            <img :src="'http://182.151.104.205:16000/elderly'+item.url" style="height: 100%;">
            <!--<span>{{item}}</span>-->
          </div>
        </Col>
      </Row>
      <Row>
        <Col offset="2" span="3">
          <div @click='praClick()'>
            <img v-show="!datas.praise" src="./img/zan-w.png" alt="" style="width: 44px">
            <img v-show="datas.praise" src="./img/zan-r.png" alt="" style="width: 44px">
            <span>{{datas.countLike}}</span>
          </div>
        </Col>
        <Col span="3" offset="1">
          <div @click='countUnLike()'>
            <img v-show="!datas.unLiike" src="./img/cai-w.png" alt="" style="width: 44px">
            <img v-show="datas.unLiike" src="./img/cai-r.png" alt="" style="width: 44px">
            <span>{{datas.countUnLike}}</span>
          </div>
        </Col>
      </Row>
    </div>
    <comment></comment>
  </div>
</template>

<script type="text/ecmascript-6">
  import Comment from '@/components/comment'
  export default {
    components:{
      "comment":Comment  //挂载评论组件
    },
    data () {
      return {
        imgs:[],
        datas:{
            userId:'00004',
            userImg:require('./img/userImg.png'),
            uesrName:'朝花夕拾',
            time:'14:23',
            address:'成都龙泉',
            content:'印度现在国债多少？而且某些债务已经到了还款期限，贷款方基本都是货币基金组织之类的吸血资本，要么赶紧还钱要么呵呵延期不是不行，你',
            num:'23',
            imgs:[
              {img:require('./img/cat-w.png')},
              {img:require('./img/cat-b.png')},
              {img:require('./img/cat-b.png')}
            ]
          },
          width:'',
        height:''
      }
    },
    methods:{
      back(){
        this.$router.back(-1)
      },
      imgWidth(){
        let num = this.imgs.length
        console.log(num)
        if(num == 1){
          this.width = '100%'
          this.height = '4rem'
        }else if(num == 2 || num == 4){
          this.width = '48%'
        }else {
          this.width = '31%'
        }
      },
      praClick () {
        var data = {
          userID:this.datas.userID,
          resourceID:this.datas.id,
          resourceType:'Text',
          isPositive:true
        };
        if(!this.datas.praise){
          this.$ajax.dynamicLike(data).then(msg=>{
            console.log(msg)
            this.datas.praise = true
          })
//            this.$http.post(data).then(msg=>{
//              console.log(msg)
//              this.datas.praise = true
//            })
        }
      },
      countUnLike () {
        var data = {
          userID:this.datas.userID,
          resourceID:this.datas.id,
          resourceType:'Text',
          isPositive:false
        };
        if(!this.datas.praise){
          this.$ajax.dynamicLike(data).then(msg=>{
            console.log(msg)
            this.datas.unLiike = true
          })
        }
      },
      getLocalTime(nS) {//时间转换
        var now = new Date(nS);
        var time = {
          year:now.getFullYear(),
          month:now.getMonth()+1,
          date:now.getDate(),
          hour:now.getHours(),
          minute:now.getMinutes(),
          second:now.getSeconds(),
        };
        return time
      }
    },
    activated(){

      let data = {
        id:this.$store.state.resourceID
//        id:'56'
      };
      this.$ajax.dynamicsText(data).then(msg=>{
//        console.log(msg)
        msg.praise = false;
        msg.unLiike = false;
        msg.time = this.getLocalTime(msg.editTime);
        this.datas = msg;
        this.imgs = msg.pictures
        console.log(this.imgs)
      });
      this.imgWidth();
    }
  }
</script>

<style scoped lang="less">
  @import '~less/variable';

  .msg{
    font-size: 0.34rem !important;
    .header{
      font-size: 105%;
      line-height: 0.9rem;
      height: 0.9rem;
      padding: 0 0.2rem;
      color:@fs-i;
      border:1px solid @border;
      p{
        text-align: right;
      }
    }
    .msgcontent{
      margin: 0 0.2rem;
      margin-top: 0.3rem;
      >div:nth-child(1){
        >div:nth-child(1){
          span{
            img{
              width: 100%;
              border-radius: 50%;
            }
          }
        }
        >div:nth-child(2){
          >span{
            font-size: 70%;
            color: @fs-l;
          }
          span:nth-child(1){
            font-size: 100%;
            font-weight: 500;
            color: @color-n;

          }
        }
      }
      >div:nth-child(2){
        margin-top: 0.1rem;
        >div{
          p{
            font-size: 100%;
          }
        }
        >div:nth-child(2){
          >div{
            display: inline-block;
            margin-top: 0.1rem;
            margin-left: 0.1rem;
            img{
              width: 100%;
              height: 1.5rem;
            }
          }
        }
      }
    }
  }
</style>
