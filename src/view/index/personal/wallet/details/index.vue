<template>
  <div class="container">
       <!-- 上方返回与标题部分 -->
      <div class="topBack">
          <div @click="back"><Icon type="chevron-left"></Icon></div>
          <div>消费明细</div>
          <div>
              <img src="../img/kf.png">
               <span>客服热线</span>
          </div>
      </div>
      <!-- 下方消费详细记录 -->
      <div class="allMsg">
          <!-- 消费头部内容 -->
          <div class="head">
              本月共消费<span>{{totle}}</span>元<span >账单记录<input type="date"></span>
          </div>
          <!-- 详情 -->
          <div class="detail" v-for="(item,index) in detail" :key="index">
              <p>{{item.time}}</p>
              <div class="count">
                  <img :src="item.img" >
                  <span>{{item.nickname}}</span>
                  <span>{{item.uname}}</span>
                  <p :style="{color:item.color}">{{item.money}}</p>
                  <p>交易成功</p>
              </div>
              <!-- 交易信息 -->
              <div class="list">
                <Row class="listTap">
                    <Col span="12" class="lfContent">收款方式</Col>
                    <Col span="12" class="rtContent">{{item.way}}</Col>
                </Row>
                <Row class="listTap">
                    <Col span="12" class="lfContent">交易说明</Col>
                    <Col span="12" class="rtContent">{{item.method}}</Col>
                </Row>
                <Row class="listTap">
                    <Col span="12" class="lfContent">对方账号</Col>
                    <Col span="12" class="rtContent">{{item.accountName}}{{item.accountNumber}}</Col>
                </Row>
                <Row class="listTap">
                    <Col span="12" class="lfContent">订单号</Col>
                    <Col span="12" class="rtContent">{{item.order}}</Col>
                </Row>
              </div>    
          </div>
      </div>
  </div>
</template>
<script>
export default {
      data(){
          return{
              totle:'1200',
              detail:[
                  {"time":"2017-06-12 12:20","nickname":'老头子',"uname":"清风徐来","img":require('../img/user.png'),"money":"+500.00","color":"","way":"小额零钱包","method":"充值","accountName":"朝花夕拾","accountNumber":"18544444785","order":"546545465651"},
                  {"time":"2017-06-12 12:20","nickname":'老头子',"uname":"清风徐来","img":require('../img/user.png'),"money":"-500.00","color":"","way":"小额零钱包","method":"充值","accountName":"朝花夕拾","accountNumber":"18544444785","order":"546545465651"},
                  {"time":"2017-06-12 12:20","nickname":'老头子',"uname":"清风徐来","img":require('../img/user.png'),"money":"+500.00","color":"","way":"小额零钱包","method":"充值","accountName":"朝花夕拾","accountNumber":"18544444785","order":"546545465651"},
              ]
          }
      },
  methods:{
       back(){//返回上级菜单
            this. $router.back();
            document.getElementsByClassName("i-box")[0].style.top=".96rem";
            document.getElementsByClassName("i-box")[0].style.bottom="1.2rem"
        }
  },
  mounted(){
      for(var i=0;i<this.detail.length;i++){
          if(this.detail[i].money>0){
             this.detail[i].color="green"
          }else{
              this.detail[i].color="red"
          }
      }
  }
}
</script>

<style lang="less" scoped>
    @import '~less/variable';
    img{//图片等比例缩放
        max-width: 100%;
        max-height: 100%;
    }
     .container{
        width: 100%;
        background-color: @background;
        margin-top: .9rem;
        .topBack{//顶部导航
            height: .9rem;
            background-color: @bgcolor-body;
            position: fixed;
            top: 0;
            width: 100%;
            div{
                display: inline-block;
                font-size: .34rem;
                color: @color-n;
                line-height: .9rem;
            }
            div:nth-child(1){//返回按钮
                padding-left:.2rem;
                padding-right: .5rem;
            }
            div:nth-child(3){//客服热线板块
                float: right;
                font-size: .3rem;
                margin-right: .2rem;
                img{
                    width: .45rem;
                    height: .41rem;
                    margin-right: .12rem;
                }
            }
        }
        .allMsg{//消费账单详情
            .head{
                height: .92rem;
                line-height: .92rem;
                font-size: .34rem;
                padding: 0 .2rem;
                border-top: 2px solid @border;
                overflow: hidden;
                span:nth-child(2){
                    float: right;
                    input{//时间选择框
                        font-size: .2rem;
                         background-color: @background;
                    }
                }
            }
            .detail{//消费详情
                background-color: @bgcolor-body;
                padding: 0 .2rem;
                color: @color-i;
                margin-bottom:.2rem; 
                >p{//时间
                    height: .82rem;
                    line-height: .82rem;
                    font-size: .3rem;
                }
                .count{//头像用户名交易金额部分
                    margin-top: .1rem;
                    height: 1.86rem;
                    text-align: center;
                    img{
                        width: .48rem;
                    }
                    // 用户名
                   span:nth-child(2){
                        font-size: .3rem;
                        vertical-align: bottom
                    }
                    span:nth-child(3){
                        font-size: .24rem;
                        color: @fs-m;
                        vertical-align: bottom  
                    }
                    p:nth-child(4){
                        font-size: .58rem;
                    }
                    p:nth-child(5){
                        font-size: .24rem;
                        color: @fs-l;
                    }
                }
                // 交易信息
                .list{
                    font-size: .3rem;
                    .listTap{
                        margin-bottom: .1rem;
                    }
                    .lfContent{//左侧内容
                        color:@fs-m;
                    }
                    .rtContent{//右侧内容
                        text-align: right;
                    }
                }
                
            }
        }
     }

</style>

