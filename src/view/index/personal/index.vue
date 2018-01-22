<template>
     <div>
         <keep-alive>
             <router-view></router-view>
        </keep-alive>
     </div>    
</template>
<script>
import Return from '@/components/Return/index'
export default {
    data(){
        return {
         
        }
    },
}
</script>
<style lang="less" scoped>
    @import '~less/variable';
    img{
        max-width: 100%;
        max-height: 100%;
    }
    
        
</style>

