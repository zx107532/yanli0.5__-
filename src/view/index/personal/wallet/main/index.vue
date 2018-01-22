<template>
  <div class="container">
      <!-- 上方返回与标题部分 -->
      <div class="topBack">
          <div @click="back"><Icon type="chevron-left"></Icon></div>
          <div>我的钱包</div>
      </div>
      <!-- 中间钱包状态部分 -->
      <div class="midStatus">
          <div>
            <span>钱包余额</span>
          </div>
          <div>
              <img src="./img/glod.png" alt="">
                <div>¥</div><div>168.42</div><div>元</div>
          </div>
          <div>
              <div>本月消费<span>112.12</span>元</div> <br>
              <div>限定消费额度：<span>2000</span>元</div>
          </div>
      </div>
      <!-- 下方菜单功能模块 -->
      <div class="btoomMenu">
          <div class="menu">
              <div>
                  <Row>
                    <Col span="8">
                            <router-link to="/index/personal/wallet/details" tag="div" @click.native="reset">
                                <img src="./img/moneyList.png">
                                <div>消费明细</div>
                            </router-link>                           
                    </Col>
                    <Col span="8">
                            <router-link class="mid" to="/index/personal/wallet/closepay" tag="div" @click.native="reset">
                                <img src="./img/selfMsg.png">
                                <div>亲密付管理</div>
                            </router-link>
                    </Col>
                    <Col span="8">
                        <div @click="pwdJump">
                                <img src="./img/Pwd.png">
                                <div>密码管理</div>
                        </div>                           
                    </Col>
                 </Row>
              </div>
              <div>
                  <Row>
                    <Col span="8">
                        <div @click="charJump">
                            <img src="./img/addMoney.png">
                            <div>充值</div>
                        </div>
                    </Col>
                    <Col span="8">
                        <router-link tag="div" class="mid" to="/index/qr"> 
                            <img src="./img/addMore.png">
                            <div>扫一扫付款</div>
                        </router-link>
                    </Col>
                    <Col span="8">
                        <router-link class="mid" to="/index/personal/wallet/qrcode" tag="div" @click.native="reset">
                            <img src="./img/ewm.png">
                            <div>付款码</div>
                        </router-link>
                    </Col>
                 </Row>
              </div>
              
          </div>
      </div>
      <!-- 充值模块 -->
      <div class="recharge" v-show="cShow">
          <div class="chargeContainer" v-show="chargeShow">
               <div class="chargeHeader"><p style="display:inline-block" @click="cShow=false"><Icon type="chevron-left"></Icon></p>充值 <span>客服热线</span></div>
                <!-- 充值对象方式选取 -->
                <div>
                    <ul>
                        <li @click="chooseMan"><p style="display:inline-block">选取充值对象</p><span><Icon type="chevron-down"></Icon></span><span class="chose">{{chose}}</span></li>  
                        <li @click="chooseWay"><p style="display:inline-block">充值方式</p><span><Icon type="chevron-down"></Icon></span><span class="charWay">{{way}}</span></li>                          
                    </ul>
                </div>
                <!-- 充值金额 -->
                <div>
                    充值金额<input v-model="payMount" type="text" placeholder="请输入要充值的金额">
                </div>
                <!-- 提醒内容 -->
                <div>
                    充值金额预计2小时到账，请耐心等待
                </div>
                <!-- 充值确认按钮 -->
                <div>
                    <button @click="paySure">确认充值</button>
                </div>
          </div>
          <!-- 充值对象选取列表 -->
          <div class="chargeList" v-show="listShow">
              <div class="chargeHeader"><p style="display:inline-block" @click="chooseOver"><Icon type="chevron-left"></Icon></p>选择充值对象 <span>客服热线</span></div>
              <ul>
                  <li v-for="(item,index) in listData" :key="index">
                        <Row>
                            <Col span="4" class="uPhoto"><img :src="item.userP"></Col>
                            <Col span="18" class="uMsg">
                                <p>{{item.uname}}</p>
                                <p>{{item.phone}}</p>
                            </Col>
                            <Col span="2" class="uChoose">
                                    <input @click="saveId(item.uname)" type="radio" :id="'radio'+'-'+item.id" name="choose" class="regular-radio"/>  
                                    <label :for="'radio'+'-'+item.id"></label> 
                            </Col>
                        </Row>
                  </li>
              </ul> 
          </div>
          <!-- 充值方式选取列表 -->
          <div class="chargeWay" v-show="wayShow">
              <div class="chargeHeader"><p style="display:inline-block" @click="wayBack"><Icon type="chevron-left"></Icon></p>充值方式 <span>客服热线</span></div>
               <ul>
                  <li v-for="(way,inx) in payWay" :key="inx">
                        <Row>
                            <Col span="8" class="uPhoto"><span>{{way.name}}</span></Col>
                            <Col span="2" offset="14" class="uChoose">
                                    <input  type="radio" @click="saveWay(way.name)" :id="'radio'+way.id" name="choosed" class="regular-radio"/>  
                                    <label :for="'radio'+way.id"></label> 
                            </Col>
                        </Row>
                  </li>
              </ul> 
          </div>
          <!-- 密码界面 -->
          <div class="pwdContainer" v-show="pwdShow">
              <div class="pwdHeader"><p style="display:inline-block" @click=" pwdBack"><Icon type="chevron-left"></Icon></p>请输入支付密码 <span>客服热线</span></div>
              <div>
                  <p>请输入您的付款密码，完成付款，如需帮助请点击客服热线</p>
                  <input type="password" maxlength="6"  v-model="pwd">
                  <div>小额支付每次限定为500 <router-link to="/index/personal/wallet/pwd/pwdChange"><span>忘记密码</span></router-link> </div>
              </div>
              <div>
                  <button @click="pwdSure">确认</button>    
              </div>
          </div>
         
      </div>
       <!-- 各种弹出提示 -->
          <div class="msgModel" v-show="modelShow">
              <div v-show="lowShow" @click="ohterWay">
                  <img src="./img/alert.png">
                  <p>非常抱歉，您的小额支付余额不足。请选择下列方式进行付款 </p>
                  <ul>
                      <li>亲密付</li>
                      <li>第三方付款</li>
                  </ul>
                  <button>确认</button>
              </div>
              <div v-show="perroShow">
                  <img src="./img/alert.png">
                  <p>非常抱歉，您的密码输入错误，请注意 字母大小写。如需帮助请点击 客服热线。 </p>
                  <router-link to="/index/personal/wallet/pwd/pwdChange"><span>忘记密码</span></router-link> 
                  <button @click=" modelBack()">返回</button>
              </div>
              <div v-show="allSus">
                  <img src="./img/yx.png" >
                  <p>付款成功</p>
                  <button @click="modelSure">确认</button>
              </div>
          </div>
  </div>
</template>
<script>

export default {
    data(){
        return{
            uPwd:'123456',//假密码
            money:100,//加余额
            cShow:false,//充值容器
            chargeShow:true,//充值主要界面
            listShow:false,//充值对象选择
            wayShow:false,//充值方式选择
            pwdShow:false,//密码输入框
            modelShow:false,//模态框
            lowShow:false,//余额不足提示
            perroShow:false,//密码错误提示
            allSus:false,//所有通过成功提示
            chose:'',
            way:'',
            pwd:'',
            payMount:'',
            payWay:[
                {"id":"1","name":"小额钱包"},
                {"id":"2","name":"第三方付款"},
                {"id":"3","name":"亲密付"},                
            ],
          listData:[
                {"id":"1","userP":require("./img/p1.png"),"phone":"13725846378","uname":"用户一"},
                {"id":"2","userP":require("./img/p2.png"),"phone":"13725846378","uname":"用户二"},
                {"id":"3","userP":require("./img/p3.png"),"phone":"13725846378","uname":"用户三"},
                {"id":"4","userP":require("./img/p4.png"),"phone":"13725846378","uname":"用户四"},
                {"id":"5","userP":require("./img/p5.png"),"phone":"13725846378","uname":"用户五"},
             ], 
        }
    },
    methods:{
        back(){//返回上级菜单
            this. $router.back();
            // document.getElementsByClassName("i-box")[0].style.top=".96rem";
            // document.getElementsByClassName("i-box")[0].style.bottom="1.2rem"
        },
        reset(){
            // document.getElementsByClassName("i-box")[0].style.top=0;
            // document.getElementsByClassName("i-box")[0].style.bottom=0
        },
        pwdJump(){
            this.reset();
            this.$router.push({path:'/index/personal/wallet/pwd/pwdChange'})
        },
        charJump(){
            this.cShow=true;
            this.payMount=''//充值充值金额为空
            this.pwd=''//重置密码位空
        },
        chooseMan(){//选择充值对象
            this.chargeShow=false;
            this.listShow=true;
        },
        chooseOver(){//选择完成
            this.chargeShow=true;
            this.listShow=false;
        },
        saveId(uname){//保存当前付款对象
            this.chose=uname;
        },
        saveWay(way){//报存当前选择付款方式
            this.way=way;
        },
        chooseWay(){//充值方式选择
            this.chargeShow=false;
            this.wayShow=true;
        },
        wayBack(){//充值方式返回
             this.chargeShow=true;
            this.wayShow=false
        },
        paySure(){//确定充值
            // console.log(this.payMount)
                if(document.querySelector('.container .chargeContainer button').style.backgroundColor!==''){
                    if(this.money<this.payMount){
                        this.modelShow=true;
                        this.lowShow=true;
                        this.cShow=false;
                    }else{
                         this.pwdShow=true;
                         this.chargeShow=false;
                    }  
                }
        },
        pwdSure(){//密码确认按钮
             if(this.pwd==this.uPwd){
                 this.pwdShow=false;
                 this.chargeShow=true;
                 this.cShow=false;
                 this.modelShow=true;
                 this.allSus=true;
             }else{
                 this.cShow=false;
                 this.modelShow=true;
                 this.perroShow=true;
             }
        },
        pwdBack(){//密码界面返回按钮
                         this.pwdShow=false;
                         this.chargeShow=true;
        },
        modelBack(){//密码错误返回
            this.cShow=true;
            this.modelShow=false;
            this.perroShow=false;
            this.pwd=''
        },
        modelSure(){//成功确认按钮
            this.modelShow=false;
             this.allSus=false;
        },
        ohterWay(){//选择其他充值方式
            this.cShow=true;
            this.chargeShow=true;
            this.modelShow=false;
            // document.querySelector(".container .chargeContainer .charWay").innerHTML='';
            // document.querySelector('.container .chargeContainer button').style.backgroundColor=""
        },
         scanImg(){//扫描二维码
	        plus.barcode.scan( '_www/barcode.png', function (type,result) {
			alert( "Scan success:("+type+")"+result );
		}, function (error) {
			alert( error.message );
		} );
}
    },
    mounted(){
         document.querySelector(".container .pwdContainer input").style. letterSpacing=window.screen.width*2*.9*.13/100+"rem"
         document.querySelector(".container .pwdContainer input").style. paddingLeft=window.screen.width*2*.9*.10/100+"rem"
    },
    updated(){ 
        if(document.querySelector(".container .chargeContainer .chose").innerHTML!==''&&document.querySelector(".container .chargeContainer .charWay").innerHTML!=''&&this.payMount!==''){
            document.querySelector('.container .chargeContainer button').style.backgroundColor="#ed5042"
        }
        if(this.pwd.length==6){
            document.querySelector('.container .pwdContainer button').style.backgroundColor="#ed5042"
        }
    }
}
</script>
<style lang="less" scoped>
 @import '~less/variable';
    img{//图片等比例缩放
        max-width: 100%;
        max-height: 100%;
    }
    .container{
        position: fixed;
        top: 0;
        bottom: 0;
        width: 100%;
        background-color: @background;
        .topBack{//顶部导航
            height: .9rem;
            background-color: @bgcolor-body;
            div{
                display: inline-block;
                font-size: .34rem;
                color: @color-n;
                line-height: .9rem;
            }
            div:nth-child(1){//返回按钮
                padding-left:.2rem;
                padding-right: .5rem;
            }
        }
        .midStatus{//钱包状态部分
            height: 2.98rem;
            background-color: #666666;
            color: @color-l ;
            >div:nth-child(1){//钱包余额部分
                font-size: .32rem;
                height: .98rem;
                line-height: .98rem;
                padding-left: .22rem;
            }
            >div:nth-child(2){//图片文字部分
                font-size: .56rem;
                padding-left: .38rem; 
                img{//图片大小设置
                    width: 1.03rem;
                    height: 1.1rem;
                    margin-right: .5rem;
                }  
                div{
                   display: inline-block;
                   vertical-align:bottom ;
                }
            }
            >div:nth-child(3){//下方金额设置
                font-size: .24rem;
                height: .98rem;
                padding-right: .2rem;
                div{
                    float: right;
                }
            }
        }
        .btoomMenu{//下侧功能菜单模块  
            .menu{//菜单模块
                margin-top: .3rem;
                height: 3.92rem;
                background-color: @bgcolor-body;
                padding: .48rem .32rem;
                text-align: center;
                font-size: .34rem;
                img{//
                    width: .74rem;
                    height: .74rem;
                    margin-bottom: .3rem;
                }
                .mid{
                    border-left: 1px solid @border;
                    border-right: 1px solid @border;
                }
                >div:nth-child(1){//第一行菜单
                    height: 1.4rem;
                    margin-bottom: .42rem;
                }
                >div:nth-child(2){//第二行菜单
                    height: 1.4rem;
                }
            }
        }
        .recharge{
            position: fixed;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            background-color: @bgrgba; 
            .chargeContainer{//充值列表框
                position: fixed;
                bottom: 0;
                height: 8.8rem;
                width: 100%;
                background-color: @background-i;
                font-size: .36rem;
                span{
                    float: right;
                }
                 .chose,.charWay{
                      margin-right: .2rem;
                      color: @fs-i;
                  };
                   
                .chargeHeader{
                //   顶部导航
                  padding-right: .22rem;
                  height: .7rem;
                  line-height: .7rem;
                  background-color: @bgcolor-body;
                    i{
                      padding-left: .22rem;
                      padding-right: .3rem;
                  }     
                }
                >div:nth-child(2){//选取充值方式和充值人员
                     padding: 0 .22rem;
                     background-color: @bgcolor-body; 
                     margin-top: .2rem;
                    li{
                         height: .7rem;
                         line-height: .7rem;
                    }
                }
                >div:nth-child(3){//充值金额
                    padding: 0 .22rem;
                    background-color: @bgcolor-body; 
                    height: .7rem;
                    line-height: .7rem;
                    margin-top: .2rem;
                     input{
                         float: right;
                     }
                }
                >div:nth-child(4){//提示消息
                    padding: 0 .22rem;
                    font-size: .24rem;
                    margin-top: .2rem;
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
            .chargeList{
                 position: fixed;
                bottom: 0;
                height: 8.8rem;
                width: 100%;
                background-color: @background-i;
                font-size: .36rem;
                .chargeHeader{
                    //   顶部导航
                    padding-right: .22rem;
                    height: .7rem;
                    line-height: .7rem;
                    background-color: @bgcolor-body;
                    border-bottom: 1px solid @border;
                    span{
                        float: right;
                        }
                    i{
                        padding-left: .22rem;
                        padding-right: .3rem;
                     }     
                        }
                   ul{
                    li{
                        border-bottom: 1px solid @border;
                        padding: .26rem 0;
                         background-color: @bgcolor-body ; 
                        .uPhoto{//左侧头像
                            img{
                                width: .7rem;
                                height: .7rem;
                            }
                        }
                        .uMsg{//用户名 以及电话号码
                            font-size: .24rem;
                            color: @color-i;
                        }
                            .uChoose{//右侧单选按钮修改
                            .regular-radio {  
                                            display: none;  
                                        }  
                                        .regular-radio + label {  
                                            -webkit-appearance: none;  
                                            // background-color: RGB(255,255,255);  
                                            width: .32rem;
                                            height: .32rem; 
                                            background: url("./img/wx.png")no-repeat; 
                                            background-size: 100%;
                                            /*padding: .09rem;  
                                            border-radius: .5rem;*/  
                                            display: inline-block;  
                                            position: relative;  
                                        }  
                                        
                                        .regular-radio:checked + label:after {  
                                            content: ' ';  
                                            width: .32rem;
                                            height: .32rem;   
                                            border-radius: 50px;  
                                            position: absolute;  
                                            background: url("./img/yx.png")no-repeat;  
                                            background-size: 100%;
                                            text-shadow: 0px;   
                                            font-size: 32px;  
                                            top:.03rem;
                                        }  
                                        .regular-radio:checked + label {  
                                            background-color:  @background;  
                                        }  
                        }
                       
                    }
                }
            }
            .chargeWay{//充值方式
                position: fixed;
                bottom: 0;
                height: 8.8rem;
                width: 100%;
                background-color: @background-i;
                font-size: .36rem;
                 .chargeHeader{
                            //   顶部导航
                            padding-right: .22rem;
                            height: .7rem;
                            line-height: .7rem;
                            background-color: @bgcolor-body;
                            border-bottom: 1px solid @border;
                            span{
                                float: right;
                            }
                            i{
                                padding-left: .22rem;
                                padding-right: .3rem;
                                }     
                        }
                li{
                    border-bottom: 1px solid @border;
                         padding: .26rem .22rem;
                         background-color: @bgcolor-body ;
                            .uChoose{//右侧单选按钮修改
                            .regular-radio {  
                                            display: none;  
                                        }  
                                        .regular-radio + label {  
                                            -webkit-appearance: none;  
                                            // background-color: RGB(255,255,255);  
                                            width: .32rem;
                                            height: .32rem; 
                                            background: url("./img/wx.png")no-repeat; 
                                            background-size: 100%;
                                            /*padding: .09rem;  
                                            border-radius: .5rem;*/  
                                            display: inline-block;  
                                            position: relative;  
                                        }  
                                        
                                        .regular-radio:checked + label:after {  
                                            content: ' ';  
                                            width: .32rem;
                                            height: .32rem;   
                                            border-radius: 50px;  
                                            position: absolute;  
                                            background: url("./img/yx.png")no-repeat;  
                                            background-size: 100%;
                                            text-shadow: 0px;   
                                            font-size: 32px;  
                                            top:.03rem;
                                        }  
                                        .regular-radio:checked + label {  
                                            background-color:  @background;  
                                        }  
                        } 
                }
            }
            .pwdContainer{//密码输入界面
                 position: fixed;
                bottom: 0;
                height: 8.8rem;
                width: 100%;
                background-color: @background-i;
                font-size: .36rem;
                >div:nth-child(1){
                        //   顶部导航
                    padding-right: .22rem;
                    height: .7rem;
                    line-height: .7rem;
                    border-bottom: 1px solid @border;
                    span{
                        float: right;
                        }
                    i{
                        padding-left: .22rem;
                        padding-right: .3rem;
                        }  
                }
                >div:nth-child(2){
                    padding: 0 .22rem;
                    p{  
                        height: .6rem;
                        line-height: .6rem;
                        font-size: .24rem;
                    }
                    input{//密码输入框
                        width: 100%;
                        height: .9rem;
                        background-color: @background-i;
                        border: 1px solid @border;
                        border-radius: 15px;
                    }
                    div{//下侧提示文字
                        font-size: .24rem;
                        color: @fs-l;
                        span{
                            float: right;
                            color: @fs-i;
                        }
                    }
                }
                >div:nth-child(3){
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
        }
        .msgModel{
            position: fixed;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            background-color: @bgrgba; 
            div{//提示内容 容器
                position: absolute;
                width: 78%;
                height: 4.6rem;
                margin-top: -2.3rem;
                margin-left: -39%;
                padding: 0 .4rem;
                top: 50%;
                left: 50%;
                background-color: @bgcolor-body;
                text-align: center;
                border-radius: 15px;
                img{
                    margin-top: .4rem;
                    margin-bottom: .4rem;
                    width: 1.34rem;
                }
                button{
                    width: 100%;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    height: .88rem;
                    font-size: .28rem;
                    color: @color-l;
                    border: 0;
                }
            }
            >div:nth-child(1){//余额不足提醒
                p{
                    font-size: .24rem;
                }
                ul{//其他付款方式选择
                    float: right;
                    font-size: .24rem;
                    color: @fs-i;
                    text-align: right;
                }
                button{
                    background-color: @fs-i;
                }
            }
            >div:nth-child(2){//密码错误提醒
             font-size: .24rem;
                span{
                    float: right;
                    color: @fs-i;
                }
                  button{
                    background-color: @fs-i;
                }
            }
            >div:nth-child(3){//成功充值提示
                    font-size: .24rem;
                    button{
                        background-color: @color-adorm;
                    }
            }
        }
    }
</style>


