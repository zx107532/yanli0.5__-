<template>
    <div class="msgMain">
        <Row>
            <Col span="6"><div class="return" @click="back"><Icon type="chevron-left"></Icon></div></Col>
            <Col span="6"><router-link tag="div" class="sysmsg" to="/index/msg">通知</router-link></Col>
            <Col span="6"> <router-link tag="div" class="shipmsg" to="/index/msg/rel"> 消息</router-link> </Col>
            <Col span="6"></Col>
        </Row>
    </div>
</template>
<script>
export default {
  methods:{
      back(){
         this.$router.push({path:'/index'})
      }
  }
}
</script>
<style lang="less" scoped>
     @import '~less/variable';
    .msgMain{
        // 设置顶部主体样式
        font-size: 0.3rem;
        height: 1rem;
        line-height:1rem;
       
        .return{//返回按钮左边距
            margin-left: 0.2rem;
        }
       .sysmsg,.shipmsg{//中间文字居中
           text-align: center;
       }
       .router-link-exact-active{//为router-link在激活状态添加样式
            color:@fs-i;
            border-bottom: 2/100rem solid @fs-i
        }
    }
</style>
