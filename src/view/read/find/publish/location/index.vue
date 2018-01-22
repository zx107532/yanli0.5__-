<template>
  <div class="location">
    <!-- 标题区域 -->
    <div class="title">
      <Row>
        <Col span="3">
          <router-link tag="div" to="/read/publish">
            <p>取消</p>
          </router-link>
        </Col>
        <Col span="18">
          <b>所在位置</b>
        </Col>
        <Col span="3">
          <router-link tag="div" to="/read/publish">
            <span @click="posi()">确定</span>
          </router-link>
        </Col>
      </Row>
    </div>
    <!-- 搜索区域 -->
    <div class="search">
      <Row>
        <Col span="24">
          <input type="search" placeholder="搜索附近的位置">
        </Col>
      </Row>
    </div>
    <!-- 内容区域 -->
    <div class="content">
      <Row :key="index" v-for="(item,index) in datas">
        <Col span="21">
          <div  @click="showClick(index)">
            <p>{{item.name}}</p>
            <span>{{item.src}}</span>
          </div>
        </Col>
        <Col span="3">
          <div>
            <img v-show="item.show" :src="gou" alt="">
          </div>
        </Col>
      </Row>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    methods:{
      showClick (index) {
        for(var i=0;i<this.datas.length;i++){
          this.datas[i].show=false
        }
        this.datas[index].show =true
        this.position = this.datas[index].name
      },
      posi (){
          this.$store.commit('position',this.position)
      }
    },
   data () {
     return {
      gou:require('./img/gou.png'),
       position:'',
      datas:[
        {
          name:'不显示位置',
          show:false
        },
        {
          name:'成都市',
          show:true
        },
        {
          name:'腾博义齿制造（成都）有限公司',
          src:'南一路999号',
          show:false
        },
        {
          name:'成都晶元近材料技术有限公司（东北门）',
          src:'车城西一路88',
          show:false
        },
        {
          name:'长虹电源有限责任公司',
          src:'车城西一路88-90',
          show:false
        },
        {
          name:'鸿运达钢构（东北门）',
          src:'经开区南一路南50米',
          show:false
        }
      ]
     }
   }
  }
</script>

<style scoped lang="less">
  @import '~less/variable';
  html{
    width: 100%;
    height:100%;
  }
  .location{
    width: 100%;
    height: 100%;
    // 标题区域
    .title{
      font-size: 0.36rem;
      height: 0.9rem;
      line-height: 0.9rem;
      text-align: center;
      padding:0  0.2rem;
      border-bottom:0.01rem solid @border;
      p{
        color: @fs-l;
      }
      b{
        color: @color-i;
        font-weight: normal;
        font-size: 0.42rem;
      }
      span{
        color: @fs-i;
      }
    }

    // 搜索区域
    .search{
      background-color: #F7F7F9;
      padding: 0.2rem;
      input{
        width: 100%;
        height: 0.64rem;
        font-size: 0.34rem;
        outline: none;
      }
      input::-ms-input-placeholder{text-align: center;font-size: 0.34rem;}
      input::-webkit-input-placeholder{text-align: center;font-size: 0.34rem;}
    }

    // 内容区域
    .content{
      width: 100%;
      height: 100%;
      background-color: #F7F7F9;
      >div{
        border-top:0.01rem solid #F5F5F5;
        padding:0.1rem 0.2rem;
        background-color: #fff;
        >div{
          p{
            font-size: 0.34rem;
          }
          span{
            font-size: 0.26rem;
            color:@fs-l;
          }
        }
        >div:nth-child(2) {
          height: 0.9rem;
          line-height: 0.9rem;
        }
      }
      >div:nth-child(1) {
        >div:nth-child(2) {
          height: 0.4rem;
          line-height: 0.4rem;
        }
      }
      >div:nth-child(2) {
        
        >div:nth-child(2) {
          height: 0.4rem;
          line-height: 0.4rem;
        }
      }
    }
  }
</style>