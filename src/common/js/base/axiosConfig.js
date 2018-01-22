import axios from 'axios'
import qs from 'qs'
import store from '@/vuex/store'
import router from '@/router'
axios.defaults.timeout = 5000;                        //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';           //配置请求头
axios.defaults.headers.get['Content-Type'] = 'application/json;charset=UTF-8';           //配置请求头
axios.defaults.baseURL = '/';   //配置接口地址
axios.defaults.baseURL = 'http://182.151.104.205:16000/elderly/';   //配置接口地址
// axios.defaults.baseURL = 'http://192.168.0.107:8081/elderly/';   //配置接口地址
// axios.defaults.headers.token =store.state.token
//POST传参序列化(添加请求拦截器)
// axios.defaults.headers.post['Authorization']=store.state.token;
var CancelToken = axios.CancelToken;
var source = CancelToken.source();
axios.interceptors.request.use((config) => {
	//在发送请求之前做某件事
    if(config.method  === 'post'){
        config.data = qs.stringify(config.data);
    }
    if (store.state.token) {//等解决跨域
        config.headers.authorization =`${localStorage.mobilephone}_${store.state.token}`;
    }
    return config;

},(error) =>{
    return Promise.reject(error);
});
//返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) =>{
	//对响应数据做些事
    if(!res.status==200){
        // _.toast(res.data.msg);
        return Promise.reject(res);
    }
    return res;
}, (error) => {
    if (error.res) {
        switch (error.res.status) {
            case 401:
                // 401 清除token信息并跳转到登录页面
                store.commit(types.LOGOUT);
                router.replace({
                    path: 'page',
                    query: {redirect: router.currentRoute.fullPath}
                })
        }
    }
    return Promise.reject(error);
});
//返回一个Promise(发送post请求)
export function fetch(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params,{cancelToken: source.token})
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
            .catch((error) => {
               reject(error)
            })
    })
}
//返回一个Promise(发送get请求)
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url,{params:params},{cancelToken: source.token})
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
            .catch((error) => {
               reject(error)
            })
    })
}
export default {

  /**
   * 用户注册
   */
  Regist(params) {
    return fetch('/account/regist', params)
  },
  /**
   * 手机号是否存在检查
   */
  Phone(params) {
    return fetch('/account/checkmobilephone', params)
  },
  /**
   * 用户登陆
   */
  login(params){
    return fetch('/account/login', params)
  },
  /**
   * 用户信息修改
   */
  change(params){
    return fetch('/user/update/data',params)
  },
  /**
   * 用户头像修改
   */
  changePic(params){
    return fetch('/user/update/photo',params)
  },
  /**
   * 用户个人信息
   */
  personal(params){
    return fetch('/user/basedata',params)
  },
  /**
   * 好友数量
   */
  friendCount(params){
    return fetch('/userorder/groupfriendcount',params)
  },
  /**
   * 列表显示好友
   */
  friendList(params){
    return fetch('/userorder/listfriend',params)
  },
  /**
   * 查看好友详情
   */
  userDetail(params){
    return fetch('/userorder/friend',params)
  },
  /**
   * 地图分组显示
   */
  groupPosition(params){
    return fetch('/gps/groupposition',params)
  },
  /**
   * 个人定位
   */
  selfPosition(params){
    return fetch('/gps/selfposition',params)
  },
  /**
   * 个人定位信息查看
   */
  presentPoi(params){
    return fetch('/gps/mypresentgps',params)
  },
  /**
   * 整天位置
   */
  wholeDaypoi(params){
    return fetch('/gps/onedayposition',params)
  },
  /**
   * 添加好友进入某一权权限
   */
  addromenben(params){
    return fetch('/userorder/addtomemben',params)
  },
  /**
   * 申请好友
   */
  apply(params){
    return fetch('/userorder/apply',params)
  },
  /**
   * 查看好友申请列表
   */
  applylist(params){
    return fetch('/userorder/applist',params)
  },
  /**
   * 取消好友申请
   */
  cancelapply(params){
    return fetch('/userorder/cancelaaply',params)
  },
  /**
   * 删除分组
   */
  delgroup(params){
    return fetch('/userorder/delgroup',params)
  },
  /**
   * 从某权限删除好友
   */
  deltomemben(params){
    return fetch('/userorder/deltomemben',params)
  },
  /**
   * 修改好友资料
   */
  editfriend(params){
    return fetch('/userorder/editfriend',params)
  },
  /**
   * 处理好友请求
   */
  handleapply(params){
    return fetch('/userorder/handleapply',params)
  },
  /**
   * 创建新分组
   */
  newgroup(params){
    return fetch('/userorder/newsgroup',params)
  },
      /**
     * 当前用户动态
     * */
    userDynamic(params){
      return get('/dynamics/mydynamics',params)
    },
    /**
     * 用户个人信息
     */
    personal(params){
        return fetch('/user/basedata',params)
    },
     /**
     * 好友数量
     */
    friendCount(params){
        return fetch('/userorder/groupfriendcount',params)
    },
    /**
     * 列表显示好友
     */
    friendList(params){
        return fetch('/userorder/listfriend',params)
    },
     /**
     * 查看好友详情
     */
    userDetail(params){
        return fetch('/userorder/friend',params)
    },
    /**
     * 提交文章评论 需要参数：用户ID userID，资源ID resourceID ,资源类型  resourceType, 评论内容 detail
     * */
    commentText(params){
      return get('/comment/publish',params)
    },
  /**
     * 地图分组显示
     */
    groupPosition(params){
        return fetch('/gps/groupposition',params)
    },
    /**
     * 个人定位
     */
    selfPosition(params){
        return fetch('/gps/selfposition',params)
    },
    /**
     * 整天位置
     */
    wholeDaypoi(params){
        return fetch('/gps/onedayposition',params)
    },
    /**
     * 添加好友进入某一权权限
     */
    addromenben(params){
        return fetch('/userorder/addtomemben',params)
    },
    /**
     * 申请好友
     */
    apply(params){
        return fetch('/userorder/apply',params)
    },
    /**
     * 查看好友申请列表
     */
    applylist(params){
        return fetch('/userorder/applylist',params)
    },
    /**
     * 取消好友申请
     */
    cancelapply(params){
        return ftch('/userorder/cancelaaply',params)
    },
    /**
     * 删除分组
     */
    delgroup(params){
        return fetch('/userorder/delgroup',params)
    },
    /**
     * 从某权限删除好友
     */
    deltomemben(params){
        return fetch('/userorder/deltomemben',params)
    },
    /**
     * 修改好友资料
     */
    editfriend(params){
        return fetch('/userorder/editfriend',params)
    },
    /**
     * 处理好友请求
     */
    handleapply(params){
        return fetch('/userorder/handleapply',params)
    },
    /**
     * 创建新分组
     */
    newgroup(params){
        return fetch('/userorder/newsgroup',params)
    },
       /**
     * 用户动态
     * */
    userDynamic(params){
        return get('/dynamics/mydynamics',params)
      },
      /**
       * 所有用户动态
       * */
      dynamic(params){
        return get('/dynamics/dynamicslist',params)
      },
      /**
       * 动态内容  动态类型：Text普通动态 ， Gallery 纯图片动态 ， Gallery
       * */
      dynamicsText(params){
        return get('/dynamicstext/text',params)
      },
      /**
       * 提交文章评论 需要参数：用户ID userID，资源ID resourceID ,资源类型  resourceType, 评论内容 detail
       * */
      commentText(params){
        return fetch('/comment/publish',params)
      },
      /**
       * 动态点赞 参数：用户ID userID，资源ID resourceID ,资源类型  resourceType，点赞确认 inPosirive
       * */
      dynamicLike(params){
        return fetch('/likeinfo/like',params)
      },
      /**
       *作者回复评论 参数：用户ID userID, 回复内容 replyDetail,被回复ID commentInfoID
       */
      commentReply(params){
          return fetch('comment/reply',params)
      },
      /**
       *查询评论回复 参数：评论ID commentid, 回复第几页 page,每页条数 size
       */
      commentReplys(params){
        return fetch('comment/replylist',params)
      },
      /**
       * 获取评论列表 参数: 资源ID resourceID, 第几页 page,每页条数 size
       */
      commentList(params){
        return get('comment/commentlist',params)
      },
      /**
       * 获取视频动态详情 参数:资源ID id
       */
      video(params){
        return get('/dynamicsvideo/video',params)
      },
      /**
       * 获取视频动态列表
       */
      videolist(params){
        return get('/dynamicsvideo/videolist',params)
      },
  /**
   * 获取周边动态 参数：lan 纬度 ，lng 经度，radius 半径 公里，page 第几页， size 多少条
   */
    bypoint(params){
      return get ('/dynamics/dynamicslistbypoint',params)
  },
  /**
   * 獲取推荐动态  参数：page 页数，size 数量
   */
  dynamicstopslist(params){
    return get ('dynamics/dynamicstopslist',params)
  },
  /**
   * 查询单条语音
   */
  audio(params){
    return fetch('chat/accesschat',params)
  },
  /**
   * 查询所有语音
   */
  audiolist(params){
    return fetch('chat/chatlist',params)
  }

}
