<template>
    <div class="detailContainer">
        <div class="top">
            <div class="topback" :style="{backgroundImage:'url('+pesonalData.photo+')'}"></div>
            <div class="topbar">
                <div @click="back">
                    <!-- 返回按钮 -->
                    <Icon type="chevron-left"></Icon>
                    <span>返回</span>
                </div>
                <!-- 用户信息 -->
                <div>
                    <div><img :src="pesonalData.photo"></div>
                    <div>
                        <p>{{pesonalData.name}}</p>
                        <p>{{pesonalData.signature}}</p>
                    </div>
                    <!-- 头像下方功能 -->
                    <div>
                         <Row>
                            <Col span="8"><router-link @touchstart.native="focus()" to="/index/focus/folist"><p>{{data.focus}}</p><span>关注</span> </router-link> </Col>
                            <Col span="8"> <p>{{data.fans}}</p><span>粉丝</span></Col>
                            <Col span="8" ><p @click="addTo"><img src="./img/personAdd.png"></p><span>添加好友</span></Col>
                        </Row>
                    </div>  
                </div>
            </div> 
        </div>
        <!-- 动态列表 -->
         <div class="aclist">
                <div class="listTitle">
                    <span></span>
                    <span>{{gender}}的动态</span> 
                </div>
                <!-- 动态列表 -->
                <div class="aclistDetail" :key="index" v-for="(item,index) in datas">
                    <Row>
                        <Col  span="4"><img src="./img/user.png"></Col>
                         <Col span="6">
                            <p>{{item.uname}}</p>
                            <span>{{item.time}}</span>
                        </Col>
                    </Row>
                    <!-- 用户动态详情 -->
                    <Row>
                    <Col span="24" >
                        <Carousel arrow="never"  dots="outside">
                            <CarouselItem :key="imgindex" v-for="(img,imgindex) in item.imgs">
                                <div><img :src="img.img"></div>
                            </CarouselItem>
                        </Carousel>
                    </Col>
                    </Row>
                     </Row>
                    <!-- 用户动态，文字内容 -->
                    <Row>
                        <Col>
                            <router-link tag="div" class="actContent"  to='/read/msg'>
                                {{item.content}}
                            </router-link>
                        </Col>
                    </Row>
                       <!-- 动态下侧点赞位置等信息 -->
                    <Row>
                        <Col span="14">
                            <img :src="loc">
                            <span>{{item.srcName}}</span>
                        </Col>
                        <Col span="4">
                            <div @touchstart='praClick(index)'>
                            <img v-show="!item.praise" :src="zan">
                            <img v-show="item.praise" :src="zanR">
                            <span>{{item.zanNum}}</span>
                            </div>
                        </Col>
                        <Col span="3">
                            <router-link tag="div" to='/read/msg'>
                            <div>
                                <img :src="msg">
                            </div>
                            </router-link>
                        </Col>
                        <Col span="3">
                            <img :src="share" @touchstart="sharefun(index)">
                        </Col>
                    </Row>
                    <!-- 分享菜单 -->
                    <transition name="fade">
                            <Row v-show="item.shareshow"> 
                                <Col span="6">
                                    <img src="./img/sharecircle.png">
                                </Col>
                                <Col span="6">
                                    <img src="./img/shareqq.png">
                                </Col>
                                <Col span="6">
                                    <img src="./img/sharewx.png">
                                </Col>
                                <Col span="6">
                                    <img src="./img/shareweibo.png">
                                    <!-- 对话框三角图标 -->
                                    <img class="triangle" src="./img/sharetriangle.png">
                                </Col>
                            </Row>
                    </transition>
                </div>
        </div>
        <!-- 遮罩层 -->
    <div class="mask" v-show="modelshow" @touchstart="modelhide"></div>
    </div>
</template>
<script>
export default {
  data(){
      return{
          modelshow:false,//控制遮罩层显示隐藏
          loc:require('./img/location.png'),
          zanR:require('./img/praise-r.png'),
          zan:require('./img/praise.png'),
          msg:require('./img/comment.png'),
          share:require('./img/share.png'),
          pesonalData:null,
          gender:"",
          data:[],
        //   {"uname":"点滴","mood":"夕阳西下几时回","focus":"23","fans":"88",shareshow:false, praise:false,},
          datas:[
              {"uname":"点滴","time":"今天12:30","content":"今天天气不错啊哈哈哈哈哈哈这是测试内容测试内容试内容内容容全是测试内容全部都是没毛病","zanNum":"36","srcName":'成都龙泉洛带古镇'},
              {"uname":"点滴","time":"今天02:22","content":"今天天气不错啊","zanNum":"36","srcName":'成都龙泉洛带古镇',imgs:[
                 {
                img:require('./img/p1.png')
              },
              {
                img:require('./img/p2.png')
              },
              {
                img:require('./img/p2.png')
              },
              ],shareshow:false, praise:false,},
              {"uname":"点滴","time":"今天01:39","content":"今天天气不错啊","zanNum":"36","srcName":'成都龙泉洛带古镇',shareshow:false, praise:false,},
          ]    
      }
  },
  methods:{
      back(){
            history.go(-1)
      },
     focus(){
         document.querySelector(".totle .myhead div:nth-child(4) a").className="reset router-link-exact-active router-link-active"

     },
     checkString(s,l,tag){//文字超出一定数量隐藏  
            if(s.length>l){  
              return s.substring(0,l)+tag;  
        }else{
          return s
        }  
      },
       praClick (index) {//点赞功能
        if(this.datas[index].praise){
          this.datas[index].zanNum--
          this.datas[index].praise = false
        }else{
          this.datas[index].zanNum++
          this.datas[index].praise = true
        }
      },
       sharefun(index){//点击显示分享菜单
          this.modelshow=!this.modelshow;
           if(this.datas[index].shareshow){
          this.datas[index].shareshow = false
        }else{
          this.datas[index].shareshow = true
        }
     },
     modelhide(){//模态框隐藏时操作
          this.modelshow=!this.modelshow;
          for(var i=0;i<this.datas.length;i++){
            this.datas[i].shareshow=false
          }
        },
    addTo(){
        this.$router.push({path:"/index/addfid/info"})
    }
  },
  created(){
this.pesonalData=this.$store.state.personalDetail;
  },
      mounted(){//控制文字多余隐藏
      var actContent=document.getElementsByClassName("actContent");
      for(var i=0;i<actContent.length;i++){
        var content=actContent[i].innerHTML;
        actContent[i].innerHTML= this.checkString(content,60,'...<span style="color:#ed5042 ">全文</span>');
      }
      console.log(this.pesonalData)
      if(this.pesonalData.gender==true||this.pesonalData.gender==0){
            this.gender="他"
        }else if(this.pesonalData.gender==false||this.pesonalData.gender==1){
            this.gender="她"
        }
    },
    activated(){
        console.log(this.pesonalData)
        this.pesonalData=this.$store.state.personalDetail;
        if(this.pesonalData.gender==true||this.pesonalData.gender==0){
            this.gender="他"
        }else if(this.pesonalData.gender==false||this.pesonalData.gender==1){
            this.gender="她"
}
    },
    // deactivated(){//退出页面组件销毁
    //     this.$destroy();
    // }
}
</script>

<style lang="less" scoped>
     @import '~less/variable';
     img{
         max-width:200%;
         max-height: 200%;
     }
       .mask{//遮罩层
        position: fixed;
        top:0;
        right: 0;
        left: 0;
        bottom: 0;
        z-index: 1;
        background-color: #000000;
        opacity: 0.05;
  }
     .detailContainer{
         position: fixed;
         top: 0;
         right: 0;
         left: 0;
         bottom: 0;
         overflow: scroll;
         background: @bgcolor-body ;
         .top{//动态上部个人信息展示
             height: 8.10rem;
            .topback{//顶部背景图片
                height: 3.82rem;
                left: 0;
                right: 0;
                // background:url("./img/toppic.png")no-repeat; 
                position: absolute;
                 background-size: 100%; 
            }
            .topbar{//顶部返回
                height: 3.82rem;
                width: 100%;
                font-size: .3rem;
                position: absolute;
                z-index: 10;
                background-color: rgba(255,255,255,0.3);
                >div:nth-child(1){//顶部返回按钮
                    padding-left: .2rem;    
                    line-height: .88rem;
                    color: @color-l;
                     position: fixed;
                     top: 0;
                }
                >div:nth-child(2){//用户头像以及信息
                    >div:nth-child(1){
                        position: absolute;
                        width: 100%;
                        top:2.66rem;
                        text-align: center;
                        img{
                            border-radius: 50%;
                            height: 1.88rem;
                        }
                    }
                    >div:nth-child(2){//用户名以及个性签名
                        position: absolute;
                        width: 100%;
                        text-align: center;
                        top:4.78rem;
                        p:nth-child(1){
                            font-size: .38rem;
                             color: @color-n
                        }
                        p:nth-child(2){
                            font-size: .28rem;
                        }
                    }
                    >div:nth-child(3){
                        position: absolute;
                        width: 100%;
                        top:6.04rem;
                        text-align: center;
                        p{
                            color: @color-n;
                            font-size: .34rem;
                            margin-bottom:.1rem ;
                            height: .56rem;
                            line-height: .56rem;
                            img{
                                width: .56rem;
                            }
                        }
                        span{
                           
                            color: @color-i;
                            font-size: .28rem;
                        }
                    }
                }
            }
         }
         //下侧动态列表
         .aclist{
            background-color: @background;
            padding-left: .2rem;
            padding-right: .2rem;
            .listTitle{//上侧提示信息
                height: 0.4rem; 
                margin-bottom: 0.16rem;
                font-size: 0.28rem;
                line-height: 0.4rem;
            span:nth-child(1){  //左侧竖线
                display: inline-block;
                height: .4rem;
                width: 0.08rem;
                background-color: @fs-i;
                border-top-left-radius:0.05rem;
                border-bottom-left-radius:0.05rem;
                border-top-right-radius:0.05rem;
                border-bottom-right-radius:0.05rem;   
                vertical-align: top;
                margin-right: .26rem;
            }
            span:nth-child(2){//右侧文字说明
                display: inline-block;
                height: 100%;
                line-height: .4rem; 
                }
            } 
            .aclistDetail{
                position: relative;
                background-color: @bgcolor-body;
                padding: .15rem;
                margin-top: .16rem;
                >div:nth-child(1){//头像用户名以及时间
                    img{
                        width: .82rem;
                    }
                    p{
                        font-size: .28rem;
                        color: @color-n ;
                    }
                    span{
                        font-size: .24rem;  
                        color: @color-i;
                    }
                }
                  >div:nth-child(2){
                      img{
                          width: 100%;
                      }
                  }
                >div:nth-child(3){//文字内容
                    font-size: .3rem;
                    letter-spacing: 0.02rem;
                    color: @color-n;
                }
                 // 地址
                >div:nth-child(4) {
                margin-top:26/100rem;
                height:60/100rem;
                line-height:60/100rem;
                >div:nth-child(1) {
                    img{
                    width:20/100rem;
                    }
                    span{
                    vertical-align: middle;
                    margin-left:20/100rem;
                    font-size: 26/100rem;
                    color:#969696;
                    }
                }
                >div:nth-child(2) {
                    text-align: center;
                    img{
                    width:33/100rem;
                    }
                    span{
                    font-size: 0.26rem;
                    color:#d6d6d6;
                    margin-left:20/100rem;
                    vertical-align: middle;
                    }
                }
                >div:nth-child(3) {
                    text-align: center;
                    img{
                    width:33/100rem;
                    }
                }
                >div:nth-child(4) {
                    text-align: center;
                    img{
                    width:33/100rem;
                    }
                }
            }
                >div:nth-child(5) {//分享菜单
                    position: absolute;
                    bottom:.86rem;
                    width:95%;
                    text-align: center;
                    background-color: @bgcolor-body;
                    border-radius: .15rem;
                    z-index: 100;
                    padding: .1rem;
                    img{
                        width: 1rem;
                        height: 1.32rem;
                    }
                    .triangle{//三角图标
                        width: .4rem;
                        height: .28rem;
                        position: absolute;
                        bottom:-.36rem;
                        right: .3rem;
                    }
                }
            }
         }
     }
</style>
