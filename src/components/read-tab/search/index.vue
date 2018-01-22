<template>
    <div class="search">
        <div class="title">
            <Row>
                <Col span="2" offset="2">
                  <span @click="back()">
                    <Icon type="chevron-left"></Icon>
                  </span>
                </Col>
                <Col span="15">
                  <input type="text" placeholder="请输入搜索信息" v-model="text">
                </Col>
                <Col span="3" offset="1">
                  <span @click="search">搜索</span>
                </Col>
            </Row>
            <section style="margin-left: 0.2rem">
                <div class="record" v-for="(record,index) in record">
                    <div @click="reco(index)">{{record}}
                        <span @click="del(index)" style="float: right;margin-right: 0.3rem">
                            <Icon type="ios-close-empty"></Icon>
                        </span>
                    </div>
                </div>
                <div class="record_del">清除搜索记录</div>
            </section>
        </div>
            <div>
                <router-view></router-view>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
      data(){
        return {
          text:'',
            record:[]
        }
      },
      methods: {
        back(){
          this.$router.back(-1)
        },
        search(){
          this.$router.push({name:'search_per',query:{record:this.text}})
          alert(this.text)
            this.record.push(this.text)
          this.text = ''
        },
          reco(index){
            this.$router.push({name:'search_per',query:{record:this.text}})
          },
          del(index){
              this.record.splice(index,1)
          }
      }
    }
</script>
<style scoped lang="less">
    @import "~less/variable";
.search{
    font-size: 0.34rem;
    margin-top: 0.2rem;
    .title{
        position: fixed;
        top:0;
        width: 100%;
        height: 0.8rem;
        background: rgba(255,255,255,1);
        padding-top: 0.2rem;
        opacity: 1;
        z-index: 220;
        >div{
            width: 100%;
            >div:nth-child(2){
                input{
                    outline: none;
                    background: @border url("../img/search.png") no-repeat 0.1rem 50%;
                    border-radius: 5px;
                    width: 100%;
                    padding-left: 0.5rem;
                }
            }
            >div:nth-child(3){
                color: @fs-l;
            }
        }
    }
    >div:nth-child(2){
        margin-top: 0.8rem;
    }
    .record_del{
        text-align: center;
        color: @fs-l;
        font-size: 0.24rem;
    }
}


</style>