<template>
<div>
  <div class="topMenu">
        <Row>
              <Col span="7">&nbsp;</Col>
              <Col span="10">
                    <div class="topAc">
                      <router-link tag="div" class="act" to="/index/focus">动态</router-link>
                      <router-link tag="div" class="list" to="/index/focus/folist">列表</router-link>
                    </div>
              </Col>
              <Col span="7">&nbsp;</Col>
        </Row> 
    </div> 
     <keep-alive>
       <router-view></router-view>
      </keep-alive>
</div>
   
</template>
<script>
export default {
  methods:{
   
  },
}
</script> 

<style lang="less" scoped>
  @import '~less/variable';
  .topMenu{//顶部动态列表切换
    font-size: 0.3rem;
    .topAc{
      margin-left: 0.15rem;
    }
    .act,.list{//上侧字体样式
      text-align: center;
      width: 1.3rem;
      height: 0.6rem;
       line-height: 0.6rem;
      float: left;  
      background-color:@background-i;
      margin-top: 0.15rem;
    }
    .act{//左侧样式
      border:1px solid @background-i;
      border-top-left-radius:.06rem;
      border-bottom-left-radius:.06rem;
      margin-left: 0.06rem;
    }
    .list{//右侧样式
       border:1px solid @background-i;
      border-top-right-radius:.06rem;
      border-bottom-right-radius:.06rem;
    }
    .router-link-exact-active{//为router-link在激活状态添加样式
            background-color:#ec5241;
            color:@color-l ;
        }
  }
</style>
