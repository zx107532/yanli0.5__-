<template>
  <div class="myContainer">
      <baidu-map  class="map" @ready="myReady" :center="{lng: 116.404, lat: 39.915}" :zoom="18" :dragging='false' :double-click-zoom='false'>
      </baidu-map>
      <div class="topMain">
        <!-- 上部头像与菜单 -->
           <Row class="mytop">
              <Col span="4">
                <router-link tag="p" to="/index/msg">
                  <img src="./img/msg.png">
                  <span>{{mount}}</span>
                </router-link>
              </Col>
              <Col span="16">
                <div @click="menuShow">
                  <img :src='myPic'>
                </div>
              </Col>
              <Col span="4">
                <img src="./img/map.png">
              </Col>
          </Row>
          <!-- 下方菜单 -->
            <Row class="menu">
                <Col span="6">
                  <router-link to="/index/addfid" tag="div">
                    <img src="./img/addfid.png">
                    <p>添加好友</p>
                  </router-link>
                </Col>
                <Col span="6">
                  <div>
                    <img src="./img/save.png">
                    <p>紧急求助</p>
                  </div>
                </Col>
                <Col span="6">
                  <div>
                    <img src="./img/dtj.png">
                    <p>待添加</p>
                  </div>
                </Col>
                <Col span="6">
                  <router-link tag="div" :to="{path:'/index/personal/main',query:{name:'我的信息'}}">
                    <img src="./img/self.png">
                    <p>个人信息</p>
                  </router-link>
                </Col>
            </Row>
      </div>
      <!-- 钱包动态位置 -->
      <div class="mid">
         <Row class="midMenu">
            <Col span="12">
              <router-link tag="div" to="/read/publish">
                <img src="./img/change.png"> <span>发表动态</span>
              </router-link>
            </Col>
            <Col span="12">
              <router-link tag="div" to="/index/personal/wallet">
                <img src="./img/money.png"> <span>我的钱包</span>
              </router-link>
            </Col>
        </Row>
      </div>
      <!-- 下方广告轮播 -->
      <div class="btm">
           <Carousel arrow="never" autoplay >
                <CarouselItem v-for="(item,key) in slider" :key="key">
                    <div><img style="width:100%" :src="item.name"></div>
                </CarouselItem>
            </Carousel>
      </div>
      <!-- 遮罩层菜单 -->
      <div class="model" v-show="mShow">
        <div class="topMenu">
           <div class="myPic" @click="menuHide">
            <img :src="myPic">
          </div>
          <div v-for="(ico,ind) in detail" :key="ind" class="icoList">
            <div class="ion">
               <img :src="ico.img"> <span>{{ico.name}}</span>
            </div>
            <div class="txt">
              <p>{{ico.quality}}</p>
              <p>{{ico.num}}</p>
            </div>
          </div>
        </div>
        <!-- 下面菜单部分   -->
        <div class="btmMenu" v-show="btmShow">
           <ul>
             <li>
                我的睡眠
             </li>
             <li>
                <p>今日睡眠</p>
                 <span>{{sleepTime}}</span>
                 <p class="qua">{{sleepQuality}}</p>
             </li>
             <li>
                <p>平均睡眠时长</p>
                <span>{{avgTime}}</span>
                <p class="qua">{{avgQuality}}</p>
             </li>
           </ul>
        </div>
      </div>
  </div>
</template>
<script>
import { Indicator } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import {vun} from "@/common/js/base/mysock.js";
export default {
  data(){
    return{
      mount:0,
      mShow:false,
      btmShow:false,
      personalMsg:null,
      dataTimer:'',
      myPic:require("./img/my.png"),
      sss:'',
      myposition:{"lng":'',"lat":''},
      detail:[
        {"name":"心率","quality":"正常","num":"82次/分","img":require("./img/hea.png")},
        {"name":"运动","quality":"步数","num":"1420","img":require("./img/walk.png")},
        {"name":"血压","quality":"晴","num":"22-37℃","img":require("./img/blode.png")},
        {"name":"天气","quality":"晴","num":"22-37℃","img":require("./img/wea.png")},
        {"name":"待填","quality":"晴","num":"22-37℃","img":require("./img/sleep.png")},
        {"name":"睡眠","quality":"良好","num":"8小时27分","img":require("./img/sleep.png")},

      ],
      slider:[
        {"name":require('./img/slider1.png')},
        {"name":require('./img/slider1.png')},
        {"name":require('./img/slider1.png')},
      ],
      sleepTime:"8 小时 27 分",
      sleepQuality:"良好",
      avgTime:"8 小时 27 分",
      avgQuality:"良好",
    }
  },
  computed: {
       msgMount() {
                return this.$store.state.msgMount;
            }
  },

  watch:{
      msgMount(curVal,oldVal){
      console.log(curVal+","+oldVal)
      this.mount=curVal
    }
  },
  methods:{
        sendPoi(pois){//发送自己定位信息
              this.$ajax.selfPosition(pois)
              .then(res=>{
                if(res.state==0){
                }
              })
              .catch(error=>{
                throw error;
              })
          },
         location(){//获取手机定位，并转换百度地图坐标
                this.$loca.onPlusReady()
              },
          mypoi(){//查看自己坐标
              let data={
                userId:localStorage.mobilephone,
              }
              this.$ajax.presentPoi(data)
                        .then(res=>{
                          console.log(res)
                          if(res.data!=null){
                            this.myposition.lng=res.data.lng;
                            this.myposition.lat=res.data.lat;
                          }
                        })
                        .catch(error=>{
                          throw error
                        })
          },
        myReady ({BMap, map}) {
          let that = this;
          setTimeout(()=>{
          if(that.myposition.lng!=''&&that.myposition.lat!=''){//判断服务器获取坐标与手机当前获取坐标距离
                        var pointA = new BMap.Point(that.myposition.lng,that.myposition.lat);
                        var pointB = new BMap.Point(that.$store.state.location.lng,that.$store.state.location.lat);
                        var distance = map.getDistance(pointA,pointB).toFixed(1);
                      //  alert(distance)
                      //  alert(that.$store.state.location.lng+","+that.$store.state.location.lat)
                       if(distance>100){//如果当前坐标与服务器坐标大于100米，发送坐标到服务器
                           let poi={
                              userId:localStorage.mobilephone,
                              lat:that.$store.state.location.lat,
                              lng:that.$store.state.location.lng,
                              province:'',
                              city:'',
                              region:'',
                              detail:''
                          }
                           that.sendPoi(poi)
                       }
                      }else{//如果服务器没有坐标，将当前坐标存服务器
                        let poi={
                          userId:localStorage.mobilephone,
                          lat:that.$store.state.location.lat,
                          lng:that.$store.state.location.lng,
                          province:'',
                          city:'',
                          region:'',
                          detail:''
                        }
                        that.sendPoi(poi)
                      }
          },1000)

      },
    menuShow(){//隐藏菜单
      this.mShow=!this.mShow;
      var tl=document.querySelector(".myContainer .model .topLeft");
      var tr=document.querySelector(".myContainer .model .topRight");
      var ml=document.querySelector(".myContainer .model .midLeft");
      var mr=document.querySelector(".myContainer .model .midRight");
      var bl=document.querySelector(".myContainer .model .btmLeft");
      var br=document.querySelector(".myContainer .model .btmRight");
      var p=document.querySelectorAll(".myContainer .model .icoList p");
      var span=document.querySelectorAll(".myContainer .model .icoList span");
      var img=document.querySelectorAll(".myContainer .model .icoList img");
       setTimeout(function() {
            document.querySelector(".myContainer .model .myPic").style.transform="rotatex(0deg) rotatey(0deg)";
            document.querySelector(".myContainer .model .myPic").style.transition="transform .5s linear";
            tl.style.width="28%";tl.style.height="1.56rem";
            tr.style.width="28%";tr.style.height="1.56rem";
            ml.style.width="22%";ml.style.height="1.42rem";
            mr.style.width="22%";mr.style.height="1.42rem";
            bl.style.width="27%";bl.style.height="1.72rem";
            br.style.width="27%";br.style.height="1.72rem";
              for(var i=0;i<p.length;i++){
              p[i].style.opacity="1"
            }
             for(var j=0;j<span.length;j++){
              span[j].style.opacity="1"
            }
             for(var k=0;k<img.length;k++){
              img[k].style.opacity="1"
            }
       }, 200);
    },
    menuHide(){
      this.btmShow=false;
      var tl=document.querySelector(".myContainer .model .topLeft");
      var tr=document.querySelector(".myContainer .model .topRight");
      var ml=document.querySelector(".myContainer .model .midLeft");
      var mr=document.querySelector(".myContainer .model .midRight");
      var bl=document.querySelector(".myContainer .model .btmLeft");
      var br=document.querySelector(".myContainer .model .btmRight");
      var p=document.querySelectorAll(".myContainer .model .icoList p");
      var span=document.querySelectorAll(".myContainer .model .icoList span");
      var img=document.querySelectorAll(".myContainer .model .icoList img");
      this.mShow=!this.mShow;
          document.querySelector(".myContainer .model .myPic").style.transform="rotatex(0deg) rotatey(-90deg)";
      //  document.querySelector(".myContainer .model .myPic").style.transition="transform .5s linear;"
            tl.style.width="0";tl.style.height="0";
            tr.style.width="0";tr.style.height="0";
            ml.style.width="0";
            mr.style.width="0";
            bl.style.width="0";bl.style.height="0";
            br.style.width="0";br.style.height="0";
            for(var i=0;i<p.length;i++){
              p[i].style.opacity="0"
            }
             for(var j=0;j<span.length;j++){
              span[j].style.opacity="0"
            }
            for(var k=0;k<img.length;k++){
              img[k].style.opacity="0"
            }
    },
    btmDetail(){
      this.btmShow=!this.btmShow
    },
    update(){
          let msg={
                    userId:localStorage.mobilephone,
                    authorization:localStorage.mobilephone+"_"+this.$store.state.token,
                  }
                this.$ajax.personal(msg)
                        .then(res=>{
                            if(res.state==0){
                             this.myPic=res.data.photo;
                              // console.log(res)
                              // localStorage['mydata']=res.data,
                              localStorage['mypic']=res.data.photo,
                              localStorage['myname']=res.data.name,
                              this.$store.commit('mydata',res.data)
                             Indicator.close('加载中...');
                        }else{
                                MessageBox('提示', res.message)
                        }
                    })
                       .catch(error => {//服务器请求错误
                            // console.log(error)
                            MessageBox('提示', "请检查网络或联系我们的客服")
                    })
    },
    fun(){//
     vun.getMsg('ws:192.168.0.200:15674','http://192.168.0.200:15674/stomp','queue.system.broadcast','admin','admin')
  }
  },
  created(){
    this.mypoi()
    this. location()
  },
  mounted(){
    document.querySelector(".myContainer .model .topMenu :nth-child(2)").className="topLeft icoList";
    document.querySelector(".myContainer .model .topMenu :nth-child(3)").className="topRight icoList";
    document.querySelector(".myContainer .model .topMenu :nth-child(4)").className="midLeft icoList";
    document.querySelector(".myContainer .model .topMenu :nth-child(5)").className="midRight icoList";
    document.querySelector(".myContainer .model .topMenu :nth-child(6)").className="btmLeft icoList";
    document.querySelector(".myContainer .model .topMenu :nth-child(7)").className="btmRight icoList";
    document.querySelector(".myContainer .model .topMenu :nth-child(7)").onclick=this.btmDetail;
    //进入组件 更新页面
    Indicator.open('加载中...');//显示加载中
      this.update()
      // this.fun()
      //  this.mypoi()
  },
   activated(){
            this. location()
             // 实时向服务器发送请求,更新页面内容
               this.myPic=localStorage.mypic;
                    //定时器更新页面
            this.dataTimer=setInterval(()=>{

            },20000)
            //获取好友数量
            // this.fun()
             this.mypoi()
        },
   deactivated(){
    //  this.fun()
   //离开页面，清除定时器
    Indicator.close('加载中...');
            clearInterval(this.dataTimer);
            this.dataTimer=null;
           this.update()
  }

}
</script>

<style lang="less" scoped>
 @import '~less/variable';
  .myContainer{
    position: fixed;
    top: .9rem;
    bottom: 1rem;
    width: 100%;
    overflow: scroll;
    img{//图片自适应
      max-width:100%;
      max-height: 100%;
    }
    .topMain{//上部分头像和菜单
      height: 6.2rem;
      border-bottom: .02rem solid @border;
      .mytop{
        text-align: center;
        height: 4.72rem;
        // 位置调整
        >:nth-child(1),>:nth-child(3){
          margin-top: .44rem;
        }
        >:nth-child(1){//消息
          p{//右上角消息个数显示
            width: .52rem;
            height: .38rem;
            position: relative;
            margin-left: .3rem;
            span{
              position: absolute;
              top:-.2rem;
              right: -.2rem;
              width: .3rem;
              height: .3rem;
              color: @color-l;
              font-size: .22rem;
              border-radius: 50%;
              background-color: @fs-i;
            }
          }
        }
        >:nth-child(2){//中间用户头像
         margin-top: .9rem;
          div{//背景圈
            width: 3rem;
            height: 3rem;
            background: url("./img/circle.png")no-repeat;
            background-size: 100%;
            line-height: 3rem;
            margin-left: 20%;
            img{
              width: 1.9rem;
              border-radius: 50%;
            }
          }
        }
        >:nth-child(3){
          img{
            width: .84rem;
          }
        }
      }
      .menu{//下方菜单
        text-align: center;
        font-size: .3rem;
        p{
          margin-top: .4rem;
        }
      }
    }
    .mid{//中间钱包动态
      height: 1.4rem;
      border-bottom: .02rem solid @border;
      font-size: .36rem;
      text-align: center;
      .midMenu{
        >:nth-child(1){
                margin: .08rem 0;
                border-right: .02rem solid @border;
                height: 1.24rem;
                line-height: 1.24rem;
              img{
                width: .54rem;
                height: .53rem;
                margin-right: .6rem;
                }
              }
            >:nth-child(2){
              margin: .08rem 0;
              height: 1.24rem;
              line-height: 1.24rem;
              img{
                width: .63rem;
                height: .51rem;
                margin-right: .6rem;
              }
            }
          }
      }
    .btm{//下方广告
      margin-top: .1rem;
    }
    .model{//遮罩层以及菜单
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      background-color: @color-i;
      z-index: 1000;
      color: @color-l;
      .topMenu{//上部分头像等
        height:7.3rem;
        width: 100%;
        position: relative;
        .myPic{//头像
           position: absolute;
           top: 2.3rem;
           left: 50%;
           width: 3rem;
           height: 3rem;
           background: url("./img/circle.png")no-repeat;
           background-size: 100%;
           line-height: 3rem;
           text-align: center;
           margin-left: -1.5rem;
           transition:transform .5s linear;
           transform:rotatex(0deg) rotatey(90deg);
           transform-style:preserve-3d;
           img{
              // width: 1.9rem;
              height:1.9rem;
              border-radius: 50%;
              }
          }
          .icoList{//将文字透明度设为0
            span{
              opacity: 0;
              font-size: .24rem;
              transition:all 1s linear;
              color: #4373fb;
            }
            p{
               opacity: 0;
               transition:all 1s linear;
               font-size: .22rem;
            }
            img{
              opacity: 0;
               transition:all 1s linear;
            }
          }
        .topLeft{//左上
            position: absolute;
            width: 0%;
            height: 0rem;
            background: red;
            bottom: 4.44rem;
            right: 62%;
            transition:all .5s linear;
            background: url("./img/topleft.png")0 .5rem no-repeat ;
            background-size: 100%;
            .ion{
              position: absolute;
              top: 0;
              left: 0;
              img{
                width: .39rem;
                height: .36rem;
              }
            }
            .txt{
              position: absolute;
              top: .8rem;
              left: 0;
            }
        }
        .topRight{//右上
            position: absolute;
            width: 0%;
            height:0;
            background: url("./img/topright.png")0 .5rem no-repeat ;
            background-size: 100%;
            bottom: 4.44rem;
            left:62%;
            transition:all .5s linear;
            .ion{
              position: absolute;
              top: 0;
              right: 0;
              img{
                width: .34rem;
                height: .45rem;
              }
            }
            .txt{
              position: absolute;
              top: .8rem;
              right: 0;
              text-align: right;
            }
        }
        .midLeft{//左中
            position: absolute;
            width: 0%;
            height: 1.42rem;
            background: url("./img/midleft.png")0 .6rem no-repeat ;
            background-size: 100%;
            right: 67%;
            bottom: 2.8rem;
            transition:all .5s linear;
            .ion{
              position: absolute;
              top: 0;
              left: 0;
              img{
                width: .25rem;
                height: .41rem;
              }
            }
            .txt{
              position: absolute;
              top: .8rem;
              left: 0;
            }
        }
        .midRight{//右中
            position: absolute;
            width: 0%;
            height:1.42rem;
            background: url("./img/midright.png")0 .6rem no-repeat ;
            background-size: 100%;
            left: 67%;
            bottom: 2.8rem;
            transition:all .5s linear;
            .ion{
              position: absolute;
              top: 0;
              right: 0;
              img{
                width: .46rem;
                height: .42rem;
              }
            }
            .txt{
              position: absolute;
              top: .8rem;
              right: 0;
              text-align: right;
            }
        }
        .btmLeft{//左下
            position: absolute;
            width: 0%;
            height: 0rem;
            background: url("./img/btmleft.png")0 -.2rem no-repeat ;
            background-size: 100%;
            top: 4.66rem;
            right: 63.3%;
            transition:all .5s linear;
            .ion{
              position: absolute;
              top: 0;
              left: 0;
              img{
                width: .43rem;
                height: .43rem;
              }
            }
            .txt{
              position: absolute;
              top: .8rem;
              left: 0;
            }
        }
        .btmRight{//右下
            position: absolute;
            width: 0%;
            height: 0rem;
            background: url("./img/btmright.png")0 -.2rem no-repeat ;
            background-size: 100%;
            top: 4.66rem;
            left: 63.3%;
            transition:all .5s linear;
            .ion{
              position: absolute;
              top: 0;
              right: 0;
              img{
                width: .43rem;
                height: .43rem;

              }
            }
            .txt{
              position: absolute;
              top: .8rem;
              right: 0;
              text-align: right;
            }
        }
      }
      .btmMenu{//下面详情
        font-size: .36rem;
        font-weight: bold;
        margin-left: .4rem;
        color: @color-l;
        ul{
          .qua{
            float: right;
            margin-right: .36rem;
            margin-top: .3rem;
          }
          li{
            margin-top: .2rem;
          }
          >li:nth-child(1){
            border-bottom: .02rem solid @color-l;
            padding: .2rem 0;
          }
          >li:nth-child(2),>li:nth-child(3){
            padding-left: .2rem;

            span{
              margin-left: .3rem;
              font-size: .5rem;
            }
          }
        }
      }
    }
  }
</style>
