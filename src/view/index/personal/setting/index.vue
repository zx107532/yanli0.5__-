<template>
    <div class="setContainer">
        <router-view></router-view>
    </div>
</template>
<script>

export default {
}
</script>
<style lang="less">
@import '~less/variable';
    .setContainer{
        position: fixed;
        overflow: auto;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color:@background;
        z-index: 10;
    }
</style>
