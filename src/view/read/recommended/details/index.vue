<template>
  <div class="details">
    <div class="header">
      <Row>
        <Col span="2">
          <div tag="div" @click="back">
            <span>
              <Icon type="chevron-left"></Icon>
            </span>
          </div>
        </Col>
        <Col span="2" offset="20">
          <p>
            <Icon type="more"></Icon>
          </p>
        </Col>
      </Row>
    </div>
    <div class="content" :key="index" v-for="(item,index) in datas">
      <div>
        <div v-if="item.category == '1'">
      <!-- 标题 -->
      <Row>
        <Col span="24">
          <p @click="cons()">
            {{item.title}}
          </p>
        </Col>
      </Row>
      <!-- 头部 -->
      <Row>
       <Col span="20" >
          <Row  >
            <Col span="3">
              <div @click="personal()">
                <img :src="item.headImg" alt="">
              </div>
            </Col>
            <Col span="17">
              <p @click="personal()">{{item.headName}}</p>
              <span @click="personal()">{{item.headData}}</span>
            </Col>
          </Row>
        </Col>
        <Col span="4">
          <div>
            <img :src="item.headRightImg" alt="" @click="">
          </div>
        </Col>
      </Row>
      <!-- 详细信息 -->
      <Row>
        <div  :key="itsindex" v-for="(its,itsindex) in item.msg">
          <Col span="24">
            <p>
              {{its.title}}
            </p>
          </Col>
          <Col span="24">
            <div>
              <img :src="its.img" alt="">
            </div>
          </Col>
        </div>
      </Row>
      <!-- 介绍 -->
      <Row>
        <Col span="24">
          <p>
            {{item.introduce}}
          </p>
        </Col>
      </Row>
      <!-- 分类点赞 -->
      <Row>
        <Col span="24">
          <p>
            <span :key="clfyindex" v-for="(clfy,clfyindex) in item.classify">{{clfy.name}}</span>
          </p>
        </Col>
        <Col span="24">
          <span  :class="favorite===true?'active':''" @click="favoriteClick(index)">
            <Icon type="android-favorite"></Icon>
          </span>
        <span>{{item.collection}}</span>
        </Col>
      </Row>
        </div>
        <div v-else-if="item.category == '2'">
          <msg></msg>
        </div>
        <div v-else-if="item.category == '3'">
          <videos :datas="datas"></videos>
        </div>
      <!-- 广告 -->
      <Row class="banner" >
        <div :key="banindex" v-for="(ban,banindex) in item.banner" @click="details(banindex)" v-show="false">
          <Col span='18'>
            <p>
              {{ban.name}}
            </p>
          </Col>
          <Col span='6'>
            <div>
              <img :src="ban.img" alt="">
            </div>
          </Col>
        </div>
      </Row>
      <!-- 评论 -->
        <comment id="comment"></comment>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Comment from '@/components/comment'
  import msg from './msg/index.vue'
  import videos from './video/index.vue'
  export default {
    components:{
        "comment":Comment,  //挂载评论组件
        "msg":msg,
        "videos":videos
    },
    methods:{
      favoriteClick (index) {
        this.favorite= !this.favorite
        if(this.favorite){
          this.datas[index].collection++
        }else {
          this.datas[index].collection--
        }
        if(this.datas[index].collection <= 0){
          this.datas[index].collection = 0
        }
      },
      zanShowClick (index,comindex) {
        this.show = !this.show
        var comment = this.datas[index].comment[comindex]
        if (this.show){
          comment.num--

        }else{
          comment.num++
        }
      },
      personal: function () {//往人物动态跳转并传递作者ID
        this.$router.push({path:'/index/detail'})
        this.$store.commit('userId',this.datas[0].userId)
      },
      personals(comindex){//往人物动态跳转并传递层主ID
        this.$router.push({path:'/index/detail'})
        this.$store.commit('userId',this.datas[0].comment[comindex].userId)
      },
      details(index){//往新闻详情跳转并传递新闻编号
        this.$router.push({name:'recommended/details'})
//          eventBus.$emit('articleId',this.datas[index].articleId)
        this.$store.commit('articleId',this.datas[0].banner[index].articleId)
        this.$store.commit('category',this.datas[0].banner[index].category)
      },
      commentBack(index){
        this.$router.push({name:'commentBack', query:{userId:this.datas[0].comment[index].userId}})
      },
      style(){
        if(this.cla == ''){
          this.cla = 'display'
        }else {
          this.cla = ''
        }
      },
      com_txt(){
        if (this.com_text == ''){
          alert('信息不能为空')
        }else {
          alert(this.com_text)
          this.com_text = ''
        }
      },
      cons(){//接受新闻列表传递的参数
        this.articleID = this.$store.state.resourceID;
        this.category = this.$store.state.category;
        console.log(this.articleID,this.category)
      },
      back(){
        this.$router.back(-1)
      },
      categorys(){
        this.category = this.$store.state.category
//        alert(this.category)
      }
    },
    activated(){
        if(this.datas[0].category == 3){
          var head = document.getElementsByClassName('header')[0]
            head.style.display = 'none'
        }
    },
    created(){
      this.categorys()
    },
    data () {
      return {
        cla:'',
        com_text:'',
        favorite:false,
        articleID:'',
        show:false,
        category:'',
        datas:[
            {
              id:'002',
              userId:'0001',
              category:'3',
              videoSrc:'http://192.168.0.104/img/胡歌 - 天地梅花开.mkv',
              title:'零分猫又回来啦！被老师判0分 后改良的猫咪画，现在可以给87 分',
              headImg:require('./img/cat.png'),
              headName:'萌宠小世界',
              headData:'19小时前',
              collection:22,
              headRightImg:require('./img/guanzhu.png'),
              fans:'55',
              msg:[
                {
                  title:'大家记得这只「零分猫」吗？',
                  img:require('./img/cat-w.png')
                },
                {
                  title:'因为画的「太不像」而被打0分，看到了 麻豆之后却让老师无言以对。',
                  img:require('./img/cat-b.png')
                }
              ],
              introduce:'这其实是来自巴西一位插画家heloi在推特 poorly drawn cats上的作品，在国外有 著一定的知名度。而自从上面那张猫画爆红之后，他又画了新的作品，让人每张都看得想吐槽，但是却又只能生生忍住啊！',
              classify: [
                {
                  name: '猫'
                },
                {
                  name: '宠物'
                },
                {
                  name: '娱乐'
                }
              ],
              banner:[
                {
                  name:'外媒称中国正进行大胆的经济实验： 手机支付现金...',
                  img:require('./img/banner.png'),
                  articleId:'0008',
                  category:'1'
                },
                {
                  name:'外媒称中国正进行大胆的经济实验： 手机支付现金...',
                  img:require('./img/banner.png'),
                  articleId:'0009',
                  category:'1'
                }
              ],
              comment:[
                {
                  userId:'0002',
                  img:require('./img/cat-s.png'),
                  name:'Moff',
                  data:'34分钟前',
                  time:'14:23',
                  address:'成都龙泉',
                  content:'老师：画是正经的画，但猫不是正经的猫',
                  num:123
                },
                {
                  userId:'0002',
                  img:require('./img/cat-s.png'),
                  name:'Moff',
                  data:'34分钟前',
                  time:'14:23',
                  address:'成都龙泉',
                  content:'老师：画是正经的画，但猫不是正经的猫',
                  num:123
                }
              ]
            },
        ],
        author:[
          {
            userId:'00004',
            userImg:require('./img/userImg.png'),
            uesrName:'朝花夕拾',
            time:'14:23',
            address:'成都龙泉',
            content:'印度现在国债多少？而且某些债务已经到了还款期限，贷款方基本都是货币基金组织之类的吸血资本，要么赶紧还钱要么呵呵延期不是不行，你',
            num:'23'
          },
          {
            userId:'00004',
            userImg:require('./img/userImg.png'),
            uesrName:'朝花夕拾',
            time:'14:23',
            address:'成都龙泉',
            content:'印度现在国债多少？而且某些债务已经到了还款期限，贷款方基本都是货币基金组织之类的吸血资本，要么赶紧还钱要么呵呵延期不是不行，你',
            num:'23'
          },
          {
            userId:'00004',
            userImg:require('./img/userImg.png'),
            uesrName:'朝花夕拾',
            time:'14:23',
            address:'成都龙泉',
            content:'印度现在国债多少？而且某些债务已经到了还款期限，贷款方基本都是货币基金组织之类的吸血资本，要么赶紧还钱要么呵呵延期不是不行，你',
            num:'23'
          }
        ]
      }
    }
  }
</script>

<style scoped lang="less">
  @import '~less/variable';

  .details{
    // img{
    //   width:100%;
    //   height:100%;
    // }
    // 头部
    .header{
      font-size: 0.36rem;
      line-height: 0.9rem;
      height: 0.9rem;
      padding: 0 0.2rem;
      color:@fs-i;
      border:1px solid @border;
      p{
        text-align: right;
      }
    }
    // 内容
    .content{
      >div {

        >div:nth-child(1){
          // 标题
          > div:nth-child(1) {
            font-size: 0.48rem;
          }
          // 头部
          > div:nth-child(2) {
            margin-top: 0.1rem;
            height: 1rem;
            > div {
              height: 1rem;
              p {
                font-size: 0.24rem;
              }
            }

            span {
              font-size: 0.2rem;
              color: @fs-l;
            }
          }
          // 详细信息
          > div:nth-child(3) {
            p {
              font-size: 0.36rem;
              margin: 0.3rem 0;
            }
          }
          // 介绍
          > div:nth-child(4) {
            margin: 0.3rem 0;
            p {
              font-size: 0.36rem;
            }
          }
          // 分类点赞
          > div:nth-child(5) {
            margin: 0.3rem 0;
            padding: 0 0.2rem;
            p {
              font-size: 0.36rem;
              span {
                padding: 0.02rem 0.2rem;
                background-color: #F4F5F6;
                margin-right: 0.1rem;
                border-radius: 0.1rem;
              }
            }
            > div:nth-child(2) {
              text-align: center;
              font-size: 0.6rem;
              height: 2.2rem;
              line-height: 2.2rem;
              span {
                color: @fs-l;
                display: block;
                height: 0.5rem;
              }
              span:nth-child(2) {
                font-size: 0.34rem;
                color: red;
              }
            }
            > div:nth-child(2) span.active {
              color: @fs-i;
            }
          }
          video{
            width: 100%;
            height: 3.1rem;
          }
        }
      #video{
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 255;
        background: white;
        >span{
          font-size: 0.34rem;
          position: absolute;
          top: 0.2rem;
          z-index: 256;
        }
        >section{
          /*margin-top: -0.34rem;*/
          video{
            height: 4rem;
          }
        }
      }
        // 广告
        > div:nth-child(2) {
          background-color: #F8F9FA;
          margin-top: 5rem;
          padding: 0 0.2rem;
          > div {
            border-bottom: 1px solid @border;
            padding: 0.2rem 0;
            height: 1.3rem;
          }
          > div:last-child {
            border-bottom: none;
          }
          p {
            font-size: 0.3rem;
            padding-right: 0.3rem;
          }
        }
        // 评论
        >div:nth-child(3) {
          position: relative;
          padding: 0 0.2rem;
          > div:nth-child(1) {
            font-size: 0.3rem;
          }
          > div {
            padding: 0.2rem 0;
            > div:nth-child(2) {
              p {
                font-size: 0.26rem;
              }
              span {
                font-size: 0.2rem;
              }
            }
            > div:nth-child(3) {
              line-height: 0.7rem;
              span {
                font-size: 0.22rem;
                color: @fs-i;
                vertical-align: middle;
                margin-left: 0.1rem;
              }
            }
            > div:nth-child(4) {
              margin-top: 0.2rem;
              p {
                font-size: 0.28rem;
              }
            }
            > div:nth-child(5) {
              margin-top: 0.2rem;
              span {
                font-size: 0.22rem;
                border-radius: 0.05rem;
                padding: 0.02rem 0.1rem
              }
            }
          }
        }
      }
      >div:nth-child(2){

      }
    }
    #video{
      /*position: absolute;*/
    }
    .footer{
        margin-top:0.2rem;
        padding:0.1rem 0.2rem;
        font-size: 0.26rem;
        text-align: center;
        border-top:0.01rem solid @border;
        height: 0.8rem;
        line-height: 0.8rem;
        position: fixed;
        bottom: 0rem;
        width: 100%;
        background: white;
        z-index: 50;
        input{
          width: 100%;
          border-radius: 0.05rem;
          background-color: @border;
          padding-left: 0.2rem;
          outline: none;
        }
        b{
          margin-left:0.1rem;
        }
    }
    .comment_title{
      font-size: 0.34rem;
      padding-bottom: 0.3rem;
      border-bottom: 1px solid #b5b5b5;
      height: auto;
      width: 100%;

      >div:nth-child(1){
        text-align: center;
      }
      >div:nth-child(2){
        margin-top: 0.3rem;
        height: 0.8rem;
        p{
          font-size: 0.3rem;
        }
        span{
          font-size: 0.2rem;
          color: #969696;
          float: left;
          margin-right: 0.05rem;
        }
        >div:nth-child(3){
          span{
            font-size: 0.34rem;
          }
          img{
            width: 0.34rem;
          }
        }
        >div:nth-child(4){
          span{
            font-size: 0.34rem;
          }
          img{
            width: 0.34rem;
          }
        }
      }
    }
  }
  .msgcontent{
    margin: 0 0.2rem;
    margin-top: 0.3rem;
    >div:nth-child(1){
      >div:nth-child(2){
        >span{
          font-size: 70%;
          color: @fs-l;
        }
        span:nth-child(1){
          font-size: 100%;
          font-weight: 500;
          color: @color-n;
        }
      }
    }
    >div:nth-child(2){
      margin-top: 0.1rem;
      >div{
        p{
          font-size: 100%;
        }
      }
      >div:nth-child(2){
        >div{
          display: inline-block;
          margin-top: 0.1rem;
          margin-left: 0.1rem;
          img{
            width: 100%;
            height: 1.5rem;
          }
        }
      }
    }
  }
</style>
