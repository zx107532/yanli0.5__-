<template>
  <div class="relList" :style="{minHeight:listHeight}">
        <router-link to="/index/search">
          <div class="search">
        <input type="search" placeholder="搜索">
        </div>
        </router-link>  
      <ul>
        <li :key="index" v-for="(item,index) in list">
          <Row class="title">
             <div @click="friendDetail(index)">
                <Col span='4'>
                  <img :src="item.photo" style="height:1rem;border-radius:50%">
                </Col>
              <Col span='4' class="mid">
                <p style="word-break:break-all">{{item.friendRemarkName}}</p>
                <!-- <span>
                  <img :src="location" >
                  {{item.locationName}}
                </span> -->
              </Col>
            </div>
            <Col span="4" class="midmenu1">
                 <img :src="showIcon">
            </Col>
            <Col span="4" class="midmenu2">
                 <img :src="showIcon1">
            </Col>
            <Col span="4" class="midmenu3">
                 <img :src="showIcon2">
            </Col>
            <router-link to="/index/set">
                <Col span="4" class="midmenu4">
                 <img src="./img/set.png">
                </Col>
            </router-link>
            <!-- 老板不要这块了，暂时保留，以免万一 -->
            <!-- <Col span="2" class="rt">
              <p @touchstart="showsClick(index)">
                <img v-show="item.show" :src="moreU">
                <img v-show='!item.show' :src="moreD">
              </p>
            </Col> -->
          </Row>
          <!-- 这个地方老板也不要了 -->
          <!-- <transition name="fade">
            <Row class="shows" v-if="item.show">
              <Col span='4'>
                <p>
                  <img :src="lc">
                </p>
                {{lcName}}
              </Col>
              <Col span='4'>
                <p>
                  <img :src="xinlv" alt="">
                </p>
                {{item.xinlvDate}}
              </Col>
              <Col span='4'>
                <p>
                  <img :src="phone">
                </p>
                  {{phoneName}}
              </Col>
            </Row>
          </transition> -->
        </li>
      </ul>
    </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        value:'',
        show : true,
        listHeight:'',
        lc: require('./img/weizhi.png'),
        xinlv: require('./img/xinlv.png'),
        phone: require('./img/phone.png'),
        location: require('./img/location.png'),
        moreD: require('./img/down.png'),
        moreU: require('./img/up.png'),
        phoneName:'电话',
        lcName:'位置',
        showIcon:require("./img/phone.png"),
        showIcon1:require("./img/weizhi.png"),
        showIcon2:require("./img/xinlv.png"),
        list:[
          {
            img: require('./img/pop1.png'),
            name: '老婆',
          },
          {
            img: require('./img/pop2.png'),
            name: '女儿',
          },
          {
            img: require('./img/pop3.png'),
            name: '女婿', 
          },
          {
            img: require('./img/pop4.png'),
            name: '孙儿',
          },
          {
            img: require('./img/pop5.png'),
            name: '孙女', 
          }
        ]
      }
    },
    methods: {
      reset(){//取消定位顶部与下部的距离
        document.getElementsByClassName("i-box")[0].style.top=0;
        document.getElementsByClassName("i-box")[0].style.bottom=0;
      },
      update(){
              let data={
            userId:localStorage.mobilephone,
            groupname:"亲友"
      }
      this.$ajax.friendList(data)
                .then(res=>{
                  console.log(res)
                  this.list=res.data
                })
                .catch(error=>{
                  throw error
                  console.log(error)
                })
      },
         friendDetail(index){
        // :to="{path:'/index/detail',query:{name:item.name}}"
        let data={
        
          userId:this.list[index].friendid
        }
        this.$ajax.personal(data)
                  .then(res=>{
                    if(res.state==0){
                      this.$store.commit("personalDetail",res.data)
                      this.$router.push({path:'/index/detail'})
                    }
                  })
                  .catch(error=>{
                    throw error
                  })
      }
      // 同样的道理，上面不要了，这块也不要了
      // showsClick(index) {  
      //   if (this.list[index].show){
      //     this.list[index].show = false
      //   }else{
      //     for(var i=0;i<this.list.length;i++){
      //       this.list[i].show = false
      //       this.list[index].show = true
      //     }
      //   }
      // },
    },
    created(){
    var h=window.screen.height ;
    this.listHeight=h*2/100 -3.1+"rem";    
  },
  mounted(){
    this.update()
  },
    activated(){
      this.update()
    }
  }
</script>

<style scoped lang="less">
  @import '~less/variable';
    // 家庭列表
    .relList {
      margin-top: .16rem;
      padding-top: .18rem;
      background-color: @background-i;
      .search{//搜索框样式 
        width:96%;
        margin-left:2%; 
          margin-bottom: .18rem;
        background: @bgcolor-body;
        input{//放大镜图标以及搜索框样式
          width:7.2rem;
          height: .56rem;
          border: 1px solid @border;
          font-size: .28rem;
          background: url('./img/searchmodel.png')  no-repeat 42% 50%;
        }
        input::-ms-input-placeholder{text-align: center;font-size: .28rem}
        input::-webkit-input-placeholder{text-align: center;font-size: .28rem}
      }
      ul{
         background: @bgcolor-body ;
      }
      li{
        margin: 0.1rem 0;
      }
      .title{
        height:1.2rem;
        padding:0 0.26rem;
        position: relative;
       >div:nth-child(1) {
          img{
            width:1rem;
            margin:0.08rem 0;
          }
        }
       .mid{
          border-bottom: 1px solid @border;
          height: 1.2rem;
          padding-right: .1rem;
          // line-height: 1.2rem;
          >p{
            font-size: 0.3rem;
            color:@color-n ;
            margin-top: .2rem;
          }
          >span{
            font-size:0.28rem;
            color:@fs-l;
          }
        }
         .midmenu1{//中间菜单
         line-height: 1.2rem;
         border-bottom: 1px solid @border;
         img{
           width: .44rem;
           height: .44rem;
         }
        }
        .midmenu2{
           line-height: 1.2rem;
           border-bottom: 1px solid @border;
          img{
            width: .33rem;
            height: .45rem;
          }
        }
        .midmenu3{
           line-height: 1.2rem;
           border-bottom: 1px solid @border;
          img{
            width: .51rem;
            height: .44rem;
          }
        }
         .midmenu4{
           line-height: 1.2rem;
           border-bottom: 1px solid @border;
          img{
            width: .46rem;
            height: .46rem;
          }
        }
        // 右边那块样式，不要了
        // .rt {
        //   height: 1.2rem;
        //   border-bottom: 1px solid @border;
        //   >p{
        //     margin-top:0.36rem;
        //     width:0.5rem;
        //     height: 0.5rem;
        //     border-radius: 50%;
        //     line-height: 0.5rem;
        //     box-shadow: 0.02rem  0.02rem @border;
        //     text-align: center;
        //     >img{
        //       width:0.24rem;
        //     }
        //   }
        // }
        
      }
      // 隐藏菜单样式，不要了
      // .shows{
      //   background-color: @background;
      //   text-align:center;
      //   height:1.4rem;
      //   font-size: 0.3rem;
      //   p{
      //     margin:0.22rem 0;
      //     img{
      //       max-width: 100%;
      //     }
      //   }
      // }
      // &.fade-enter-active, &.fade-leave-active{
      //   transition: all 0.5s ease
      // }
      // &.fade-enter, &.fade-leave-active{
      //   opacity: 0 
      // }
    }
</style>