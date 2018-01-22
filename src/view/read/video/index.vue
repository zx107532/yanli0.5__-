<template>
  <div>
    <load-more
      :top-method="loadTop"
      :bottom-method="loadBottom"
      :bottom-all-loaded="allLoaded"
      ref="loadmore"
      topPullText="下拉刷新"
      topDropText="松开刷新">
      <div class="video">
        <div :key="index" v-for="(item,index) in datas" >
          <Row>
            <Col span='24'>
            <p @click="details(index)">
              {{item.province}}
            </p>
            <div class="imgs" @click="details(index)" style="height: 3.5rem">
              <img :src="imgUrl" alt="" style="height: 100%">
            </div>
            </Col>
          </Row>
          <Row>
            <Col>
            <div>
              <p>
                <img :src="msger" alt="">
                <span @click="details(index)">{{item.mount}}</span>
                <img :src="more" alt="">
              </p>
            </div>
            <div @click="personal(index)">
              <img :src="item.userPhoto" alt="" style="width: 0.34rem;border-radius: 50%">
              <span>{{item.userName}}</span>
            </div>
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
    components:{
      'LoadMore': Loadmore
    },
    data () {
      return {
        allLoaded:false,
        imgUrl:'',
        page:1,
        msger:require('./img/pinglun.png'),
        more:require('./img/more.png'),

        datas:[
          {
            title:'柯洁首战惜败！王小川点评：阿法狗将重演进 化史',
            category:'3',
            articleId:'005',
            userId:'0030',
            img:require('./img/kejie.png'),
            src:require('./img/xinlang.png'),
            name:'健康网',
            mount:6280,
            show:true
          },
          {
            title:'日本失联女教师可能搭乘中国人车辆 可通过微 信寻找线索',
            category:'3',
            articleId:'006',
            userId:'2250',
            img:require('./img/nv.png'),
            src:require('./img/haiwai.png'),
            name:'海外网',
            mount:6280,
            show:false
          }
        ]
      }
    },
    methods:{
      loadTop(){//下拉刷新触发
        var data = {
          userid:'1',
          page:this.page,
          size:'5'
        }
        this.$ajax.videolist(data).then(msg=>{
          console.log(msg);
          this.page++
          for(var i = 0;i<msg.length;i++){
            msg[i].category = '3'
            console.log(this,page)
          }
          this.datas = msg
        })
        this.$refs.loadmore.onTopLoaded();
      },
      loadBottom() {
        this.allLoaded = true;// 若数据已全部获取完毕
        this.$refs.loadmore.onBottomLoaded();
      },
      details(index){//往新闻详情跳转并传递新闻编号
        this.$router.push({name:'recommended/details'})
//          eventBus.$emit('articleId',this.datas[index].articleId)
        this.$store.commit('resourceID',this.datas[index].id)
        this.$store.commit('category',this.datas[index].category)
      },
      personal: function (index) {//往人物动态跳转并传递作者ID
        this.$router.push({path:'/index/detail'})
        this.$store.commit('userId',this.datas[index].userId)
      }
    },
    activated(){
      this.page = 1
      var data = {
        userid:'1',
        page:this.page,
        size:'5'
      }
      this.$ajax.videolist(data).then(msg=>{
        console.log(msg);
        this.page++
        for(var i = 0;i<msg.length;i++){
          msg[i].category = '3'
        }
        this.datas = msg
        this.imgUrl = msg.pictures[0].url
      })
    }
  }
</script>

<style scoped lang="less">
  @import '~less/variable';
  .mint-loadmore{//下拉刷新组件样式
    padding-top: -0.2rem;
    font-size: 0.24rem;
    >div:nth-child(1){
      >div:nth-child(1){
        margin-top: -0.2rem;
      }
    }
  }
  .video{
    padding:0.12rem 0.2rem;
    img{
      max-width: 100%;
    }
    >div{
      border-radius: 0.1rem;
      box-shadow: 0.02rem 0.02rem 0.02rem 0.02rem @border;
      margin-bottom: 0.2rem;
      >div:nth-child(1) {
        position: relative;
        p{
          position: absolute;
          bottom:0.2rem;
          left:0.2rem;
          right: 0.5rem;
          font-size: 0.34rem;
          color:@color-l;
        }
        .imgs img{
          width: 100%;
          height:100%;
        }
      }
      >div:nth-child(2) {
        >div>div:nth-child(1) {
          float: right;
          line-height: 0.66rem;
          padding-right: 0.2rem;
          p{
            span{
              display: inline-block;
              padding-left: 0.1rem;
              width: 1.3rem;
            }
            font-size: 0.3rem;
            vertical-align: middle;
          }
        }
        >div>div:nth-child(2) {
          font-size: 0.3rem;
          vertical-align: middle;
        }
      }
    }
  }
</style>
