<template>
<div class="personalPage">
    <div class="topContent">
        <div class="return"> 
            <Row>
                <Col span="8" ><div  @click="back()"><Icon class="bkicon" type="chevron-left"></Icon> <span>返回</span></div></Col>
                <!-- 根据点击传过来的参数改变主题 -->
                <Col span="8" class="mid">个人信息</Col>
                <!-- <col sapn="8" class="rt"></col>  -->
            </Row>
        </div>
        <!-- 头像以及签名等 -->
        <div class="photoMsg">
                <div class="myPic" @click="changePic"><img :src="uPhoto" v-show="imgShow"><img :src="image" v-show="!imgShow"></div>
                <div class="myCode"><img src='./img/ewm@2x.png'></div>
                <!-- 个性签名 ,用户名-->
                <div class="myUname">{{myMsg.username}}</div>
                <div class="mySinga">
                    <div >{{myMsg.selfSinga}}</div>
                    <div style="height:.32rem;display: inline-block;" @click="changeMSg"><img src="./img/xg@2x.png" ></div>
                </div>
                        <!-- 动态、消息、收藏 -->
                <div class="jumpForm">
                    <Row>
                        <Col span="8" v-for="(item,index) in jmpmenu" :key="index">
                            <!-- 图标 -->
                            <router-link tag="div" :to="item.jump">
                                <div class="jppic">
                                    <img :src="item.img"  >
                                </div>
                                <!-- 路由跳转 -->
                                <div class="jumpbtn">
                                    <div>{{item.title}}：</div>
                                    <!-- 动态获取消息数量 -->
                                    <div>{{item.amount}}</div>
                                </div>
                             </router-link>
                        </Col>
                    </Row>
                </div>
        </div>    
    </div>
    <!-- 功能列表 -->
    <div class="funList" v-show="listShow">
        <ul  v-for="(list,index) in funList" :key="index"  @click="resive(index)">
            <li class="lstName" @click="toggle(index)">
                {{list.fname}}
                <Icon type="chevron-down" class="lstIcon"  v-show="!list.show"></Icon>
                <Icon type="chevron-up" class="lstIcon"  v-show="list.show"></Icon>
            </li>
             <transition name="fade">
                <li class="lstDetail" v-show="list.show">
                    <ul>
                        <li class="lstContent" v-for="(itm,dex) in list.frdList" :key="dex">
                            <router-link :to="itm.jump" @click.native="showtab">
                                    <i class="ecircle"></i> <b class="eline"></b> <span class="lfcount">{{itm.name}}</span> <span class="rtmount">{{itm.count}}</span>
                            </router-link>
                        </li>
                    </ul>
                </li>
             </transition>
        </ul>
    </div>
    <!-- 个人信息修改界面 -->
    <div class="changeMyself" v-show="model">
        <div class="change">  
            <!-- 头部 -->
            <div class="changeHeader">
                <span>基本信息</span>
            </div>
            <!-- 主要信息修改 -->
            <div class="changeMain">
                <mt-field label="昵称" v-model="username"></mt-field>
                <div class="sex"><span>性别</span><div><input @click="genderChoose($event)" type="radio" name="sex" value="1" checked>男<input @click="genderChoose($event)" type="radio" name="sex"  value="0">女</div></div>
                <mt-field label="出生年月" type="date"  v-model="date"></mt-field>
                <mt-field label="个性签名"  type="textarea" rows="3" v-model="selfSinga"></mt-field>
            </div>   
        </div>
         <!-- 确定取消按钮 -->
            <div class="btns">
                <button @click="changeSave">保存</button> <button @click="giveUp">不保存</button>
            </div>
    </div>
     <!-- 头像以及二维码 -->
            <mt-actionsheet :actions="actions" v-model="sheetVisible">
            </mt-actionsheet>
            <input type="hidden" id="ckjl.id" name="ckjl.id" value="429">
               <!-- 图片裁剪 -->
            <div class="crop" v-show="cropShow">
                <p @click="finish()">完成</p><p @click="cancle()">取消</p>
                <span>提示：请保证图片在选取框以内，请在选取框外进行放大缩小操作！</span>
                <vueCropper ref="cropper" :img="uPhoto" :autoCrop="cropp.autoCrop" :autoCropWidth="cropp.autoCropWidth"
                    :autoCropHeight="cropp.autoCropHeight" :fixedBox="cropp.fixedBox" :info="cropp.info"></vueCropper>
            </div>
    <!-- 推荐他人使用  -->
    <!-- 老板不要这一块了，先留着以防万一 -->
    <!-- <div class="support">
            <div class="toptxt">
                <i></i>
                <span>推荐好友使用</span>
                <i></i>
            </div>
            <div class="bticon">
                <Row>
                    <Col span="8">
                        <div><img src="./img/qq@2x.png" ></div>
                        <div>QQ</div>
                    </Col>
                    <Col span="8">
                        <div><img src="./img/wx@2x.png" ></div>
                        <div>微信</div>
                    </Col>
                    <Col span="8">
                        <div><img src="./img/lj@2x.png" ></div>
                        <div>复制链接</div>
                    </Col>
                </Row>   
            </div>
    </div> -->
</div> 
</template>
<script>
import {fun} from '@/common/js/camera.js'
import VueCropper from 'vue-cropper'
import { MessageBox } from 'mint-ui';
import { Indicator } from 'mint-ui';
export default {
    data(){
        return {
             cropp: {//图片裁剪框参数配置
				autoCrop: true,
				autoCropWidth:document.body.offsetWidth*.8 ,
				autoCropHeight:document.body.offsetWidth *.8,
                fixedBox: true,
                info:false
            },
            dataTimer:null,
            sheetVisible: false,//下方弹起框的显示隐藏
            listShow:true,
            model:false,
            image:null,
            gender:1,//
            genderCheck:true,
            uPhoto:require("./img/tx@3x.png"),//用户头像，数据库获取
            username:'',//用户名，数据库获取
            date:'',//出生日期，数据库获取
            selfSinga:'',//个性签名,数据库获取
            mobilephone:'',
            timer1:null,//定时器控制获取图片
            imgShow:true,//默认头像与新头像显示隐藏 
            cropShow:false,//图片裁剪框显示隐藏
            actions:[{name: '拍照', method: this.takePhoto}, {name:'从相册中选择',method: this.openAlbum}],
            myMsg:{username:'清风徐来',date:'1987-02-09',selfSinga:'夕阳西下，断肠人在天涯',gender:'1'},
            // cancleMsg:{username:'清风徐来',date:'1987-02-09',selfSinga:'夕阳西下，断肠人在天涯',sex:'1'},
            jmpmenu:[
                {"img":require('./img/dt.png'),"title":"动态","amount":"22","jump":"/read"},
                {"img":require('./img/sc@2x.png'),"title":"收藏","amount":"111","jump":"/index/personal/collect"},
                {"img":require('././img/gz@2x.png'),"title":"消息","amount":"222","jump":"/index/msg"},
            ],
           funList:[
               {"fname":"好友列表","frdList":[{'name':'家庭圈','count':'',"jump":"/index/family/flist"},{'name':'亲友圈','count':'',"jump":"/index/relative/relist"},{'name':'关注','count':'',"jump":"/index/focus/folist"}],"show":false},
               {"fname":"账户管理","frdList":[{'name':'钱包余额','count':'147.46元',"jump":"/index/personal/wallet"},{'name':'亲密付人员管理','count':'6',"jump":"/index/personal/wallet/closepay"},{'name':'付款密码管理','count':'',"jump":"/index/personal/wallet/pwd/pwdChange"},{'name':'充值','count':'',"jump":"/index/personal/wallet"}],"show":false},
                {"fname":"福利管理","frdList":[{'name':'签到积分','count':'12',"jump":""},{'name':'优惠券','count':'34',"jump":""},{'name':'孝敬指数','count':'92',"jump":""}],"show":false},
                {"fname":"收货地址管理","show":false},
                {"fname":"设置","frdList":[{'name':'意见反馈',"jump":"/index/personal/set/suggest"},{'name':'版本更新',"jump":"/index/personal/set/update"},{'name':'关于我们',"jump":"/index/personal/set"}],"show":false},
              ],
        }
    },
    components: {
                VueCropper
            },
    methods:{
          back(){
        // 返回上次页面
          this. $router.back()   
         },
         genderChoose(e){
            this.gender=e.target.value
            // console.log(e.target.value)
         },
         changePic(){
             this.sheetVisible = true
         },
         finish (type) {
            // 图片裁剪完成,type表示裁剪方式blob,base64
			if (type === 'blob') {
				this.$refs.cropper.getCropBlob((data) => {
				})
			} else {
				this.$refs.cropper.getCropData((data) => {
                let datas={
                        userId:localStorage.mobilephone,
                        photo:data
                    }
                this.$ajax.changePic(datas)
                    .then(res => {//修改头像成功，保存到数据库
                        if(res.state==0){
                            this.imgShow=false;
                            this.image=data;
                            this.uPhoto=data;
                            localStorage.mypic=data;
                            this.$store.commit("phone",[])
                            this.$store.commit("userPic",[])
                             clearInterval(window.timer2)
            this.cropShow=false;
            this.$store.state.userPic[this.$store.state.userPic.length-1].cropShow=false; 
                        }else{//提示错误消息
                              MessageBox('提示', res.message)
                        }         
                        })
                        .catch(error => {//服务器请求错误
                            console.log(error)
                            MessageBox('提示', "请检查网络或联系我们的客服")
                        })
				})
            }
           
        },
         cancle(){//取消裁剪
            clearInterval(window.timer2)
            this.cropShow=false
        },
        showtab(){
             for(var i=0;i<this.funList.length;i++){
            this.funList[i].show = false;
          }
        },
        resive(index){//地址管理界面跳转
            if(!this.funList[index].frdList){
               this.$router.push({path:'/index/personal/address',query:{name:'地址管理'}});
               this.showtab();
            }
        },
        toggle(index) {
            //控制列表选项的显示隐藏，以及右侧图标的上下切换
            if (this.funList[index].show){
                this.funList[index].show = false
        }else{
          for(var i=0;i<this.funList.length;i++){
            this.funList[i].show = false
            this.funList[index].show = true
                 } 
            }
        },
        changeMSg(){//修改个人信息
        this.listShow=false;
         this.model=true;              
        },
        changeSave(){//保存
        let data={
            userId:localStorage.mobilephone,
            name:this.username,
            gender:this.gender,
            birthday:this.date,
            signature:this.selfSinga
            }
        if(this.username!=''&&this.selfSinga.length<=20){
            this.$ajax.change(data)
                .then(res => {//修改成功，将用户修改信息显示出来
                console.log(this.gender)
                    if(res.state==0){
                       this.listShow=true;
                       this.model=false;
                       this.myMsg.username=this.username;
                       this.myMsg.date=this.date;
                       this.myMsg.selfSinga=this.selfSinga; 
                       console.log(res) 
                }else{//提示错误消息
                       MessageBox('提示',res.message)
                       
                      }         
                      })
                .catch(error => {//服务器请求错误
                      console.log(error)
                       MessageBox('提示', "请检查网络或联系我们的客服")
                                })       
            }else if(this.selfSinga.length>20){
                MessageBox('提示', "个性签名长度不能超过20")
            }else{
                MessageBox('提示', "用户名不能为空")
                }
        },
        giveUp(){//不保存
            this.listShow=true;
            this.model=false;
            this.username=this.myMsg.username;
            this.date=this.myMsg.date;
            this.selfSinga=this.myMsg.selfSinga;
        },
        takePhoto(){  //调用摄像头
            fun.getImg()
            var resive=this.getSrc
            window.timer2=setInterval(function(){
                resive()  
                     });
            },  
        openAlbum(){ //调用相册 
              fun.galleryImg()
               var resive=this.getSrc
                window.timer2=setInterval(function(){
                    resive()  
                });
            },
        getSrc(){
          this.uPhoto=this.$store.state.userPic[this.$store.state.userPic.length-1].src
          this.cropShow=this.$store.state.userPic[this.$store.state.userPic.length-1].cropShow
      },
      update(){
             let msg={
                userId:localStorage.mobilephone,
             }
                    this.$ajax.personal(msg)
                        .then(res=>{
                            if(res.state==0){//请求成功，将个人信息赋值到变量
                            console.log(res)  
                            this.myMsg.username=res.data.name;//页面数据
                            this.username=res.data.name;//个人资料修改数据
                            if(res.data.gender==false){
                                 this.myMsg.gender=1;
                                 this.gender=1;
                            }else{
                                this.myMsg.gender=0;
                                 this.gender=0;
                            }
                            this.myMsg.date=res.data.birthday;
                            this.date=res.data.birthday;
                            this.myMsg.selfSinga=res.data.signature;
                            this.selfSinga=res.data.signature;
                            this.uPhoto=res.data.photo;
                            Indicator.close('加载中...');//获取到服务器数据后，关闭加载提示
                        }else{
                            console.log(res)
                            MessageBox('提示', res.message)
                        }    
                    })
                        .catch(error => {//服务器请求错误
                            throw error
                            MessageBox('提示', "请检查网络或联系我们的客服")
                    })
      },
      countUpdate(){//圈子数量
               let fridendCount={
                userId:localStorage.mobilephone
            };//获取id
            this.$ajax. friendCount(fridendCount)
                .then(res=>{
                    if(res.state==0){
                        
                        for(let i=0,j=0;i<this.funList[0].frdList.length,j<res.data.length;i++,j++){
                            // this.funList[0].frdList[i].name=res.data[j].name;
                            this.funList[0].frdList[i].count=res.data[j].number;
                            this.funList[0].frdList.length=res.data.length
                        }
                    }   
                })
                .catch(error=>{
                    throw error;
                    MessageBox('提示', "不能获取好友数量,请检查网络或联系我们的客服")
                })
      }
        },
        mounted(){
            Indicator.open('加载中...');//显示加载中
              this.update()
                    //获取好友数量
              this.countUpdate()
                var cancle=this.cancle;
                let jumpbtn=document.querySelectorAll(".jumpbtn")
                jumpbtn[1].style.borderLeft="0.01rem solid #313131";
                jumpbtn[1].style.borderRight="0.01rem solid #313131";
                // 用户头像 
                this.$store.state.userPic=[]//先清空缓存图片路径
                plus.key.addEventListener("backbutton", function() {//安卓返回按键处理
                    cancle()
                     Indicator.close('加载中...');
                });
         
        },
        activated(){
            // 实时向服务器发送请求,更新页面内容
            this.update()
            this.dataTimer=setInterval(()=>{
               this.update()
            //获取好友数量
                this.countUpdate()
                },200000)
        },
        deactivated(){
            Indicator.close('加载中...');
            clearInterval(this.dataTimer);
            this.dataTimer=null;
            localStorage.myname=this.myMsg.username;
            localStorage.mypic=this.uPhoto;
        }
}
</script>
<style lang="less" scoped>
    @import '~less/variable';
    img{
        max-width: 100%;
        max-height: 100%;
    }
    .topContent{
         background:url("./img/topBack.png") no-repeat;
         background-size: cover;
    }
    // 头部返回以及标题栏
    .return{
        height:0.96rem;
        width: 100%;
        line-height: 88/100rem;
        font-size: 30/100rem;
      .bkicon{
          margin-left:0.23rem;margin-right: 0.23rem; 
      }
       .mid{
         text-align: center;
         font-size:.36rem;
       }
                
    }
    .personalPage{
        width: 100%;
        // 页面上方个人信息
        position: fixed;
        bottom: 0;
        top: 0;
        right: 0;
        left: 0;
        background-color: @background;
        overflow: scroll;
        .photoMsg{
            height: 4.2rem;
            .myPic{//头像
                overflow: hidden;
                border-radius: 50%;
                display: inline-block;
                margin-left: 42%;
                // width: 1.3rem;
                height: 1.3rem;
            }
            .myCode{//二维码
                float: right;
                margin-left: 0.78rem;
                height: .58rem;
                margin-right: 22%;
                margin-top: .36rem;
            }
            .myUname{//我的用户名
                font-size: 0.32rem;
                text-align: center;
                color:@color-i; 
                margin-top: 0.3rem;
            }
            .mySinga{//个性签名
                font-size: 0.24rem;
                color:@color-i;
                text-align: center;
                margin-top:.2rem;
                height: 0.35rem;
                line-height: .35rem;
                div:nth-child(1){
                    display: inline-block;
                    margin-right: 0.35rem;
                }
            }
            .jumpForm{//跳转内容样式
                text-align: center; 
                margin-top: .35rem;
                .jppic{
                    height: .47rem;
                }
                .jumpbtn{
                    margin-top: .2rem;
                    div{
                        display: inline-block;
                        font-size: .3rem;
                        color:@color-i;
                    } 
                }
            }
        }
        // 页面中间部分列表
        .funList{
            margin-top: 0.5rem;   
            width: 100%;
            .lstName{//功能菜单名字
                padding-left: 0.4rem;
                border-bottom: 0.01rem solid @border;
                font-size: 0.32rem;
                line-height: 0.94rem;
                background-color: @bgcolor-body;    
            .lstIcon{
                height: 0.94rem;
                line-height: 0.94rem;
                float: right;
                margin-right: 0.6rem;
                }
            }
            .lstDetail{//列表详情
                font-size: 0.3rem;
                padding-left: 0.4rem;
                background-color: @bgcolor-body;
                margin-bottom: 0.3rem;
                .lstContent{//右侧切换图标
                    height: 0.94rem;
                    line-height: 0.94rem;
                    position: relative;
                     a{
                        color:@color-i;
                     }
                }
                .ecircle{//空心圆圈
                    display: inline-block;
                    width: 0.14rem;
                    height: 0.14rem;
                    border: 0.02rem solid @fs-i;
                    margin-left: 0.3rem;
                    border-radius: 50%;
                    }
                .eline{//红色竖线
                    position: absolute;
                    height: 0.82rem;
                    border-left: 0.02rem solid @fs-i;
                    display: inline-block;
                    top:0.56rem;;
                    left:0.36rem;
                }
                .lfcount{//左侧列表内容
                    margin-left: 0.8rem;
                }
                .rtmount{//右侧数量样式
                    float: right;
                    margin-right: 0.6rem;
                    color:@fs-i;
                }
                li:last-child{//线圈样式，最后线高度为0
                    .eline{
                        height: 0;
                    }
                }
            }
        }
        // 个人信息修改界面
        .changeMyself{
            // 遮罩层
            position: fixed;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            z-index: 100;
            .change{
                // 个人修改页面容器
                width:84% ;
                // position: absolute;
                margin-left: 8%;
                margin-top:30%;
                background-color: @bgcolor-body;
                border-radius: 10px;
                padding-left: .36rem;
                padding-right: .2rem;
                .changeHeader{//头部
                    padding-top: .3rem;
                    padding-bottom: .3rem;
                    border-bottom: .02rem solid @border;
                    span{//标题
                        font-weight: bold;
                        font-size: .32rem;
                        color:@color-i;
                        }
                } 
                .changeMain{//主要修改内容
                    margin-top: .3rem;
                    .sex{//性别
                        font-size: .32rem;
                        padding: 0 10px;
                        span{
                             display: inline-block;
                            width: 30%;
                        }
                        div{
                            display: inline-block;
                            width: 70%;
                            input{
                                width: .2rem;
                                height: .2rem;
                            }
                            input:nth-child(2){
                                margin-left: .5rem;
                                
                            }
                        }
                    }
                }
            }
           .btns{//保存取消按钮
                // position: absolute;
                // bottom: 25%;
                margin-top: .5rem;
                text-align:center;
                width: 100%;
                button{//按钮样式
                    width: 1rem;
                    height: .5rem;
                    font-size: .28rem;
                    border-radius: 10px;
                    border:0;
                    color: @color-l;
                    background-color: @fs-i; 
                }
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
            p{//取消与完成按钮
                position: absolute;
                top:.2rem;
                z-index:10;
                color: @color-l;
                font-size: .3rem;
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
            p:nth-child(1){
                left: .3rem;
            }
            p:nth-child(2){
                right: .3rem;;
            }
        }
        //页面下部推荐
        // 同理，暂时保留
        // .support{
        //     height: 2.9rem;
        //     border-top: 0.02rem solid @border;   
        //     text-align: center; 
        //     .toptxt{//推荐部分文字
        //         margin-top: 0.7rem;
        //         font-size: 0.32rem;
        //         line-height: 0.32rem;
        //         i{  
        //             display: inline-block;
        //             width: 2.6rem;
        //             height: 0.15rem;
        //             border-top:0.02rem solid  @border;
        //         }
        //     }  
        //     .bticon{//推荐部分内容
        //          font-size: 0.26rem;
        //          margin-top: 0.3rem;
        //          img{
        //              width: 1.04rem;
        //              margin-bottom: 0.1rem;
        //          }
        //     }
        // } 
    }
      &.fade-enter-active, &.fade-leave-active{
        transition: all 0.5s ease
      }
      &.fade-enter, &.fade-leave-active{
        opacity: 0 
      }  
</style>

