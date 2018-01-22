<template>
<div>
    <person-top></person-top>
    <div class="adMain">
        <div class="unAd" v-if="sugshow">
            <!-- 没有地址的时候显示 -->
            <span>亲 你还没有填写收货地址哟~</span>
            <div class="adlogo">
                 <img src="./img/sorry.png">
            </div>  
        </div>
        <!-- 地址列表 -->
        <div class="adlist">
            <ul>
                <li class="listDetail" v-for="(ad,index) in data" :key="index">
                    <div>
                        <span class="uname">{{ad.name}}</span> <span class="utel">{{ad.tel}}</span>
                    </div>
                    <div>
                        <span>{{ad.ad}}{{ad.admain}}</span>
                    </div>
                    <div>
                        <input type="radio" :id="'radio'+'-'+ad.id" name="choose" class="regular-radio"/>  
                        <label :for="'radio'+'-'+ad.id"></label>
                        <label class="inputlabel" :for="'radio'+'-'+ad.id"> 默认地址</label>    
                          <span class="delate">删除</span>
                        <span class="edit" @click="resive(ad.id)">编辑</span>
                    </div>
                </li>   
            </ul>
        </div>
        <!-- 添加新地址 -->
        <div class="addMore" @click="addnew">
            <div class="addIcon">
                <img src="./img/addMore.png">
                <span >增加收货地址</span>
            </div>
        </div>
    </div>       
</div>
</template>
<script>
import personTop from '@/components/personTop/index'
export default {
    data(){
        return{
            sugshow:"",
            data:[
                {"id":"1","name":"清风徐来","tel":"13511111111","ad":"四川 成都 龙泉驿","admain":"经开区南一路666号8楼"},
                {"id":"2","name":"清风徐来","tel":"13511111111","ad":"四川 成都 龙泉驿","admain":"经开区南一路666号8楼"},
                {"id":"3","name":"清风徐来","tel":"13511111111","ad":"四川 成都 龙泉驿","admain":"经开区南一路666号8楼"},  
                {"id":"4","name":"清风徐来","tel":"13511111111","ad":"四川 成都 龙泉驿","admain":"经开区南一路666号8楼"},                                                                              
                ],
        }
    },
  components:{personTop},
  methods:{
      resive(id){
                // console.log(id)
               this.$router.push({path:'/index/personal/adEdit',query:{name:'地址编辑',id:id}});
        },
        addnew(){
            this.$router.push({path:'/index/personal/adEdit',query:{name:'地址编辑'}});
        }
  },
  mounted(){//判断是否从服务器获取到地址数据
      if(this.data.length==0){
          this.sugshow=true
      }else{
          this.sugshow=false
      }
  },
  deactivated(){//防止keep-alive影响
      this.$destroy()
  }
}
</script>
<style lang="less" scoped>
 @import '~less/variable';
    .adMain{
        img{//图片只适应
            max-width: 100%;
            max-height: 100%;
        }
        .unAd{//默认没有地址时的样式
            margin-top:0.95rem;
            text-align: center;
            font-size: 0.36rem;
            margin-bottom: 1rem; 
            .adlogo{
                margin-top: 0.2rem;
                img{
                    width: 2rem;
                    height: 2rem;
                }
            }
        }
        .adlist{
            .listDetail{//每个列表的高度，字体以及列表内样式的设定
                min-height: 2.15rem;
                font-size: 0.3rem;
                border-bottom: 0.04rem solid @border;
                margin-bottom: 0.14rem;
                background-color: @background;
                div{
                    height: 0.70rem;
                    line-height: 0.70rem;
                    margin-left: 0.3rem;
                }
                div:nth-child(1){
                    .utel{//电话号码位置
                        float: right;
                        margin-right: 0.3rem;
                    }
                }
                div:nth-child(2){//为第二个div设置样式
                    margin-right: 0.3rem;
                    border-bottom: 0.01rem solid @border;
                }
                div:nth-child(3){
                   .regular-radio {  
                        display: none;  
                    }  
                    .regular-radio + label {  
                        -webkit-appearance: none;  
                        // background-color: RGB(255,255,255);  
                        width: .32rem;
                        height: .32rem; 
                        background: url("./img/wx.png")no-repeat; 
                         background-size: 100%;
                        /*padding: .09rem;  
                        border-radius: .5rem;*/  
                        display: inline-block;  
                        position: relative;  
                    }  
                    
                    .regular-radio:checked + label:after {  
                        content: ' ';  
                         width: .32rem;
                        height: .32rem;   
                        border-radius: 50px;  
                        position: absolute;  
                        background: url("./img/yx.png")no-repeat;  
                        background-size: 100%;
                        text-shadow: 0px;   
                        font-size: 32px;  
                        top:.03rem;
                    }  
                    
                    .regular-radio:checked + label {  
                        background-color:  @background;  
                    }  
                    .edit{//编辑
                        float: right;
                         margin-right: 0.3rem;
                    }
                    .delate{//删除
                         float: right;
                         margin-right: 0.4rem;
                    }
                }
            }
        }
        .addMore{//添加新地址样式
            text-align: center;
            .addIcon{
                font-size: 0.3rem;
                color: @color-adorm;
                img{
                    width: 0.34rem;
                }
               
                
            }
        }
    }
</style>
