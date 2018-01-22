<template>
  <div class="collectContainer">
      <div class="topBar">
           <Row>
                <Col span="3"><p @click="back"><Icon type="chevron-left"></Icon></p></Col>
                <Col span="17">我的收藏</Col>
                <Col span="4">
                    <p v-show="!editShow" @click="edit">编辑</p>
                    <p v-show="editShow" @click="cancle">取消</p>
                </Col>
            </Row>
      </div>
      <!-- 收藏内容 -->
       <div class="collectList">
           <!-- 搜索框 -->
           <div class="search">
               <input type="search">
           </div>
           <!-- 列表 -->
           <div class="list">
               <ul >
                   <li v-for="(item,index) in collect" :key="index">
                        <Row>
                            <Col span="4"> <img :src="item.upic"></Col>
                            <Col span="20">{{item.uname}}</Col>
                        </Row>
                        <Row>
                            <Col span="10">
                                <div v-show="radShow">
                                    <input type="checkbox" @click="select()" class="check"  name="coll" :id="'radio'+'-'+item.id"  v-show="radShow"><label :for="'radio'+'-'+item.id"></label>
                                </div><img :src="item.cpic" class="conpic">
                            </Col>
                            <Col span="14"><p class="cont">{{item.content}}</p></Col>
                        </Row>
                   </li>
               </ul>
           </div>
        </div> 
        <!-- 下面全选   -->
        <div class="btmCheck" v-show="radShow">
            <div>
                <input type="checkbox" @click="selectAll" id="checkAll"> <label for="checkAll"></label><span>全选</span>
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
         
          collect:[
              {"id":"1","uname":"古道西风","upic":require("./img/upic.png"),"cpic":require("./img/pic1.png"),"content":"龙泉驿洛带古镇，是客家人聚集地。客 家文化在这里表现充分，尤其是春节期 间"},
              {"id":"2","uname":"古道西风","upic":require("./img/upic.png"),"cpic":require("./img/pic1.png"),"content":"龙泉驿洛带古镇，是客家人聚集地。客 家文化在这里表现充分，尤其是春节期 间"},              
              {"id":"3","uname":"古道西风","upic":require("./img/upic.png"),"cpic":require("./img/pic1.png"),"content":"龙泉驿洛带古镇，是客家人聚集地。客 家文化在这里表现充分，尤其是春节期 间"},              
              {"id":"4","uname":"古道西风","upic":require("./img/upic.png"),"cpic":require("./img/pic1.png"),"content":"龙泉驿洛带古镇，是客家人聚集地。客 家文化在这里表现充分，尤其是春节期 间"},              
              {"id":"5","uname":"古道西风","upic":require("./img/upic.png"),"cpic":require("./img/pic1.png"),"content":"龙泉驿洛带古镇，是客家人聚集地。客 家文化在这里表现充分，尤其是春节期 间"},              
              {"id":"6","uname":"古道西风","upic":require("./img/upic.png"),"cpic":require("./img/pic1.png"),"content":"龙泉驿洛带古镇，是客家人聚集地。客 家文化在这里表现充分，尤其是春节期 间"},              
              {"id":"7","uname":"古道西风","upic":require("./img/upic.png"),"cpic":require("./img/pic1.png"),"content":"龙泉驿洛带古镇，是客家人聚集地。客 家文化在这里表现充分，尤其是春节期 间"},              
              {"id":"8","uname":"古道西风","upic":require("./img/upic.png"),"cpic":require("./img/pic1.png"),"content":"龙泉驿洛带古镇，是客家人聚集地。客 家文化在这里表现充分，尤其是春节期 间"}          
          ]
      }
  },
  methods:{
      back(){
           this. $router.back();
      },
      edit(){//点击编辑
          this. editShow=true;
          this.radShow=true;
          var img=document.querySelectorAll(".collectContainer .collectList .conpic")
          for(var i=0;i<img.length;i++){
              img[i].style.marginLeft=".6rem"
          }
      },
      cancle(){//取消编辑
          this. editShow=false;
          this.radShow=false;
          var img=document.querySelectorAll(".collectContainer .collectList .conpic");
           var radios=document.querySelectorAll(".collectContainer .collectList .check");
           for(var j=0;j<img.length;j++){
              img[j].style.marginLeft=".4rem"
          }
           for(var i=0;i<radios.length;i++){
               radios[i].checked=false;
           }
           document.getElementById("checkAll").checked=false
      },
    selectAll(event) {//全选与反选
           var radios=document.querySelectorAll(".collectContainer .collectList .check");
           if(!event.currentTarget.checked){
               for(var i=0;i<radios.length;i++){
                radios[i].checked=false;
               }
           }else{
                for(var i=0;i<radios.length;i++){
                radios[i].checked=true;
                }
           }
        },
        select(){//判断是否全选
            var radios=document.querySelectorAll(".collectContainer .collectList .check");
            for(var i=0;i<radios.length;i++){
                if(!radios[i].checked){
                    document.getElementById("checkAll").checked=false
                }else{
                    document.getElementById("checkAll").checked=true
                    }
               }
        },
        dele(){//删除
            var radios=document.querySelectorAll(".collectContainer .collectList .check");
            for(var i=0;i<radios.length;i++){
                if(radios[i].checked){
                    radios[i].parentNode.parentNode.parentNode.parentNode.style.display="none"
                }
            }
        },
           checkString(s,l,tag){//文字超出一定数量隐藏  
            if(s.length>l){  
              return s.substring(0,l)+tag;  
        }else{
          return s
        }  
      } 
  },
  mounted(){
      var actContent=document.querySelectorAll(".collectContainer .collectList .cont");
      console.log(actContent)
      for(var i=0;i<actContent.length;i++){
        var content=actContent[i].innerHTML;
        actContent[i].innerHTML= this.checkString(content,30,'...');
      }
  }
}
</script>

<style lang="less" scoped>
 @import '~less/variable';
    .collectContainer{//容器
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: @bgcolor-body ;
        z-index: 10;
        .topBar{//顶部
            height: .9rem;
            line-height: .9rem;
            font-size: .32rem;
            >:nth-child(1){
                >:nth-child(1){
                    padding-left: .2rem;
                }
                >:nth-child(2){
                    text-align: center;
                }
            }
        }
        .collectList{//收藏列表
            position: absolute;
            top: .9rem;
            bottom: 0;
            overflow: scroll;
            left: 0;
            right: 0;
            background: @background;
            .search{//搜索框
                width: 100%;
                font-size: .3rem;
                height: .6rem;
                margin-top: .3rem;
                padding: 0 .2rem;
                input{
                    width: 100%;
                    height: 100%;
                }
            }
            .list{//列表
                margin-top: .12rem;
                li{//每个收藏的样式
                    font-size: .3rem;
                    margin-bottom: .3rem; 
                    background: @bgcolor-body ;
                    >div:nth-child(1){//用户头像 以及名字
                        border-bottom: 1px solid @border;
                        height: .9rem;
                        line-height: .9rem;
                        padding-left: .2rem;
                    }
                    >div:nth-child(2){
                        height: 2.5rem;
                            img{
                                margin-top: .3rem;
                                margin-left: .4rem;
                                width: 1.84rem;
                            }
                            p{
                                margin-top: .3rem;
                            }
                            input[type='checkbox'] {
                                display: none;
                            }
                            label {  
                                    position: absolute;  
                                    width: .26rem;  
                                    height: .26rem;
                                    top:50%;  
                                    left: 2%;  
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
        }
        .btmCheck{//下方全选按钮
                position: fixed;
                bottom: 0;
                width: 100%;
                background:  @bgcolor-body;
                height: .9rem;
                line-height: .9rem;
                font-size: .36rem;
                :nth-child(1){
                    float: left;
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
                        left: 0;  
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
