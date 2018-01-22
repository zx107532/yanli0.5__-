<template> 
  <div class="fodetail">
    <!-- 顶部返回按钮 -->
    <div @touchstart="back"><Icon type="chevron-left"></Icon></div>
    <baidu-map class="map" :theme="theme" :style="{height:mapHeight,zoom:'2'}" :center="{lng:center.lng , lat:center.lat }" :zoom="18" scroll-wheel-zoom>
          <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
          <!-- <bm-overlay pane="labelPane" :class="{sample:true}" @draw="drawSelf"> -->
            <!-- 主用户头像 -->
              <!-- <div class="selfPic">
                  <img src="./img/4-big.png">
              </div>
              <span class="uName">张大爷</span>
          </bm-overlay> -->
      <div v-for="(item,index)  in friendsPoi" :key="index">
          <my-overlay :position="{lng: item.lng, lat:item.lat}" :name="item.name" @touchstart.native="openMenu(index)" :photo="item.big" v-if="!item.show" >  
          </my-overlay>
          <user-menu :position="{lng: item.lng, lat:item.lat}" v-show="item.show" :index="index"  v-on:closeX="closes"></user-menu>
      </div>
       <!-- <return class="topbar" style="zoom:.5"></return>   -->
    </baidu-map>
      <!-- <ul class="ulist" >
            <li @touchstart="myClick"><img src="./img/4-big.png" ></li>
            <li v-for="(item,index) in friendsPoi" @touchstart="ulistClick(index)"  :key="index"><img slot="img" :src="item.big"></li>
        </ul>  -->
  </div>  
</template>
<script>
import MyOverlay from './MyOverlay/index'
import UserMenu from './UserMenu/index'
export default {
  data () {
    return {
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
      center:{"lng":"104.203196","lat":"30.563071"},
      friendsPoi:[
        {"lng":"104.203196","lat":"30.563071","small":"1.png","big":require('./img/1-big.png'),"name":"高小英","show":false},
        {"lng":"104.206196","lat":"30.574886","small":"2.png","big":require('./img/2-big.png'),"name":"刘若英","show":false},
        {"lng":"104.205352","lat":"30.581789","small":"3.png","big":require('./img/3-big.png'),"name":"王冰冰","show":false},
        {"lng":"104.204471","lat":"30.569134","small":"5.png","big":require('./img/5-big.png'),"name":"张小琴","show":false},
        {"lng":"104.206825","lat":"30.570953","small":"6.png","big":require('./img/6-big.png'),"name":"张欣欣","show":false}
      ],
      mapHeight:''
    }
  },
  components:{MyOverlay,UserMenu},
  methods: {
     drawSelf({el, BMap, map}) {
        var pixel = map.pointToOverlayPixel(new BMap.Point(104.212089,30.570903))
        el.style.left = pixel.x - 53/2 + 'px'
        el.style.top = pixel.y - 53/2 + 'px'
    },
    openMenu(index){//菜单展开
      this.center.lng=this.friendsPoi[index].lng;
      this.center.lat=this.friendsPoi[index].lat;
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
     ulistClick(index){
      this.center.lng=this.friendsPoi[index].lng;
      this.center.lat=this.friendsPoi[index].lat;
    },
     myClick(){//点击自己时的操作
        this.center.lng= 104.212089;
        this.center.lat=30.570903;
    },
    back(){
      this. $router.back()
    }
  },
  created(){
    var h=window.screen.height ;
    this.mapHeight=h*2/100+"rem";
  }
}
</script>
<style lang="less" scoped>
 @import '~less/variable';
img{
  max-width: 100%;
  max-height: 100%;
}
.fodetail{//父元素占满页面
  position: fixed;
  top:0;
  right: 0;
  left: 0;
  bottom: 0;
  >div:nth-child(1){//顶部返回按钮
    width: .6rem;
    height: .6rem;
    position: absolute;
    z-index: 10;
    font-size: .3rem;
    background-color:@color-n;
    opacity: .5;
    line-height: .6rem;
    text-align: center;
    border-radius: 50%;
    color: @color-l;  
    top:.6rem;
    left: .3rem;
  }
.fouser{
    position: absolute; 
    text-align: center; 
    width: .64rem;
    height: .92rem;
    }
  // .sample {//自定义遮盖物
  //     color: #fff;
  //     position: absolute;
  //     width: 2.06rem;
  //     height: 1.2rem;
  //     // 主要用户在地图中的显示
  //     .selfPic{
  //           width: 1.2rem;
  //           height: 1.2rem;
  //       img{//用户头像位置  
  //           position: absolute;
  //           z-index: 100;
  //         }
  //     } 
  //     .uName{//用户名居中
  //       background: @fs-i;
  //       position: absolute;
  //       right:-0.2rem;
  //       top:50%;
  //       padding-left: .25rem; 
  //       height: .5rem;
  //       margin-top: -.25rem;
  //       padding-right: .1rem;
  //       border-radius: .06rem;
  //       font-size: .15rem;
  //       line-height: .5rem;
  //     }
  // }
}
// .ulist{
//   background:rgba(204,204,204,0.5);
//   width:1.1rem;
//   height: 100%;
//   position: absolute;
//   top:0.96rem;
//   overflow: scroll;
// }
// .ulist li{
//   margin-top: 0.3rem;
//   text-align: center;
// }
</style>