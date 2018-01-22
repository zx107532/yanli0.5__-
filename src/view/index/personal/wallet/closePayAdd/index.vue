<template>
  <div class="addContainer">
      <div class="topiic">
          <Row>
                <Col span="8"><div @click="back"><Icon type="chevron-left"></Icon></div></Col>
                <Col span="10">亲密付人员管理</Col>
            </Row>
      </div>
      <div class="midContent">
          <div class="search">
              <input type="search" placeholder="请选择要添加的亲密付人员">
          </div>
          <div class="list">
              <ul>
                  <li v-for="(item,index) in listData" :key="index">
                        <Row>
                            <Col span="4" class="uPhoto"><img :src="item.userP"></Col>
                            <Col span="18" class="uMsg">
                                <p>{{item.uname}}</p>
                                <p>{{item.phone}}</p>
                            </Col>
                            <Col span="2" class="uChoose">
                                    <input @click="changeBtn($event)" type="radio" :id="'radio'+'-'+item.id" name="choose" class="regular-radio"/>  
                                    <label :for="'radio'+'-'+item.id"></label> 
                            </Col>
                        </Row>
                  </li>
              </ul> 
          </div>
      </div>
      <!-- 发送按钮 -->
      <div class="btmSend"><button @click="send">发送</button></div>
      <!-- 模态框 -->
      <div class="model">
          <div class="sendMsg">
              <img src="./img/yx.png">
              <p>已将亲密付信息提交，待亲密付联系人完成确认即可关联联系人</p>
          </div>
      </div>
  </div>
</template>
<script>
export default {
    data(){
        return{
            listData:[
                {"id":"1","userP":require("./img/p1.png"),"phone":"13725846378","uname":"用户一"},
                {"id":"2","userP":require("./img/p2.png"),"phone":"13725846378","uname":"用户二"},
                {"id":"3","userP":require("./img/p3.png"),"phone":"13725846378","uname":"用户三"},
                {"id":"4","userP":require("./img/p4.png"),"phone":"13725846378","uname":"用户四"},
                {"id":"5","userP":require("./img/p5.png"),"phone":"13725846378","uname":"用户五"},
             ]
        }
    }, 
  methods:{
      back(){
             this. $router.back();
       },
       send(){//添加好友请求发送
            var ipt=document.querySelectorAll(".addContainer .uChoose input");
                for(var i=0;i<ipt.length;i++){
                    if(ipt[i].checked){
                            document.querySelector(".addContainer .model").style.display="block";
                            setTimeout(function(){
                            document.querySelector(".addContainer .model").style.display="none";  
                            },1000)
                            }
                    }
       },
       changeBtn(e){
           console.log(e.target)
            if(e.target.checked){
                console.log(1)
                document.querySelector(".addContainer .btmSend button").style.backgroundColor="#ed5042"
            }
       }
  },
  mounted(){
      var ipt=document.querySelectorAll(".addContainer .uChoose input");
      console.log(ipt)
      for(var i=0;i<ipt.length;i++){
          if(ipt[i].checked){
              document.querySelector(".addContainer .btmSend button").style.backgroundColor="#ed5042"
          }else{
              document.querySelector(".addContainer .btmSend button").style.backgroundColor="#B5B5B5"
          }
      }
  }
}
</script>

<style lang="less" scoped>
    @import '~less/variable';
    .addContainer{
        background-color:@background ;
        position: absolute;
        width: 100%; 
        top: 0;
         img{//图片自适应
             max-width: 100%;
             max-height: 100%;
         }
         .model{//模态框
             position: fixed;
             top: 0;
             right: 0;
             bottom: 0;
             left: 0;
             background-color:@bgrgba; 
             display: none;
             .sendMsg{//提示消息
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
         .topiic{//顶部标题栏
            height: .9rem;
            position: fixed;
            line-height: .9rem;
            background-color: @bgcolor-body;
            top: 0;
            width: 100%;
            font-size: .34rem;
            >:nth-child(1){
                margin-left: .2rem;
            }
        }
        .midContent{//中间部分
            margin-top: 1.2rem;
            padding-top: .2rem;
            padding-left: .4rem;
            padding-right: .4rem;
            background-color: @bgcolor-body ;
            .search{
                    input{//上方搜索框
                            width: 100%;
                            height: .6rem;
                            border:1px solid @border;
                            color: @color-i;
                            font-size: .28rem;
                            background:@background url('../img/searchmodel.png')  no-repeat 0 50%;
                            padding-left: .3rem;
                            
                        }
                            input::-ms-input-placeholder{color:@fs-l};
                            input::-webkit-input-placeholder{color:@fs-l};
            }
            .list{//下侧列表
                margin-top: .1rem;
                ul{
                    li{
                        border-bottom: 1px solid @border;
                        padding: .26rem 0;
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
        }
        .btmSend{//下部发送按钮
            button{
                width: 100%;
                text-align: center;
                font-size: .36rem;
                // background-color:@fs-i; 
                color:@color-l;
                border: 0;
                position: fixed;
                bottom: 0;
                height: .9rem;
            }
        }
    }
</style>
