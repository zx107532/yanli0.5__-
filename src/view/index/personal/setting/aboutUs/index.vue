<template>
  <div class="about-us">
      <div class="top">
            <Row>
                <Col span="8" offset="1"><div @click="back()"><Icon type="chevron-left"></Icon><span>关于我们</span></div></Col>
            </Row>
      </div>
      <div class="main">
          <div class="logo">
              <img src="./img/qr.png">
              <p>四川炎立信息技术有限公司</p>
          </div>
          <div class="detail">
              <hr>
              <span>当前版本{{code}}</span>
              <p @click="tel">客服电话：{{number}}</p>
              <p>官方网站：<a :href="address">{{address}}</a></p>
          </div>
      </div>
  </div>
</template>
<script>
export default {
  data(){
      return{
          code:"1.1.2",
          number:"400-820-8888",
          address:"www.yalikeji.cn"
      }
  },
    methods:{
      back(){
        this. $router.back()   
      },
      tel(){
          window.location.href="tel:"+this.number
      }
  }
}
</script>

<style lang="less" scoped>
    @import '~less/variable';
    .about-us{
        img{
            max-width: 100%;
            max-height: 100%;
        }
        .top{//顶部导航
            font-size: .3rem;
            height: .9rem;
            line-height: .9rem;
            border-bottom: 1px solid @border;
            background: @bgcolor-body;
            span{
                margin-left: .2rem;
            }
        }
        .main{//主体内容
            height: 5.5rem;
            margin-top: .2rem;
            background: @bgcolor-body;
            text-align: center;
            .logo{
                margin-top: .4rem;
                font-size: .36rem;
                img{
                    height: 1.84rem;
                    margin-bottom: .3rem;
                }
            }
            .detail{
                margin-top: 1rem;
                position: relative;
                hr{
                    margin-bottom: .5rem;
                }
                span{
                    position: absolute;
                    font-size: .24rem;
                    top:-.2rem;
                    background:  @bgcolor-body;
                    left: 40%;
                }
                p{
                    font-size: .3rem;
                   
                }
            }
        }
    }
</style>
