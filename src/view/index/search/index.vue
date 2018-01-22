<template>
    <!-- 搜索页面容器 -->
    <div class="container">
        <div class="sear">
            <input type="search" placeholder="搜索">
            <span @click="cancle()">取消</span>
        </div>
    </div>
        
</template>
<style lang="less" scoped>
     @import '~less/variable';
     .container{
         position: fixed;;
         top:0;
         right: 0;
         left: 0;
         bottom: 0;
         background:@background; 
         font-size: .28rem;
         .sear{//搜索框 父元素背景以及高度
            height: .9rem;
            background:@bgcolor-body;
            input{
                width: 80%;
                height: .6rem;
                margin: .15rem .3rem .15rem .2rem;
                padding-left: .6rem;
                background: url('../family/list/img/searchmodel.png')  no-repeat 3% 50%;
                background-color:@background; 
            }    
        }  
     }
     
</style>
<script>
export default {
  methods:{
      cancle(){
          this. $router.back()
      }
  },
  mounted(){
 
  }
}
</script>
