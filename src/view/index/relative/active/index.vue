<template>
  <div class="family">
    <div class="mapcon">
        <div class="mapTitle">
            <span></span>
            <span>地图</span> 
        </div>
      <!-- 地图容器 -->
        <div @click="mapContent" > 
      <baidu-map class="map"  :theme="theme" :center="{lng: 116.404, lat: 39.915}" :zoom="18" :dragging='false' :double-click-zoom='false'>
        <!-- 定位图标显示 -->
        <bm-overlay pane="labelPane" class="sample"  @draw="draw">
            <img class="self" src="./img/poi.png">
        </bm-overlay>
      </baidu-map>
      </div>
    </div>
    
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        // modelshow:false,
        // praise:true,
        // loc:require('./img/location.png'),
        // more:require('./img/more.png'),
        // zanR:require('./img/praise-r.png'),
        // zan:require('./img/praise.png'),
        // msg:require('./img/comment.png'),
        // share:require('./img/share.png'),
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
        datas:[
         
        ]
      }
    },
    methods: {
      mapContent(){//获取下一个地图数据
        let data={
        userId:localStorage.mobilephone,
        groupname:"亲友"
      }
      this.$ajax.groupPosition(data)
          .then(res=>{
            this.gpsData=[];
            this.$router.push({path:"/index/relative/map",query:{name:"亲友"}})
            for(var i=0;i<res.data.length;i++){ 
               this.gpsData.push(res.data[i]) 
            }
            this.$store.commit("reMap",this.gpsData); //存储当前亲友数据到vuex 
            console.log(this.gpsData)
          })
          .catch(error=>{
            throw error
            this.$router.push({path:"/index/relative/map",query:{name:"亲友"}})
          })
      },
      draw ({el, BMap, map}) {
        const pixel = map.pointToOverlayPixel(new BMap.Point(116.404, 39.915))
        el.style.left = pixel.x - 36 + 'px'
        el.style.top = pixel.y - 80 + 'px'
      },
        screen(index){//点击显示屏蔽菜单
          this.modelshow=!this.modelshow;
           if(this.datas[index].listshow){
          this.datas[index].listshow = false
        }else{
          this.datas[index].listshow = true
        }
        },
         sharefun(index){//点击显示屏蔽菜单
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
            this.datas[i].listshow=false
            this.datas[i].shareshow=false
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
       checkString(s,l,tag){//文字超出一定数量隐藏  
            if(s.length>l){  
              return s.substring(0,l)+tag;  
        }else{
          return s
        }  
      },
      //       myReady ({BMap, map}) {
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
    mounted(){//控制文字多余隐藏
      var actContent=document.getElementsByClassName("actContent");
      for(var i=0;i<actContent.length;i++){
        var content=actContent[i].innerHTML;
        actContent[i].innerHTML= this.checkString(content,60,'...<span style="color:#ed5042 ">全文</span>');
      }
      
    }
  }
</script>
<style scoped lang="less">
  @import '~less/variable';
  img{//图片自适应
    max-width: 100%;
    max-height: 100%;
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

