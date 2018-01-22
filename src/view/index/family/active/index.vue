<template>
  <div class="family">
    <div class="mapcon">
        <div class="mapTitle">
            <span></span>
            <span>地图</span>
        </div>
      <!-- 地图容器 -->
      <div  @click="mapContent" >
      <baidu-map  class="map" :theme="theme" :center="{lng: 116.404, lat: 39.915}" :zoom="18" :dragging='false' :double-click-zoom='false'>
        <!-- 定位图标显示 -->
        <bm-overlay pane="labelPane" class="sample"  @draw="draw">
            <img class="self" src="./img/poi.png">
        </bm-overlay>
      </baidu-map>
      </div>
    </div>
    <!-- 动态列表 -->
    
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        gpsData:[],
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
      }
    },
    methods: {
      draw ({el, BMap, map}) {
        const pixel = map.pointToOverlayPixel(new BMap.Point(116.404, 39.915))
        el.style.left = pixel.x - 36 + 'px'
        el.style.top = pixel.y - 80 + 'px'
      },
      mapContent(){//获取下一个地图数据
        let data={
        userId:localStorage.mobilephone,
        groupname:"家庭"
      }
      this.$ajax.groupPosition(data)
          .then(res=>{
            // this.$store.commit("mapdata",'');
            this.gpsData=[]
            this.$router.push({path:"/index/family/map",query:{name:"家庭"}})
            for(let i=0;i<res.data.length;i++){
              if(res.data[i].gpsposition!=null){
               this.gpsData.push(res.data[i])
              }
            }
            this.$store.commit("mapdata",this.gpsData); //存储当前家庭数据到vuex
          })
          .catch(error=>{
            this.$router.push({path:"/index/family/map",query:{name:"家庭"}})
            throw error
          })
      },
      // myReady ({BMap, map}) {
      //        var geolocation = new BMap.Geolocation();
      //           geolocation.getCurrentPosition(function(r){
      //               if(this.getStatus() == BMAP_STATUS_SUCCESS){
      //                 // 反编译坐标
      //                  var geoc = new BMap.Geocoder();
      //                 var pt = new BMap.Point(r.point.lng, r.point.lat);//实例化这两个
      //                 localStorage.mylng=r.point.lng;
      //                 localStorage.mylat=r.point.lat;
      //                 // console.log(that.mypoi)
      //               }
      //               else {
      //                 alert('failed'+this.getStatus());
      //               }
      //             },{enableHighAccuracy: true})
      // }
    },

  }
</script>
<style scoped lang="less">
  @import '~less/variable';
  img{//图片自适应
    max-width: 100%;
    max-height: 100%;
  }

  .family{
      margin-top: 0.16rem;
    // 地图
    .mapcon{
        margin-left: 0.32rem;
        margin-right: 0.32rem;
        .mapTitle{//地图上方的文字说明
            height: 0.4rem;
            margin-bottom: 0.16rem;
            font-size: 0.28rem;
            line-height: 0.4rem;
            span:nth-child(1){  //左侧竖线
                display: inline-block;
                height: 100%;
                width: 0.08rem;
                background-color: @fs-i;
                border-top-left-radius:0.05rem;
                border-bottom-left-radius:0.05rem;
                border-top-right-radius:0.05rem;
                border-bottom-right-radius:0.05rem;
                vertical-align: top;
            }
            span:nth-child(2){//右侧文字说明
                display: inline-block;
                height: 100%;
                line-height: .4rem;
            }
        }
      .map{//地图高度宽度
        height:3.62rem;
        .sample {
          width: 0.6rem;
          height: 0.8rem;
          overflow: hidden;
          text-align: center;
          position: absolute;
        }
        .self{//自己位置
          width: 0.36rem;
          height: 0.6rem;
        }
      }
    }
      
      
    
  }
</style>

