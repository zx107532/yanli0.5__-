<template>
  <div class="infoContainer">
        <!-- 上方返回以及标题 -->
      <div class="topmenu">
          <Row>
                <Col span="8"><p @click="back"><Icon type="chevron-left"></Icon></p></Col>
                <Col span="8">验证信息</Col>
                <Col span="8"><p @click="send">发送</p> </Col>
          </Row>
      </div>
        <!-- 用户主要信息 -->
      <div>
          <!-- 上部信息 -->
          <div class="userMain">
               <Row>
                        <Col span="5"><img :src="userMsg.photo"></Col>
                        <Col span="8">
                            <p>{{userMsg.name}}</p>
                            <span>{{userMsg.gender}}<!-- {{userMsg.address}} --></span> 
                        </Col>
                </Row> 
          </div>
          <!-- 验证消息    -->
          <div class="valMsg">
              <p>填写验证消息</p>
              <textarea class="msgDetail"  rows="4" v-model="valMsg"></textarea>
          </div>
          <!-- 备注和权限设置 -->
          <div class="btmMain">
              <!-- 标题说明 -->
              <p>备注和圈层设置</p>
              <!-- 备注 -->
              <ul class="remake">
                  <li>
                      <div>备注</div>
                      <input type="text">
                  </li>
                  <li @click="choose">
                      <div>分组</div>
                      <span>{{group}}</span>
                      <p><Icon type="chevron-right"></Icon></p>
                      <ul class="group" v-show="groupShow" @click="chooseGroup($event)">
                         <li>家庭</li>
                         <li>亲友</li>
                         <li>关注</li> 
                      </ul>
                  </li>
              </ul>
              <!-- 权限设置 -->
              <ul class="permiss">
                  <li>
                      <span>不让他看我动态</span><mt-switch v-model="perMsg"></mt-switch>
                  </li>
                   <li>
                      <span>不让他看我位置</span><mt-switch v-model="perPoi"></mt-switch>
                  </li>
                   <li>
                      <span>不让他看我设备</span><mt-switch v-model="perFac"></mt-switch>
                  </li>
              </ul>
          </div>
      </div>
  </div>
</template>
<script>
export default {
  data(){
      return{
          userMsg:{"upic":require('./img/1111.png'),"uname":"朝花夕拾","address":"成都"} ,
          valMsg:"",//验证消息
          group:"家庭",
          groupShow:false,//控制分组显示隐藏
          perMsg:false,//动态权限
          perPoi:false,//位置权限
          perFac:false//设备权限
      }
  },
  methods:{
      back(){
          this.$router.back()
      },
      choose(){//展开选择分组
         this.groupShow=!this.groupShow
      },
      chooseGroup(e){//分组选择
          this.group=e.target.innerHTML
      },
        request(){//好友请求
        let msg={
            srcuserid:localStorage.mobilephone,
            // srcusername:localStorage.myname,
            srcusername:this.$store.state.mydata.name,            
            srcmsg:this.valMsg,
            srcphoto:localStorage.mypic,
            destuserid:this.$store.state.personalDetail.mobilephone
        }
         this.$ajax.apply(msg)
                    .then(res=>{
                        console.log(res)
                    })
      },
      send(){//发送请求
        //连接服务器，返回加好友页面
        this.$router.back()
        this.request()
      }
  },
  mounted(){
      console.log(this.$store.state.personalDetail)
      this.userMsg=this.$store.state.personalDetail;
      if(this.userMsg.gender==true||this.userMsg.gender==1){
          this.userMsg.gender="男"
      }else if(this.userMsg.gender==false||this.userMsg.gender==0){
          this.userMsg.gender="女"
      }
  },
 activated(){
     //将vuex中变量传入
     this.userMsg=this.$store.state.personalDetail;
     if(this.userMsg.gender==true||this.userMsg.gender==1){
          this.userMsg.gender="男"
      }else if(this.userMsg.gender==false||this.userMsg.gender==0){
          this.userMsg.gender="女"
      }
      //将申请消息置空
      this.valMsg=''
 }
}
</script>

<style lang="less" scoped>
    @import '~less/variable';
    .infoContainer{//容器
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: @background-i;
        z-index: 10;
        img{
          max-width:100%;
          max-height: 100%;
      }
        .topmenu{//顶部导航
          font-size: .34rem;
          height: .9rem;
          background-color: @fs-i;
          color: @color-l;
          line-height: .9rem;
          >div{
              >:nth-child(1){
                  padding-left: .22rem;
              }
              >:nth-child(2){
                  text-align: center;
              }
              >:nth-child(3){
                  text-align: right;
                  padding-right: .2rem
              }
          }
      }
      .userMain{//用户详细信息
         >div{
             margin-top: .3rem;
             margin-bottom: .3rem;
             >:nth-child(1){
                 padding-left: .2rem;
                 img{
                     height: 1rem;
                 }
             }
             >:nth-child(2){
                 p{
                     font-size: .38rem;
                     color: @color-n
                 }
                 span{
                     font-size: .28rem;
                     color: @fs-l
                 }
             }
         }
      }
      .valMsg{//验证消息
        p{
            font-size: .28rem;
            color: @fs-l
        }
        textarea{
            width: 100%;
            border: none;
            font-size: .3rem;
            outline: none;
            padding:0 .2rem;
        }
      }
      .btmMain{
          font-size: .3rem;
          margin-top: .4rem;
          >p{ 
              font-size: .28rem;
              color: @fs-l
          }
          .remake{
              li{
                //   height: .9rem;
                  line-height: .9rem;
                  border-bottom: 1px solid @border;
                  background-color: @bgcolor-body;
                  box-sizing: border-box;
                  >:nth-child(1){
                      width: 20%;
                      display: inline-block;
                      margin-left: .3rem
                  }
                  input{
                      border: none;
                      outline: none;
                      height: 95%;
                      width: 70%;
                  }
                  p{  
                      width: 20%;
                      float: right;
                      line-height: .9rem;
                      margin-right: .3rem;
                      text-align: right;
                      color: @fs-l
                  }
                  .group{
                      li{
                          background-color: @background;
                          padding-left: .5rem;
                      }
                  }
              }
          }
          .permiss{//权限设置
          margin-top: .4rem;
             label{
                 float: right;
                 margin-top: .2rem;
                 margin-right: .3rem;
             }
             li{
                 height: .9rem;
                 line-height: .9rem;
                 border-bottom: 1px solid @border;
                 background-color: @bgcolor-body;
                 padding-left: .3rem;
             }
          }
      }
    }
</style>
