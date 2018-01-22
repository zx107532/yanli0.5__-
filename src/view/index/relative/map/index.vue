<template> 
  <div class="detail">
    <baidu-map class="map"  @ready="myReady" :theme="theme" :style="{height:mapHeight}"   scroll-wheel-zoom>
          <!-- <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation> -->
          <bm-overlay pane="labelPane" :class="{sample:true}" @draw="drawSelf">
             <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT" ></bm-navigation>
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
  </div>  
</template>
<script>
import MyOverlay from './MyOverlay/index'
import UserMenu from './UserMenu/index'
import Return from '@/components/Return/index'
import { MessageBox } from 'mint-ui';
export default {
  data () {
    return {
      // zoom:11,
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
      center:{"lng":"104.212089","lat":"30.570903"},
      mypoi:{"lng":'',"lat":''},
      friendsPoi:'',
      mapHeight:'',
      metaContent:'',
      poishow:true,
      adress:null,
      poihide:false,
      timer:null,
      maptimer:null,
      province:'',//省
      city:'',//市
      region:'',//区
      adressDtail:'',//门牌号
    }
  },
  components:{MyOverlay,UserMenu,Return},
  computed:{
    poi(){
      return this.mypoi.lng
    }
  },
  watch:{
    poi(curVal,oldVal){
      // 向服务器发送请求，将定位存到服务器
      var that=this;
      setTimeout(function() {//定时器延时，地址解析出来再发送请求
          let data={
            userId:localStorage.mobilephone,
            lat:that.mypoi.lat,
            lng:that.mypoi.lng,
            province:that.province,
            city:that.city,
            region:that.region,
            detail:that.adressDtail
          }
          localStorage.mylng=that.mypoi.lng,
          localStorage.mylat=that.mypoi.lat,
          that.sendPoi(data)
      },5000);
    },
  
  },
  methods: {
     drawSelf({el, BMap, map}) {
        var pixel = map.pointToOverlayPixel(new BMap.Point(localStorage.mylng,localStorage.mylat))
        el.style.left = pixel.x - 53/2 + 'px'
        el.style.top = pixel.y - 53/2 + 'px'
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
        groupname:"亲友"

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
            console.log("1")
          }
        })
        .catch(error=>{
          throw error;
        })
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
    myReady ({BMap, map}) {
            let that=this;
            let basePois=[{"lng":'',"lat":""}];
            //获取当前坐标并转换
            let getpoi= function(){
             var geolocation = new BMap.Geolocation();
                geolocation.getCurrentPosition(function(r){
                    if(this.getStatus() == BMAP_STATUS_SUCCESS){
                      // 反编译坐标
                      var geoc = new BMap.Geocoder();
                      var pt = new BMap.Point(r.point.lng, r.point.lat);//实例化这两个点
                      　geoc.getLocation(pt, function (rs) {
          　　　　　　　var addComp = rs.addressComponents;
                        that.province=addComp.province,//省
                        that.city=addComp.city,//市
                        that.region=addComp.district,//区
                        that.adressDtail=addComp.street+addComp.streetNumber//门牌号
　　　　              });
                      that.mypoi.lng=r.point.lng;
                      that.mypoi.lat=r.point.lat;
                      // console.log(that.mypoi)
                    }
                    else {
                      alert('failed'+this.getStatus());
                    }        
                  },{enableHighAccuracy: true})
           }
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
               var geolocation = new BMap.Geolocation();
               that.poishow=false;
               that.poihide=true;
                geolocation.getCurrentPosition(function(r){
                    if(this.getStatus() == BMAP_STATUS_SUCCESS){
                      //反编译当前坐标 获取地址详情
                      var geoc = new BMap.Geocoder();
                      var pt = new BMap.Point(r.point.lng, r.point.lat);//实例化这两个点
                      　geoc.getLocation(pt, function (rs) {
          　　　　　　　　var addComp = rs.addressComponents;
          　　　　　　    that.adress=addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber;
　　　　　　　　          //对应的省市区、县街道，街道号
　　　　              });
                      map.panTo(r.point);
                      // alert('您的位置：'+r.point.lng+','+r.point.lat);
                      that.center.lng=r.point.lng;
                      that.center.lat=r.point.lat;
                      that.poishow=true;
                    }
                    else {
                      alert('failed'+this.getStatus());
                    }        
                  },{enableHighAccuracy: true})
            }
            //每个一段时间自动更新坐标
            that.maptimer=setInterval(()=>{
              getpoi()
            },1000*600)     
      }
  },
  created(){
    var h=window.screen.height ;
    this.mapHeight=h/50+"rem";
    window.flex(true)
    this.metaContent=document.getElementsByTagName("meta")[1]["content"];
    //获取用户数据
    this.friendsPoi=this.$store.state.reMap;
    console.log(this.friendsPoi)
    for(let i=0;i<this.friendsPoi.length;i++){
      this.friendsPoi[i].show=false;
    }
  },
   mounted(){
    document.getElementsByTagName("html")[0].style.fontSize="50px";
    document.getElementsByTagName("meta")[1].setAttribute('content','initial-scale=1, user-scalable=no');
    this.timer=setInterval(()=>{//更新数据
      this.update()
    },1000*600)
  },
  deactivated(){//防止返回时受keep-alive影响
    this.$destroy()
      document.getElementsByTagName("meta")[1].setAttribute('content',this.metaContent)
       document.getElementsByTagName("meta")[1].setAttribute('content','initial-scale=1, user-scalable=no')
      window.flex(false)
     clearInterval(this.timer) //停止获取数据
     clearInterval(this.maptimer);
     this.timer=null;
     this.maptimer=null;
     this.$store.commit('reMap',this.friendsPoi)
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
            z-index: 100;
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
</style>
<style>
.BMap_stdMpZoom{
  top:1rem!important;
}
</style>
