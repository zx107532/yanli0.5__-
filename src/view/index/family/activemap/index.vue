<template> 
  <div class="wholeDetail">
    <return class="topbar"></return>  
    <baidu-map class="map" @ready="myReady" :theme="theme" :style="{height:mapHeight}" >
      <div v-for="(item,index)  in showList" :key="index" >
          <my-overlay :position="{lng: item.lng, lat:item.lat}" :time="item.collectTime" :index="index" :photo="familyList[showIndex].photo" v-if="!item.show"  v-on:toFather="recvMsg">  
          </my-overlay>
      </div>
    </baidu-map>
      <!-- <ul class="ulist" style="display">
            <li v-for="(item,index) in familyList" @touchstart=" ulistClick(index,item.gpsposition.userID)" :key="index"><img slot="img" :src="item.photo"></li>
      </ul>  -->
  </div>  
</template>
<script>
import MyOverlay from './MyOverlay/index'
import Return from '@/components/Return/index'
export default {
  data () {
    return {
      // userIndex:this.$route.query.show,
      showList:null,
      mapHeight:'',
      acShowIndex:0,
      acConShow:false,
      modelshow:false,
      metaContent:'',
      showIndex:'',
      theme:[
          {
            "featureType": "all", 
            "elementType": "all",
            "stylers": {
              "weight": "0.8",
              "lightness": 38,
              "saturation": -44
            }
          }
        ],
        loc:require('./img/location.png'),
        zanR:require('./img/praise-r.png'),
        zan:require('./img/praise.png'),
        msg:require('./img/comment.png'),
        share:require('./img/share.png'),
        familyList:'',
        // 模拟假数据
      // friendsPoi:[
      //   {
      //     "big":require('./img/1-big.png'),"name":"高小英","show":false,
      //     "move":[{time:"11:00","lng":"104.211495","lat":"30.564587",
      //             content:[{"main":"今天天气真好！",zanNum:36,time:"11:00",srcName:'成都龙泉洛带古镇',praise:false,},{"main":"helloworld！",time:"11:01",zanNum:36,srcName:'成都龙泉洛带古镇',praise:false,shareshow:false}]},
      //             {time:"12:00","lng":"104.219113","lat":"30.574102",
      //              content:[{"main":"今天天气真好！",zanNum:36,time:"11:00",srcName:'成都龙泉洛带古镇',praise:false,},{"main":"helloworld！",time:"11:00",zanNum:36,srcName:'成都龙泉洛带古镇',praise:false, shareshow:false}]},
      //             {time:"15:00","lng":"104.225078","lat":"30.561851",
      //              content:[{"main":"今天天气真好！",zanNum:36,time:"11:00",srcName:'成都龙泉洛带古镇',praise:false,},{"main":"helloworld！",time:"11:00",zanNum:36,srcName:'成都龙泉洛带古镇',praise:false, shareshow:false}]}
      //             ]
      //   },
      //   {"big":require('./img/2-big.png'),"name":"刘若英","show":false,
      //     "move":[{time:"11:00","lng":"104.211495","lat":"30.564587",
      //             content:[{"main":"今天天气真好！",zanNum:36,time:"11:00",srcName:'成都龙泉洛带古镇'},{"main":"helloworld！",zanNum:36,time:"11:00",srcName:'成都龙泉洛带古镇', shareshow:false,praise:false}]},
      //             {time:"12:00","lng":"104.219113","lat":"30.574102",
      //             content:[{"main":"今天天气真好！",zanNum:36,time:"11:00",srcName:'成都龙泉洛带古镇'},{"main":"helloworld！",time:"11:00",zanNum:36,srcName:'成都龙泉洛带古镇', shareshow:false,praise:false}]},
      //             {time:"15:00","lng":"104.225078","lat":"30.561851",
      //              content:[{"main":"今天天气真好！",zanNum:36,time:"11:00",srcName:'成都龙泉洛带古镇'},{"main":"helloworld！",time:"11:00",zanNum:36,srcName:'成都龙泉洛带古镇', shareshow:false,praise:false}]}
      //           ]
      //   },
      //   {"big":require('./img/3-big.png'),"name":"王冰冰","show":false,
      //   "move":[{time:"11:00","lng":"104.211495","lat":"30.564587",
      //             content:[{"main":"今天天气真好！",zanNum:36,time:"11:00",srcName:'成都龙泉洛带古镇'},{"main":"helloworld！",zanNum:36,time:"11:00",srcName:'成都龙泉洛带古镇', shareshow:false,praise:false}]},
      //             {time:"12:00","lng":"104.219113","lat":"30.574102",
      //              content:[{"main":"今天天气真好！",zanNum:36,time:"11:00",srcName:'成都龙泉洛带古镇'},{"main":"helloworld！",time:"11:00",zanNum:36,srcName:'成都龙泉洛带古镇', shareshow:false,praise:false}]},
      //             {time:"15:00","lng":"104.225078","lat":"30.561851",
      //              content:[{"main":"今天天气真好！",zanNum:36,time:"11:00",srcName:'成都龙泉洛带古镇'},{"main":"helloworld！",time:"11:00",zanNum:36,srcName:'成都龙泉洛带古镇', shareshow:false,praise:false}]}
      //             ]
      //   },
      //   {"big":require('./img/5-big.png'),"name":"张小琴","show":false,
      //   "move":[{time:"11:00","lng":"104.211495","lat":"30.564587",
      //             content:[{"main":"今天天气真好！",zanNum:36,time:"11:00",srcName:'成都龙泉洛带古镇'},{"main":"helloworld！",time:"11:00",zanNum:36,srcName:'成都龙泉洛带古镇', shareshow:false,praise:false}]},
      //             {time:"12:00","lng":"104.219113","lat":"30.574102",
      //             content:[{"main":"今天天气真好！",zanNum:36,time:"11:00",srcName:'成都龙泉洛带古镇'},{"main":"helloworld！",time:"11:00",zanNum:36,srcName:'成都龙泉洛带古镇', shareshow:false,praise:false}]},
      //             {time:"15:00","lng":"104.225078","lat":"30.561851",
      //              content:[{"main":"今天天气真好！",zanNum:36,time:"11:00",srcName:'成都龙泉洛带古镇'},{"main":"helloworld！",time:"11:00",zanNum:36,srcName:'成都龙泉洛带古镇', shareshow:false,praise:false}]}
      //             ]
      //   },
      //   {"big":require('./img/6-big.png'),"name":"张欣欣","show":false,
      //   "move":[{time:"11:00","lng":"104.211495","lat":"30.564587",
      //             content:[{"main":"今天天气真好！",zanNum:36,srcName:'成都龙泉洛带古镇'},{"main":"helloworld！",zanNum:36,srcName:'成都龙泉洛带古镇'}]},
      //             {time:"12:00","lng":"104.219113","lat":"30.574102",content:"这是一段测试文字"},
      //             {time:"15:00","lng":"104.225078","lat":"30.561851",content:"这也是一段测试文字"}
      //             ]
      //           }
      // ],
     
    }
  },
  components:{MyOverlay,Return},
  methods: {
    myReady ({BMap, map}) {
            let that=this;
            console.log(1)
        	//根据原始数据计算中心坐标和缩放级别，并为地图设置中心坐标和缩放级别。
            function setZoom(points){
              if(points.length>0){
                var maxLng = points[0].lng;
                var minLng = points[0].lng;
                var maxLat = points[0].lat;
                var minLat = points[0].lat;
                var res;
                for (var i = points.length - 1; i >= 0; i--) {
                  res = points[i];
                  if(res.lng > maxLng) maxLng =res.lng;
                  if(res.lng < minLng) minLng =res.lng;
                  if(res.lat > maxLat) maxLat =res.lat;
                  if(res.lat < minLat) minLat =res.lat;;
                };
                var cenLng =(parseFloat(maxLng)+parseFloat(minLng))/2;
                var cenLat = (parseFloat(maxLat)+parseFloat(minLat))/2;
                var zoom = getZoom(maxLng, minLng, maxLat, minLat);
                map.centerAndZoom(new BMap.Point(cenLng,cenLat), zoom);  
              }else{
                //没有坐标，显示全中国
                map.centerAndZoom(new BMap.Point(103.388611,35.563611), 5);  
              } 
            }
            //根据经纬极值计算绽放级别。  
            function getZoom (maxLng, minLng, maxLat, minLat) {  
                var zoom = ["50","100","200","500","1000","2000","5000","10000","20000","25000","50000","100000","200000","500000","1000000","2000000"]//级别18到3。  
                var pointA = new BMap.Point(maxLng,maxLat);  // 创建点坐标A  
                var pointB = new BMap.Point(minLng,minLat);  // 创建点坐标B  
                var distance = map.getDistance(pointA,pointB).toFixed(1);  //获取两点距离,保留小数点后两位  
                for (var i = 0,zoomLen = zoom.length; i < zoomLen; i++) {  
                    if(zoom[i] - distance > 0){  
                        return 17-i+3;//之所以会多3，是因为地图范围常常是比例尺距离的10倍以上。所以级别会增加3。  
                    }  
                };  
            }
            setZoom(that.showList);
            // document.querySelector(".wholeDetail .ulist li").onclick= function(){
            //   setZoom(that.showList);
            // }
      },
    upadte(uid){//页面数据更新
    let userid={
      friendId:uid
    }
        this.$ajax.wholeDaypoi(userid)
            .then(res=>{
              this.showList=res.data
              for(let i=0;i<this.showList.length;i++){
                if(this.showList[i].collectTime>1000){
                this.showList[i].collectTime=this.getLocalTime(this.showList[i].collectTime).hour+":"+this.getLocalTime(this.showList[i].collectTime).minute  
                }
              }
            })
    },
     ulistClick(index,uid){//点击头像显示相对应的数据
      this.userIndex=index;
      this.close();
      this.upadte(uid);
      // if(this.showList.length>0){
          this.showIndex=index;
      // }
    },
    // 接收子组件参数，获取当前点击下标
      recvMsg(index,show){
        this.acShowIndex=index;
       this.acConShow=show;
      },
      praClick (index) {//点赞功能
        if(this.friendsPoi[this.userIndex].move[this.acShowIndex].content[index].praise){
          this.friendsPoi[this.userIndex].move[this.acShowIndex].content[index].zanNum--
          this.friendsPoi[this.userIndex].move[this.acShowIndex].content[index].praise = false
        }else{
          this.friendsPoi[this.userIndex].move[this.acShowIndex].content[index].zanNum++
          this.friendsPoi[this.userIndex].move[this.acShowIndex].content[index].praise = true
        }    
      },
      sharefun(index){//点击显示屏蔽菜单
          this.modelshow=!this.modelshow;
           if(this.friendsPoi[this.userIndex].move[this.acShowIndex].content[index].shareshow){
          this.friendsPoi[this.userIndex].move[this.acShowIndex].content[index].shareshow = false
        }else{
          this.friendsPoi[this.userIndex].move[this.acShowIndex].content[index].shareshow = true
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
        if(time.minute<10){
          time.minute="0"+time.minute
        }
        return time
      },
      close(){//关闭弹窗
        this.acConShow=false;
      },
      modelhide(){//模态框隐藏时操作
          this.modelshow=!this.modelshow;
          for(var i=0;i<this.friendsPoi[this.userIndex].move[this.acShowIndex].content.length;i++){
            this.friendsPoi[this.userIndex].move[this.acShowIndex].content[i].shareshow=false
          }
        },
  },
  created(){
    var h=window.screen.height ;
    this.mapHeight=h/50+"rem";
    window.flex(true)
    this.metaContent=document.getElementsByTagName("meta")[1]["content"]
    document.getElementsByTagName("meta")[1].setAttribute('content','initial-scale=1, user-scalable=no')
    //连接服务器等操作
    this.familyList=this.$store.state.mapdata;
    this.showList=this.$store.state.fmap;
    this.showIndex=this.$route.query.ix;
     for(let i=0;i<this.showList.length;i++){
                if(this.showList[i].collectTime>1000){
                this.showList[i].collectTime=this.getLocalTime(this.showList[i].collectTime).hour+":"+this.getLocalTime(this.showList[i].collectTime).minute  
                }
              }
     
  },
   mounted(){
    //  console.log(1)
      // console.log(this. getLocalTime(this.showList[0].collectTime))
    document.getElementsByTagName("html")[0].style.fontSize="50px"
    document.getElementsByTagName("meta")[1].setAttribute('content','initial-scale=1, user-scalable=no')
    // this.upadte(this.$route.query.showdata);
    // 更新家人列表
  
  },
  deactivated(){//防止返回时受keep-alive影响
    this.$destroy()
      document.getElementsByTagName("meta")[1].setAttribute('content',this.metaContent)
       window.flex(false)
           // 更新家人列表
    this.familyList=this.$store.state.mapdata;
   
  }
}
</script>
<style lang="less" scoped>
 @import '~less/variable';
img{
  max-width: 100%;
  max-height: 100%;
}
.wholeDetail{//父元素占满页面
  position: fixed;
  top:0;
  right: 0;
  left: 0;
  bottom: 0;
  // 下方弹起动态框
  .outside{
    position: absolute;
    width: 94%;
    bottom: 0;
    z-index: 10;    
    margin-right: 3%;
    margin-left: 3%;
  }
  .actdetail{
    border-radius: .1rem;
    background-color: @bgcolor-body ;
    overflow: scroll;
    max-height: 7.4rem;
    .listdetail{
      padding: .1rem;
      font-size: .3rem;
      border-bottom: 1px solid @border;
      margin-right: 3%;
      margin-left: 3%;
      position: relative;
      // 头像 名字 地址 时间
      >div:nth-child(1){         
        >div:nth-child(1) {
              img{//头像
                width:80/100rem;
                border-radius: 50%;
              }
            }
            >div:nth-child(2) {
              p{//名字及时间
                font-size: 30/100rem;
                margin-bottom:5/100rem;
              }
              span{
                font-size:25/100rem;
                color:#969696;
              }
            }
      }
       // 图片内容
        >div:nth-child(2){

        }
        >div:nth-child(3){
          margin-top: .26rem;
          line-height: .44rem;
        }
        >div:nth-child(4){
          margin-top: .4rem;
          span{
              font-size: .24rem;
              color: @fs-l;
          }
          img{
             width: .34rem;
           } 
        }
          .shareList {//分享菜单
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
        .closeBtn{
           font-size: .5rem;
           color:@fs-l;
           position: absolute;
           top: .3rem;
           right: .2rem;
        }
    }
  }
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
  .sample {//自定义遮盖物
      color: #fff;
      position: absolute;
      width: 2.06rem;
      height: 1.2rem;
      // 主要用户在地图中的显示
      .selfPic{
            width: 1.2rem;
            height: 1.2rem;
        img{//用户头像位置  
            position: absolute;
            z-index: 100;
          }
      } 
      .uName{//用户名居中
        background: @fs-i;
        position: absolute;
        right:-0.2rem;
        top:50%;
        padding-left: .25rem; 
        height: .5rem;
        margin-top: -.25rem;
        padding-right: .1rem;
        border-radius: .06rem;
        font-size: .15rem;
        line-height: .5rem;
      }
}
.ulist{
  background:rgba(204,204,204,0.5);
  width:1.1rem;
  height: 100%;
  position: absolute;
  top:0.96rem;
  overflow: scroll;
  img{
    border-radius: 50%;
  }
}
.ulist li{
  margin-top: 0.3rem;
  text-align: center;
}
</style>