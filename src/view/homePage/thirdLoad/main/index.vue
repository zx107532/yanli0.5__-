<template>
  <div class="thirdContainer">
      <ul>
          <router-link :to="list.jump" tag="li" v-for="(list,index) in thirdList" :key="index">
                <Row>
                    <Col span="4">
                        <img :src="list.img">
                    </Col>
                    <Col span="16" class="mid">
                        <span>已绑定{{list.name}}</span> 
                        <p>{{list.msg}}</p>
                    </Col>
                    <Col span="4"><Icon type="ios-arrow-right"></Icon></Col>
                </Row>
          </router-link> 
      </ul>
      <div class="btm">
          <Row>
              <Col span="8" class="left">
                <Icon type="android-call"></Icon>
            </Col>
            <Col span="16" class="right">
                <span>向坐席人员申述</span>
                <p>通过问题验证、重置密码</p>
            </Col>
          </Row>
      </div>
  </div>
</template>
<script>
export default {
  data(){
      return{
          thirdList:[
              {"img":require("./img/wechat.png"),"name":"微信","msg":"可通过微信号+微信密码登陆","jump":"/page/third/wechat"},
              {"img":require("./img/qq.png"),"name":"QQ","msg":"可通过QQ号+QQ密码登陆","jump":"/page/third/qq"},
              {"img":require("./img/phone.png"),"name":"手机","msg":"可通过手机号+短信验证码登陆","jump":"/page/third/phone"},              
          ]
      }
  }
}
</script>
<style lang="less" scoped>
    @import '~less/variable';
    .thirdContainer{
        position: fixed;
        top: 0;
        bottom: 0;
        width: 100%;
        background: @page-color;
        color: @color-l;
        overflow: scroll;
        img{
            max-width: 100%;
            max-height: 100%
        }
        ul{
            margin-top: 1rem;
            font-size: .3rem;
            li{
                height: 1.4rem;
                text-align: center;
                line-height: 1.4rem;
            }
            >:nth-child(1){
                img{
                    height: .5rem;
                    margin-top:.46rem;
                }
            }
            >:nth-child(2){
                img{
                   height: .56rem;
                   margin-top:.36rem;
                }
            }
            >:nth-child(3){
                img{
                    height: .68rem;
                    margin-top:.22rem;
                }
            }
            .mid{//中间内容样式修改
                line-height: .4rem;
                text-align: left;
                padding-top: .4rem;
                padding-bottom: .1rem;
                border-bottom: 1px solid @border;
                p{
                    color: #f99a43; 
                }
            }
        }
        .btm{
            position: absolute;
            bottom: 3rem;
            width: 100%;
            .left{
                font-size:.72rem;
                color: #ff4081;
                text-align: right;
                margin-top: .2rem;
                padding-right: .8rem
            }
            .right{
                font-size: .3rem;
                line-height: .5rem;
                margin-top: .2rem;
                p{
                    color: #f99a43;
                }
            }
        }
    }
</style>
