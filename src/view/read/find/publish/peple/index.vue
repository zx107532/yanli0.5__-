<template>
  <div class="peple">
    <!-- 标题区域 -->
    <div class="title">
    <Row>
      <Col span="3">
        <div @click="back()">
          <p>取消</p>
        </div>
      </Col>
      <Col span="18">
        <b>谁能看见</b>
      </Col>
      <Col span="3">
        <router-link tag="div" to="/read/publish">
          <span>确定</span>
        </router-link>
      </Col>
    </Row>
    </div>
    <!-- 内容区域 -->
    <div class="content">
      <Row :key="index" v-for="(item,index) in datas">
        <Col span="21">
          <div  @click="showClick(index)">{{item.name}}</div>
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
//          this.con
      },
        back(){
          this.$router.back(-1);
        },
        ok(){
            this.$router.push({path:'/read/publish',query:{}})
        }
    },
    data () {
      return {
        gou:require('./img/gou.png'),
        con:'',
        datas:[
          {
            name:'所有人',
            show:true
          },
          {
            name:'圈子好友',
            show:false
          },
          {
            name:'仅自己',
            show:false
          }
        ]
      }
    }
  }
</script>

<style scoped lang="less">
  @import '~less/variable';
  
  .peple{
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
    
    // 内容区域
    .content{
      width: 100%;
      height: 100%;
      background-color: #F7F7F9;
      padding-top:0.5rem;
      >div{
        background-color: #fff;
        >div{
          border-top:0.01rem solid #F5F5F5;
          padding:0 0.2rem;
          line-height: 0.8rem;
          font-size: 0.34rem;
        }
      }
    }
  }
</style>