<template>
  <div class="msg">
      <div class="topbar">
           <personal-tab></personal-tab>
      </div>
     <div class="messageMain">
         <keep-alive>
             <router-view></router-view>
        </keep-alive>
     </div>
  </div>
</template>
    <script>
    import PersonalTab from '@/components/PersonalTab'
    export default {
      components:{
        PersonalTab
    },
    }
    </script>
    
<style lang="less" scoped>
 @import '~less/variable';
    .msg{
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        z-index: 100;
        .messageMain{
            position: absolute;
            top: .96rem;
            right: 0;
            left: 0;
            bottom: 0;
            overflow: scroll;
        }
        .topbar{
            position: fixed;
            top: 0;
            height: 0.96rem;
            width: 100%;
            z-index: 10;
            background: #ffffff;
            border-bottom: 0.04rem solid @border;
        }
    }
</style>
