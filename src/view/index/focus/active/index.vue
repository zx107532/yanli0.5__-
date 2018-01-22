<template>
  <div class="family">
    <div class="mapcon">
        <div class="mapTitle">
            <span></span>
            <span>地图</span> 
        </div>
      <!-- 地图容器 -->
      <baidu-map class="map" :theme="theme" :center="{lng: 116.404, lat: 39.915}" :zoom="18" :dragging='false' :double-click-zoom='false'>
        <!-- 定位图标显示 -->
        <bm-overlay pane="labelPane" class="sample"  @draw="draw">
          <router-link tag="div" :to="{path:'/index/focus/map',query:{name:'关注'}}" > 
            <img class="self" src="./img/poi.png">
          </router-link>
        </bm-overlay>
      </baidu-map>
    </div>
    <!-- 动态列表 -->
    <div class="acList">
      <!-- 用户头像，用户名 -->
      <div :key="index" v-for="(item,index) in datas">
        <Row>
          <Col span="4">
            <img :src="item.img">
          </Col>
          <Col span="6">
            <p>{{item.name}}</p>
            <span>{{item.data}}</span>
          </Col>
          <Col span="14">
                <img :src="more" @touchstart="screen(index)">
                <!-- 点击触发屏蔽动态列表菜单  -->
            <transition name="fade">
              <div class="screen" v-show="item.listshow">
                <div><img src="./img/screentop.png" class="screentop"></div>
                  <ul>
                    <li><img src="./img/screen.png" > 忽略此条动态 </li>
                    <li><img src="./img/screenall.png" >屏蔽此人动态</li>
                  </ul>
              </div>  
            </transition> 
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
        <!-- 用户动态，文字内容 -->
        <Row>
          <Col>
            <router-link tag="div" class="actContent" to='/read/msg'>
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

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        modelshow:false,
        praise:true,
        loc:require('./img/location.png'),
        more:require('./img/more.png'),
        zanR:require('./img/praise-r.png'),
        zan:require('./img/praise.png'),
        msg:require('./img/comment.png'),
        share:require('./img/share.png'),
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
          {
            img:require('./img/man2.png'),
            name:'朝花夕拾',
            data:'今天14:43',
            content:'记录卡受打击了卡时间到了爱上了的空间啊蓝色的婕拉收到了',
            zanNum:36,
            srcName:'成都龙泉洛带古镇',
            praise:false,
            listshow:false,
            shareshow:false,
          },
          {
            img:require('./img/man1.png'),
            name:'朝花夕拾',
            data:'今天12:43',
            content:'酸辣粉拉技术了大富科技老师放假垃圾费陆金所啦放假了说服力，技术了会计分录世纪东方立刻就爱上冷风机雷克萨附近来看司法鉴定了。',
            zanNum:44,
            imgs:[
              {
                img:require('./img/p1.png')
              },
              {
                img:require('./img/p2.png')
              },
              {
                img:require('./img/p2.png')
              },
            ],
            srcName:'成都龙泉洛带古镇',
            praise:false,
            listshow:false,
            shareshow:false,
          }
        ]
      }
    },
    methods: {
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
      } 
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
       .acList{
      padding:15/100rem;
      margin-top: 0.16rem;
      >div{
        // 边框盒子
        box-shadow: 0.02rem 0.02rem 0.02rem 0.02rem #ECECEC;
        padding:10/100rem;
        margin-top:0.2rem;
        margin-bottom:0.2rem;
         position: relative;
        // 头像 名字
        >div:nth-child(1) {
         
          >div:nth-child(1) {
            img{//头像
              width:80/100rem;
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
          >div:nth-child(3) {//右侧屏蔽消息按钮
          position: relative;
            img:nth-child(1){
              float: right;
              margin-right: 0.1rem;
              margin-top: 0.24rem;
            }
            .screen{//屏蔽消息菜单
            .screentop{
              position: absolute;
              z-index: 10;
              margin: 0;
              right: .4rem;
              width: .26rem;
              height: .26rem;
              top:.36rem
            }
              ul{
              position: absolute;
              right: 0.1rem;
              top:0.56rem;
              font-size: .3rem;
              width: 6.82rem;
              height: 1.50rem;
              background: @bgcolor-body;
              border-radius: 15px;
              z-index: 100;
              padding: 0 .2rem;
                li{
                    height: .72rem;
                    line-height: .72rem;
                }
                img{
                  width: .36rem;
                  height: .36rem;
                  float: left;
                  left: 0;
                  margin-top: 0.2rem;
                  margin-right: .46rem;
                }
                li:nth-child(1){
                  border-bottom: 2px solid @border;
                }
              }
            }
          }
        }
          // 图片列表
        >div:nth-child(2) {
          margin-top:0.3rem;
          img{
            padding:0.05rem;
            width: 100%;
            height: 100%;
          }
        }
        // 内容
        >div:nth-child(3) {
          margin-top:26/100rem;
          >div{
            color:@color-i;
            font-size: 0.3rem;
            line-height: 0.44rem;
          }
          
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

