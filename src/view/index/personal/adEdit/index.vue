<template>
    <div>
        <person-top></person-top>
        <div class="editDetail">
            <ul>
                <li><label for="resMan">收货人：</label><input type="text" :value="data.name"  id="resMan"></li>
                <li><label for="tel">手机号：</label><input type="text" :value="data.tel" id="tel"></li>
                <li><label>省市区：</label><span  @click="model=true">{{myAddressProvince}}&nbsp;{{myAddressCity}}&nbsp;{{myAddresscounty}}</span></li>
                <li><label for="adDetail">详细地址：</label><input class="ipt" :value="data.admain" type="text" id="adDetail"></li>
            </ul>
            <div class="makeSuer">
                <button @click="back">确定</button>
            </div>
        </div>
        <transition name="fade"> 
         <div class="pick" v-show="model">
             <div class="pickContainer">
                 <div><span @click="cancle">取消</span><span @click="sure">确定</span></div>
                    <mt-picker :slots="myAddressSlots" @change="onMyAddressChange" :visible-item-count="5" ></mt-picker >
             </div>
         </div>
         </transition>
    </div>
</template>
<script>
import personTop from '@/components/personTop/index'
 import myaddress from '@/common/json/address3.json'
export default {
    data(){
        return{
            id:'',
            model:false,
            data:'',
            myAddressProvince:'省',
            myAddressCity:'市',
            myAddresscounty:'区/县',
            myAddressSlots: [
                    {
                        flex: 1,
                        defaultIndex: 1,        
                        values: Object.keys(myaddress),    //省份数组
                        className: 'slot1',
                        textAlign: 'center'
                    }, {
                        divider: true,
                        content: '-',
                        className: 'slot2'
                    }, {
                        flex: 1,
                        values: [],
                        className: 'slot3',
                        textAlign: 'center'
                    },
                    {
                        divider: true,
                        content: '-',
                        className: 'slot4'
                    },
                    {
                        flex: 1,
                        values: [],
                        className: 'slot5',
                        textAlign: 'center'
                    }
                ],
        }
        
    },
      methods:{//三级联动
        onMyAddressChange(picker, values) {
              if(myaddress[values[0]]){    //这个判断类似于v-if的效果（可以不加，但是vue会报错，很不爽）
                    picker.setSlotValues(1,Object.keys(myaddress[values[0]])); //  Object.keys()会返回一个数组，当前省的数组
                    picker.setSlotValues(2,myaddress[values[0]][values[1]]); //  区/县数据就是一个数组
                    this.myAddressProvince = values[0];
                    this.myAddressCity = values[1];
                    this.myAddresscounty = values[2];
                }
            },
      back(){
          this.$router.back();
      },
      cancle(){//取消按钮
            this.model=false;
            this.addressProvince=this.data.adPro;
            this.addressCity=this.data.adCity;
            this.addressXian=this.data.adCounty;
      },
      sure(){//确定按钮
      this.model=false;
            this.data.adPro=this.addressProvince;
            this.data.adCity=this.addressCity;
            this.data.adCounty=this.addressXian;
      }
    },
  components:{personTop},
  mounted(){
      this.$nextTick(() => {  //vue里面全部加载好了再执行的函数   （类似于setTimeout）
                this.myAddressSlots[0].defaultIndex = 0        
                // 这里的值需要和 data里面 defaultIndex 的值不一样才能够初始化
                //因为我没有看过源码（我猜测是因为数据没有改变，不会触发更新）
            });
      //判断是否传入数据，确定是新增地址还是编辑地址
      this.id=this.$route.query.id;
    //   console.log(this.id);
      if(this.$route.query.id){//如果有数据 请求数据库
          this.data={"id":"1","name":"清风徐来","tel":"13511111111","adPro":"四川省","adCity":"成都","adCounty":"龙泉驿","admain":"经开区南一路666号8楼"}
            this.addressProvince=this.data.adPro;
            this.addressCity=this.data.adCity;
            this.addressXian=this.data.adCounty;
     }else{//如果没有数据 将地址设置默认空
          this.data={"id":"","name":"","tel":"","adPro":"","adCity":"","adCounty":"","admain":""}
      }
  },
  deactivated(){//防止keep-alive影响
      this.$destroy()
  }
}
</script>
<style lang="less" scoped>
@import '~less/variable';
.editDetail{//地址列表内容
    font-size: .3rem;
    ul{
        background-color: @background;
        li{ 
            margin-left: .2rem;
            margin-right: .18rem;
            height: .9rem;
            line-height: .9rem;
            border-bottom:1px solid @border;
            input{
                height: .8rem;
                background-color: @background;
                width: 70%;
                outline:none;
            }
            .ipt{
                width: 78%;
            }
        }
    }
    .makeSuer{
        text-align: center;
        button{
            margin-top: 1rem;
            padding: .1rem .3rem;
            border: 0;
            border-radius: .15rem;
            background-color: @fs-i;
            color: @color-l;
        }
    }   
}
.pick{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background:@bgrgba;
    z-index: 100;
    .pickContainer{
            position: fixed;
            bottom: 0;
            width: 100%;
            font-size: .3rem;
          div:nth-child(1){//确认取消按钮
                height: .5rem;
                
                width: 100%;
                background: @bgcolor-body;
                padding-right: .2rem;
                padding-left: .2rem;
                span:nth-child(2){
                    float: right;
                }
            }
    }
  
    .picker{
            width: 100%;
            background: @bgcolor-body;
        }
}
 
</style>

