<template>
  <bm-overlay :class="{sample: true}" pane="labelPane" @draw="draw">
      <div class="otherPic">
        <img :src="photo">
      </div>
      <span class="friendName" v-text="name"></span>
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
<style scoped>
/* .sample {
  color: #fff;
  text-align: center;
  padding: 10px;
  position: absolute;
} */
</style>
<style lang="less" scoped>
  @import '~less/variable';
  img{
    max-width:100%;
    max-height: 100%;
  }
  .sample{
    position: absolute; 
    text-align: center; 
    width: 1.88rem;
    height: .92rem;
    .otherPic{//用户头像父元素
      width: 1rem;
      height: 1rem;
      position: absolute;
      z-index: 10;
      img{
        border-radius: 50%
      }
    }
      span{
        position: absolute;
        right:-10%;
        background-color: #646464;
        padding-left: .4rem;
        padding-right: .1rem;
        height: .5rem;
        line-height: .5rem;
        font-size: .3rem;
        top: 50%;
        border-radius: .06rem;
        margin-top: -.25rem;
      }
  }
</style>
