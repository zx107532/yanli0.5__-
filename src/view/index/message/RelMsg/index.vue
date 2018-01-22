<template>
  <div class="relmsg">
     <ul class="relout">
       <li v-for="(item,index) in reldata" :key="index">
         <!-- 日期 -->
          <div class="toptime">{{item.date}}</div>
          <!-- 评论用户信息 -->
          <ul class="relinside">
              <li v-for="(ms,ix) in item.msgDetail" :key="ix">
                      <Row>
                          <Col span="6"><img :src="ms.upic" alt=""></Col>
                          <Col span="18"><span>{{ms.uname}}</span><p>{{ms.time}}</p></Col>
                      </Row>
                      <Row>
                          <Col span="19">{{ms.about}}</Col>
                          <Col span="5"> <div class="readAll"> 查看全文</div></Col>
                      </Row>
                      <div>
                        <img :src="ms.msgicon">
                        <div class="msgdetail">
                          <p>我：</p>
                          {{ms.msg}}
                        </div>
                      </div>
                      <div class="chose" @click="select">
                        <input type="checkbox"  class="check"  name="coll" :id="'radio'+'-'+ms.id"  ><label v-show="radShow" :for="'radio'+'-'+ms.id"></label>
                      </div>
              </li>
          </ul>
       </li>
     </ul>
      <!-- 编辑 -->
      <div class="edit">
        <p v-show="!editShow" @click="edit">编辑</p>
                    <p v-show="editShow" @click="cancle">取消</p>
      </div>
      <!-- 全选 -->
       <div class="btmCheck" v-show="radShow">
            <div  @click="selectAll">
                <input type="checkbox" id="msgCheckAll"> <label for="msgCheckAll"></label><span>全选</span>
            </div>
            <p @click="dele()">删除</p>
        </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      editShow:false,
          radShow:false,
      reldata:[
        {"date":"2017年06月17日","msgDetail":[ 
            {"id":"1","time":"2017年06月17日17:45","uname":"张大爷","upic":require("./img/upic.png"),"about":"这地方真不错","msg":"龙泉驿洛带古镇，是客家人聚集地。 客家文化在这里表现充分，尤其是春 节期间","msgicon":require("./img/msgico.png")},
           {"id":"2","time":"2017年06月17日17:45","uname":"张大爷","upic":require("./img/upic.png"),"about":"这地方真不错","msg":"龙泉驿洛带古镇，是客家人聚集地。 客家文化在这里表现充分，尤其是春 节期间","msgicon":require("./img/msgico.png")},
          ]},
          {"date":"2017年06月17日","msgDetail":[ 
          {"id":"3","time":"2017年06月17日17:45","uname":"张大爷","upic":require("./img/upic.png"),"about":"这地方真不错","msg":"龙泉驿洛带古镇，是客家人聚集地。 客家文化在这里表现充分，尤其是春 节期间","msgicon":require("./img/msgico.png")},
           {"id":"4","time":"2017年06月17日17:45","uname":"张大爷","upic":require("./img/upic.png"),"about":"这地方真不错","msg":"龙泉驿洛带古镇，是客家人聚集地。 客家文化在这里表现充分，尤其是春 节期间","msgicon":require("./img/msgico.png")},
           {"id":"4","time":"2017年06月17日17:45","uname":"张大爷","upic":require("./img/upic.png"),"about":"这地方真不错","msg":"龙泉驿洛带古镇，是客家人聚集地。 客家文化在这里表现充分，尤其是春 节期间","msgicon":require("./img/msgico.png")},
          ]},
      ]
    }
  },
  methods:{
     edit(){//点击编辑
      var li=document.querySelectorAll(".relmsg .relinside li");
          this. editShow=true;
          this.radShow=true;
          for(var i=0;i<li.length;i++){
              li[i].style.paddingLeft=".3rem"
          } 
      },
      cancle(){//取消编辑
         this. editShow=false;
          this.radShow=false;
          var radios=document.querySelectorAll(".relmsg .check");
            var li=document.querySelectorAll(".relmsg .relinside li");
            for(var i=0;i<li.length;i++){
              li[i].style.paddingLeft="0"
          } 
           for(var i=0;i<radios.length;i++){
               radios[i].checked=false;
           }
           document.getElementById("msgCheckAll").checked=false
      },
        selectAll(event) {//全选与反选
             var radios=document.querySelectorAll(".relmsg .check");
           if(!event.currentTarget.firstElementChild.checked){
               for(var i=0;i<radios.length;i++){
                   event.currentTarget.firstElementChild.checked=true
                radios[i].checked=true;
               }
           }else{
                for(var i=0;i<radios.length;i++){
                     event.currentTarget.firstElementChild.checked=false
                 radios[i].checked=false;
                }
           }
        },
       select(e){//判断是否全选
            var radios=document.querySelectorAll(".relmsg .check");
            if(e.currentTarget.firstElementChild.checked){
                e.currentTarget.firstElementChild.checked=false
            }else{
                e.currentTarget.firstElementChild.checked=true
            }
            for(var i=0;i<radios.length;i++){
                if(!radios[i].checked){
                    document.getElementById("msgCheckAll").checked=false
                }else{
                    document.getElementById("msgCheckAll").checked=true
                    }
               }
        },
           dele(){//删除
            var radios=document.querySelectorAll(".relmsg .check");
            var li=document.querySelectorAll(".relmsg .relinside li");
            for(var i=0;i<radios.length;i++){
                if(radios[i].checked){
                    radios[i].parentNode.parentNode.style.display="none"
                }
            }
            for(var i=0;i<li.length;i++){
                if(li[i].style.display=="none"){
                    li[i].parentNode.parentNode.style.display="none"
                }
            }
        },
  },
  mounted(){

  }
}
</script>

<style lang="less" scoped>
   @import '~less/variable';
   img{
     max-width: 100%;
     max-height: 100%;
   }
   .relmsg{
    //  position: fixed;
    //  top: 1.02rem;
    //  bottom: 0;
    //  left: 0;
    //  right: 0;
    //  background: @background;
    //  overflow: scroll;
    //  z-index: 100;
     .relout{
         >li{
              border-top: 0.04rem solid @border;
         }
         >li:nth-child(1){
             border: 0;
         }
       .toptime{//每次消息顶部时间样式
                    height: 0.88rem;
                    background: @background;
                    line-height: 0.88rem;
                    font-size: 0.3rem; 
                    padding-left: 0.2rem;
                    
                    color: @fs-i;
              }

     }
       .relinside{
         li{
           position: relative;
           background: @bgcolor-body;
           padding-bottom: .2rem;
           >div:nth-child(1){//用户信息及时间
             border-bottom: 1px solid @border;
             img{
              width: .86rem;
              height: .86rem;
              margin-left: .4rem;
             }
             span{
               font-size: .32rem;
             }
             p{
               font-size: .28rem;
               color: @fs-l;
             }
           }
           >div:nth-child(2){//评论详情，以及阅读全文
               font-size: .28rem;
                padding-left: .4rem; 
                padding-right: .4rem;
                line-height: .6rem;
                .readAll{
                  color: @fs-i;
                }  
           }
           >div:nth-child(3){//消息详情
              margin: 0 .4rem;
              background: @background ;
              img{
                max-width: 2.7rem;
                height: 1.84rem;
              }
              .msgdetail{
                float: right; 
                font-size: .26rem;
                width: 70%;
                p{
                  color: @fs-i;
                  font-size: .28rem;
                }
              }
           }
           .chose{
             position: absolute;
             left: .1rem;top: .2rem;
             width: 1rem;
             height: 1rem;
             input[type='checkbox'] {
                                display: none;
                            }
                        label {  
                            position: absolute;  
                            width: .26rem;  
                            height: .26rem; 
                            margin-top: .1rem;
                            left: .2rem;
                            border-radius: 50%;
                            background: #fff;  
                            border:2px solid @fs-i;   
                        }        
                        label:after {  
                            opacity: 0;  
                            content: '';  
                            position: absolute;  
                            width: .12rem;  
                            height:.12rem;  
                            background: transparent;  
                            top: 50%;  
                            left: 50%;
                            margin-top: -.06rem;
                            margin-left: -.06rem;
                            border-radius: 50%;  
                            border: .06rem solid @fs-i;   
                            } 
                        input[type=checkbox]:checked + label:after {  
                            opacity: 1;  
                            }   
           }
         }
       }
               //   编辑与取消
        .edit{
            font-size: .3rem;
            position: fixed;
            top: .3rem;
            right: .2rem;
            z-index: 1000;
        }
        .btmCheck{//下方全选按钮
                position: fixed;
                bottom: 0;
                width: 100%;
                background:  @bgcolor-body;
                height: .9rem;
                line-height: .9rem;
                font-size: .36rem;
                z-index: 1000;
                :nth-child(1){
                    float: left;
                    margin-left: .25rem;
                }
                p{
                    float:right;
                    margin-right:.2rem;
                    color:@fs-i;
                }
                span{
                    margin-left: .5rem;
                }
                    input[type='checkbox'] {
                        display: none;
                        }
                    label {  
                        position: absolute;  
                        width: .26rem;  
                        height: .26rem;
                        top:50%;  
                        left: .2rem;  
                        margin-top: -.13rem;
                        border-radius: 50%;
                        background: #fff;  
                        border:2px solid @fs-i;   
                    }        
                    label:after {  
                        opacity: 0;  
                        content: '';  
                        position: absolute;  
                        width: .12rem;  
                        height:.12rem;  
                        background: transparent;  
                        top: 50%;  
                        left: 50%;
                        margin-top: -.06rem;
                        margin-left: -.06rem;
                        border-radius: 50%;  
                        border: .06rem solid @fs-i;   
                        } 
                    input[type=checkbox]:checked + label:after {  
                        opacity: 1;  
                        }  
        }
   }
</style>
