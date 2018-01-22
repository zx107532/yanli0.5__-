import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    resourceID: '',
    videoimg:'',
    location:'',
    userId: '',
    category:'',
    readTab:'',
    position:'',
    camera:'',
    phone:[],
    read_tap:'',
    classification:'',
    videoEntry:[],
    userPic:[],
    local:null,
    token:null,
    mapdata:'',//家庭地图
    reMap:'',//亲友地图
    personalDetail:'',//个人信息详情
    resourceType:'',
    applyList:'',//好友申请列表
    fmap:'',//存储家庭地图进入一天活动数据
    rmap:'',//存储亲友地图进入一天活动数据
    mydata:"",//存储自己所有数据
    msgMount:'',//存储实时消息
  },
  mutations: {
    contentType (state,msg){//动态类型
      state.contentType = msg
    },
    videoimg (state,msg){//视频截图
      state.videoimg = msg
    },
    location (state,msg){//获取坐标
      state.location = msg
    },
    resourceID (state,msg){//文章ID
      state.resourceID = msg
    },
    userId(state,msg){//用户ID
      state.userId = msg
    },
    category(state,msg){//文章类别
      state.category = msg
    },
    readTab(state,msg){//咨询索引回掉
      state.readTab = msg
    },
    position(state,msg){//资讯发表位置
      state.position = msg
    },
    camera(state,msg){//调取相机或相册
      state.camera = msg
    },
    phone(state,msg){
      state.phone = msg
    },
    read_tap(state,msg){
      state.read_tap = msg
    },
    classification(state,msg){
      state.classification = msg
    },
    videoEntry(state,msg){//录像文件
      state.videoEntry = msg
    },
    userPic(state,msg){//用户头像
        state.userPic = msg
    },
    local(state,msg){
       state.local=msg
    },
    token(state,data){//存储token
        // data=localStorage.token;
      state.token = data;
    },
    mapdata(state,data){//存储家庭地图数据
      state.mapdata=data
    },
    reMap(state,data){//存储亲友地图数据
      state.reMap=data
    },
    personalDetail(state,data){//储存个人信息详情
      state.personalDetail=data
    },
    applyList(state,data){//储存好友申请列表
      state.applyList=data
    },
    fmap(state,data){//存储家庭地图进入一天动态
      state.fmap=data
    },
    rmap(state,data){//存储亲友地图进入一天动态
      state.rmap=data
    },
    mydata(state,data){//存储token

      state.mydata = data;
  },
  msgMount(state,data){//存储实时消息
      state.msgMount=data
  }
  }
})

export default store
