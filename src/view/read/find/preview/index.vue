<template>
    <div class="preview" :style="{marginLeft:'-'+imgLeft+'px',transition:'0.5s'}">
      <div v-for="(img,index) in imgsrc" class="imglist" :style="{width:imgWidth+'px'}">
        <img :src="'http://182.151.104.205:16000/elderly'+img.img" >
      </div>
      <div class="left" @click="jian()">
        <Icon type="chevron-left"></Icon>
      </div>
      <div class="right" @click="jia()">
        <Icon type="chevron-right"></Icon>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        data(){
            return{
                imgsrc:[],
                imgnum:'',
                value:0,
                imgWidth:'',
                imgLeft:''
            }
        },

        methods:{
            imgs(){
                this.imgsrc = this.$route.query.imgsrc;
                this.imgnum = this.$route.query.num;
                console.log(this.$route.query.imgsrc)
            },
            banner(){
                this.imgWidth = document.body.clientWidth;
                this.imgLeft = (this.imgWidth * this.imgnum);
            },
            jia(){
              this.imgnum++;
              if(this.imgnum >= this.imgsrc.length){
                this.imgnum = this.imgsrc.length-1
              }
              this.imgLeft = (this.imgWidth * this.imgnum);
            },
            jian(){
              this.imgnum--;
              if(this.imgnum == 0){
                this.imgnum == 0
              }
              this.imgLeft = (this.imgWidth * this.imgnum);
            }
        },
        activated(){
            this.imgs();
            this.banner()
        }

    }
</script>
<style scoped lang="less">
    @import "~less/variable";

    .preview{
      height: 100%;
      top: 0;
      background: #000;
      width: 900%;
      height: 100%;
        margin: 0;
        >div{
          display: inline-block;
          width: 11%;
          >img{
             width: 100%;
          }
        }
      .left{
        position: absolute;
        left: 0;
        z-index: 300;
        font-size: 1rem;
      }
      .right{
        position: absolute;
        right: 0;
        z-index: 300;
        font-size: 1rem;
      }
    }
</style>
