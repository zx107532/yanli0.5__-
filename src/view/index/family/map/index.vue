<template>
  <div class="detail">
    <baidu-map class="map"  @ready="myReady" :theme="theme"    scroll-wheel-zoom>
          <!-- <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation> -->
          <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT" ></bm-navigation>
          <bm-overlay pane="labelPane" :class="{sample:true}" @draw="drawSelf">
            <!-- 主用户头像 -->
              <div class="selfPic">
                  <img :src="selefpic">
                  <span class="uName">{{selfname}}</span>
              </div>
          </bm-overlay>
      <div v-for="(item,index)  in friendsPoi" :key="index">
          <my-overlay :position="{lng:item.gpsposition.lng, lat:item.gpsposition.lat}" :name="item.friendRemarkName" @touchend.native="openMenu(index)" :photo="item.photo" v-if="!item.show" >
          </my-overlay>
          <user-menu :position="{lng:item.gpsposition.lng,lat:item.gpsposition.lat}" v-show="item.show" :index="index" :uid="item.gpsposition.userID"  v-on:closeX="closes"></user-menu>
      </div>
       <return class="topbar"></return>
    </baidu-map>
      <ul class="ulist"  >
            <li @touchend="myClick" class="mySelf"><img :src="selefpic"></li>
            <li v-for="(item,index) in friendsPoi" @touchend="ulistClick(index)"  :key="index"><img slot="img" :src="item.photo"></li>
        </ul>
        <div  id="poi">
          <p v-show="poishow" style="font-size:.25rem;background:#ffffff;color:#000000">{{adress}}</p>
          <Icon type="android-locate" style="margin-left:20%" v-show="!poihide"></Icon>
          <i v-show="!poishow" style="font-size:.3rem">正在努力定位中...</i>
        </div>
    <p id="talk" @touchstart="talk($event)" @touchend="tijiao($event)" @click="audio()" :style="{color:colors}">
      <Icon  type="android-microphone" :style="{color:color}" ></Icon>
    </p>
    <!--<div style="width: 50px;height: 50px;position: fixed;top: 100px;z-index: 999;background: red" @click="cliers()"></div>-->
  </div>
</template>
<script>
import MyOverlay from './MyOverlay/index'
import UserMenu from './UserMenu/index'
import Return from '@/components/Return/index'
import { MessageBox } from 'mint-ui';
import {fun} from '@/common/js/base/audio'
export default {
  data () {
    return {
      // zoom:11,
      color:'',
      colors:'',
      senderId:null,
      touid:null,
      time:null,
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
      selefpic:localStorage.mypic,
      selfname:localStorage.myname,
      center:{"lng":"","lat":""},
      mypoi:{"lng":this.$store.state.location.lng,"lat":this.$store.state.location.lat},
      friendsPoi:'',
      mapHeight:'',
      metaContent:'',
      poishow:true,//定位图标部分
      adress:null,
      poihide:false,//定位图标显示隐藏
      timer:null,//页面数据更新定时器
      maptimer:null,//获取坐标定时器
      province:'',//省
      city:'',//市
      region:'',//区
      adressDtail:'',//门牌号
    }
  },
  components:{MyOverlay,UserMenu,Return},
  methods: {
    talk(e){
      this.color = '#00ba00';
      fun.startReady(this.touid)
//      this.$options.methods.audio()
    },
    tijiao(e){
      this.color = ''
      fun.stopReady()
      onPlusReady()
//      setTimeout(this.$options.methods.audio(),2000)
    },
    audio(){
      let data = {
        'userId':localStorage.mobilephone,
//        'chatId':'3'
        'senderId':this.senderId
      };
      this.$ajax.audiolist(data).then(msg=>{
//          console.log(msg.data)
//          console.log(localStorage.mobilephone)
        if(msg.data.length != 0){
//            console.log(msg.data)
          for (var i =0;i<msg.data.length;i++){
            if(msg.data[i].isAccessed == '0'&&msg.data[i].senderId!=msg.data[i].userId){
              console.log(msg.data[i])
              let data = {
                'chatId':msg.data[i].chatId,
                'userId':localStorage.mobilephone
              };
              this.$ajax.audio(data).then(msg=>{
//                  console.log(msg.data)
                fun.startPlay('http://182.151.104.205:16000/elderly'+msg.data.url)
              })
            }
          }
        }
      })
    },
     drawSelf({el, BMap, map}) {
       var pixel = map.pointToOverlayPixel(new BMap.Point(this.$store.state.location.lng,this.$store.state.location.lat))
          el.style.left = pixel.x - 53/2 + 'px'
          el.style.top = pixel.y - 53/2 + 'px'
       window.myTime=setInterval(()=>{
//         console.log("www")
          var pixel = map.pointToOverlayPixel(new BMap.Point(this.$store.state.location.lng,this.$store.state.location.lat))
          el.style.left = pixel.x - 53/2 + 'px'
          el.style.top = pixel.y - 53/2 + 'px'
       },1000)
    },
    openMenu(index){//菜单展开
      this.center.lng=this.friendsPoi[index].gpsposition.lng;
      this.center.lat=this.friendsPoi[index].gpsposition.lat;
      if (this.friendsPoi[index].show===true){
        this.friendsPoi[index].show = false
      }else{
        for (var i=0;i<this.friendsPoi.length;i++){
          this.friendsPoi[i].show = false;
        }
        this.friendsPoi[index].show = !this.friendsPoi[index].show
      }
    },
     closes (index){//菜单关闭
      this.friendsPoi[index].show = !this.friendsPoi[index].show
    },
    update(){//获取家庭数据,连接服务器
      let data={
        userId:localStorage.mobilephone,
        groupname:"家庭"

      }
      this.$ajax.groupPosition(data)
          .then(res=>{
            if(res.state==0){
            this.friendsPoi=res.data;
            }else{
               MessageBox('提示', '出错啦，请等下再试');
            }
          })
          .catch(error=>{
            MessageBox('提示', '请检查网络或联系我们的客服');
            throw errow;
          })
    },
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
    myLocation(){//获取手机定位，并转换百度地图坐标
        this.$loca.onPlusReady()
      },
     ulistClick(index){
      this.center.lng=this.friendsPoi[index].gpsposition.lng;
      this.center.lat=this.friendsPoi[index].gpsposition.lat;
      // this.zoom=18;
    },
     myClick(){
        this.center.lng= localStorage.mylng;
        this.center.lat=localStorage.mylat;
    },
    cliers(){
      clearInterval( window.time)
      window.time = null
    },
    myReady ({BMap, map}) {
            let that=this;
            let basePois={"lng":'',"lat":""};
            //获取当前坐标并转换
            let getpoi=function(){
              that.myLocation()
              let geoc = new BMap.Geocoder();
              let location=that.$store.state.location;//保存坐标信息
//              let pt = new BMap.Point(location.lng,location.lat);//实例化这两个点
              let pt = new BMap.Point(11599678.126825,3554106.890989)
              　              　geoc.getLocation(pt, function(rs){
            　　　　　　　var addComp = rs.addressComponents;
                          that.province=addComp.province,//省
                          that.city=addComp.city,//市
                          that.region=addComp.district,//区
                          that.adressDtail=addComp.street+addComp.streetNumber//门牌号
  　　　　              });
                that.mypoi.lng=location.lng;
                that.mypoi.lat=location.lat;
                //查询数据库坐标，与当前位置对比
                let data={
                        userId:localStorage.mobilephone,
                        }
                        that.$ajax.presentPoi(data)
                            .then(res=>{
                            console.log(res)
                            if(res.data!=null){//若数据库中有定位信息
                            basePois.lng=res.data.lng;
                            basePois.lat=res.data.lat;
                            //计算距离
                            let pointA = new BMap.Point(basePois.lng,basePois.lat);
                            let pointB = new BMap.Point(that.$store.state.location.lng,that.$store.state.location.lat);
                            let distance = map.getDistance(pointA,pointB).toFixed(1);
                            // alert(basePois.lng+","+basePois.lat)
                            // alert(that.$store.state.location.lng+","+that.$store.state.location.lat)
                            if(distance>10){//如果两次距离相差大于300米 向服务器发送坐标
//                            alert(distance)
                              let myLoc={
                                  userId:localStorage.mobilephone,
                                  lat:that.mypoi.lat,
                                  lng:that.mypoi.lng,
                                  province:that.province,
                                  city:that.city,
                                  region:that.region,
                                  detail:that.adressDtail
                              }
                              that.sendPoi(myLoc)
                            }
                          }
                        })
                            .catch(error=>{
                              throw error
                      })
              }
            //.........................................................................//
//             let getpoi= function(){
//              var geolocation = new BMap.Geolocation();
//                 geolocation.getCurrentPosition(function(r){
//                     if(this.getStatus() == BMAP_STATUS_SUCCESS){
//                       // 反编译坐标
//                       var geoc = new BMap.Geocoder();
//                       var pt = new BMap.Point(r.point.lng, r.point.lat);//实例化这两个点
//                       　geoc.getLocation(pt, function (rs) {
//           　　　　　　　var addComp = rs.addressComponents;
//                         that.province=addComp.province,//省
//                         that.city=addComp.city,//市
//                         that.region=addComp.district,//区
//                         that.adressDtail=addComp.street+addComp.streetNumber//门牌号
// 　　　　              });
//                       that.mypoi.lng=r.point.lng;
//                       that.mypoi.lat=r.point.lat;
//                       // console.log(that.mypoi)
//                     }
//                     else {
//                       alert('failed'+this.getStatus());
//                     }
//                   },{enableHighAccuracy: true})
//            }
           //初始化地图获取自己位置
           getpoi();
        	//根据原始数据计算中心坐标和缩放级别，并为地图设置中心坐标和缩放级别。
            function setZoom(points){
              if(points.length>0){
                var maxLng = points[0].gpsposition.lng;
                var minLng = points[0].gpsposition.lng;
                var maxLat = points[0].gpsposition.lat;
                var minLat = points[0].gpsposition.lat;
                var res;
                for (var i = points.length - 1; i >= 0; i--) {
                  res = points[i].gpsposition;
                  if(res.lng > maxLng) maxLng =res.lng;
                  if(res.lng < minLng) minLng =res.lng;
                  if(res.lat > maxLat) maxLat =res.lat;
                  if(res.lat < minLat) minLat =res.lat;
                  if(localStorage.mylng>maxLng)maxLng=localStorage.mylng;
                  if(localStorage.mylng<minLng)minLng=localStorage.mylng;
                  if(localStorage.mylat>maxLat)maxLat=localStorage.mylat;
                  if(localStorage.mylat<minLat)minLat=localStorage.mylat;
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
            setZoom(that.friendsPoi)
          //  var lng=that.center.lng,lat=that.center.lat
          //   document.querySelector(".detail .ulist .mySelf").onclick=function(){
          //        map.centerAndZoom(new BMap.Point(lng,lat), 18);
          //   }
            //控制定位
            //点击下方定位按钮
            document.getElementById("poi").onclick=function(){
              that.poishow=false;
              that.poihide=true;
              that.myLocation()
              let geoc = new BMap.Geocoder();
              let location=that.$store.state.location;//保存坐标信息
              let pt = new BMap.Point(location.lng,location.lat);//实例化这两个点
              　geoc.getLocation(pt, function (rs) {
                      var addComp = rs.addressComponents;
            　　　　　that.adress=addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street;
  　　　　              });
                 map.panTo(pt);
                 that.center.lng=location.lng;
                 that.center.lat=location.lat;
                 that.poishow=true;
            }
            //每个一段时间自动更新坐标
            window.maptimer=setInterval(()=>{
              getpoi()
            },1000*5)
      }
  },
  created(){
    var h=window.screen.height ;
    this.mapHeight=h/50+"rem";
    window.flex(true)
    this.metaContent=document.getElementsByTagName("meta")[1]["content"];
    //获取用户数据
    this.friendsPoi=this.$store.state.mapdata;
  },
   mounted(){
    document.getElementsByTagName("html")[0].style.fontSize="50px";
    document.getElementsByTagName("meta")[1].setAttribute('content','initial-scale=1, user-scalable=no');
    window.timer=setInterval(()=>{//更新数据
      this.update()
    },1000*6)
     window.time = setInterval(()=>{
      this.audio()
     },500)
    console.log(this.friendsPoi)
  },
  deactivated(){//防止返回时受keep-alive影响
    this.$destroy()
    clearInterval(window.time),
    clearInterval(window.myTime),
      document.getElementsByTagName("meta")[1].setAttribute('content',this.metaContent)
       document.getElementsByTagName("meta")[1].setAttribute('content','initial-scale=1, user-scalable=no')
      window.flex(false)
     clearInterval(window.timer) //停止获取数据
     clearInterval(window.maptimer)
     window.timer=null;
     window.maptimer=null;
     this.$store.commit('mapdata',this.friendsPoi);
  }
}
</script>
<style lang="less" scoped>
 @import '~less/variable';
img{
  max-width: 100%;
  max-height: 100%;
}
.detail{//父元素占满页面
  position: fixed;
  top:0;
  right: 0;
  left: 0;
  bottom: 0;
  #poi{
    position: fixed;
    bottom: .2rem;
    right: .2rem;
    color:#888888;
    font-size: .5rem;
  }
  .map{
    position: fixed;
    width: 100%;
    top: .88rem;
    bottom: 0;
  }
}
  .sample {//自定义遮盖物
      color: #fff;
      position: absolute;
      // 主要用户在地图中的显示
      .selfPic{
              width: 2.4rem;
              height: 1.2rem;
        img{//用户头像位置
            position: absolute;
            left: 0;
            z-index: 1000000000000000;
            // width: 1.2rem;
            height: 1.2rem;
            border-radius: 50%;
          }
      .uName{//用户名居中
        background: @fs-i;
        position: absolute;
        left:1rem ;
        top:50%;
        padding-left: .25rem;
        height: .5rem;
        margin-top: -.25rem;
        padding-right: .1rem;
        border-radius: .06rem;
         font-size: .32rem;
        line-height: .5rem;
        z-index: 99;
        }
      }

}
.ulist{
  background:rgba(204,204,204,0.5);
  width:1.1rem;
  height: 100%;
  position: absolute;
  top:0.96rem;
  overflow: scroll;
}
.ulist li{
  margin-top: 0.3rem;
  text-align: center;
  img{
    border-radius: 50%;
  }

}
 #talk{
   background: rgba(196, 187, 207, 0.7);
   color: green;
   position: fixed;
   width: 1.5rem;
   height: 1.5rem;
   border-radius: 50%;
   z-index: 999;
   top: 80%;
   left: 50%;
   transform: translateX(-50%);
   font-size: 1rem;
   i{
     margin-left: 50%;
     transform: translateX(-50%);
   }
 }
</style>

