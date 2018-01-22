<template>
  <div>
    <tab v-if="show" :msg="nav"></tab>
    <div class="i-box">
      <keep-alive>
        <router-view :initnav="nav"></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Tab from '@/components/tab/index.vue'

  export default {
    components: {
      Tab
    },
    data () {
      return {
        show:true,
         nav:[{
					name:'我',
					id:'0',
					iscur:true,
					path:'/index'
					},{
					name:'家庭',
					id:'1',
					iscur:false,
					path:'/index/family'
					},{					
					name:'亲友',
					id:'2',
					iscur:false,
					path:'/index/relative'
					},
					{					
					name:'关注',
					id:'3',
					iscur:false,
					path:'/index/focus'
					}
					]
      }
    },
    activated(){//路由导航激活
    	// if(this.$router.history.current.fullPath=='/index'){
    	// 	this.nav.map(function(v,i){
    	// 	i==0?v.iscur=true: v.iscur=false;
    	// })
      // }
    },
    updated(){
      // 页面控制路由激活
      var k=window.location.hash.slice(1);
        var act=document.querySelectorAll(".totle .reset"); 
        if(k=="/index"||k=="/index/"){
          act[0].className="reset active"
           act[1].className="reset"
           act[2].className="reset"
           act[3].className="reset"
        }else if(k=="/index/family"||k=="/index/family/flist"){
          act[1].className="reset active"
          act[0].className="reset"
           act[2].className="reset"
           act[3].className="reset"
        }else if(k=="/index/relative"||k=="/index/relative/relist"){
          act[2].className="reset active"
          act[0].className="reset"
           act[1].className="reset"
           act[3].className="reset"
        }else if(k=="/index/focus"||k=="/index/focus/folist"){
          act[3].className="reset active"
          act[0].className="reset"
           act[1].className="reset"
           act[2].className="reset"
        }
    },
    mounted(){
      
    },
    watch: {
      $route () {
        if(this.$route.path == '/read/publish'){
          this.show = false
        }else if(this.$route.path == '/index/map'){
          this.show = false
        }else if(this.$route.path == '/index/msg'){
          this.show = false  
        }else if(this.$route.path == '/index/personal/address'){
          this.show = false
        }else if(this.$route.path == '/index/personal/main'){
          this.show = false
        } else if(this.$route.path == '/index/msg/rel'){
          this.show = false
        }  else if(this.$route.path == '/index/detail'){
          this.show = false
        }  else if(this.$route.path == '/index/personal/wallet/details'){
          this.show = false
        }  else if(this.$route.path == '/index/personal/wallet/closepay'){
          this.show = false
        } else if(this.$route.path == '/index/personal/wallet/closepayadd'){
          this.show = false
        }else if(this.$route.path == '/index/personal/wallet/pwd/noPwd'){
          this.show = false
        }else if(this.$route.path == '/index/personal/wallet/pwd/pwdChange'){
          this.show = false
        }
        else if(this.$route.path == '/index/personal/wallet/qrcode'){
          this.show = false
        }else if(this.$route.path == '/index/set'){
          this.show = false
        } 
        else{
          this.show = true
        }
      }
    }
  }
</script>


<style scoped lang="less">
  @import '~less/variable';
  .i-box{
    position: absolute;
    left: 0;
    top:0.96rem;
    right: 0;
    bottom:1.2rem;
    overflow: auto;
  }
</style>