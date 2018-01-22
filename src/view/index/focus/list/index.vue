<template>
  <div class="falList" :style="{minHeight:listHeight}">
        <router-link to="/index/focus/fosearch">
          <div class="search">
        <input type="search" placeholder="搜索">
        </div>
        </router-link>  
      <ul>
        <li :key="index" v-for="(item,index) in list">
          <Row class="title">
            <router-link :to="{path:'/index/detail',query:{name:item.name}}">
                <Col span='4'>
                  <img :src="item.img">
                </Col>
                <Col span='16'>
                  <p>{{item.name}}</p>
                </Col>
            </router-link>
            <Col span="4">
                <div @touchstart="focus(index)" class="focusin">
                    <p v-show="item.focused" @click="focusOn(index)">关注</p>
                     <p v-show="!item.focused" @click="focusOut(index)">已关注</p> 
                </div>  
            </Col>
          </Row>
        </li>
      </ul>
      <!-- 下方弹出框，取消关注时弹出 -->
        <mt-actionsheet :actions="actions" v-model="sheetVisible">
        </mt-actionsheet>
        <!-- 关注时弹窗 -->
        <div class="model">
            <p>您已成功关注！</p>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data () {
      return {
         sheetVisible:false,
          clikindex:'',//保存当前点击的下标
          actions:[{name: '确定不再关注此人？'}, {name:'确定',method:this.ensure}],
        list:[
          {
            img: require('./img/pop1.png'),
            name: '萌宠世界',
             focused:false
          },
          {
            img: require('./img/pop2.png'),
            name: '女儿',
             focused:false
          },
          {
            img: require('./img/pop3.png'),
            name: '女婿',
             focused:false
          },
          {
            img: require('./img/pop4.png'),
            name: '李大爷',
             focused:false
          },
          {
            img: require('./img/pop5.png'),
            name: '人民网',
             focused:false
          }
        ]
      }
    },
    methods: {

        focusOut(index){//关注点击时
            this.sheetVisible=true;
           
        },
        focusOn(index){//点击关注
            this.list[index].focused=false;
            document.getElementsByClassName("model")[0].style.display="block";
            setTimeout(function(){
                document.getElementsByClassName("model")[0].style.display="none";
            },1000)   
        },
        focus(index){//保存当前点击下标
            this.clikindex=index;
        },
        ensure(){
            this.list[this.clikindex].focused=true;
        }
    },
    created(){
    var h=window.screen.height ;
    this.listHeight=h*2/100 -3.1+"rem";
    },
  }
</script>

<style scoped lang="less">
  @import '~less/variable';
    // 家庭列表
    .falList {
      margin-top: .16rem;
      padding-top: .18rem;
      background-color: @background-i;
      .search{//搜索框样式 
        width:96%;
        margin-left:2%; 
          margin-bottom: .18rem;
        background: @bgcolor-body;
        input{//放大镜图标以及搜索框样式
          width:7.2rem;
          height: .56rem;
          border: 1px solid @border;
          font-size: .28rem;
          background: url('./img/searchmodel.png')  no-repeat 42% 50%;
        }
        input::-ms-input-placeholder{text-align: center;font-size: .28rem}
        input::-webkit-input-placeholder{text-align: center;font-size: .28rem}
      }
      ul{
         background: @bgcolor-body ;
      }
      li{
        margin: 0.1rem 0;
        border-bottom: 1px solid @border;
      }
      .title{
        height:1.2rem;
        padding:0 0.26rem;
        position: relative;
        div:nth-child(1) {//用户头像
          >img{
            width:1rem;
            margin:0.08rem 0;
          }
        }
        div:nth-child(2) {//用户名
          height: 1.2rem;
          line-height: 1.2rem;
          font-size: 0.3rem;
          color: @color-i ;
        }
        .focusin {
          padding-bottom: .22rem;
        p{
            margin-top:0.36rem;
            font-size: 0.24rem;
            width:1.1rem;
            height: 0.48rem;
            line-height: 0.48rem;
            color: @color-l;
            text-align: center;
            background-color: @fs-i;
            border-radius: .1rem;
          }
          p:nth-child(2){
               background-color:@bgcolor-body;
               color: @fs-i ;
               border: 1px solid  @fs-i;
          }
        }
        
      }
        .model{
          position: fixed;
          top:0;
          right: 0;
          left: 0;
          bottom: 0;
          display: none;
          p{//关注提示文字
            position: absolute;
            left: 50%;
            top: 50%;
            margin-left: -1.5rem;
            margin-top: -.5rem;
            width:3rem;
            height: 1rem; 
            line-height: 1rem;
            text-align: center;
            background-color: @fs-l;
            color: @color-l ;
            border-radius: .1rem;
            font-size: .3rem;
            opacity: .7;
          }
      }
    }
</style>