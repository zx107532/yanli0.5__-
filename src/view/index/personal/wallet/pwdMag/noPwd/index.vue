<template>
  <div class="newPwd">
      <div class="topbar">
          <Row>
              <Col span="3">
                    <div @click="back">
                        <Icon type="chevron-left"></Icon>
                    </div>
              </Col>
              <Col span="12" offset="3">
                    付款密码设置
              </Col>
          </Row>
      </div>
      <!-- 下方列表 -->
      <div class="pwdList">
          <div>
              <label for="frtpwd">初始密码</label>
          </div>
          <div>
               <input type="password" maxlength="6" minlength="6" id="frtpwd" v-model="frtInput" placeholder="请输入您要设置的付款密码    6位数字组合"> 
               <p><Icon type="close-circled"></Icon>密码格式错误</p>
          </div>
         <div>
              <label for="secpwd">请再次输入密码确认</label>
         </div>
         <div>
              <input type="password" id="secpwd" maxlength="6" minlength="6" v-model="secInput" placeholder="请再次输入密码">
              <p><Icon type="close-circled"></Icon>两次输入密码不同</p>
         </div>
      </div>
      <!-- 确认按钮 -->
      <div class="makeSure"> 
             <button @click="sure">确定</button>
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
<script>
export default {
     data(){
            return{
                frtInput:'',
                secInput:''
            }
        },
  methods:{
        back(){//返回上级菜单
            this. $router.back();
            document.getElementsByClassName("i-box")[0].style.top=".96rem";
            document.getElementsByClassName("i-box")[0].style.bottom="1.2rem"
        },
        sure(){//表单验证
            var reg=/^[0-9]*$/ig;
            var result1=reg.test(this.frtInput);
             var reg1=/^[0-9]*$/ig;
            var result2=reg1.test(this.secInput);
            if(result1&&result2&&this.frtInput==this.secInput){
                document.querySelector(".newPwd .model").style.display="block"
                setTimeout(function() {
                     document.querySelector(".newPwd .model").style.display="none"
                }, 1000);
                 document.querySelector(".newPwd #frtpwd").nextElementSibling.style.display="none"
                 document.querySelector(".newPwd #secpwd").nextElementSibling.style.display="none"
            } 
            if(!result1||this.frtInput.length<6){
                document.querySelector(".newPwd #frtpwd").nextElementSibling.style.display="block"  
                document.querySelector(".newPwd .model").style.display="none"
            }
            if(!result2||this.secInput.length<6){
                document.querySelector(".newPwd #secpwd").nextElementSibling.style.display="block"
                document.querySelector(".newPwd .model").style.display="none"
            }
        }
  },
   watch:{
           frtInput(val,oldval){
                // console.log(val+"-"+oldval)
            },
            secInput(val,oldval){
                // console.log(val+"-"+oldval)
            }
        },
  mounted(){
        // document.querySelector(".newPwd .pwdList #frtpwd").style. letterSpacing=window.screen.width*2*.13/100+"rem"
        // document.querySelector(".newPwd .pwdList #secpwd").style. letterSpacing=window.screen.width*2*.13/100+"rem"
      
  }
}
</script>

<style lang="less" scoped>
 @import '~less/variable';
 .newPwd{
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
         font-size: .36rem;
         height: .9rem;
         line-height: .9rem;
         background-color: @bgcolor-body;
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
                 display: none;
             }
         }
           >:nth-child(4){
             position: relative;
             p{
                 position: absolute;
                 top: 0;
                 right: 0;
                 color: @fs-i;
                 display:none;
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
 }
</style>
