<template>
    <div class="video">
        <Row class="title">
            <Col span="2">
                <span @click="back()">
                   <Icon type="chevron-left" color="#000"></Icon>
                </span>

            </Col>
            <Col span="19">
                <h4>完善视频信息</h4>
            </Col>
            <Col span="3">
                <span @click="upload()">发布</span>
            </Col>
        </Row>
        <section class="videos" @click="play()">
            <video id="videopaly" 	autoplay :src="videoSrc" width="100%" height="100%"></video>
        </section>
        <section class="text">
            <textarea v-model="text" autofocus rows="1" placeholder="请输入标题(30字以内)" maxlength="30"></textarea>
        </section>
      <canvas id="canvas" v-show="false"></canvas>
    </div>
</template>
<script type="text/ecmascript-6">
    import {func} from '@/common/js/base/videotape.js'
    export default {
        data(){
            return{
                video:'2',
                videoSrc:'',
                text:'',
                position:new Object(),
                videoimg:''
            }
        },
        methods:{
            videopaly(){
                this.video = this.$store.state.videoEntry;
                this.videoSrc = this.video[0].videoSrc;
//                console.log(this.videoSrc)
//              let video = document.addEventListener('onload',)
              this.$options.methods.videoImgs()
              console.log(this,'4')
            },
            back(){
                this.$router.back(-1)
            },
            play(){
                var video = document.getElementById('videopaly');
                video.play()

            },
            videoImgs(){
              let th = this;
              let video = document.getElementById('videopaly');
              video.addEventListener('loadeddata',captureImage);
              function captureImage () {
                var canvas = document.getElementById('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                canvas.getContext('2d').drawImage(video,0,0,canvas.width,canvas.height);
                console.log(th.$store.state.videoimg)
              }
            },
            upload(){
              let th = this
              this.$loca.onPlusReady();
                let text = this.text;
//                let videoImg = this.videoimg
                alert('2')
                console.log(this.$store.state.videoimg)
              setTimeout(function () {
                func.upload(text)
              },500)
              this.text = ''

            },

        },
        activated(){
            this.videopaly()
        }
    }
</script>
<style scoped lang="less">
    @import "~less/variable";
    .video{
        .title{
            background: @bgcolor-body;
            height: 0.8rem;
            font-size: 0.4rem;
            margin-left: 0.2rem;
            >div:nth-child(2){
                text-align: center;
            }
            >div:nth-child(3){
                span{
                    font-size: 0.34rem;
                    text-align: center;
                    color: #2d8cf0;
                }
            }
        };
        .videos{
            /*border:1px solid red;*/
            width: 100%;
            height: 7rem;
            video{
                width: 100%;
                height: 100%;
            }
        };
        .text{
            margin: 0 0.2rem;
            textarea{
                width: 100%;
                height: 1.01rem;
                line-height: 0.9rem;
                font-size: 0.4rem;
                border: none;
                outline: none;
                border-bottom: 2px solid @fs-m;
            }
        }
    }
</style>
