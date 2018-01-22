<template>
  <div class="recomm">
    <div :key="index" v-for="(item,index) in datas">
      <div tag="div" >
        <div class="title" v-if="item.category == 1">
          <Row>
            <Col span="24">
            <p @click="details(index)">{{item.title}}</p>
            </Col>
          </Row>
          <Row>
            <Col span="22">
            <img :src="item.img" alt="" @click="details(index)">
            <span @click="details(index)">{{item.name}}</span>
            <img :src="item.msg" alt="">
            <span>{{item.num}}</span>
            <span>{{item.data}}</span>
            </Col>
            <Col span="2">
            <img :src="X" alt="">
            </Col>
          </Row>
        </div>
        <div class="content" v-else-if="item.category == 2">
          <Row>
            <Col span="24">
            <p @click="details(index)">{{item.title}}</p>
            </Col>
          </Row>
          <Row>
            <Col span="16">
            <div>
              <img :src="item.timg" alt="" @click="details(index)">
              <span @click="details(index)">{{item.tname}}</span>
            </div>
            <img :src="item.img" alt="" @click="details(index)">
            </Col>
            <Col span="8">
            <ul>
              <li>
                <div>
                  <img :src="timer" alt="">
                </div>
                <span>{{item.timer}}</span>
              </li>
              <li>
                <div>
                  <img :src="msger" alt="">
                </div>
                <span>{{item.msger}}</span>
              </li>
              <li>
                <div>
                  <img :src="zan" alt="">
                </div>
                <span>{{item.zan}}</span>
              </li>
              <li>
                <div>
                  <img :src="loc" alt="">
                </div>
                <span>{{item.loc}}</span>
              </li>
              <li>
                <div class="close">
                  <img :src="X" alt="">
                </div>
              </li>
            </ul>
            </Col>
          </Row>
        </div>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    methods:{
      details(index){//往新闻详情跳转并传递新闻编号
        this.$router.push({name:'recommended/details'})
//          eventBus.$emit('articleId',this.datas[index].articleId)
        this.$store.commit('articleId',this.datas[index].resourceID);
        this.$store.commit('category',this.datas[index].category)
      },
    },
    data () {
      return {
        allLoaded:false,
        X:require('./img/X.png'),
        msger:require('./img/msger.png'),
        loc:require('./img/loc.png'),
        zan:require('./img/zan.png'),
        timer:require('./img/timer.png'),
        datas:[
          {
            category:'1',
            articleId:'001',
            title:'太行古镇-易水湖1日游欣赏湖畔秀丽风光 品水镇舌尖上的美食',
            img:require('./img/rmw.png'),
            name: '人民网',
            num:6280,
            msg:require('./img/msg.png'),
            data:'13小时前'
          },
          {
            category:'2',
            articleId:'002',
            title: '零分猫又回来啦！被老师判0分后改良的猫咪画，现在可以给87分',
            timg:require('./img/cat-s.png'),
            tname: '萌宠小世界',
            img:require('./img/cat.png'),
            timer:'10小时前',
            msger:'5246',
            zan: '2461',
            loc: '四川省成都市龙泉驿区'
          },
          {
            category:'2',
            articleId:'003',
            title: '太行古镇-易水湖1日游欣赏湖畔秀丽风光品水 镇舌尖上的美食 ',
            timg:require('./img/lushang-s.png'),
            tname: '我一直在路上',
            img:require('./img/lushang.png'),
            timer:'10小时前',
            msger:'5246',
            zan: '2461',
            loc: '北京市保定'
          },
          {
            category:'2',
            articleId:'004',
            title: '柯洁首战惜败！王小川点评：阿法狗将重演进 化史',
            timg:require('./img/xinlang-s.png'),
            tname: '新浪科技',
            img:require('./img/xinlang.png'),
            timer:'10小时前',
            msger:'5246',
            zan: '2461',
            loc: '北京市保定'
          }
        ]
      }
    }
  }
</script>

<style scoped lang="less">
  @import '~less/variable';

  .recomm{
    // 根标签
    padding: 0 0.2rem;
    >div>div>.title{
      // 标题样式
      margin: 0.2rem 0;
      padding: 0.12rem;
      border-radius: 0.1rem;
      box-shadow: 0.02rem 0.02rem 0.02rem 0.02rem @border;
      >div:nth-child(1) {
        p{
          font-size: 0.34rem;
        }
      }
      >div:nth-child(2) {
        >div{
          line-height: 0.64rem;
        }
        span{
          font-size: 0.24rem;
          color:@fs-l;
          vertical-align: middle;
        }
        span:last-child {
          margin-left:0.08rem;
        }
        img{
          margin:0 0.08rem;
        }
        img:last-child{
          float: right;
          margin-top:0.44rem;
        }
      }
    }

    // 内容样式
    .content{
      border-radius: 0.1rem;
      padding: 0.12rem;
      box-shadow: 0.02rem 0.02rem 0.02rem 0.02rem @border;
      margin-bottom:0.2rem;
      >div:nth-child(1) {
        font-size: 0.34rem;
      }
      >div:nth-child(2) {
        // 左侧样式
        >div:nth-child(1) {
          position: relative;
          >div{
            position: absolute;
            width:100%;
            top:0;
            left: 0;
            height: 0.64rem;
            background:@bgrgba;
            border-radius: 0.1rem;
            line-height: 0.64rem;
            img{
              margin: 0 0.1rem;
            }
            span{
              font-size: 0.2rem;
              color: @color-l;
            }
          }
          >img{
            width:100%;
            height:100%;
          }
        }
        // 右侧样式
        >div:nth-child(2){
          padding-left: 0.2rem;
          li{
            line-height: 0.56rem;
            height: 0.56rem;
            // white-space: nowrap;
            >div{
              display: inline-block;
              width:0.5rem;
            }
            span{
              vertical-align: middle;
              font-size: 0.28rem;
              color: @fs-l;
            }
            >p{
              display: inline-block;
              font-size: 0.28rem;
              vertical-align: middle;
              color: @fs-l;
            }
          }
          li:last-child {
            text-align: right;
          }
        }
      }
    }
  }
</style>
