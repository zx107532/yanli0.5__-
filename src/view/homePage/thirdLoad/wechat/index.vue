<template>
  <div class="wechatLog">
      <div class="top">
            <div>
                <Icon type="android-contact"></Icon> 
            </div>
      </div>
      <div class="btm">
             <Row>
                    <Col span="4"><img src="../img/wechat.png" alt=""></Col>
                    <Col span="14"><input placeholder="请输入微信号" v-model="wechatId" type="text"></Col>
                    <Col span="6"><span>自动获取</span></Col>
            </Row>
            <Row>
                    <Col span="4"><img src="../img/loc.png"></Col>
                    <Col span="14"><input placeholder="请输入微信密码" type="password" v-model="wechatPwd"></Col>
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
          wechatId:"",
          wechatPwd:""
      }
  },
  methods:{
       login(){
                MessageBox('提示', '功能完善中，敬请期待');
            }
  }
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
             margin-top: 4.6rem;
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
                         height: .5rem;
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
                         height: .46rem;;
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
