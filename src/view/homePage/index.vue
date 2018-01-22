<template>
  <div class="pageContainer">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
  </div>
</template>
<style lang="less" scoped>
 @import '~less/variable';
  .pageContainer{
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: @bgcolor-body;
    z-index: 10;
  }
</style>
