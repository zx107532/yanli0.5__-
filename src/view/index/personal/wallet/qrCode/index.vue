<template>
  <div class="qrcodeContainer">
      <div class="qrTop">
            <p style="display:inline-block" @click="back"><Icon type="chevron-left"></Icon></p>充值 <span>客服热线</span>
        </div>
        <!-- 二维码图片 -->
        <div class="qrPic">   
            <div class="qr">
                <div class="user">
                    <img src="./img/upic.png">
                    <p>收付款码</p>
                </div> 
                <img src="./img/txm.png">
                <!-- <img src="./img/qr.png"> -->
                <vue-q-art style="zoom:1.5" :config="config" :downloadButton="downloadButton"></vue-q-art>
                <p>
                    小额零钱包: <span>168.1元</span>
                </p>
                <p>该付款码用于付款！请勿截图 发给他人！</p>
            </div>
        </div>
        <!-- 下面切换菜单 -->
        <div class="btmMenu">
             <Row>
                <Col span="12">
                    <img src="./img/payCode.png">
                    <p>付款码</p>
                </Col>
                <Col span="12">
                    <img src="./img/resCode.png">
                    <p>扫码付</p>
                </Col>
            </Row>
        </div>
  </div>
</template>
<style lang="less" scoped>
@import '~less/variable';
.qrcodeContainer{
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    overflow: scroll;
     img{//图片等比例缩放
        max-width: 100%;
        max-height: 100%;
    }
    .qrTop{//顶部按钮
         padding-right: .22rem;
         height: .7rem;
         line-height: .7rem;
         background-color: @bgcolor-body;
         font-size: .34rem;
         span{
             float: right;
         }
         i{
             padding-left: .22rem;
             padding-right: .22rem;
         }
    }
    .qrPic{//中间二维码部分
        position: fixed;
        top: .7rem;
        bottom: 1.3rem;
         right: 0;
        left: 0;
        background: @background;
        text-align: center;
        .qr{//二维码条形码
            width: 77%;
            height: 81%;
            background:@bgcolor-body;
            margin-left: 11.5%;
            margin-top: 24%;
            .user{
            position: absolute;
            top: 0;
            font-size: .3rem;
            margin: .2rem 0;
            }
            >:nth-child(2){//条形码
                margin-top: 1.4rem;
                width: 4.75rem;
                height: .98rem;
            }
           >:nth-child(3){//二维码
                margin-top: .5rem;
                // width: 2.84rem;
                text-align: center
            }
            >p:nth-child(4){
                font-size: .34rem;
                margin-top: .4rem;
                span{
                     color: @fs-i;
                }
            }
            >p:nth-child(5){
                font-size: .36rem;
                font-weight: blod;
                color: @fs-i;

            }
        }
    }
    .btmMenu{//下方切换菜单
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 1.3rem;
        text-align: center;
        font-size: .24rem;
        border-top: 1px solid @border;
        img{
            margin-top: .24rem;
            width: .54rem;
        }
    }
}
</style>
<script>
import VueQArt from 'vue-qart'
export default {
    data(){
        return {
            config: {
            value: 'https://www.baidu.com',
            imagePath: require('./img/code.png'),
            filter: 'color'
        },
        downloadButton: false
        }
    },
  methods:{
       back(){
             this. $router.back();
       },
  },
  components: {VueQArt}
}
</script>
