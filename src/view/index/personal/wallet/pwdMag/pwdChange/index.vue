<template>
  <div class="pwdChange">
      <!-- 顶部导航 -->
       <div class="topbar">
          <Row>
              <Col span="3">
                    <div @click="back">
                        <Icon type="chevron-left"></Icon>
                    </div>
              </Col>
              <Col span="6" offset="3">
                   <span class="change1" @click="handleChange">密码修改</span > 
              </Col>
              <Col span="6">
                   <span  class="change2" @click="msgChange">短信修改</span > 
              </Col>
          </Row>
      </div>
      <!-- 修改列表 -->
    <div class="handleChange" v-show="changeShow">
        <div class="pwdList">
            <div>
                <label for="oldpwd">旧密码</label>
            </div>
            <div>
                <input type="password" maxlength="6" minlength="6" id="oldpwd" v-model="oldPwd" placeholder="请输入正在使用的密码"> 
                <p v-show="oldShow"><Icon type="close-circled"></Icon>旧密码错误</p>
            </div>
            <div>
                <label for="frtpwd">新密码</label>
            </div>
            <div>
                <input type="password" maxlength="6" minlength="6" id="frtpwd" v-model="frtInput" placeholder="请输入新密码,6位数字组合"> 
                <p v-show="newPwd"><Icon type="close-circled"></Icon>密码格式错误</p>
            </div>
            <div>
                <label for="secpwd">请再次输入新密码确认</label>
            </div>
            <div>
                <input type="password" id="secpwd" maxlength="6" minlength="6" v-model="secInput" placeholder="确认新密码">
                <p v-show="sureShow"><Icon type="close-circled"></Icon>两次输入密码不同</p>
            </div>
        </div>
        <!-- 确认按钮 -->
        <div class="makeSure"> 
                <button @click="sure">确定</button>
        </div>
    </div>
    <div class="msgChange" v-show="!changeShow">
        <div class="msgList">
                    <div>
                        <input type="text" v-model="phone" placeholder="请输入正在使用的手机号">
                        <p v-show="phoneShow"><Icon type="close-circled"></Icon>手机号错误</p>
                    </div>
                    <div>
                        <input type="text" v-model="yzm"  maxlength="10" placeholder="请输入验证码">
                        <button @click="msgsend">获取验证码</button>
                        <p  id="timealert"></p>
                    </div>
                    <div>
                        <input type="password" v-model="msgnew" maxlength="6" minlength="6" placeholder="请输入新密码（6位数组合）">
                    </div>
            </div>
             <!-- 确认按钮 -->
                    <div class="makeSure"> 
                            <button>确定</button>
                    </div>
        </div>
         <!-- 模态框 -->
        <div class="model">
            <div class="alert">
                <img src="../../closePayAdd/img/yx.png">
                <p>提交成功</p>
            </div>
        </div>
  </div>
</template>
<style lang="less" scoped>
   @import '~less/variable';
   .pwdChange{
        position: fixed;
        top:0;
        right: 0;
        left: 0;
        bottom: 0;
        background-color: @background;
        .model{//模态框
             position: fixed;
             top: 0;
             right: 0;
             bottom: 0;
             left: 0;
             background-color:@bgrgba; 
             display: none;
             .alert{//提示消息
                 position: absolute;
                 height: 3.88rem;
                 top: 50%;
                 width: 100%;
                 margin-top: -1.94rem;
                 background-color: @bgcolor-body;
                 text-align: center;
                  font-size: .3rem;
                  padding: 0 .2rem;
                  color: @color-i;
                 img{
                     width: 1.04rem;
                     margin:.3rem 0;
                 }
             }
         }
        .topbar{//顶部导航栏
         font-size: .34rem;
         height: .9rem;
         line-height: .9rem;
         background-color: @bgcolor-body;
         .change1,.change2{
             padding-bottom: .22rem;
         }
         .change1{
             border-bottom: 1px solid @fs-i;
         }
         >:nth-child(1){
             >:nth-child(1){//返回按钮
                  padding-left: .2rem
             }
             >:nth-child(2){
                 text-align: center;
                 color: @fs-i;
             }
         }
     }
       .pwdList{
         div{//密码列表
             width: 100%;
             height: 1rem;
             line-height: 1rem;
             font-size: .34rem;
             border-bottom: 1px solid @fs-m;
             label{
                 padding-left: .4rem;
             }
             input{
                 width: 100%;
                 padding-left: .4rem; 
                 overflow: hidden;
                  padding-left: .4rem;  
             }
            input::-webkit-input-placeholder{
                        font-size: .28rem;
                        letter-spacing: 0;
            }
            input::-moz-placeholder{
                        font-size: .28rem;
                        letter-spacing: 0;
            }
         }
         >:nth-child(2){//错误提示消息
             position: relative;
             p{
                 position: absolute;
                 top: 0;
                 right: 0;
                 color: @fs-i;
             }
         }
           >:nth-child(4){
             position: relative;
             p{
                 position: absolute;
                 top: 0;
                 right: 0;
                 color: @fs-i;
             }
         }
           >:nth-child(6){
             position: relative;
             p{
                 position: absolute;
                 top: 0;
                 right: 0;
                 color: @fs-i;   
             }
         }
     }
      .makeSure{//下方确定按钮
        width: 100%;
        text-align: center;
        margin-top: 1rem;
        button{
            width:80%;
           height: .9rem;
           border-radius: 10px;
           border: 0;
           font-size: .34rem;
           color: @color-l;
        }
     }
     .msgChange{//短信修改界面
        .msgList{
            div{
               width: 100%;
                height: 1rem;
                line-height: 1rem;
                font-size: .34rem;
                border-bottom: 2px solid @fs-m;  
            }
             input{
                  width: 100%;
                  padding-left: .4rem; 
                  overflow: hidden;
                  padding-left: .4rem;  
             }
           
            >div:nth-child(1){
                margin-top: .2rem;
                margin-bottom: .01rem;
                position: relative;
                p{
                   position: absolute;
                 top: 0;
                 right: 0;
                 color: @fs-i; 
                }
            }
             >div:nth-child(2){
                 position: relative;
                 button{
                     position: absolute;
                     right: 0;
                     top: 0;
                     border: 0;
                     background-color: @bgcolor-body;
                     color: @fs-i;
                     height: .8rem;
                     margin-top: .1rem;
                     margin-bottom: .1rem;
                     line-height: .8rem;
                 }
                 p{
                     position: absolute;
                     display: none;
                        top: 0;
                        right: 0;
                        color: @fs-i;  
                 }
             }
        }
     }
   }
</style>
<script>
export default {
  data(){
      return{
          changeShow:true,
          pwdOld:'123456',
          myreg:/^[1][3,4,5,7,8][0-9]{9}$/ig,
          timeBack:'60',
          oldPwd:'',
          frtInput:'',
          secInput:'',
          phone:'',
          yzm:'',
          msgnew:'',
          btShow:true,
          oldShow:false,
          newPwd:false,
          sureShow:false,
          phoneShow:false,
          yzmSystem:'zsdas'
      }
  },
  methods:{
       back(){//返回上级菜单
            this. $router.back();
            document.getElementsByClassName("i-box")[0].style.top=".96rem";
            document.getElementsByClassName("i-box")[0].style.bottom="1.2rem"
        },
        sure(){//确认按钮，表单验证
            var reg=/^[0-9]*$/ig;
            var result1=reg.test(this.frtInput);
            var reg1=/^[0-9]*$/ig;
            var result2=reg1.test(this.secInput);
            if(result1&&result2&&this.frtInput==this.secInput&&this.oldPwd==this.pwdOld){
                document.querySelector(".pwdChange .model").style.display="block"
                    setTimeout(function() {
                        document.querySelector(".pwdChange .model").style.display="none"
                }, 1000);
                this.newPwd=false;
                this.sureShow=false;
            }
            if(!result1||this.frtInput.length<6){
                this.newPwd=true; 
                 document.querySelector(".pwdChange .model").style.display="none"
            }
             if(!result2||this.secInput.length<6){
                  this.sureShow=true;
                 document.querySelector(".pwdChange .model").style.display="none"
            }

        },
        msgsend(){
            if(this.myreg.test(this.phone)){
                var s=60;
                document.getElementById('timealert').style.display="block"
                document.getElementById('timealert').previousElementSibling.style.display="none"
                console.log('发送请求，获取验证码');
                function task(){
                      s=s-1;
                      document.getElementById('timealert').innerHTML=s+'S重新发送';
                      if(s==0){
                          document.getElementById('timealert').style.display="none"
                          document.getElementById('timealert').previousElementSibling.style.display="block" 
                          clearInterval(timer);  
                      }
                }
                var timer=setInterval(task ,1000);
                this.phoneShow=false
            }else{
                this.phoneShow=true
            }  
        },
        msgsure(){//短信确认
        var reg=/^[0-9]*$/ig;
            if(reg.test(this.msgnew&&this.yzm==this.yzmSystem)){
                 document.querySelector(".pwdChange .model").style.display="block"
                    setTimeout(function() {
                        document.querySelector(".pwdChange .model").style.display="none"
                }, 1000);
            }
        },
        handleChange(){
            this.changeShow=true;
            document.querySelector(".pwdChange .topbar .change1").style.color="#ed5042"
            document.querySelector(".pwdChange .topbar .change1").style.paddingBottom=".22rem"
            document.querySelector(".pwdChange .topbar .change1").style.borderBottom="1px solid red"
            document.querySelector(".pwdChange .topbar .change2").style.color="#313131"
             document.querySelector(".pwdChange .topbar .change2").style.borderBottom="0"
        },
        msgChange(){
             this.changeShow=false;
             document.querySelector(".pwdChange .topbar .change1").style.color="#313131"
             document.querySelector(".pwdChange .topbar .change1").style.borderBottom="0"
            document.querySelector(".pwdChange .topbar .change2").style.color="#ed5042"
            document.querySelector(".pwdChange .topbar .change2").style.paddingBottom=".22rem"
            document.querySelector(".pwdChange .topbar .change2").style.borderBottom="1px solid red"
        }
    },
 updated(){
    if(this.oldPwd==''||this.frtInput==''||this.secInput==''){//原始密码修改 确定按钮颜色
         document.querySelector(".pwdChange .handleChange .makeSure button").style.backgroundColor="#cccccc"
    }else{
              document.querySelector(".pwdChange .handleChange .makeSure button").style.backgroundColor="#ed5042"
          }
    if(this.yzm==''||this.phone==''||this.msgnew==''){//短信验证 确定按钮颜色
         document.querySelector(".pwdChange .msgChange .makeSure button").style.backgroundColor="#cccccc"
    }else{
         document.querySelector(".pwdChange .msgChange .makeSure button").style.backgroundColor="#ed5042"
    }
      if(this.oldPwd!==this.pwdOld){//若与旧密码不同，出现提示
                this.oldShow=true
            }
      if(this.oldPwd==this.pwdOld){
          this.oldShow=false
      }
      if(this.myreg.test(this.phone)){  
                 this.phoneShow=false;
                 }
  }
}
</script>

