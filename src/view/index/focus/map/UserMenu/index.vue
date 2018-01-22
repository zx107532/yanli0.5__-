<template>
  <bm-overlay :class="{umenu: true}" pane="labelPane" @draw="draw">
    <div>
        <a class="fun1">对讲</a>
        <a class="fun2">滴滴</a>
        <a class="fun3">提醒</a>
         <a @touchstart="close(index)" class="close">X</a>       
    </div>
  </bm-overlay>
</template>

<script>
export default {
  props: ['position','index'],
  data () {
    return{
        showfalse:true 
    }   
  },
  methods: {
    draw ({el, BMap, map}) {
      const {lng, lat} = this.position
      const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat))
      el.style.left = pixel.x - 80 + 'px'
      el.style.top = pixel.y - 100 + 'px'
    },
    close (index) {
      this.$emit("closeX", index)
    }
    
  }
}
</script>

<style scoped>
.umenu {
  color: #fff;
  text-align: center;
  padding: 10px;
  position: absolute;
  background:rgba(100,200,100,0.5);
  border-radius: 50%;
  width: 200px;
  height: 200px;
  position:absolute;
  z-index: 1000;
}
.umenu a{
  position: absolute;
}
.fun1{
  left:45%;
  top:0%
}
.fun2{
  left:10%;
  top:35%
}
.fun3{
  left:75%;
  top:35%
}
.close{
left:48%;
  top:35%
}
</style>