<template>
  <baidu-map class="baidu_map" center="北京" :zoom="zoom" style="font-size: 100rem">
    <bm-geolocation
      @ready="handler"
      :autoLocation = "true"
      anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
      :showAddressBar="true"
    ></bm-geolocation>
  </baidu-map>
</template>
<script type="text/ecmascript-6">
  export default {
    data(){
      return {
        center: {lng:104.06792346,lat:30.67994285},
        zoom: 20,
        ard:''
      }
    },
    methods:{
      handler ({BMap, map}) {
        var geoc = new BMap.Geocoder();

        map.addEventListener("click",function(e){
//          console.log(e.point.lng+","+e.point.lat);// 单击地图获取坐标点；
//          map.panTo(new BMap.Point(e.point.lng,e.point.lat));// map.panTo方法，把点击的点设置为地图中心点
          var pt = e.point
          geoc.getLocation(pt,function (re) {
            var add = re.addressComponents;
            this.$store.commit('position',add)
          })
        })
        this.center = this.$options.methods.con()

      },
      con(){
        var content = {
          lat:0,
          lng:0
        }
        plus.geolocation.getCurrentPosition(function (e) {
//          console.log(e);
          var p = e.coords;
          content.lat = p.latitude;
          content.lng = p.longitude
        });
        return content
      }
    },
    activated(){

    }
  }
</script>
<style scoped lang="less">
  @import "~less/variable";
  .baidu_map{
    width: 100%;
    height:10rem;
  }
</style>
