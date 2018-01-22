<template>
  <div class="talkContainer">
      <return class="topbar"></return>
      <div class="main">
        <ul v-html="html">

        </ul>
        <p class="talk" @touchstart="talk($event)" @touchend="tijiao($event)">
          <Icon  type="android-microphone" :style="{color:color}"></Icon>
        </p>
      </div>

  </div>
</template>
<script>
import Return from '@/components/Return'
import {fun} from '@/common/js/base/audio'
var time = null
export default {
    data(){
        return{
            show:false,
          color:'',
          html:'',
          senderId:'',
          time:null
        }
    },
  components:{
      Return
  },
  methods:{
      talk(e){
          this.color = 'red';
         fun.startReady(this.$route.query.uid)
      },
      tijiao(e){
        this.color = ''
          fun.stopReady()
//        setTimeout(this.$options.methods.audio(),1000)
      },
      audio(){
        let data = {
          'userId':localStorage.mobilephone,
//        'chatId':'3'
          'senderId':this.senderId
        };
        this.$ajax.audiolist(data).then(msg=>{
//          console.log(msg.data)
//          console.log(localStorage.mobilephone)
          if(msg.data.length != 0){
//            console.log(msg.data)
            for (var i =0;i<msg.data.length;i++){
              if(msg.data[i].isAccessed == 0){
                let data = {
                  'chatId':msg.data[i].chatId,
                  'userId':localStorage.mobilephone
                };
                this.$ajax.audio(data).then(msg=>{
//                  console.log(msg.data)
                  fun.startPlay('http://182.151.104.205:16000/elderly'+msg.data.url)
                })
              }
            }
          }
        })
      }
  },

  activated(){
      this.senderId = this.$route.query.uid
  window.time = setInterval(this.audio,500)
  },
  deactivated(){
    clearInterval(window.time)
//    alert(this.time)
  }

}
</script>
<style lang="less" scoped>
@import '~less/variable';
    .talkContainer{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10;
        background: @bgcolor-body;

        .main{
            position: absolute;
            top: 1rem;
            bottom: 0;
            width: 100%;
             overflow: scroll;
            .talk{
                font-size: 1rem;
                position: absolute;
                bottom: 2rem;
                left: 50%;
                color: @color-adorm
            }
              .talked{
                font-size: 1rem;
                position: absolute;
                bottom: 2rem;
                left: 50%;
                // color: @color-adorm
            }
        }
    }
</style>
