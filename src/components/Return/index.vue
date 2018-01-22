<template>
    <div class="header"> 
        <Row>
            <Col span="8" ><div  @click="back()"><Icon class="bkicon" type="chevron-left"></Icon> <span>返回</span></div></Col>
            <!-- 根据点击传过来的参数改变主题 -->
            <Col span="8" class="mid">{{$route.query.name}}</Col>
            <col sapn="8" class="rt"></col> 
        </Row>
    </div>
</template>
<script>
export default {
    
    methods:{
    back(){
        // 返回上次页面
      this. $router.back()
    //    alert(window.location.hash)
    //    for(var i=0;i<window.location.hash.length;i++){
    //        if(window.location.hash[i]=="?"){
    //            var k=window.location.hash.slice(1)
    //            alert(k=="/index/family/map")
    //            break;
    //        }
    //    }

    }
  },
}
</script>

<style scoped lang="less">
 @import '~less/variable';
    .header{
        position: fixed;
        top:0;
        height:0.96rem;
        width: 100%;
        z-index: 10;
        line-height: 88/100rem;
        background: @fs-i;
        font-size: 30/100rem;
        color: #fff;
      .bkicon{
          margin-left:0.23rem;margin-right: 0.23rem; 
      }
       .mid{
         text-align: center;
         font-size:.36rem;
       }
                
    }
    
</style>
