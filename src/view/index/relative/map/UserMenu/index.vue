<template>
<transition name="fade">
  <bm-overlay :class="{umenu: true}" pane="labelPane" @draw="draw">
    <div>
        <a ><img src="../img/car.png"></a>
        <a ><img src="../img/radio.png"></a>
        <a ><img src="../img/speak.png"></a>
        <a  @touchstart="userLife(index,uid)"><img src="../img/poi.png"></a>
        <a @touchstart="close(index)" class="close"><img src="../img/close.png"></a>       
    </div>
  </bm-overlay>
  </transition>
</template>

<script>
export default {
  props: ['position','index','uid'],
  data () {
    return{
        showfalse:true ,
    }   
  },
  methods: {
    draw ({el, BMap, map}) {
      const {lng, lat} = this.position
      const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat))
      el.style.left=pixel.x - 80 + 'px'
      el.style.top=pixel.y - 80 + 'px'
    },
    close (index) {
      this.$emit("closeX", index)
    } ,
    userLife(index,uid){
        
       this. close(index);
                //获取数据存储
                let userid={
                  friendId:uid
                }
                this.$ajax.wholeDaypoi(userid)
                        .then(res=>{
                          this.$store.commit('rmap',res.data)
                          this.$router.push({path:'/index/relative/acmap',query:{name:'亲友',ix:index}});
                          
            })
    }
  }
}
</script>
<style lang="less" scoped>
@import '~less/variable';
img{
  max-width: 100%;
  max-height: 100%;
}
.umenu {
  position: absolute;
  background:@bgrgba;
  border-radius: 50%;
  width:3rem;
  height: 3rem;
  position:absolute;
  z-index: 1000;
  // z-index: 10;
  //设置图标的大小以及位置
  a{
    width: .8rem;
    height: .8rem;
    position: absolute;
  }
  div>a:nth-child(1){
    left: 0;
    top: 50%;
    margin-top: -.4rem;
  }
  div>a:nth-child(2){
    left:50%;
    top: 0;
    margin-left: -.4rem;
  }
 div>a:nth-child(3){
    right:0;
    top: 50%;
     margin-top: -.4rem;
  }
 div>a:nth-child(4){
    bottom:0;
    left: 50%;
    margin-left: -.4rem;
  }
div>a:nth-child(5){
   top:50%;
   left: 50%;
   margin-left: -.4rem;
   margin-top: -.4rem;
  }
} 
</style>