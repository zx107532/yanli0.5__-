<template>
  <div class="requestContainer">
       <!-- 上方返回以及标题 -->
      <div class="topmenu">
           <Row>
                <Col span="8"><p @click="back"><Icon type="chevron-left"></Icon></p></Col>
                <Col span="8">我的好友申请</Col>
          </Row>
      </div>
      <!-- 申请列表 -->
      <div class="reqList">
          <ul>
              <li v-for="(item,index) in requestList" :key="index">
                <Row>
                    <Col span="6"><img :src="item.srcPhoto" @click="detail(item.id)"></Col>
                    <Col span="10">
                        <p>{{item.srcUserName}}</p>
                        <p class="time">{{item.applyTime}}</p>
                        <span>验证消息：{{item.srcMsg}}</span>
                    </Col>
                    <Col span="8">
                        <button v-show="item.agreeShow" @click="agree(index)"> 同意</button> <button v-show="item.agreeShow" @click="disagree(index)">拒绝</button>
                        <p v-show="!item.agreeShow"><button v-show="item.agShow">已同意</button><button v-show="!item.agShow">已拒绝</button></p>
                    </Col>
                </Row>
              </li>
          </ul>
      </div>
  </div>
</template>
<script>
export default {
    data(){
        return{
            requestList:[
                // {"id":"1","name":"哈哈","upic":require('./img/pop1.png'),"msg":"你好啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊"},
                // {"id":"2","name":"阿萨德撒","upic":require('./img/pop2.png'),"msg":"你好"},
                // {"id":"3","name":"沙发上","upic":require('./img/pop3.png'),"msg":"你好"},
            ],
            agreeShow:true,
            agShow:''
        }
    },
  methods:{
       fmtDate(obj){//时间转换
            var date =  new Date(obj);
            var y = 1900+date.getYear();
            var m = "0"+(date.getMonth()+1);
            var d = "0"+date.getDate();
            return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
        },
      back(){
          this.$router.back()
      },
      detail(id){
          console.log(id)
        //   this.$router.push({path:'/index/detail'})
      },
      agree(index){//同意好友请求
          this.$router.push({path:'/index/addfid/agree',query:{detail:this.requestList[index]}})
          this.requestList[index].agreeShow=false;
          this.requestList[index].agShow=true;
      },
      disagree(index){//拒绝好友请求
               let remsg={
                applyId:this.requestList[index].id,
                handlestatus:'拒绝',
                remark:'',
                groupname:'关注',
                username:localStorage.myname
        }
        this.$ajax.handleapply(remsg)
                 .then(res=>{
                     console.log(res)
                this.requestList[index].agreeShow=false;
                this.requestList[index].agShow=false;
                console.log(this.requestList[index])
                 })
                 .catch(error=>{

                 })
      }
  },
  created(){
        this.requestList=this.$store.state.applyList;
        for(let i=0;i< this.requestList.length;i++){
            this.requestList[i].applyTime=this.fmtDate(this.requestList[i].applyTime)
        }
        //判断是否已添加好友
        // for(let i=0;i<this.requestList.length;i++){
        //     if(this.requestList[i].handleStatus==1){
        //         this.requestList[i].agreeShow=true
        //         this.requestList[i].agShow=true
        //     }else if(this.requestList[i].handleStatus==2){
        //         this.requestList[i].agreeShow=false
        //         this.requestList[i].agShow=true
        //     }else if(this.requestList[i].handleStatus==3){
        //         this.requestList[i].agreeShow=false
        //         this.requestList[i].agShow=false
        //         console.log(this.requestList[i].agreeShow)
        //         console.log(this.requestList[i])
                
        //     }                           
        // } 
  },
  mounted(){
     
   
  },
  activated(){
       this.requestList=this.$store.state.applyList;
        for(let i=0;i< this.requestList.length;i++){
            this.requestList[i].applyTime=this.fmtDate(this.requestList[i].applyTime)
        }
        // 判断是否已添加好友
        //         for(let i=0;i<this.requestList.length;i++){
        //              this.requestList[i].agreeShow=true;
        //              this.requestList[i].agShow=true; 
                
        // } 
  }
}
</script>

<style lang="less" scoped>
 @import '~less/variable';
 .requestContainer{
     position: fixed;
     top: 0;
     left: 0;
     right: 0;
     bottom: 0;
     z-index: 10;
     overflow: scroll;
     background-color: @background-i;
         img{
          max-width:100%;
          max-height: 100%;
      }
        .topmenu{//顶部导航
          font-size: .34rem;
          height: .9rem;
          background-color: @fs-i;
          color: @color-l;
          line-height: .9rem;
          >div{
              >:nth-child(1){
                  padding-left: .22rem;
              }
              >:nth-child(2){
                  text-align: center;
              }
              >:nth-child(3){
                  text-align: right;
                  padding-right: .2rem
              }
          }
      }
      .reqList{
          margin-top: .5rem;
          li{
              border-bottom: 1px solid @border;
              font-size: .3rem;
              background-color: @bgcolor-body;
              padding: .3rem;
              >:nth-child(1){
                  >:nth-child(1){
                      height: 1rem;
                      img{
                          border-radius: 50%;
                      }
                  }
                  >:nth-child(3){
                      text-align: right
                  }
              }
              button{
                  border:none;
                  outline: none;
                  background-color: @bgcolor-body;
              }
          }
          
      }
 }
</style>
