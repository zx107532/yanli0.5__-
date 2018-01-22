
<template>
  <div class="regContainer">
      <!-- 用户名 -->
       <Row class="uname">
                <Col span="4">
                    <img src="./img/people.png" >
                </Col>
                <Col span="14">
                    <input type="text" v-model="nicheng" placeholder="昵称,最多输入6个字" maxlength="6">
                </Col>
                <Col span="6">
                    <img @click="sheetVisible = true" :src="img" v-show="imgShow">
                    <img @click="sheetVisible = true" :src="image"  v-show="!imgShow">
                </Col>
        </Row>
        <!-- 地区选择 暂时不要-->
        <!-- <Row  class="area">
                <Col span="4">
                    <img src="./img/area.png" >
                </Col>
                <Col span="14">
                    <input type="text" v-model="area" placeholder="国家/地区">
                </Col>
                <Col span="6">
                    <span>中国(+86)</span>
                </Col>
        </Row> -->
        <!-- 电话 -->
        <Row  class="phone">
                <Col span="4">
                    <img src="./img/phone.png" >
                </Col>
                <Col span="14">
                    <input type="text" placeholder="手机号" maxlength="11" v-model="phone" @blur="phoneVerify">
                </Col>
                <Col span="6">
                    <span v-show="show" @click="getCode">发送验证码</span><span v-show="!show" class="count">{{count}}s后重新发送</span>
                </Col>
        </Row>

        <!-- 短信验证码 -->
        <Row  class="msg">
                <Col span="4">
                    <img src="./img/msg.png" >
                </Col>
                <Col span="14">
                    <input type="text" placeholder="请输入短信验证码" v-model="msgWord">
                </Col>
                <Col span="6">

                </Col>
        </Row>
      <!-- 密码设置 -->
        <Row  class="pwd">
                <Col span="4">
                    <img src="./img/loc.png" >
                </Col>
                <Col span="14">
                    <input type="text" placeholder="登陆密码设置" v-model="pwd" @blur="pwdVerify">
                </Col>
                <Col span="6">

                </Col>
        </Row>
      <button @click="register($event)" >注册</button>
      <!-- 用户协议 -->
      <div class="agreement">
          <input type="checkbox" :checked="check"> <label >我已仔细阅读了</label><span @click="agreeBtn">《服务协议》</span><label>理解、同意相关条款</label>
      </div>
      <div class="agreenmentDtail" v-show="agreeshow">
          <div>
              这是服务协议
          </div>
          <button @click="agree">我同意</button><button @click="disagree()">我不同意</button>
      </div>
      <!-- 照相弹起框 -->
       <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
        <input type="hidden" id="ckjl.id" name="ckjl.id" value="429">
        <!-- 图片裁剪 -->
        <div class="crop" v-show="cropShow">
            <p @click="finish()">完成</p><p @click="cancle()">取消</p>
            <span>提示：请保证图片在选取框以内，请在选取框外进行放大缩小操作！</span>
            <vueCropper ref="cropper" :img="img" :autoCrop="cropp.autoCrop" :autoCropWidth="cropp.autoCropWidth"
		          :autoCropHeight="cropp.autoCropHeight" :fixedBox="cropp.fixedBox" :info="cropp.info"></vueCropper>
        </div>
  </div>
</template>
<script>
import VueCropper from 'vue-cropper'
import { MessageBox } from 'mint-ui';
import {fun} from '@/common/js/camera.js';
// import myAxios from '@/common/js/base/axiosConfig.js'
export default {
    data(){
        return{
            cropp: {//图片裁剪框参数配置
				autoCrop: true,
				autoCropWidth:document.body.offsetWidth*.8 ,
				autoCropHeight:document.body.offsetWidth *.8,
                fixedBox: true,
                info:false
			},
            show: true,//发送验证码按钮显示隐藏
            cropShow:false,//图片裁剪框显示隐藏
            imgShow:true,//默认头像与新头像显示隐藏
            count: '',//短信倒计时
            timer: null,//短信倒计时定时器
            timer1:null,//获取图片地址定时器
            agreeshow:false,//用户协议显示隐藏
            nicheng:"",//昵称
            area:"",//地址
            phone:"",//电话号码
            msgWord:"",//验证码
            pwd:"",//密码
            check:false,//用户协议同意与否
            img:require('./img/camera.png'),//默认头像
            image:'',//用户上传头像
            sheetVisible: false,//拍照弹起框
            phoneVer:false,//判断电话号码是否注册变量
            actions:[{name: '拍照', method:this.userImg}, {name:'从相册中选择',method:this.usercamera}],
        }
    },
    components: {
			VueCropper
		},
    // watch:{
    //     //监听照相弹出框，启动定时器，获取相片
    //     sheetVisible(curVal,oldVal){
    //          var resive=this.getSrc;
    //         if(curVal==true){
    //           this.timer1=setInterval(function(){
    //                resive()
    //             });
    //         }
    //     },
    // },
  methods:{
      pwdVerify(){//判断密码是否正确输入
          let reg=/^[0-9| A-Z | a-z]{6,16}$/;
          if(!reg.test(this.pwd)){
              MessageBox('提示', '请输入6-16位数字字母密码');
          }
      },
      phoneVerify(){//判断手机号是否注册
       var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
           if(this.phone==""){
               MessageBox('提示', '电话号码不能为空');
           }else if(!myreg.test(this.phone)){//不为空 验证格式
               MessageBox('提示', '电话号码错误，请重新输入');
           }else{//向服务器发送请求
                   let data={
                        mobilephone:this.phone,
                    }
                    this.$ajax.Phone(data)
                                .then(res => {
                                    if(res.state==0){
                                        this.phoneVer=true;
                                    }else{
                                        MessageBox('提示', res.message)
                                    }
                                    })
                                    .catch(error => {
                                        // console.log(error)
                                        MessageBox('提示', "请检查网络或联系我们的客服")
                     })
           }

      },
      	finish (type) {
            // 图片裁剪完成,type表示裁剪方式blob,base64
			if (type === 'blob') {
				this.$refs.cropper.getCropBlob((data) => {
				})
			} else {
				this.$refs.cropper.getCropData((data) => {
                    this.imgShow=false;
                    this.image=data;
                    // console.log(data)
                    this.$store.commt("phone",[])
                    this.$store.commt("userPic",[])
				})
            }
            this.cropShow=false;
            this.$store.state.userPic[this.$store.state.userPic.length-1].cropShow=false;
            clearInterval(window.timer1)
        },
        cancle(){//取消裁剪
            this.cropShow=false,
            clearInterval(window.timer1)
        },
      userImg(){//获取图片
          fun.getImg()
          window.timer1=null;
           var resive=this.getSrc
            window.timer1=setInterval(function(){
                resive()
                     });
      },
      usercamera(){//从相册获取
            fun.galleryImg()
            window.timer1=null;
             var resive=this.getSrc
            window.timer1=setInterval(function(){
                resive()
                     });
      },
      getSrc(){//获取
          this.img = this.$store.state.userPic[this.$store.state.userPic.length-1].src
          this.cropShow=this.$store.state.userPic[this.$store.state.userPic.length-1].cropShow
      },
      register(e){//注册成功判断
      let btn=e.target;
         let data = {
                name:this.nicheng,
                photo:this.image,//测试用，待删
                mobilephone: this.phone,
                password: this.pwd
            }
                btn.disabled=true
            // 当所有内容都不为空时像服务器发送请求
            if(this.nicheng&&this.phoneVer&&this.msgWord&&this.pwd&&this.image&&this.check){
                this.$ajax.Regist(data)
                    .then(res => {//注册成功，跳转回首页
                        if(res.state==0){
                              MessageBox('提示', '注册成功').then(action=>{
                                        this.$router.push({path:'/page'})
                                        setTimeout(()=>{
                                             btn.disabled=false 
                                        },3000)
                                    });
                        }else{//提示错误消息
                              MessageBox('提示', res.message)
                                setTimeout(()=>{
                                             btn.disabled=false 
                                        },2000)     
                        }
                        })
                        .catch(error => {//服务器请求错误
                            throw error
                            MessageBox('提示', "请检查网络或联系我们的客服")
                              setTimeout(()=>{
                                             btn.disabled=false 
                                        },2000)
                        })
            }else if(this.image==""){//若头像未上传发出提醒
                            MessageBox('提示',"请上传您的头像")
                             setTimeout(()=>{
                                             btn.disabled=false 
                                        },2000)
                        }else if(!this.check){//用户协议未同意
                            MessageBox('提示',"请认真阅读并同意用户协议")
                             setTimeout(()=>{
                                             btn.disabled=false 
                                        },2000)
                        }else if(!this.phoneVer){
                            MessageBox('提示',"请再次核验您的电话号码是否被注册")
                             setTimeout(()=>{
                                             btn.disabled=false 
                                        },2000)
                        }else{//其他消息填写错误
                            MessageBox('提示', "请认真填写所有内容")
                             setTimeout(()=>{
                                             btn.disabled=false 
                                        },2000)
            }
      },
      agreeBtn(){//用户协议详情
          this.agreeshow=!this.agreeshow;
      },
      agree(){//同意按钮
        this.check=true;
         this.agreeBtn()
      },
      disagree(){//不同意
        MessageBox.confirm('若不同意，您将无法使用本软件?').then(() => {
                    this.agreeBtn()
                    this.check=false;
                    },() => {

                    })
      },
     getCode(){//发送验证码 然后倒计时
        var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
           if (!myreg.test(this.phone)){
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
  },
  mounted(){
      var cancle=this.cancle
       this.$store.state.userPic=[]//清空图片路径，方便以后使用
       	plus.key.addEventListener("backbutton", function() {//安卓返回按键处理
					cancle()
				});
  },
  activated(){//每次进入组件将信息置空
		    this.nicheng="";//昵称
            this.area="";//地址
            this.phone="";//电话号码
            this.msgWord="";//验证码
            this.pwd="";//密码
            this.check=false;//用户协议同意与否
     },
  deactivated(){
       clearInterval(window.timer1)
  }
}
</script>

<style lang="less" scoped>
@import '~less/variable';
img{
    max-width:100%;
    max-height: 100%;
}
.regContainer{//容器沾满全屏
        position: fixed;
        top: 0;
        bottom: 0;
        width: 100%;
        overflow: scroll;
        background: @page-color;
        color: @color-l;
        font-size: .3rem;
        padding-top: .3rem;
        input{
            width: 100%;
            background:  @page-color;
            border: 0;
            border-bottom: 1px solid @border;
            outline: none;
            color: @color-l;
        }
        .uname{//用户名
            margin-top: .5rem;
            height: 1.5rem;
            // line-height: 1.5rem;
            >:nth-child(1){//左侧图标
                img{
                     margin-top: 1rem;
                     height: .46rem;
                     margin-left: .56rem;
                }
            }
            input{
                margin-top: 1.1rem;
            }
            >:nth-child(3){//右侧拍照功能
                img{
                    height: 1.5rem;
                    margin-left: .1rem;
                }
            }
        }
        .area,.phone,.msg,.pwd{//统一样式
            margin-top: 1rem;
            // height: .7rem;
        }
        // 每行图标大小，样式
        .area{
            img{
                height: .42rem;
                margin-left: .5rem;
            }
        }
        .phone{
                img{
                    height: .6rem;
                    margin-left: .46rem;
                }
                input{
                    margin-top:.2rem;
                }
                .count{
                    font-size: .26rem;
                }
        }
        .msg{
            img{
                margin-left: .56rem;
                height: .5rem;
            }
            input{
                margin-top: .1rem;
            }
        }
        .pwd{
            img{
                height: .46rem;
                 margin-left: .58rem;
            }
              input{
                margin-top: .1rem;
            }
        }
        button{
            width: 88%;
            margin-left: 6%;
            margin-top: 1.4rem;
            height: 1rem;
            border: 0;
            border-radius: .16rem;
            background: @color-l ;
        }
        .agreement{
            font-size: .24rem;
            text-align: center;
            margin-top: .5rem;
            input{
                width: .2rem;
                height: .2rem;

            }
            span{
                color: #d8477d;
            }
        }
        .agreenmentDtail{//用户协议详情
            position: fixed;
            top: 0;
            bottom: 0;
            width: 100%;
            background: @bgcolor-body ;
            font-size: .24rem;
            color: @color-i;
            overflow: scroll;
             background: @page-color;
            button{
                width: 30%;
            }
        }
        .crop{//用户照片裁剪
            position: fixed;
            top:0;
            left: 0;
            right: 0;
            bottom: 0;
            .vue-cropper{
                background: @background-o;
            }
            span{
                position: absolute;
                z-index:10;
                // top: .7rem;
                bottom: .3rem;
                font-size: .24rem;
                // opacity: .8;
                width: 100%;
                text-align: center;
                color: @fs-i
            }
            p{//取消与完成按钮
                position: absolute;
                top:.2rem;
                z-index:10;
            }
            p:nth-child(1){
                left: .3rem;
            }
            p:nth-child(2){
                right: .3rem;;
            }
        }
}
</style>
