<template>
  <div class="find">
    <load-more :top-method="loadTop"
               :bottom-method="loadBottom"
               :bottom-all-loaded="allLoaded"
               ref="loadmore"
               topPullText="下拉刷新"
               topDropText="松开刷新">
      <div class="list">
        <div :key="index" v-for="(item,index) in da">
          <Row>
            <Col span="4">
            <img :src="item.userPhoto" alt="" @click="personal()" style="border-radius: 50%">
            </Col>
            <Col span="6">
            <p @click="personal()">{{item.userName}}</p>
            <span>{{item.time.hour}}:</span><span>{{item.time.date}}</span>
            </Col>
            <Col span="2" offset='12'>
            <img :src="more" alt="">
            </Col>
          </Row>
          <Row>
            <Col>
            <div @click="content(index)" style="word-wrap: break-word">
              {{item.profile}}
            </div>
            </Col>
          </Row>
          <Row>
            <Col span="8" :key="imgindex" v-for="(img,imgindex) in item.pictures">
            <img :src=" 'http://182.151.104.205:16000/elderly'+img.url" alt="" @click="preview(index,imgindex)">
            </Col>
          </Row>
          <Row>
            <Col span="14">
            <img :src="loc" alt="">
            <span>{{item.positionDetail}}</span>
            </Col>
            <Col span="3">
            <div @click="content(index)">
              <div>
                <img :src="msg">
              </div>
            </div>
            </Col>
            <Col span="3">
            <img :src="share" alt="">
            </Col>
          </Row>
          <Row>
            <Col span="24" :key="leavindex" v-for="(leav,leavindex) in item.leavMsg">
            <b>{{leav.leavMsgName}}</b>
            <span>{{leav.leavMsgContent}}</span>
            </Col>
          </Row>
        </div>
      </div>
    </load-more>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Loadmore} from 'mint-ui'
  export default {
    data () {
      return {
        allLoaded:false,
        page:10,
        da:[],
        praise:true,
         province:'',
      city : '',
       district : '',
       street : '',
       streetNum : '',
       lat : '',
       lng : '',
        loc:require('./img/location.png'),
        more:require('./img/more.png'),
        zanR:require('./img/praise-r.png'),
        zan:require('./img/praise.png'),
        msg:require('./img/comment.png'),
        share:require('./img/share.png'),
        datas:[
          {
            img:require('./img/man2.png'),
            name:'朝花夕拾',
            data:'今天14:43',
            userId:'0005',
            content:'记录卡受打击了卡时间到了爱上了的空间啊蓝色的婕拉收到了',
            zanNum:36,
            // imgs1:require('./img/p1.png'),
            // imgs2:require('./img/p2.png'),
            // imgs3:require('./img/p3.png'),
            // imgs4:require('./img/p4.png'),
            // imgs5:require('./img/p5.png'),
            // imgs6:require('./img/p6.png'),
            // imgs7:require('./img/p7.png'),
            // imgs8:require('./img/p8.png'),
            // imgs9:require('./img/p9.png'),
            srcName:'成都龙泉洛带古镇',
            praise:false
          },
          {
            img:require('./img/man1.png'),
            name:'朝花夕拾',
            data:'今天12:43',
            userId:'0005',
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
                img:require('./img/p3.png')
              },
              {
                img:require('./img/p4.png')
              },
              {
                img:require('./img/p5.png')
              },
              {
                img:require('./img/p6.png')
              },
              {
                img:require('./img/p7.png')
              },
              {
                img:require('./img/p8.png')
              },
              {
                img:require('./img/p9.png')
              }
            ],
            srcName:'成都龙泉洛带古镇',
            praise:false,
            leavMsg:[
              {
                leavMsgName:'清风徐来：',
                leavMsgContent:'看着挺热闹的。'
              },
              {
                leavMsgName:'朝花夕拾：',
                leavMsgContent:'古镇活动真的挺多的，明天我也去看看。'
              }
            ]
          }
        ]
      }
    },
    components:{
      'LoadMore': Loadmore
    },
    methods:{
      loadTop(){//下拉刷新触发
        var data = {
          lng:this.lng,
          lat:this.lat,
          radius:'50',
          page:this.page,
          size:'5'
        }
        this.$ajax.bypoint(data).then(msg=>{
          this.page++
          for(var i= 0;i<msg.length;i++){
            msg[i].time = this.getLocalTime(msg[i].createTime);
            msg[i].praise = false;
            this.da.push(msg[i])
          }
          console.log(msg);
//          this.da = msg
        })
        this.$refs.loadmore.onTopLoaded();
      },
      loadBottom() {
        this.allLoaded = true;// 若数据已全部获取完毕
        this.$refs.loadmore.onBottomLoaded();
      },
      content(index){//往动态内容跳转
        this.$router.push({path:'/read/msg',query:{'id':this.da[index].id}});
        this.$store.commit('contentType',this.da[index].contentType)
        this.$store.commit('resourceID',this.da[index].id)
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
        return time
      },
      personal: function () {//往人物动态跳转并传递作者ID
        this.$router.push({path:'/index/detail'})
        this.$store.commit('userId',this.datas[0].userId)
      },
      preview:function (index,imgindex) {//预览图片
        var src = this.datas[index].imgs
        this.$router.push({name:'preview',query:{imgsrc:src,num:imgindex}})
      },

//  con(){//获取默认位置信息
//
//    //        console.log(this.position)
//    plus.geolocation.getCurrentPosition(function (e) {
//      //          console.log(e);
//      this.province = e.address.province;
//      this.city = e.address.city;
//      this.district = e.address.district;
//      this.street = e.address.street;
//      this.streetNum = e.address.streetNum;
//      // var data = {
//      //   coords: e.coords.longitude+','+e.coords.longitude,
//      //   ak:'YMiMl15VHvB6WGMaju5DAu4AQVpzYMlW'
//      // };
////              ul.$http.get('http://api.map.baidu.com/geoconv/v1',data).then(msg=>{
////                console.log(msg)
////              })
//      this.lat = e.coords.latitude;
//      this.lng = e.coords.longitude
//    });
////        return content
//  }
    },
    activated(){
      this.$loca.onPlusReady
      var tt = this
      setTimeout(function () {
        var pos = tt.$store.state.location
        var data = {
          lng:JSON.stringify(pos.lng),
          lat:JSON.stringify(pos.lat),
          radius:50,
          page:this.page,
          size:5
        }
        tt.$ajax.bypoint(data).then(msg=>{
          this.page++
          for(var i= 0;i<msg.length;i++){
            msg[i].time = this.getLocalTime(msg[i].createTime);
//          msg[i].praise = false;
          }
          console.log(msg);
          this.da = msg
        })
      },500)


    }
  }
</script>

<style scoped lang="less">
  @import '~less/variable';

  .find{
    .mint-loadmore{//下拉刷新组件
      padding-top: -0.2rem;
      font-size: 0.24rem;
      >div:nth-child(1){
        >div:nth-child(1){
          margin-top: -0.2rem;
        }
      }
    }
    img{
      max-width: 100%;
    }
    .title {
      padding:15/100rem;
      >div{
        border-radius: 0.1rem;
        height:0.78rem;
        line-height:0.78rem;
        box-shadow: 0.02rem 0.02rem 0.02rem 0.02rem #ECECEC;
        text-align: center;
        margin-top:20/100rem;
        img{
          margin-top:-20/100rem;
        }
        span{
          font-size:36/100rem;
          margin-left:10/100rem;
        }
      }
    }
    .list{
      padding:15/100rem;
      >div{
        // 边框盒子
        box-shadow: 0.02rem 0.02rem 0.02rem 0.02rem #ECECEC;
        padding:10/100rem;
        margin-top:0.2rem;
        margin-bottom:0.2rem;
        // 头像 名字
        >div:nth-child(1) {
          >div:nth-child(1) {
            img{
              width:80/100rem;
            }
          }
          >div:nth-child(2) {
            p{
              font-size: 30/100rem;
              margin-bottom:5/100rem;
            }
            span{
              font-size:25/100rem;
              color:#969696;
            }
          }
          >div:nth-child(3) {
            img{
              margin-top:20/100rem;
            }
          }
        }
        // 内容
        >div:nth-child(2) {
          margin-top:26/100rem;
          >div{
            color:#000;
            font-size: 30/100rem;
            line-height: 0.44rem;
          }
        }
        // 图片列表
        >div:nth-child(3) {
          margin-top:0.3rem;
          img{
            padding:0.05rem;
            width: 100%;
            height: 100%;
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
        // 留言
        >div:nth-child(5) {
          font-size: 0.3rem;
          line-height: 0.4rem;
          b{
            font-weight: normal;
            color:#F64E47;
          }
        }
      }
    }
  }
</style>
