<template>
  <div class="container">
      <div class="topiic">
          <Row>
                <Col span="8"><div @click="back"><Icon type="chevron-left"></Icon></div></Col>
                <Col span="10">亲密付人员管理</Col>
            </Row>
      </div>
      <ul class="list">
        <li :key="index" v-for="(item,index) in list">
          <Row class="title">
                <Col span='4' class="lt">
                  <img :src="item.img">
                </Col>
              <Col span='18' class="mid">
                <p>{{item.name}}</p>
                <p v-if='!item.show'>亲密付额度：<span>{{item.quota}}元</span></p>
                <p  v-if="item.show">{{item.phone}}&nbsp;<span @click="date" style="text-decoration:underline">亲密付账单</span><input v-show="dateShow" type="date"></p>
              </Col>
            <Col span="2" class="rt">
              <p @touchstart="showsClick(index)">
                <img v-show="item.show" :src="moreU">
                <img v-show='!item.show' :src="moreD">
              </p>
            </Col>
          </Row>
          <!-- 隐藏菜单 -->
          <transition name="fade">
                <Row class="shows" v-if="item.show">
                    <Col span='12'>
                        <div><img src="./img/close.png"></div>
                        <p>亲密付额度：<span>{{item.quota}}元</span></p>
                        <button @click="setMoney(index)">设置</button>
                    </Col>
                    <Col span='12'>
                        <div><img src="./img/Relieve.png"></div>
                        <p>解除关系</p>
                        <button @click="resove(item.name)">设置</button>
                    </Col>
                </Row>
             </transition>
              <transition name="fade">
            <!-- 下部弹起内容 -->
            <div class="modelContainer" v-show="item.modelShow">
                <!-- 设置菜单 -->
                <div class="setmenu" v-show="changeShow">
                    <div class="setHeader"><p  @click="moneyBack(index)" style="display:inline-block"><Icon type="chevron-left"></Icon></p>设置亲密付额度 <span>客服热线</span></div>
                    <div>设置对象<span>{{item.name}}</span></div>
                    <!-- <div>设置额度 <input type="text" placeholder="额度最高为5000元"></div> -->
                    <div>
                        <!-- <mt-field label="设置额度"   placeholder="额度最高为5000元" ></mt-field> -->
                        设置额度 <input type="text" placeholder="额度最高为5000元">
                    </div>
                    <div><span>每月自动刷新额度</span></div>
                    <div><button @click="goPwd">下一步</button></div>
                </div>
                <!-- 密码输入框 -->
                <div class="pwdmenu" v-show="!changeShow">
                    <div class="pwdHeader"><p @click="pwdBack" style="display:inline-block"><Icon type="chevron-left"></Icon></p>请输入支付密码 <span>客服热线</span></div>
                    <div>请输入您的付款密码，完成付款，如需帮助请点击客服热线。</div>
                    <div><input type="password" maxlength="6"></div>
                    <div>小额支付每次支付限定为500 <span>忘记密码</span></div>
                    <div><button @click="sure">确认</button></div>
                </div>
            </div>
          </transition>
        </li>
      </ul>
      <!-- 添加亲密付人员 -->
      <div class="addMore" @click="jump">
          <Icon type="plus-circled"></Icon>增加人员
      </div>
       <transition>
              <div class="model">
                  <div class="alert" v-show="sureShow">
                      <img src="./img/true.png">
                      <p>设置亲密付额度成功！稍后会以消息的形式提醒设置对象。</p>
                  </div>
                  <div class="alert" v-show="deleteShow">
                      <img src="./img/alert.png">
                      <p>您即将与亲密付人员：“{{deleteUser}}”解除亲密关系 是否解除关系？</p>
                      <div><button @click="cancle">取消</button><button @click="relieve">确定</button></div>
                  </div>
                  <div class="alert" v-show="relieveShow">
                      <img src="./img/true.png">
                      <p>解除成功</p>
                  </div>
              </div>
          </transition>
  </div>   
</template>
<script>
export default {
  data(){
      return{
          dateShow:false,
          changeShow:true,
          deleteShow:false,
          sureShow:false,
          relieveShow:false,
          deleteUser:'',
          list:[
          {img: require('./img/pop1.png'),name: '老婆',"quota":"5000","phone":"13222455456",show:false, modelShow:false},
          {img: require('./img/pop2.png'),name: '女儿',"quota":"5010","phone":"13222455456",show:false, modelShow:false},
          {img: require('./img/pop3.png'),name: '女婿',"quota":"5200","phone":"13222455456",show:false, modelShow:false},
          {img: require('./img/pop4.png'),name: '孙儿',"quota":"5030","phone":"13222455456",show:false, modelShow:false},
          {img: require('./img/pop5.png'),name: '孙女',"quota":"5200","phone":"13222455456",show:false, modelShow:false}
        ],
        moreD: require('./img/down.png'),
        moreU: require('./img/up.png'),
      }
  },
   methods: {
       back(){
             this. $router.back();
       },
       jump(){
           this.$router.push({path:'/index/personal/wallet/closepayadd'})
           this.reset()
       },
       date(){
           this.dateShow=true
       },
       setMoney(index){//设置额度
            this.list[index].modelShow=true;
            },
       moneyBack(index){
           this.list[index].modelShow=false;
       },
       goPwd(){//输入密码
           this.changeShow=false;
       },
       pwdBack(){
           this.changeShow=true;
       },
       sure(){//确认按钮
           for(var i=0;i<this.list.length;i++){
            this.list[i].modelShow = false
          }
          this.sureShow=true;
          this.deleteShow=false;
          this.changeShow=true;
          this.relieveShow=false
           document.querySelector(".container .model").style.display="block"
            setTimeout(function() {
                document.querySelector(".container .model").style.display="none"
            }, 1000);
       },
       resove(name){//解除关系按钮
            this.deleteUser=name;
            document.querySelector(".container .model").style.display="block";
            this.sureShow=false;
            this.relieveShow=false;
            this.deleteShow=true;
       },
       cancle(){//取消按钮
           document.querySelector(".container .model").style.display="none";
       },
       relieve(){//确认按钮 
            console.log(this.deleteUser)//此处暂时用来保留要删除用户的关联
           this.deleteShow=false;
           this.relieveShow=true;
             setTimeout(function() {
                document.querySelector(".container .model").style.display="none"
            }, 1000);
       },
      reset(){//取消定位顶部与下部的距离
        document.getElementsByClassName("i-box")[0].style.top=0;
        document.getElementsByClassName("i-box")[0].style.bottom=0;
      },
      showsClick(index) {//展开隐藏菜单
        if (this.list[index].show){
          this.list[index].show = false
           this.dateShow=false
        }else{
          for(var i=0;i<this.list.length;i++){
            this.list[i].show = false
            this.list[index].show = true
          }
        }
      },
    },
    mounted(){//密码输入框样式
        document.querySelector(".pwdmenu input").style.width=window.screen.width*2*.9/100+"rem";
        document.querySelector(".pwdmenu input").style. letterSpacing=window.screen.width*2*.9*.13/100+"rem"
         document.querySelector(".pwdmenu input").style. paddingLeft=window.screen.width*2*.9*.10/100+"rem"
         document.querySelector(".container").style.minHeight=window.screen.height*2/100+"rem"
    }
}
</script>

<style lang="less" scoped>
 @import '~less/variable';
    .container{
        background-color: @background;
        position: absolute;
        top: 0;
        width: 100%;
        
        .model{//提示框
          position: fixed;
          top: 0;
          right: 0;
          left: 0;
          bottom: 0;
          background-color: rgba(0,0,0,0.1) ;
          z-index: 10;
          display: none;
          .alert{//弹出框样式
              font-size: .3rem;
              color: @color-i;
              height: 3.88rem;
              position: absolute;
              top: 50%;
              margin-top: -1.89rem;
              text-align: center;
              width: 100%;
              background-color: @bgcolor-body;
              img{
                  margin-top: .8rem;
                  margin-bottom: .1rem;
                  width: 1.04rem;
              }
              button{//确认取消按钮
                width: 20%;
                height: .58rem;
                border: 0;
                border-radius:14px;
                color: @color-l;
              }
              div{
                  :nth-child(1){//取消按钮
                      float: left;
                      margin-left: 16%;
                      background-color: @fs-l;
                  }
                  :nth-child(2){//确定按钮
                      float: right;
                      margin-right: 16%;
                      background-color: @fs-i;
                  }
              }
          }
      }
        .topiic{//顶部标题栏
            height: .9rem;
            position: fixed;
            line-height: .9rem;
            background-color: @bgcolor-body;
            top: 0;
            width: 100%;
            font-size: .34rem;
            >:nth-child(1){
                margin-left: .2rem;
            }
        }
        .list{//列表部分
            background-color: @bgcolor-body;
            margin-top:1.5rem;
            .mid{//中间部分
                height: 1.2rem;
                font-size: .3rem;
                border-bottom: 1px solid @border;
                p{
                    line-height: .6rem;
                }
                p:nth-child(2){     
                    font-size: .24rem;
                    span{
                        color: @fs-i;
                    }
                }
            } 
            .lt{
                height: 1.2rem;
                line-height: 1.2rem;
                img{
                    width: 1rem;
                }
            }
            .rt {//右侧箭头
                height: 1.2rem;
                border-bottom: 1px solid @border;
            >p{
                margin-top:0.36rem;
                width:0.5rem;
                height: 0.5rem;
                border-radius: 50%;
                line-height: 0.5rem;
                box-shadow: 0.02rem  0.02rem @border;
                text-align: center;
            >img{
              width:0.24rem;
            }
          }
        }         
        //   隐藏菜单样式
      .shows{
        background-color: @background;
        text-align:center;
        height:2.2rem;
        font-size: 0.3rem;
        p{
            height: .7rem;
            line-height: .7rem;
            span{
                color:@fs-i; 
            }
        }
           button{
                width: 1.2rem;
                height: .4rem;
                line-height: .4rem;
                color:@color-l;
                background-color: @fs-i;
                border: 0;
                border-radius: 10px;
            }
        >div:nth-child(1){//左侧
            img{
                width: .61rem;
                height: .42rem;
                margin-top: .1rem;
            }
        }
        >div:nth-child(2){//右侧
            img{
                width: .43rem;
                height: .43rem;
                margin-top: .1rem;
            }

        }
      }
      .modelContainer{//模态框
          position: fixed;
          top: 0;
          right: 0;
          left: 0;
          bottom: 0;
          background-color: rgba(0,0,0,0.1) ;
          z-index: 10;
          .setmenu{//亲密付额度设置菜单
              background-color: @background;
              height: 8.8rem;
              width: 100%;
              position: fixed;
              bottom: 0;
              font-size: .36rem;
              color: @color-i;
               z-index: 11;
              span{
                  float: right;
              }
              >div:nth-child(1){//返回与标题
                  height: .7rem;
                  line-height: .7rem;
                  background-color: @bgcolor-body;
                  padding-right: .22rem;
                  margin-bottom:.1rem;
                  i{
                      padding-left: .22rem;
                      padding-right: .3rem;
                  }
              }
              >div:nth-child(2){//设置对象
                    height: .94rem;
                    line-height: .94rem;
                    background-color: @bgcolor-body;
                    padding-right: .22rem;
                    padding-left: .22rem;
                    margin-bottom:.3rem;
                    span{
                        color: @fs-i;
                    }
              }
              >div:nth-child(3){//设置金额
                    height: .94rem;
                    line-height: .94rem;
                    background-color: @bgcolor-body;
                    padding-right: .22rem;
                    padding-left: .22rem;
                    input{
                        margin-left: 1rem;
                        float: right;
                        width: 40%;
                    }
                    input::-webkit-input-placeholder{
                        font-size: .28rem;
                        text-align: right;
                    }
                    input::-moz-placeholder{
                        font-size: .28rem;
                        text-align: right;
                    }
              }
              >div:nth-child(4){//提示信息
                   padding-right: .22rem;
                   padding-left: .22rem;
                  span{
                      font-size: .28rem
                  }
              }
              >div:nth-child(5){
                  margin-top: 1rem;
                  text-align: center;
                  button{//下一步按钮
                      width:90%;    
                      height: .9rem;
                      line-height: .9rem;
                      background-color: @fs-l;
                      border: 0;
                      color: @color-l;
                  }
              }
          }
          .pwdmenu{//密码输入框
            height: 5rem;
            position: fixed;
            bottom: 0;
            width: 100%;
            background-color: @background;
            font-size: .3rem;
            span{
                  float: right;
              }
            >div:nth-child(1){//标题，以及返回
                  height: .7rem;
                  line-height: .7rem;
                  background-color: @bgcolor-body;
                  padding-right: .22rem;
                  margin-bottom:.1rem;
                   border-bottom: 1px solid @border;
                  i{
                      padding-left: .22rem;
                      padding-right: .3rem;
                  }
            }
            >div:nth-child(2){//提示消息
                font-size: .2rem;
                color: @fs-m;
            }
            >div:nth-child(3){//密码输入框
            text-align: center;
                input{
                    // width: 90%;
                    margin: .2rem .22rem;
                    height: .7rem;
                    
                }
            }
            >div:nth-child(4){//密码框下侧提示消息
                padding-right: .22rem;
                padding-left: .22rem;
                font-size: .2rem;
                 color: @fs-l;
                 span{
                     color: @fs-i;
                 }
            }
            >div:nth-child(5){
                margin-top: .5rem;
                text-align: center;
                button{
                      width:90%;    
                      height: .9rem;
                      line-height: .9rem;
                      background-color: @fs-l;
                      border: 0;
                      color: @color-l;
                }
            }
            
          }
      }
      
      &.fade-enter-active, &.fade-leave-active{
        transition: all 0.5s ease
      }
      &.fade-enter, &.fade-leave-active{
        opacity: 0 
      }
        }
        .addMore{//添加新人员
        text-align: center;
            color:#2ecc71;
            font-size: .3rem;
            margin-top: .4rem;
      }
    }
</style>
