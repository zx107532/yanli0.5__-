<template>
    <div class="layout">
        <Row class="title">
            <Col span="8">
              <span @click="tran">
                  <img src="./img/pen.png">
              </span>
            </Col>
            <Col span="16">
              <input @click="search()" type="button" placeholder="搜索" value="搜索" >
            </Col>
        </Row>
        <Row>
            <Col span="20" class="tab">
            <div v-for="(tab,index) in tab" v-bind:style="{width: width+'%'}" v-bind:class="index==ins ? 'Tab':''">
                <span @click="active(index)">{{tab.name}}</span>
            </div>
            </Col>
            <Col span="1" offset="2">
            <router-link to="/read/more">
                <span>+</span>
            </router-link>
            </Col>
        </Row>
        <div class="published" :class="transition?'transition':''">
            <Row>
                <Col span="8">
                    <span @click="publishedText">文字</span>
                </Col>
                <Col span="8">
                    <span @click="phoneImg">图片</span>
                </Col>
                <Col span="8">
                    <span @click="getVideo">视频</span>
                </Col>
            </Row>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import {fun} from '@/common/js/camera.js'
  import {func} from '@/common/js/base/videotape.js'
//  import $ from 'jquery'
  export default {
    data () {
      return {
        ins: '',
        width:'',
        transition:false,
        tab:[
          {
            name:'发现',
            route:'/read',
            classification:'1'
          },
          {
            name:'周边',
            route:'/read/periphery',
            classification:'2'
          },
          {
            name:'推荐',
            route:'/read/recommended',
            classification:'3'
          },
          {
            name:'视频',
            route:'/read/video',
            classification:'4'
          },
          {
            name:'直播',
            route:'/read/live',
            classification:'5'
          }
        ]
      }
    },
    methods: {
      widths(){
        this.width = 100 / this.tab.length
        if (this.width<=20){
          this.width = 20
        }
        this.ins = this.$store.state.readTab
//        console.log(this.$store.state.readTab)
      },
      active(index){
//        $('.tab div').eq(index).addClass('Tab')
        var ss = this.tab[index].route
        this.ins = index
        this.$router.push({path:ss})
        this.$store.commit('readTab',index)
        this.$store.commit('classification',this.tab[index].classification)

      },
      search(){
        this.$router.push({name:'read_search'})
      },
      publishedText(){
        this.$router.push({path:'/read/publish'})
      },
      tran(){
        this.transition = !this.transition
      },
      phoneImg(){
        fun.showActionSheet()
//        this.$router.push({path:'/read/publish'})
        this.$store.commit('read_tab','2')
      },
      getVideo(){
        func.getVideo()
      }
    },
    mounted(){
      this.widths()
    }

  }
</script>

<style scoped lang="less">
    @import '~less/variable';
    .layout{
        >div:nth-child(1) {
            font-size: 34/100rem;
            height:88/100rem;
            line-height:88/100rem;
            text-align: center;
            background-color: white;
            color:#fff;
        }
        >div:nth-child(2) {
            text-align: center;
            font-size: 34/100rem;
            line-height: 0.6rem;
            // border-bottom:0.01rem solid #313131;
            box-shadow: 0 0.02rem   #BFBFBF;
            >div:nth-child(1){
                >div{
                    float: left;
                }
            }
            >div:nth-child(2){
                >a{
                    span{
                        color: black;
                    }
                    span:active{
                        color: #f64e47;
                    }
                }
            }
        }
    }
    .Tab{
        color: #f64e47;
    }
    .title{
        >div:nth-child(2){
            input{
                height: 0.6rem;
                font-size: 0.24rem;
                line-height: 0.4rem;
                background: url("img/search.png") @border no-repeat;
                width: 80%;
                background-position: 0.2rem 50%;
                border-radius: 10px;
                color: whitesmoke;
            }
        }
    }
    .published{
        position: absolute;
        width: 100%;
        background: white;
        z-index: 220;
        height: 1.6rem;
        line-height: 1.6rem;
        font-size: 0.34rem;
        top: -5em;
        transition: 0.5s;
        >div{
            text-align: center;
        }
    }
    .transition{
        top:1rem;
    }

</style>
