<template>
  <div class="wechatLog">
      <div class="top">
            <div>
                <Icon type="android-contact"></Icon> 
            </div>
      </div>
      <div class="btm">
             <Row>
                    <Col span="4"><img src="../img/phone.png"></Col>
                    <Col span="13"><input type="text" placeholder="请输入手机号" v-model="phoneNum" maxlength="15"></Col>
                    <Col span="7"><span v-show="show" @click="getCode">发送验证码</span><span v-show="!show" class="count">{{count}}s后重新发送</span></Col>
            </Row>
            <Row>
                    <Col span="4"><img src="../img/loc.png"></Col>
                    <Col span="13"><input type="password" maxlength="16" v-model="msgPwd" placeholder="请输入手机短信验证码"></Col>
            </Row>
            <button @click="login">登陆</button>
      </div>
  </div>
</template>
<script>
import { MessageBox } from 'mint-ui';
export default {
  data(){
      return{
          phoneNum:"",
          msgPwd:"",
          show: true,
          count: '',
          timer: null
      }
  },
  methods:{
           getCode(){//发送验证码 然后倒计时
           var myreg=/^[1][3,4,5,7,8][0-9]{9}$/; 
           if (!myreg.test(this.phoneNum)){
               MessageBox('提示', '电话号码错误，请重新输入');
           }else{
              MessageBox('提示', '短信已发送').then(action=>{
                        const TIME_COUNT = 60;
                        if (!this.timer) {
                        this.count = TIME_COUNT;
                        this.show = false;
                        this.timer = setInterval(() => {
                        if (this.count > 0 && this.count <= TIME_COUNT) {
                            this.count--;
                            } else {
                            this.show = true;
                            clearInterval(this.timer);
                            this.timer = null;
                            }
                        }, 1000)
                        }
                }); 
           }
             
             
            },
            login(){
                MessageBox('提示', '登陆成功').then(action=>{
                    this.$router.push({path:'/index'})
                });
            }
  },
}
</script>

<style lang="less" scoped>
     @import '~less/variable';
     .wechatLog{//容器样式
         position: fixed;
         top: 0;
         bottom: 0;
         width: 100%;
         overflow: scroll;
         background: @page-color;
         color: @color-l;
         img{
             max-width:100%;
             max-height: 100%;
         }
         .top{
              text-align: center;
             >div{//图片显示
                 position: absolute;
                 top: 1.5rem;
                 left: 50%;
                 margin-left: -1.1rem;
                width: 2.1rem;
                height: 2.1rem;
                border: .1rem solid @border;
                border-radius: 50%;
                line-height: 2.1rem;
                font-size: 1rem;
                color: #595f6f;
                background: @background ;
             }
         }
         .btm{//登陆输入框
             position: absolute;
             top: 4.6rem;
             width: 100%; 
             font-size: .3rem;
             span{
                 color: #ff4081;
             }
             >div{
                 height: .7rem;
                 line-height: .7rem;
                 >:nth-child(1){//logo
                     text-align: center;
                       img{
                         height: .7rem;
                     }
                 }
                 >:nth-child(2){
                     input{
                        background-color:  @page-color;
                        border-bottom: 1px solid @border;
                        width: 100%;
                        outline:none;
                        padding-left: .2rem;
                        color: @color-l;
                        height: .7rem;
                     }
                 }
               
             }
             >div:nth-child(2){
                 margin-top: .7rem;
                 >:nth-child(1){//logo
                     text-align: center;
                       img{
                         height: .46rem;
                     }
                 }
             }  
             button{
                 width: 80%;
                 margin-left: 10%;
                 margin-top: 2rem;
                 border: 0;
                 height: 1rem;
                 border-radius: 16px;
                 background: @bgcolor-body ;
             }
         }
     }
</style>
