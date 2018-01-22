<template>
  <div class="msg">
    <!--<div class="header">-->
      <!--<Row>-->
        <!--<Col span="2">-->
        <!--<div tag="div" @click="back">-->
            <!--<span>-->
              <!--<Icon type="chevron-left"></Icon>-->
            <!--</span>-->
        <!--</div>-->
        <!--</Col>-->
        <!--<Col span="2" offset="20">-->
        <!--<p>-->
          <!--<Icon type="more"></Icon>-->
        <!--</p>-->
        <!--</Col>-->
      <!--</Row>-->
    <!--</div>-->
    <div class="msgcontent">
      <Row>
        <Col span="2">
          <span>
            <img :src="datas.userImg">
          </span>
        </Col>
        <Col span="20" offset="1">
          <span>{{datas.uesrName}}</span><br>
          <span>{{datas.time}}·{{datas.address}}</span>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <p>{{datas.content}}</p>
        </Col>
        <Col v-if="datas.imgs">
          <div v-for="{img,index} in datas.imgs" :style="{width:width}">
            <img :src="img">
          </div>
        </Col>
      </Row>
    </div>
    <comment></comment>
  </div>
</template>

<script type="text/ecmascript-6">
//  import Comment from '@/components/comment'
  export default {
    data () {
      return {
        datas:{
            userId:'00004',
            userImg:require('./img/userImg.png'),
            uesrName:'朝花夕拾',
            time:'14:23',
            address:'成都龙泉',
            content:'印度现在国债多少？而且某些债务已经到了还款期限，贷款方基本都是货币基金组织之类的吸血资本，要么赶紧还钱要么呵呵延期不是不行，你',
            num:'23',
            imgs:[
              {img:require('./img/cat-w.png')},
              {img:require('./img/cat-b.png')},
              {img:require('./img/cat-b.png')}
            ]
          },
          width:''
      }
    },
    methods:{
      back(){
        this.$router.back(-1)
      },
      imgWidth(){
        let num = this.datas.imgs.length
        if(num == 1){
          this.width = '100%'
        }else if(num == 2 || num == 4){
          this.width = '48%'
        }else {
          this.width = '31%'
        }
      }
    },
    activated(){
      this.imgWidth()
    }
  }
</script>

<style scoped lang="less">
  @import '~less/variable';

  .msg{
    font-size: 34px !important;
    .header{
      font-size: 105%;
      line-height: 0.9rem;
      height: 0.9rem;
      padding: 0 0.2rem;
      color:@fs-i;
      border:1px solid @border;
      p{
        text-align: right;
      }
    }
    .msgcontent{
      margin: 0 0.2rem;
      margin-top: 0.3rem;
      >div:nth-child(1){
        >div:nth-child(2){
          >span{
            font-size: 70%;
            color: @fs-l;
          }
          span:nth-child(1){
            font-size: 100%;
            font-weight: 500;
            color: @color-n;
          }
        }
      }
      >div:nth-child(2){
        margin-top: 0.1rem;
        >div{
          p{
            font-size: 100%;
          }
        }
        >div:nth-child(2){
          >div{
            display: inline-block;
            margin-top: 0.1rem;
            margin-left: 0.1rem;
            img{
              width: 100%;
              height: 1.5rem;
            }
          }
        }
      }
    }
  }
</style>
