
<template>
    <div class="pTop">
         <Row>
            <Col span="8"><span @click="back()"><Icon class="bkicon" type="chevron-left"></Icon></span> <span>{{$route.query.name}}</span></Col>
            <Col span="8"></Col>
            <Col span="8"></Col>
        </Row>
    </div>
</template>
<script>
export default {
    methods:{
        back(){
        // 返回上次页面
      this. $router.back()
    }
    }
   
}
</script>

<style lang="less" scoped>
@import '~less/variable';
.pTop{  //固定在标题
        position: fixed;
        top:0;
        height:0.96rem;
        width: 100%;
        z-index: 10;
        line-height: 88/100rem;
        background: @color-l;
        font-size: 30/100rem;
        border-bottom: 0.04rem solid @border;
      .bkicon{//返回与两边距离
          margin-left:0.3rem;margin-right: 0.5rem; 
      }         
    }
</style>

