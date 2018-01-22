<template>
    <!-- 搜索页面容器 -->
    <div class="container">
        <div class="sear">
            <input type="search" placeholder="搜索">
            <router-link tag="span" to="/index/focus/folist">取消</router-link>
        </div>
        <ul>
        <li :key="index" v-for="(item,index) in list">
          <Row class="title">
            <Col span='4'>
              <img :src="item.img">
            </Col>
            <Col span='16'>
              <p>{{item.name}}</p>
            </Col>
            <Col span="4" >
                <div @touchstart="focus(index)">
                    <p v-show="!item.focused" @touchstart="focusOn(index)">关注</p>
                     <p v-show="item.focused" @touchstart="focusOut(index)">已关注</p> 
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
<style lang="less" scoped>
     @import '~less/variable';
     .container{
         position: fixed;
         top:0;
         right: 0;
         left: 0;
         bottom: 0;
         overflow: scroll;
         background:@background; 
         font-size: .28rem;
         .sear{//搜索框 父元素背景以及高度
            height: .9rem;
            background:@fs-i;
            color: @color-l;
            input{
                width: 80%;
                height: .6rem;
                margin: .15rem .3rem .15rem .2rem;
                padding-left: .6rem;
                background: url('../list/img/searchmodel.png')  no-repeat 3% 50%;
                background-color:@background; 
            }    
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
        >div:nth-child(1) {//用户头像
          >img{
            width:1rem;
            margin:0.08rem 0;
          }
        }
        >div:nth-child(2) {//用户名
          height: 1.2rem;
          line-height: 1.2rem;
          font-size: 0.3rem;
        }
        >div:nth-child(3) {//关注
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
<script>
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
  methods:{
        focusOut(index){//关注点击时
            this.sheetVisible=true;
           
        },
        focusOn(index){//点击关注
            this.list[index].focused=true;
            document.getElementsByClassName("model")[0].style.display="block";
            setTimeout(function(){
                document.getElementsByClassName("model")[0].style.display="none";
            },1000)
             
        },
        focus(index){//保存当前点击下标
            this.clikindex=index;
        },
        ensure(){
            this.list[this.clikindex].focused=false;
        }
  },

}
</script>
