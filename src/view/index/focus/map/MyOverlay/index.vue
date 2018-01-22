<template>
  <bm-overlay :class="{sample: true}" pane="labelPane" @draw="draw">
      <div class="otherPic">
        <img :src="photo">
      </div>
      <div class="line"></div>
  </bm-overlay>
</template>
<script>
export default {
  props: ['name', 'position','photo'],
  data () {
    return{
        
    }   
  },
  methods: {
    draw ({el, BMap, map}) {
      const {lng, lat} = this.position
      const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat))
      el.style.left = pixel.x - 24 + 'px'
      el.style.top = pixel.y - 20 + 'px'
    } 
  }
}
</script>

<style lang="less" scoped>
  @import '~less/variable';
  img{//图片自适应
    max-width:100%;
    max-height: 100%;
  }
  .sample{
    position: absolute; 
    text-align: center; 
    width: .64rem;
    height: .46rem;
    .otherPic{//用户头像父元素
      position: absolute;
      z-index: 10;
      border-radius: 50%;
      border: .065rem solid @fs-i;
      img{
        width: 1.02*.5rem;
        height: 1.02*.5rem;
      } 
    }
     .line{//头像下方竖线
        position: absolute;
        height: .22rem;
        bottom: -.3rem;
        border-left:.16rem solid @fs-i;
        left: 50%;
        margin-left: -.08rem;
        border-radius: .15rem;
      }  
  }
</style>