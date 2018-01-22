<template>
    <div class="comment">
        <div>
            <Row>
                <Col span="6">
                <span>
                    <img src="./img/logo_1.png" style="height: 0.5rem">
                </span>
                <span style="font-size: 0.34rem">评论</span>
                </Col>
            </Row>
            <div v-for="(com,comindex) in da">
                <Row>
                    <Col span="2">
                        <span @click="personals(comindex)">
                            <img :src="com.userPhoto" style="width: 100%">
                        </span>
                    </Col>
                    <Col span="10" offset="1">
                        <span @click="personals(comindex)">{{com.userName}}</span><br>
                        <span>{{com.time}}</span>
                    </Col>
                    <Col span="2" offset="7">
                        <span @click="fabulous(comindex)" >
                            <img src="./img/zan-r.png" v-if="com.fabulow" style="width: 44px">
                            <img src="./img/zan-w.png" v-else="com.fabulow" style="width: 44px">
                        </span>
                        <span>
                            {{com.countLike}}
                        </span>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p @click="reply(comindex)">
                            {{com.detail}}
                        </p>
                    </Col>
                </Row>
            </div>

        </div>
        <div class="footer">
            <Row>
                <Col span="13">
                    <input type="text" placeholder="我来说几句" v-model="detail">
                </Col>
                <Col span="2" offset="1">
                    <a href="#comment">
                        <img src="./img/news.png">
                    </a>
                    <!--<span></span>-->
                </Col>
                <Col span="2" offset="1">
                    <span>
                        <Icon type="android-star-outline"></Icon>
                    </span>
                </Col>
                <Col offset="1" span="2">
                  <span @click="Release()">
                    <!--<Icon type="more"></Icon>-->
                    发布
                  </span>
               </Col>
            </Row>
        </div>

    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        data(){
            return{
                cla:'',
                id:'',
                da:[],
                detail:'',
                datas:[
                    {
                        UUID:'0035',
                        comments:[
                            {
                                userName:'朝阳',
                                userId:'00036',
                                uuid:'852',
                                userImg:require('./img/cat-s.png'),
                                content:'少时诵诗书所所所所',
                                time:'14:23',
                                fabulous:'22',
                                fabulow:false,
                                address:'成都龙泉',
                                comment:[
                                    {
                                        userName:'朝阳',
                                        userId:'00036',
                                        userImg:require('./img/cat-s.png'),
                                        content:'少时诵诗书所所所所',
                                        time:'14:23',
                                        fabulous:'22',
                                        fabulow:false,
                                        address:'成都龙泉'
                                    },
                                    {
                                        userName:'朝阳',
                                        userId:'00036',
                                        userImg:require('./img/cat-s.png'),
                                        content:'少时诵诗书所所所所',
                                        time:'14:23',
                                        fabulous:'22',
                                        fabulow:false,
                                        address:'成都龙泉'
                                    },
                                    {
                                        userName:'朝阳',
                                        userId:'00036',
                                        userImg:require('./img/cat-s.png'),
                                        content:'少时诵诗书所所所所',
                                        time:'14:23',
                                        fabulous:'22',
                                        fabulow:false,
                                        address:'成都龙泉'
                                    },
                                ]
                            },
                            {
                                userName:'朝阳',
                                userId:'00036',
                                uuid:'741',
                                userImg:require('./img/cat-s.png'),
                                content:'少时诵诗书所所所所',
                                time:'14:23',
                                fabulous:'22',
                                fabulow:false,
                                address:'成都龙泉',
                                comment:[
                                    {
                                        userName:'朝阳',
                                        userId:'00036',
                                        userImg:require('./img/cat-s.png'),
                                        content:'少时诵诗书所所所所',
                                        time:'14:23',
                                        fabulous:'22',
                                        fabulow:false,
                                        address:'成都龙泉'
                                    },
                                    {
                                        userName:'朝阳',
                                        userId:'00036',
                                        userImg:require('./img/cat-s.png'),
                                        content:'少aaaaaaaa',
                                        time:'14:23',
                                        fabulous:'22',
                                        fabulow:false,
                                        address:'成都龙泉'
                                    },
                                ]
                            },
                        ]
                    }
                ]
            }
        },
        methods:{
            fabulous(index){
              var datas = this.da
              var data = {
                userID:datas[index].userID,
                resourceID:this.$store.state.resourceID,
                resourceType:'Text',
                isPositive:true
              }
                if (!datas[index].fabulow){

                  this.$ajax.dynamicLike(data).then(msg=>{
                    datas[index].countLike++
                    datas[index].fabulow = !datas[index].fabulow
                  })

                }
            },
            Release(){
              var data = {
//                userID:this.$store.state.userId,
                userID:'13219561717',
                resourceID:this.$store.state.resourceID,
                resourceType:this.$store.state.contentType,
                detail:this.detail
              };
              console.log(data)
              this.$ajax.commentText(data).then(msg=>{
                console.log(msg)
                this.datail = ''
              })
            },
            reply(comindex){
                this.$router.push({name:'read_reply',query:{comment:this.da[comindex]}})
            },
            personals(comindex){//往人物动态跳转并传递层主ID
                this.$router.push({path:'/index/detail',query:{userId:this.datas[0].comments[comindex].userId}})
                this.$store.commit('userId',this.datas[0].comment[comindex].userId)
            },
            http(){
//              console.log(this.$store.state.resourceID)
              var i = 1
//              console.log(this.id)
              var data = {
                page:i,
                size:'10',
                resourceID:this.$store.state.resourceID,
//                resourceID:'12'
              };
              this.$ajax.commentList(data).then(msg=>{
                for (var i=0;i<msg.length;i++){
                  msg[i].fabulow = false
                }
                this.da = msg
                console.log(this.da)
                i++
              })
            }
        },
      activated(){
          this.http()
      }

    }

</script>
<style scoped lang="less">
    @import "~less/variable";
    .comment{
        font-size:0.34rem;
        margin-left: 0.2rem;
        position: static;
        top:0;
        p{font-size: 0.3rem}
        >div{
            >div{
                margin-top: 0.2rem;
                font-size: 0.24rem;
                >div:nth-child(1){
                    >div:nth-child(3){
                        color: @fs-i;
                    }
                }
                >div:nth-child(2){
                    margin-top: 0.2rem;
                  a{
                    color: black;
                    font-size: 0.5rem;
                  }
                }
            }
        }
    }
    .footer{
        height: 0.8rem;
        position: fixed;
        bottom: 0;
        width: 100%;
        border-top:#D2D2D2 1px solid;
        margin-left: -0.2rem;
        font-size: 0.5rem;
        background: @bgcolor-body;
        >div{
            margin-top: 0 !important;
            padding-left: 0.2rem;
            height: 100%;
            padding-top: 0.1rem;
            >div{
                >span{
                    /*display: inline-block;*/
                    height: 0.5rem;
                    width: 0.4rem;
                    font-size: 0.5rem;
                }
            }
            >div:nth-child(1){
                height: 100%;
                input{
                    width:100%;
                    height: 100%;
                    outline: none;
                    background: #D2D2D2;
                    padding: 0.2rem;
                    border-radius: 5px;
                }
            }
          >div:nth-child(2){
            margin-top: 0 !important;
            a{
              display: block;
              width: 0.4rem;
              img{
                width: 100%;
                height: 100%;
              }
            }
          }
          >div:nth-child(4){

            span{
              font-size: 44px;
              line-height: 0.8rem;
            }
          }
        }
    }
</style>
