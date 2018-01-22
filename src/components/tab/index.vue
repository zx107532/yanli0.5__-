
<template>
<div class="totle">
  <!-- <Row class="top">
     <Col class="msg" span="8">
         <router-link to="/msg">
            <Badge dot>
              <img src="../../../static/msgPop.png">
            </Badge>
        </router-link> 
        
     </Col>
     <Col span="8" class="title">
        <span>首页</span>
     </Col>   
     <Col span="8" class="addPerson">
        <img src="../../../static/addFriend.png">
     </Col>      
  </Row> -->
  <Row class="myhead">
  			<Col span="6" v-for="(item,index) in msg" :key="index" >
        <div class="outBtn" @click="setCur(item.id,item.path)">
          	<span class="reset"   :class="{active:item.iscur}" >{{item.name}}</span>
        </div>
  				</Col>
        <!--<Col span="6"><router-link class="reset" to="">我</router-link></Col>
        <Col span="6"><router-link class="reset" to="/index/family" >家庭</router-link></Col>
        <Col span="6"><router-link class="reset" to="/index/relative">亲友</router-link></Col>
        <Col span="6"><router-link class="reset" to="/index/focus">关注</router-link></Col>-->
    </Row>
</div>
</template>
<script type="text/ecmascript-6">
  export default {
    props:['msg'],
    data () { 
      return {
       
      }
    },
    methods:{
    	setCur: function (index,path) {
    	this.msg.map(function (v,i) {
        i==index? v.iscur=true: v.iscur=false;
    	})
    this.$router.push({path:path})
    }
  }
    }
</script>
<style scoped lang="less">
 @import '~less/variable';
 .totle{
  //  position: absolute;
   top: 0;
   z-index: 10;
   width: 100%;
 }
//  设置导航栏样式
.myhead{
  text-align: center;
  height:89/100rem;
  line-height:89/100rem;
  border-bottom: 4/100rem solid #e7e7e7;
}
// 重置功能字体样式 
.reset{
  font-size:30/100rem;
  color:#000;
}
// 设置标签唤醒状态样式
.active{
  color:#ec5241;
  padding:48/2/100rem;
  border-bottom: 4/100rem solid #ec5241;
}
// 顶部标签样式设置
.top{
  height:89/100rem;
  line-height:89/100rem;
}
.outBtn{
  width: 100%;
}
.top .msg{
  padding-left: 29/100rem;
}
.top .title{
  font-size:34/100rem;
  text-align: center;
}
.top .addPerson{
  text-align: right;
  padding-right: 30/100rem;
}
</style>