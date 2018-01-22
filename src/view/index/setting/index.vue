<template>
  <div class="juris">
      <!-- 顶部返回，以及标题 -->
      <Row>
        <Col span="4" class="topReturn">
            <div  @click="back">
                <Icon type="chevron-left"></Icon>
                <span >返回</span> 
            </div>       
        </Col>
        <Col span="10" offset="3" class="topMid">
                <span>功能权限设置</span>   
        </Col>
      </Row>
        <!-- 中间设置部分 -->
      <div class="midSet">
          <Row>
              <Col span="6" v-for="(menu,ix) in list" :key="ix">
                    {{menu}}
              </Col>
         </Row>
         <Row v-for="(item,index) in listMenu" :key="index" class="menu">
             <Col  span="6">
                <img :src="item.img"> {{item.name}}
             </Col>
             <Col  span="6">
                <img src="./img/show.png">
                <img src="./img/hide.png">
                <span v-show="false" class="showSta">{{item.other}}</span>
             </Col>
             <Col  span="6">
                <!-- <mt-switch :v-model="item.my" class="switch"></mt-switch> -->
                 <div class="switch-container">
                    <input :id="'switch'+'-'+item.id" :value="item.my" type="checkbox" class="switch" />
                    <label :for="'switch'+'-'+item.id"></label>
                </div>
             </Col>
             <Col  span="6">
                    <div class="showIcon">
                        <input type="checkbox" :id="'radio'+'-'+item.id" name="choose" class="regular-radio" @click="showicon"/>  
                        <label :for="'radio'+'-'+item.id"></label>
                        <label class="inputlabel" :for="'radio'+'-'+item.id"></label> 
                    </div>
             </Col>
         </Row>
      </div>
  </div>
</template>
<script>
export default {
    data(){
        return{
            list:["功能","他开放","我开放","显示"],
             c:0,
            listMenu:[
                {"id":"1","name":"位置","img":require("./img/poi.png"),"other":"1","my":"1"},
                {"id":"2","name":"电话","img":require("./img/phone.png"),"other":"2","my":"2"},
                {"id":"3","name":"睡眠","img":require("./img/sleep.png"),"other":"1","my":"2"},
                {"id":"4","name":"步数","img":require("./img/walk.png"),"other":"2","my":"1"},
                {"id":"5","name":"心率","img":require("./img/heart.png"),"other":"1","my":"1"}               
            ]
        }
    },
  methods:{
      back(){//返回按钮事件
          this. $router.back()
      },
      showicon(e){
         
        //   console.log(e.target.checked)
          var radio=document.querySelectorAll(".juris .regular-radio");
           if(e.target.checked&&this.c<=3){
              this. c++
              e.target.checked=true
           }else if(!e.target.checked){
               this.c--;
               
           }
           console.log(this.c)
           if(this.c>3){
              e.target.checked=false
              this.c=3
           }
      }
  },
      mounted(){//判断对方显示功能
          var sta=document.querySelectorAll(".juris .midSet .showSta");
          for(var i=0;i<sta.length;i++){
              if(sta[i].innerHTML=="1"){
                  sta[i].previousElementSibling.style.display="none"
              }else{
                  sta[i].previousElementSibling.previousElementSibling.style.display="none"
              }
          }
      }
}
</script>
<style lang="less" scoped>
     @import '~less/variable';
     .juris{
         position: fixed;
         top:0;
         right: 0;
         left: 0;
         bottom: 0;
         overflow: scroll;
         /*开关的大小*/
.switch-container {
    height: .4rem;
    width: 1rem;
    margin-top: .25rem;
    margin-left: 20%;

/*设置checkbox不显示*/
.switch {
    display: none;
}

/*设置label标签为椭圆状*/
label {
    display: block;
    background-color: #EEEEEE;
    height: 100%;
    width: 100%;
    cursor: pointer;
    border-radius: 25px;
}

/*在label标签内容之前添加如下样式，形成一个未选中状态*/
label:before {
    content: '';
    display: block;
    border-radius: 50%;
    height: 100%;
    width: .4rem;
    background-color: white;
    opacity: 1;
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.08);
    -webkit-transition: all 0.2s ease;
}

/*在label标签内容之后添加如下样式，形成一个选中状态*/
label:after {
    position: relative;
    top:-.4rem;
    left:.6rem;
    content: '';
    display: block;
    border-radius: 50%;
    height: 100%;
    width: .4rem;
    background-color: white;
    opacity: 0;
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.08);
    -webkit-transition: all 0.5s linear;
}


/* ~ 兄弟选择符。
   p~ul ：位于 p 元素之后的所有 ul 元素
*/

/*选中后，选中样式显示*/
.switch:checked~label:after {
    opacity: 1;
}

/*选中后，未选中样式消失*/
.switch:checked~label:before {
    opacity: 0;
}

/*选中后label的背景色改变*/
.switch:checked~label {
    background-color: @color-adorm;
    }
}
         img{
             max-width: 100%;
             max-height: 100%;
         }
          .topReturn,.topMid{
                color: @color-i;
                height: .88rem;
                line-height: .88rem;
                font-size: .32rem;
                text-align: center;
            }
          .midSet{
                >:nth-child(1){//菜单标题
                    border-top: 1px solid @border;
                    border-bottom:1px solid @border;
                    font-size: .28rem;
                    text-align: center;
                    height: .6rem;
                    line-height: .6rem;
                }
               .menu{//下方选择菜单
                    text-align: center;
                    height: .9rem;
                    text-align: center;
                    line-height: .9rem;
                    font-size: .28rem;
                    .switch{
                        margin-top: .15rem;
                        margin-left: 20%;
                    }
                    .showIcon{
                        margin-top: .1rem;
                    }
                    .regular-radio {  
                        display: none;  
                    }  
                    .regular-radio + label {  
                        -webkit-appearance: none;  
                        // background-color: RGB(255,255,255);  
                        width: .53rem;
                        height: .53rem; 
                        background: url("./img/gry.png")no-repeat; 
                         background-size: 100%;
                        /*padding: .09rem;  
                        border-radius: .5rem;*/  
                        display: inline-block;  
                        position: relative;  
                    }  
                    .regular-radio:checked + label:after {  
                        content: ' ';  
                         width: .53rem;
                        height: .53rem;   
                        border-radius: 50px;  
                        position: absolute;  
                        background: url("./img/gre.png")no-repeat;  
                        background-size: 100%;
                        text-shadow: 0px;   
                        font-size: 32px;  
                        left: 0;
                    }  
                    
                    .regular-radio:checked + label {  
                        background-color:  @background;  
                    }
                }
          }
     }
    
</style>

