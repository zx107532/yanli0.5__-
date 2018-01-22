<template>
  <div class="suggest">
      <div class="top">
           <Row>
                <Col span="8"><div @click="back()"><Icon type="chevron-left"></Icon></div></Col>
                <Col span="8"><span>意见反馈</span></Col>
            </Row>
      </div>
      <div class="main">
          <div>
              <textarea placeholder="请输入你需要反馈的内容" ></textarea>
                <div class="loadPic">
                    <div class="left"><img :src="img"></div><div class="right"><span>上传问题截图</span><p>方便我们处理反馈</p></div>
                </div>
          </div>
          <div>
              <label for="sPhone">联系电话</label><input id="sPhone" type="text" placeholder="请输入电话号码便于我们联系到你">
          </div>   
      </div>
      <button @click="sub">提交</button>
      <transition name="fade">
        <div class="model" v-show="modelshow">
            <div>
                <img src="./img/face.png">
                <p>您的反馈我们会认真查看，并尽快处理及完善，感谢您对炎立的支持</p>
            </div>
        </div>
      </transition>
  </div>
</template>
<script>
export default {
  data(){
      return{
          img:require("./img/pic.png"),
          modelshow:false
      }
  },
  methods:{
      back(){
        this. $router.back()   
      },
      sub(){
          var self=this;
          self.modelshow=!self.modelshow
          setTimeout(function() {
              self.modelshow=!self.modelshow
          }, 1000);
      }
  }
}
</script>

<style lang="less">
@import '~less/variable';
.suggest{
    img{
        max-width: 100%;
        max-height: 100%;
    }
    .top{//顶部导航栏
        height: .9rem;
        line-height: .9rem;
        font-size: .32rem;
        background-color: @fs-i;
        color: @color-l ;
      
        >:nth-child(1){
            >:nth-child(1){
                margin-left: .2rem;
                display: inline-block;
            }
            >:nth-child(2){
                text-align: center;
            } 
        }
    }
    .main{//意见反馈输入框
        margin-top: .2rem;
        font-size: .28rem;
        >:nth-child(1){
            background: @bgcolor-body;
             textarea{//文本框
                    padding: .3rem;
                    width: 100%;
                    height: 4rem;
                    border:0;
                    margin: 0;
                    outline: 0;
                }
                .loadPic{//图片上传
                    height: 1.4rem;
                    padding-left: .2rem;
                    img{
                        height: 1.4rem;
                    }
                    .left{
                        float: left;
                    }
                    .right{
                        float:left;
                        margin-left: .2rem;
                        padding-top: .3rem;
                        p{
                            font-size: .28rem;
                            color: @fs-l;
                        }
                    }
                }
        }
       >:nth-child(2){
        margin-top: .1rem;
        background-color: @bgcolor-body ;
        padding-left: .2rem;
        height: 1.1rem;
        line-height: 1.1rem;
        label{
            width: 30%;
        }
        #sPhone{
            width: 80%;
            padding-left: .3rem;
            outline: 0;
        }   
       }
    }
    button{
        width: 80%;
        margin-left: 10%;
        margin-top: .2rem;
        height: .9rem;
        background: @fs-i;
        color: @color-l;
        border: 0;
        border-radius: .08rem;
        font-size: .3rem;
    }
    .model{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: @bgrgba ;
        div{
            font-size: .3rem;
            height: 4rem;
            background: @bgcolor-body;
            text-align: center;
            padding: .3rem;
            position: absolute;
            top: 50%;
            width: 100%;
            margin-top: -2rem;
            p{
                margin-top: .5rem;
            }
        }
    }
}
</style>
