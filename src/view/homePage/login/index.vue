<template>
  <div class="loginContainer" :style="{paddingBottom:bottom}">
      <div class="top">
          <div class="call"><Icon type="android-call"></Icon></div>
          <div class="logo"><img src="./img/logo.png" alt=""></div>
      </div>
      <div class="mid">
          <!-- <div class="uname">
             <Icon type="android-contact"></Icon> <input v-model="uname" placeholder="请输入用户名" type="text" name="logUname" ><router-link to="/page/third" tag="label" >忘记用户名</router-link>
          </div>
          <div class="upwd">
              <Icon type="unlocked"></Icon> <input v-model="upwd" placeholder="请输入密码" type="password" name="logPwd" ><router-link to="/page/third" tag="label">忘记密码</router-link>
          </div> -->
              <Row class="uname">
                <Col span="14" offset="3">
                    <img src="./img/people.png">
                    <input v-model="uname" placeholder="请输入用户名" type="text" name="logUname" >
                </Col>
                <Col span="7" style="text-align:left">
                    <router-link to="/page/third" tag="label" >忘记用户名</router-link>
                </Col>
            </Row>
               <Row class="upwd">
                <Col span="14"  offset="3">
                    <img src="./img/loc.png">
                    <input v-model="upwd" placeholder="请输入密码" type="password" name="logPwd" >
                </Col>
                <Col span="7" style="text-align:left">
                    <router-link to="/page/third" tag="label">忘记密码</router-link>
                </Col>
            </Row>
          <button @click="checkd">登陆</button>
      </div>
      <router-link to="/page/register" tag="div" class="bottom">
          <img src="./img/fly.png" >
          <div>还没账号？立即注册</div>
      </router-link>
  </div>
</template>
<style lang="less" scoped>
    @import '~less/variable';
    .loginContainer{//登陆容器
        position: fixed;
        top: 0;
        bottom: 0;
        width: 100%;
        background: @page-color;
        color: @color-l;
         overflow: scroll;
        .top{//客服以及图片部分
            padding-top: .2rem;
            height: 4.3rem;
            width: 100%;
            text-align: center;
            .call{
                float: right;
                font-size: .52rem;
                margin-right: .2rem;
            }
            .logo{
                margin-top:1.5rem;
                img{
                    height: 1.78rem;
                }
            }
        }
        .mid{//中间注册登陆部分
            font-size: .36rem;
            text-align: center;
            input{
                background-color:  @page-color;
                width:100%; 
                border-bottom: 1px solid @border;
                outline:none;
                padding-left: .4rem;
                color: @color-l;
            }
            .uname,.upwd{
                height: .7rem;
                line-height: .7rem;
                margin-bottom: .8rem;
                img{
                    height: .4rem;
                    position: absolute;
                    top: .1rem;
                }
                
            }
            button{//登陆按钮
                width: 81%;
                margin-top: .4rem;
                border: 2px solid @border;
                height: 1rem;
                color: @color-l;
                background-color:  @page-color;
                border-radius: .16rem;
            }
        }
        .bottom{
            margin-top: 1.2rem;
            width: 100%;
            text-align: center;
            font-size: .32rem;
            img{
                height: .9rem;
                margin-bottom: .3rem;
            }
        }
    }
</style>
<script>
import { MessageBox } from 'mint-ui';
export default {
  data(){
      return{
          uname:localStorage.mobilephone,
          upwd:localStorage.password,
          bottom:0
      }
  },
 methods:{
        checkd(){
            let data = {
                mobilephone: this.uname,
                password: this.upwd
            }
            // this.$router.push({path:'/index'})
            //向服务器发送请求
            this.$ajax.login(data)
                .then(res => {
                    // if(res){
                        console.log(res)
                        if(res.state==0){
                            MessageBox('提示', '登陆成功').then(action=>{
                                    localStorage['mobilephone']=this.uname;
                                    localStorage['token']=res.data.token;
                                    this.$store.commit('token',localStorage.token)
                                    this.$router.push({path:'/index'})
                                    // this.$store.commit('local',this.uname) 
                                    //将用户ID存到全局变量                                    
                                    // this.$store.commit('myId',res.data.id)
                                    //连接服务器 获取个人信息数据   
                                });
                        }else if(res.state==1){
                                MessageBox('提示', res.message)
                                console.log(res)
                        }else{
                            
                        }       
                    // }
                })
                .catch(error => {
                    console.log(error)
                    MessageBox('提示', "请检查网络或联系我们的客服")
                })
        },
        Foucus(){
            
        }, 
        Blur(){
           
        }
      }
}
</script>   
