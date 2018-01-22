<template>
  <div class="msgpage">
      <!-- 最外层大列表控制所有消息 -->
      <ul class="out">
          <li v-for="(obj,index) in sysmsg"  :key="index" >
               <div class="toptime">{{obj.date}}</div>
              <!-- 控制消息具体详情 -->
              <ul class="inside">
                 <li v-for="(ms,ix) in obj.msgAll" :key="ix" >
                     <!-- 左侧时间 -->
                     <div class="lftime" @click="select">
                         <input type="checkbox"  class="check"  name="coll" :id="'radio'+'-'+ms.id"  ><label v-show="radShow" :for="'radio'+'-'+ms.id"></label>
                         <span>{{ms.time}}</span>
                     </div>
                     <!-- 中间圆圈 -->
                     <div>
                         <div class="circle"></div>
                     </div>
                     <!-- 右侧位置具体内容 -->
                     <div class="msgcontent" >
                        <!-- 消息类型标题 -->
                         <div class="msgtitle" ><img src=""> <span>{{ms.type}}</span></div>
                         <!-- 消息具体内容 -->
                         <div class="news txthide" @click="showMsg($event,index,ix)">
                             {{ms.msg}}
                         </div>
                         <p v-show="false" class="judge">{{ms.read}}</p>
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
            <div @click="selectAll">
                <input type="checkbox"  id="msgCheckAll"> <label for="msgCheckAll"></label><span>全选</span>
            </div>
            <p @click="dele()">删除</p>
        </div>
  </div>
</template>
<script>
export default {
	
  data(){
      return {
          that:'',
           editShow:false,
          radShow:false,
         sysIco:require("./img/sys.png"),
         moneyIco:require("./img/money.png"),
         addIco:require("./img/add.png"),
           sysmsg:[
          {"date":"2017-09-08","msgAll":[
            {"id":"1","read":"1","show":false,"time":"11:30","type":"系统通知","msg":"为给您提供更加优质的服务，我公司定于2017 年06月17日23:00至06月18日05:00对为给您提供更加优质的服务，我公司定于2017 年06月17日23:00至06月18日05:00对为给您提供更加优质的服务，我公司定于2017 年06月17日23:00至06月18日05:00对"},
            {"id":"2","read":"2","show":false,"time":"11:30","type":"消费通知","msg":"为给您提供更加优质的服务，我公司定于2017 年06月17日23:00至06月18日05:00对为给您提供更加优质的服务，我公司定于2017 年06月17日23:00至06月18日05:00对"},
            {"id":"3","read":"1","show":false,"time":"11:30","type":"好友通知","msg":"为给您提供更加优质的服务，我公司定于2017 年06月17日23:00至06月18日05:00对为给您提供更加优质的服务，我公司定于2017 年06月17日23:00至06月18日05:00对为给您提供更加优质的服务，我公司定于2017 年06月17日23:00至06月18日05:00对"},
              ]},
           {"date":"2017-09-07","msgAll":[
            {"id":"4","read":"2","show":false,"time":"11:30","type":"系统通知","msg":"为给您提供更加优质的服务，我公司定于2017 年06月17日23:00至06月18日05:00对为给您提供更加优质的服务，我公司定于2017 年06月17日23:00至06月18日05:00对为给您提供更加优质的服务，我公司定于2017 年06月17日23:00至06月18日05:00对"},
            {"id":"5","read":"1","show":false,"time":"11:30","type":"系统通知","msg":"为给您提供更加优质的服务，我公司定于2017 年06月17日23:00至06月18日05:00对为给您提供更加优质的服务，我公司定于2017 年06月17日23:00至06月18日05:00对为给您提供更加优质的服务，我公司定于2017 年06月17日23:00至06月18日05:00对"},
            {"id":"6","read":"1","show":false,"time":"11:30","type":"系统通知","msg":"为给您提供更加优质的服务，我公司定于2017 年06月17日23:00至06月18日05:00对为给您提供更加优质的服务，我公司定于2017 年06月17日23:00至06月18日05:00对为给您提供更加优质的服务，我公司定于2017 年06月17日23:00至06月18日05:00对"},
              ]},
           {"date":"2017-09-06","msgAll":[
            {"id":"7","read":"1","show":false,"time":"11:30","type":"系统通知","msg":"为给您提供更加优质的服务，我公司定于2017 年06月17日23:00至06月18日05:00对为给您提供更加优质的服务，我公司定于2017 年06月17日23:00至06月18日05:00对为给您提供更加优质的服务，我公司定于2017 年06月17日23:00至06月18日05:00对"},
            {"id":"8","read":"1","show":false,"time":"11:30","type":"系统通知","msg":"为给您提供更加优质的服务，我公司定于2017 年06月17日23:00至06月18日05:00对为给您提供更加优质的服务，我公司定于2017 年06月17日23:00至06月18日05:00对为给您提供更加优质的服务，我公司定于2017 年06月17日23:00至06月18日05:00对"},
            {"id":"9","read":"1","show":false,"time":"11:30","type":"系统通知","msg":"为给您提供更加优质的服务，我公司定于2017 年06月17日23:00至06月18日05:00对为给您提供更加优质的服务，我公司定于2017 年06月17日23:00至06月18日05:00对为给您提供更加优质的服务，我公司定于2017 年06月17日23:00至06月18日05:00对"},
              ]},
           {"date":"2017-09-05","msgAll":[
            {"id":"10","read":"1","show":false,"time":"11:30","type":"系统通知","msg":"为给您提供更加优质的服务，我公司定于2017 年06月17日23:00至06月18日05:00对为给您提供更加优质的服务，我公司定于2017 年06月17日23:00至06月18日05:00对为给您提供更加优质的服务，我公司定于2017 年06月17日23:00至06月18日05:00对"},
            {"id":"11","read":"2","show":false,"time":"11:30","type":"系统通知","msg":"为给您提供更加优质的服务，我公司定于2017 年06月17日23:00至06月18日05:00对为给您提供更加优质的服务，我公司定于2017 年06月17日23:00至06月18日05:00对为给您提供更加优质的服务，我公司定于2017 年06月17日23:00至06月18日05:00对"},
            {"id":"12","read":"1","show":false,"time":"11:30","type":"系统通知","msg":"为给您提供更加优质的服务，我公司定于2017 年06月17日23:00至06月18日05:00对为给您提供更加优质的服务，我公司定于2017 年06月17日23:00至06月18日05:00对为给您提供更加优质的服务，我公司定于2017 年06月17日23:00至06月18日05:00对"},
              ]},
           {"date":"2017-09-03","msgAll":[
            {"id":"13","read":"1","show":false,"time":"11:30","type":"系统通知","msg":"为给您提供更加优质的服务，我公司定于2017 年06月17日23:00至06月18日05:00对为给您提供更加优质的服务，我公司定于2017 年06月17日23:00至06月18日05:00对为给您提供更加优质的服务，我公司定于2017 年06月17日23:00至06月18日05:00对"},
            {"id":"14","read":"2","show":false,"time":"11:30","type":"系统通知","msg":"为给您提供更加优质的服务，我公司定于2017 年06月17日23:00至06月18日05:00对为给您提供更加优质的服务，我公司定于2017 年06月17日23:00至06月18日05:00对为给您提供更加优质的服务，我公司定于2017 年06月17日23:00至06月18日05:00对"},
            {"id":"15","read":"1","show":false,"time":"11:30","type":"系统通知","msg":"为给您提供更加优质的服务，我公司定于2017 年06月17日23:00至06月18日05:00对为给您提供更加优质的服务，我公司定于2017 年06月17日23:00至06月18日05:00对为给您提供更加优质的服务，我公司定于2017 年06月17日23:00至06月18日05:00对"},
              ]},
          ],
      } 
  },
  methods:{
     showMsg(e,index,ix){//显示消息详情
         this.sysmsg[index].msgAll[ix].show=!this.sysmsg[index].msgAll[ix].show;
         this.sysmsg[index].msgAll[ix].read=1;
           if(this.that!=''){
             this.that.className="news txthide"
             this.that.style.color="#B5B5B5"
         }
         if(this.sysmsg[index].msgAll[ix].show){
             e.target.className="news txtshow"
         }else{
              e.target.className="news txthide"
              e.target.style.color="#B5B5B5"
         }
         this.that=e.target;
     },
      edit(){//点击编辑
      var span=document.querySelectorAll(".msgpage .lftime span");
          this. editShow=true;
          this.radShow=true;
          for(var i=0;i<span.length;i++){
              span[i].style.left=".3rem"
          } 
      },
        cancle(){//取消编辑
         this. editShow=false;
          this.radShow=false;
          var radios=document.querySelectorAll(".msgpage .check");
            var span=document.querySelectorAll(".msgpage .lftime span");
            for(var i=0;i<span.length;i++){
              span[i].style.left="0"
          } 
           for(var i=0;i<radios.length;i++){
               radios[i].checked=false;
           }
           document.getElementById("msgCheckAll").checked=false
      },
        selectAll(event) {//全选与反选
           var radios=document.querySelectorAll(".msgpage .check");
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
            var radios=document.querySelectorAll(".msgpage .check");
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
            var radios=document.querySelectorAll(".msgpage .check");
            var li=document.querySelectorAll(".msgpage .inside li");
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
  upadted(){
   var judge=document.querySelectorAll(".msgpage .judeg");
   for(var i=0;i<judge.length;i++){
       if(judge[i].innerHTML="true"){
           judge[i].parentNode.parentNode.style.color="#B5B5B5"
          
       }
   }
  },
  mounted(){
  var judge=document.querySelectorAll(".msgpage .judge");
  var type=document.querySelectorAll(".msgpage .msgtitle span");
   for(var i=0;i<judge.length;i++){//控制消息状态
       if(judge[i].innerHTML=="1"){
           judge[i].parentNode.parentNode.style.color="#B5B5B5"
       }else{
           judge[i].parentNode.parentNode.style.color="#000000"
       }
   } 
//    控制消息类型图标
    for(var i=0;i<type.length;i++){
        if(type[i].innerHTML=="系统通知"){
            type[i].previousElementSibling.src=this.sysIco
        }else if(type[i].innerHTML=="消费通知"){
            type[i].previousElementSibling.src=this.moneyIco   
        }else{
            type[i].previousElementSibling.src=this.addIco
        }
    }
  }
}
</script>

<style lang="less" scoped>
      @import '~less/variable';
      .msgpage{
        //   position: fixed;
        //     top: 1.02rem;
        //     bottom: 0;
        //     left: 0;
        //     right: 0;
        //     background: @background;
        //     overflow: scroll;
        //     z-index: 100;    
          .out{
              margin-bottom: 0.5rem;   
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
              .inside{
                  padding-bottom: 0.55rem;
                   li{
                      position: relative;
                      min-height: 2rem;
                  }
                  li:last-child{
                      .msgcontent{
                          min-height: 3rem;
                          border-left: 0;
                          padding-left: 0; 
                          .msgtitle{
                              margin: 0;
                              padding-left: 0.59rem; 
                              border-left: 0.02rem solid @border;
                          }
                          .news{
                              margin: 0;
                            margin-left: 0.59rem;  
                          }
                      }
                  }
                  .lftime{//左侧时间
                       font-size: 0.3rem; 
                       color: @fs-i;
                       font-size: 0.3rem; 
                       position: absolute;
                       top:1.1rem;//第一个0.8rem，其他的1.8rem
                       left:0.2rem;
                       width: 1.5rem;
                       height: 1.5rem;
                       span{
                           position: absolute;
                           left: 0;
                       }
                        input[type='checkbox'] {
                                display: none;
                            }
                        label {  
                            position: absolute;  
                            width: .26rem;  
                            height: .26rem; 
                            margin-top: .1rem;
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
                   .timeRead{//已读消息时间颜色
                        color:@border;
                }
                  .circle{//小圆圈的样式
                       width:0.18rem;
                       height: 0.18rem;
                       border-radius: 50%;
                       background-color: @fs-i;
                       position: absolute;
                       left:1.28rem;
                       top:1.31rem;
                       z-index: 1;
                   }
                    .circleRead{//已读圆圈颜色
                            background-color: @border;
                        }
                  .msgcontent{//内容部分
                        margin-left:1.37rem; 
                        padding-left: 0.34rem; 
                        border-left: 0.02rem solid @border;
                        .msgtitle{
                            padding-top: 0.9rem;
                            font-size: 0.3rem;
                            margin-left:0.25rem; 
                            color: @fs-i;
                            margin-bottom: .1rem;
                            img{
                                width: .56rem;
                                height: .56rem;
                            }
                        }
                        .msgRead{//已读消息标题 状态
                            color:@border;
                        }   
                        .txthide{
                            width: 5.2rem;
                             margin-left:0.25rem; 
                            font-size: 0.25rem;
                            overflow:hidden;
                            letter-spacing:1px;//字间距
                            //只显示两行其余省略隐藏 
                            display: -webkit-box;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                            text-overflow: -o-ellipsis-lastline;
                        }
                        .txtshow{
                            width: 5.2rem;
                             margin-left:0.25rem; 
                            font-size: 0.25rem;
                            overflow: visible;
                            letter-spacing:1px;//字间距
                            
                            display: -webkit-box;
                            -webkit-line-clamp: 100;
                            -webkit-box-orient: vertical;
                            text-overflow: -o-ellipsis-lastline;
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
