<template>
    <div class="commentBack">
        <div class="comment_title">
            <Row>
                <Col span="2">
                    <span @click="back()">
                        <Icon type="android-close"></Icon>
                    </span>
                </Col>
                <Col span="20">
                <span>{{comment.comment.length}}</span>
                <span>条回复</span>
                </Col>
            </Row>
            <Row>
                <Col span="2">
                    <img :src="comment.userImg" @click="personals(comindex)" style="width: 100%">
                </Col>
                <Col span="12" offset="1">
                    <p @click="personals(comindex)">{{comment.userName}}</p>
                    <span>{{comment.address}}</span>
                    <span>{{comment.time}}</span>
                </Col>
                <Col span="4">
                    <span>
                        <img src="../img/zan-w.png">
                    </span>
                    <span>{{comment.fabulous}}</span>
                </Col>
                <Col span="4">
                    <span>
                        <img src="../img/reply.png">
                    </span>
                    <span>回复</span>
                </Col>
            </Row>
            <Row>
                <Col span="19" offset="3">
                <p>sss</p>
                </Col>
            </Row>
        </div>
        <div class="comment_content">
            <Row>
                <span>
                    <img src="../img/logo_1.png">
                </span>
                <span>全部评论</span>
            </Row>
            <div>
                <div v-for="(item,index) in comment.comment">
                    <Row>
                        <Col span="2">
                            <span>
                                <img :src="item.userImg" style="width: 100%;border-radius: 50%">
                            </span>
                        </Col>
                        <Col span="6" offset="1">
                        <p>{{item.userName}}</p>
                        <span>{{item.address}}</span>
                        <span>{{item.time}}</span>
                        </Col>
                        <Col span="4" offset="6">
                            <span @click="zhan(comindex)">
                                <img src="../img/zan-r.png" v-if="item.fabulow">
                                <img src="../img/zan-w.png" v-else="item.fabulow">
                            </span>
                        <span>{{item.fabulous}}</span>
                        </Col>
                        <Col span="4">
                        <span>
                                            <img src="../img/reply.png">
                                        </span>
                        <span>回复</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <p>{{item.content}}</p>
                        </Col>
                    </Row>
                </div>
            </div>

        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        data(){
            return{
                comment:'',
                ss:true
            }
        },
//        beforeMount(){
//            this.al()
//        },
//        watch:{
//            '$route':'al'
//        },
        activated(){
          this.al()
          this.http()
        },
        methods:{
            back(){
                this.$router.back(-1)
            },
            al(){
                this.comment = this.$route.query.comment
                console.log(this.comment)
            },
            http(){
              var data = {
//                commentid:this.comment.id,
                commentid:'123',
                page:1,
                size:5
              }
              this.$ajax.commentReplys(data).then(msg=>{
                console.log(msg)
              })
            }
        }
    }
</script>
<style scoped lang="less">
    @import "~less/variable";
    .commentBack{
        height: 100%;
        width: 100%;
        background: white;
        position:fixed;
        top:0px;
        left: 0;
        padding: 0.2rem;
        overflow: auto;
        padding-bottom: 0.9rem;
        z-index: 100;
        >div:nth-child(2){
            margin-top: 0.3rem;
        }
    }

    .comment_title{
        font-size: 0.34rem !important;
        padding-bottom: 0.3rem;
        border-bottom: 1px solid #B5B5B5;
        p{font-size: 0.3rem}
        >div:nth-child(1){

            >div:nth-child(1){
                text-align: center;
            }
            >div:nth-child(2){
                text-align: center;
            }
        }
        >div:nth-child(2){
            margin-top: 0.3rem;
            >div:nth-child(2){
                p{
                    font-size: 0.3rem;
                }
                span{
                    font-size: 0.2rem;
                    float: left;
                    color: #969696;
                }
            }
            >div:nth-child(3){
                color: #969696;
                span{
                    img{width: 30%}
                }
            }
            >div:nth-child(4){color: #969696}
        }
    }
    .comment_content{
        font-size: 0.34rem;
        p{font-size: 0.3rem}
        >div:nth-child(1){
            color: #969696;
        }
        >div:nth-child(2){
            >div{
                margin-top: 0.2rem;
                >div:nth-child(1){
                    >div:nth-child(2){
                        span{
                            font-size: 0.2rem;
                            float: left;
                            color: #969696;
                        }
                    }
                    >div:nth-child(3){
                        img{
                            width: 30%;
                        }
                        span{
                            color: #969696;
                        }
                    }
                    >div:nth-child(4){
                        color: #969696;
                    }
                }
            }
        }
    }
</style>
