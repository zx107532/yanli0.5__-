<template>
  <div class="addContainer">
      <!-- 上方返回以及标题 -->
      <div class="topBar">
           <Row>
                <Col span="8"><p @click="back"><Icon type="chevron-left"></Icon></p></Col>
                <Col span="8">添加好友</Col>
          </Row>
      </div>
      <!-- 搜索以及二维码 -->
      <div class="topSearch">
          <input type="search" placeholder="输入手机号" v-model="phone" maxlength="15">
          <button @click="search">搜索</button>
          <div class="tj">
               <Row>
                        <Col span="12">
                            <img src="./img/ewm.png" >
                            <p>我的二维码</p>
                            <p class="btintr">扫描二维码、加我好友</p>
                        </Col>
                        <Col span="12">
                            <div @click="applyList" >
                                <img src="./img/tj.png">
                                <p>我的好友请求</p>
                                <p class="btintr">查看验证消息</p>
                            </div>
                        </Col>
                </Row>
          </div>
      </div>
      <!-- 好友搜索方式 -->
      <div class="seaWay">
          <ul>
              <li v-for="(item,index) in  addway" :key="index">
                  <Row>
                        <Col span="6"><img :src="item.img"></Col>
                        <Col span="16">
                            <div class="midintr">
                                {{item.intr1}}
                                <p>{{item.intr2}}</p>
                            </div>
                        </Col>
                         <Col span="2"><Icon type="chevron-right"></Icon></Col>
                </Row>  
              </li>
          </ul>
      </div>
  </div>
</template>
<script>
import { MessageBox } from 'mint-ui';
export default {
      data(){
          return{
              addway:[
                  {img:require("./img/logo.png"),"intr1":"通讯录同步","intr2":"添加或邀请通讯录中的朋友"},
                  {img:require("./img/qq.png"),"intr1":"邀请QQ好友","intr2":"添加或邀请腾讯QQ中的朋友"},
                  {img:require("./img/wechat.png"),"intr1":"邀请微信好友","intr2":"添加或邀请微信中的朋友"},
                  {img:require("./img/saoma.png"),"intr1":"扫一扫","intr2":"添加朋友"},                  
              ],
              phone:""
          }
      },
  methods:{
      //返回按钮
      back(){
          this. $router.back()
      },
      search(){//搜索好友
       let num={
           userId:this.phone
        }
        this.$ajax.personal(num)
                  .then(res=>{
                      if(res.state==0){
                          //将数据储存，跳转
                          this.$store.commit("personalDetail",res.data)
                          this.$router.push({path:'/index/detail'})
                      }else{
                          MessageBox('提示', res.message)
                      }
                  })
                  .catch(error=>{
                      throw error;
                      MessageBox('提示', "请检查网络或联系我们的客服")
                  })
      },
      applyList(){//查看好友请求列表
      let  uid={
          userId:localStorage.mobilephone
      }
            this.$ajax.applylist(uid)
                     .then(res=>{
                         if(res.state==0){
                            //    console.log(res)
                               for(let i=0;i<res.data.length;i++){
                                   if(res.data[i].handleStatus==1){
                                          res.data[i].agreeShow=true;
                                          res.data[i].agShow=true;
                                   }else if(res.data[i].handleStatus==2){
                                          res.data[i].agreeShow=false;
                                          res.data[i].agShow=true;
                                   }else if(res.data[i].handleStatus==3){
                                         res.data[i].agreeShow=false;
                                          res.data[i].agShow=false;
                                   }
                                    
                               }
                                this.$store.commit("applyList",res.data);

                                this.$router.push({path:'/index/addfid/request'})
                         }else{
                              MessageBox('提示', res.message)  
                         }
                     })
                     .catch(error=>{
                         throw error//抛出错误，跳转页面，不操作
                         this.$router.push({path:'/index/addfid/request'})
                     })
      }
     
  },
   activated(){
          //进去页面清空上次搜索消息
          this.phone=""
      }
}
</script>

<style lang="less" scoped>
  @import '~less/variable';
  .addContainer{
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      background-color: @bgcolor-body;
      z-index: 100;
      line-height: .9rem;
      img{
          max-width:100%;
          max-height: 100%;
      }
      .topBar{//顶部导航
          font-size: .34rem;
          height: .9rem;
          background-color: @fs-i;
          color: @color-l;
          >div{
              >:nth-child(1){
                  padding-left: .22rem;
              }
              >:nth-child(2){
                  text-align: center;
              }
          }
      }
      .topSearch{//搜索框与推荐
          height: 3.5rem;
          background-color: @background;
          font-size: .3rem;
          input{
              font-size: .34rem;
              width: 100%;
              background-color: @bgcolor-body;
              margin-top: .2rem;
              padding-left: 1rem;
              background: url("./img/search.png")1% 50% no-repeat;
              outline: none;
          }
          button{
              position: absolute;
              border: none;
              right: .2rem;
              top: 1.1rem;
              background-color: transparent;
              outline: none;
          }
          .tj{
              height: 1.7rem;
              background-color: @bgcolor-body;
              text-align: center;
              margin-top: .16rem;
              img{
                  width: .5rem;
                  height: .5rem;
              }
              p{
                  height: .3rem;
                  line-height: .3rem;
                  margin-bottom: .1rem;
              }
              .btintr{
                  color: @fs-l;
              }
          }
      }
      .seaWay{//搜索方式列表
        img{
            width: .8rem;
        }
        li{
            height: 1.2rem;
            border-bottom: 1px solid @border;
            line-height: 1.2rem;
            margin-left: .2rem;
            font-size: .32rem;
           .midintr{
                height: 1.2rem;
                line-height: .6rem;
                }
            p{
                height: .32rem;
                color: @fs-l;
            }
            i{
               color: @fs-l; 
            }
        }
      }
  }
</style>
