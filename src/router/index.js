import Vue from 'vue'
import Router from 'vue-router'
import store from '@/vuex/store'

Vue.use(Router)

// export default new Router({
    const routes= [
    {
      path: '*', // 首页路由地址
      redirect: '/page'
    },
      {
        path: '/page', // 登录页 路由地址
        component: resolve => require(['@/view/homePage/index.vue'], resolve),
        children : [
            {
                path: '', //登陆 配置路由
                component: resolve => require(['@/view/homePage/login/index.vue'], resolve),
            },
            {
                path: 'register', // 我 配置路由
                component: resolve => require(['@/view/homePage/register/index.vue'], resolve),
            },
            {
                path: 'third', // 其他登陆方式 配置路由
                component: resolve => require(['@/view/homePage/thirdLoad/index.vue'], resolve),
                children:[
                   {
                    path: '', // 其他登陆方式 配置路由
                    component: resolve => require(['@/view/homePage/thirdLoad/main/index.vue'], resolve),
                   } ,
                   {
                    path: 'wechat', // 微信登陆 配置路由
                    component: resolve => require(['@/view/homePage/thirdLoad/wechat/index.vue'], resolve),
                   },
                   {
                    path: 'qq', // qq登陆 配置路由
                    component: resolve => require(['@/view/homePage/thirdLoad/qq/index.vue'], resolve),
                   },
                   {
                    path: 'phone', // 手机登陆 配置路由
                    component: resolve => require(['@/view/homePage/thirdLoad/phone/index.vue'], resolve),
                   }
                ]
            },
        ]
      },
      {
          path: '/index', // 主页 路由地址
        //   name:'mainPage',
          meta: {requireAuth: true},
          component: resolve => require(['@/view/index/index.vue'], resolve),
          children : [
              {
                  path: '', // 我 配置路由
                //   name:'myself',
                  meta: {requireAuth: true},
                  component: resolve => require(['@/view/index/myself/index.vue'], resolve),
              },
              {
                  path: 'set', //设置权限 配置路由
                  name:'set',
                  meta: {requireAuth: true},
                  component: resolve => require(['@/view/index/setting/index.vue'], resolve),
              },
              {
                  path: 'addfid', //添加好友 配置路由
                  name:'addfri',
                  meta: {requireAuth: true},
                  component: resolve => require(['@/view/index/addFriend'], resolve),
                  children:[
                      {
                          path:'',//添加好友 默认页面
                          meta: {requireAuth: true},
                          component: resolve => require(['@/view/index/addFriend/main'], resolve),
                      },
                        {
                            path: 'info', // 添加好友验证消息 路由地址
                            meta: {requireAuth: true},
                            component: resolve => require(['@/view/index/addFriend/valinfo'], resolve),
                        },
                        {
                            path: 'request', // 好友申请消息 路由地址
                            meta: {requireAuth: true},
                            component: resolve => require(['@/view/index/addFriend/request'], resolve),
                        },
                        {
                            path:'agree',//同意申请后设置
                            meta: {requireAuth: true},
                            component: resolve => require(['@/view/index/addFriend/agreeRequest'], resolve),
                        }
                  ]
              },
              {
                path: 'qr', // 二维码扫描 配置路由
                name:'qr',
                meta: {requireAuth: true},
                component: resolve => require(['@/view/index/qrcode/index.vue'], resolve),
            },
              {
                  path: 'family', // 家庭 路由地址
                //   name:'family',
                  meta: {requireAuth: true},
                  component: resolve => require(['@/view/index/family/index.vue'], resolve),
                  children:[
                      {
                          path: '', // 家庭动态 路由地址
                          meta: {requireAuth: true},
                          component: resolve => require(['@/view/index/family/active/index.vue'], resolve),
                      },
                      {
                          path: 'flist', // 家庭列表 路由地址
                          meta: {requireAuth: true},
                          component: resolve => require(['@/view/index/family/list/index.vue'], resolve),
                      },
                      {
                          path: 'map', // 家庭地图 路由地址
                          meta: {requireAuth: true},
                          component: resolve => require(['@/view/index/family/map/index.vue'], resolve),
                      },
                      {
                          path: 'acmap', // 个人详情地图 路由地址
                          meta: {requireAuth: true},
                          component: resolve => require(['@/view/index/family/activemap/index.vue'], resolve),
                      },
                      {
                        path: 'intercom', // 个人详情地图 路由地址
                        meta: {requireAuth: true},
                        component: resolve => require(['@/view/index/family/intercom'], resolve),
                    },
                  ]
              },
              {
                  path: 'search', // 搜索 路由地址
                  meta: {requireAuth: true},
                  component: resolve => require(['@/view/index/search/index.vue'], resolve),
              },
              {
                  path: 'relative', // 亲友 路由地址
                  meta: {requireAuth: true},
                  component: resolve => require(['@/view/index/relative/index.vue'], resolve),
                  children:[
                      {
                          path: '', // 亲友动态 路由地址
                          meta: {requireAuth: true},
                          component: resolve => require(['@/view/index/relative/active/index.vue'], resolve),
                      },
                      {
                          path: 'relist', // 亲友列表 路由地址
                          meta: {requireAuth: true},
                          component: resolve => require(['@/view/index/relative/list/index.vue'], resolve),
                      },
                      {
                          path: 'map', // 亲友地图 路由地址
                          meta: {requireAuth: true},
                          component: resolve => require(['@/view/index/relative/map/index.vue'], resolve),
                      },
                      {
                          path: 'acmap', // 个人详情地图 路由地址
                          meta: {requireAuth: true},
                          component: resolve => require(['@/view/index/relative/activemap/index.vue'], resolve),
                      },
                  ]
              },
              {
                  path: 'focus', // 关注 路由地址
                  meta: {requireAuth: true},
                  component: resolve => require(['@/view/index/focus/index.vue'], resolve),
                  children:[
                      {
                          path: '', // 关注动态 路由地址
                          meta: {requireAuth: true},
                          component: resolve => require(['@/view/index/focus/active/index.vue'], resolve),
                      },
                      {
                          path: 'folist', // 关注列表 路由地址
                          meta: {requireAuth: true},
                          component: resolve => require(['@/view/index/focus/list/index.vue'], resolve),
                      },
                      {
                          path: 'fosearch', // 关注搜索 路由地址
                          meta: {requireAuth: true},
                          component: resolve => require(['@/view/index/focus/search/index.vue'], resolve),
                      },
                      {
                          path: 'map', // 关注地图 路由地址
                          meta: {requireAuth: true},
                          component: resolve => require(['@/view/index/focus/map/index.vue'], resolve),
                      },
                  ]
              },
              {
                  path: 'detail', // 详细动态 路由地址
                  meta: {requireAuth: true},
                  component: resolve => require(['@/view/index/activeDetail/index.vue'], resolve),
                  children : []
              },
              {
                  path:'msg',// 系统消息 路由地址
                  meta: {requireAuth: true},
                  component: resolve => require(['@/view/index/message/index.vue'], resolve),
                  children : [
                      {
                          path:'',// 跳转 默认系统消息 路由地址
                          meta: {requireAuth: true},
                          component: resolve => require(['@/view/index/message/SysMsg/index.vue'], resolve)
                      },
                      {
                          path:'rel',// 互动消息  路由地址
                          meta: {requireAuth: true},
                          component: resolve => require(['@/view/index/message/RelMsg/index.vue'], resolve)
                      },
                  ]
              },
              {
                  path:'personal',//个人信息 路由地址
                  meta: {requireAuth: true},
                  component: resolve => require(['@/view/index/personal/index.vue'], resolve),
                  children:[
                      {
                          path:'main',// 个人信息 详细信息
                          meta: {requireAuth: true},
                          component: resolve => require(['@/view/index/personal/main/index.vue'], resolve)
                      },
                      {
                          path:'address',// 地址管理  路由地址
                          meta: {requireAuth: true},
                          component: resolve => require(['@/view/index/personal/address/index.vue'], resolve),
                      },
                      {
                          path:'adEdit',//地址编辑 路由地址
                          meta: {requireAuth: true},
                          component: resolve => require(['@/view/index/personal/adEdit/index.vue'], resolve)
                      },
                      {
                          path:'collect',//我的收藏 路由地址
                          meta: {requireAuth: true},
                          component: resolve => require(['@/view/index/personal/collect/index.vue'], resolve)
                      },
                      {
                          path:'wallet',//我的钱包 路由地址
                          meta: {requireAuth: true},
                          component: resolve => require(['@/view/index/personal/wallet/index.vue'], resolve),
                          children:[
                              {
                                  path:'',//我的钱包 路由地址
                                  meta: {requireAuth: true},
                                  component: resolve => require(['@/view/index/personal/wallet/main/index.vue'], resolve)
                              },
                              {
                                  path:'details',//钱包详情 路由地址
                                  meta: {requireAuth: true},
                                  component: resolve => require(['@/view/index/personal/wallet/details/index.vue'], resolve),
                              },
                              {
                                  path:'closepay',//亲密付 路由地址
                                  meta: {requireAuth: true},
                                  component: resolve => require(['@/view/index/personal/wallet/closePay/index.vue'], resolve),
                              },
                              {
                                  path:'closepayadd',//亲密付好友 路由地址
                                  meta: {requireAuth: true},
                                  component: resolve => require(['@/view/index/personal/wallet/closePayAdd/index.vue'], resolve),
                              },
                              {
                                  path:'pwd',//钱包密码管理 路由地址
                                  meta: {requireAuth: true},
                                  component: resolve => require(['@/view/index/personal/wallet/pwdMag/index.vue'], resolve),
                                  children:[
                                      {
                                          path:'pwdChange',//密码修改 路由地址
                                          meta: {requireAuth: true},
                                          component: resolve => require(['@/view/index/personal/wallet/pwdMag/pwdChange/index.vue'], resolve),
                                      },
                                      {
                                          path:'noPwd',//新密码 路由地址
                                          meta: {requireAuth: true},
                                          component: resolve => require(['@/view/index/personal/wallet/pwdMag/noPwd/index.vue'], resolve),
                                      },
                                  ]
                              },
                              {
                                  path:'qrcode',//亲密付好友 路由地址
                                  meta: {requireAuth: true},
                                  component: resolve => require(['@/view/index/personal/wallet/qrCode/index.vue'], resolve),
                              },
                          ]
                      },
                      {
                        path:'set',//设置 路由地址
                        meta: {requireAuth: true},
                        component: resolve => require(['@/view/index/personal/setting/index.vue'], resolve),
                        children:[
                            {
                                path:'',//关于我们 路由地址
                                meta: {requireAuth: true},
                                component: resolve => require(['@/view/index/personal/setting/aboutUs/index.vue'], resolve)
                            },
                            {
                                path:'update',//版本更新 路由地址
                                meta: {requireAuth: true},
                                component: resolve => require(['@/view/index/personal/setting/update/index.vue'], resolve)
                            },
                            {
                                path:'suggest',//意见反馈 路由地址
                                meta: {requireAuth: true},
                                component: resolve => require(['@/view/index/personal/setting/suggest/index.vue'], resolve)
                            }
                        ]
                      },
                  ]
              },

          ]
      },

    {
      path: '/read', // 发现 配置路由
      meta: {requireAuth: true},
      component: resolve => require(['@/view/read/index.vue'], resolve),
      children : [
        {
          path: '', // 发现 路由地址
          meta: {requireAuth: true},
          component: resolve => require(['@/view/read/find/index.vue'], resolve)
        },
        {
          path: 'periphery', //
          meta: {requireAuth: true},
          component: resolve => require(['@/view/read/periphery/index.vue'], resolve)
        },
        {
          path: 'publish', // 发表动态路由
          meta: {requireAuth: true},
          component: resolve => require(['@/view/read/find/publish/index.vue'], resolve)
      },
          {
          path: 'videoplay', // 视频播放预览路由
          name:'videoplay',
          meta: {requireAuth: true},
          component: resolve => require(['@/view/read/find/publish/video/index.vue'], resolve)
      },
        {
          path: 'msg', // 信息详情 路由地址
          meta: {requireAuth: true},
          component: resolve => require(['@/view/read/find/msg/index.vue'], resolve),
        },
          {
              path: 'preview', // 图片预览路由
              name:'preview',
              component: resolve => require(['@/view/read/find/preview/index'], resolve)
          },
        {
          path: 'publish/map', // 信息详情 路由地址
          name:'publishMap',
          component: resolve => require(['@/view/read/find/publish/map/index.vue'], resolve)
        },
        {
          path: 'publish/location', // 信息详情 路由地址
          meta: {requireAuth: true},
          component: resolve => require(['@/view/read/find/publish/location/index.vue'], resolve)
        },
        {
          path: 'publish/peple', // 信息详情 路由地址
          meta: {requireAuth: true},
          component: resolve => require(['@/view/read/find/publish/peple/index.vue'], resolve)
        },
        {
          path: 'recommended', // 推荐 路由地址
          meta: {requireAuth: true},
          component: resolve => require(['@/view/read/recommended/index.vue'], resolve),
        },
        {
          path: 'recommended/details', // 新闻详情 路由地址
          name:'recommended/details',
          meta: {requireAuth: true},
          component: resolve => require(['@/view/read/recommended/details/index.vue'], resolve)
        },
        {
          path: 'video', // 视频 路由地址
          meta: {requireAuth: true},
          component: resolve => require(['@/view/read/video/index.vue'], resolve),
        },
        {
          path: 'live', // 直播 路由地址
          meta: {requireAuth: true},
          component: resolve => require(['@/view/read/live/index.vue'], resolve),
        },
        {
          path: 'more', // 更多 路由地址
          meta: {requireAuth: true},
          component: resolve => require(['@/view/read/more/index.vue'], resolve),
        },
        {
          path:'search',//搜索路由
          name:'read_search',
          meta: {requireAuth: true},
          component:resolve => require(['@/components/read-tab/search/index.vue'],resolve),
          children:[
            {
              path: 'peripherys', // 发现 路由地址
              name:'search_per',
              meta: {requireAuth: true},
              component: resolve => require(['@/view/read/periphery/index.vue'], resolve)
            }
          ]
        },
          {
              path:'comment',//评论路由
              name:'read_comment',
              meta: {requireAuth: true},
              component: resolve => require(['@/components/comment/index.vue'], resolve)
          },
          {
              path:'reply',//评论回复路由
              name:'read_reply',
              meta: {requireAuth: true},
              component: resolve => require(['@/components/comment/reply/index.vue'], resolve)
          }
      ]
    },
    {
      path: '/service', // 服务 配置路由
      meta: {requireAuth: true},
      component: resolve => require(['@/view/service/index.vue'], resolve),
      children : [
        {
          path: '', // 服务 路由地址
          meta: {requireAuth: true},
          component: resolve => require(['@/view/service/buying/index.vue'], resolve),
          children: [
            {
              path: '',    // 首页默认地址
              meta: {requireAuth: true},
              component: resolve => require(['@/view/service/buying/data/data1/index.vue'], resolve)
            },
            {
              path: 'data2',  // 数据2地址
              meta: {requireAuth: true},
              component: resolve => require(['@/view/service/buying/data/data2/index.vue'], resolve)
            },
            {
              path: 'data3',  // 数据3地址
              meta: {requireAuth: true},
              component: resolve => require(['@/view/service/buying/data/data3/index.vue'], resolve)
            },
            {
              path: 'data4',  // 数据4地址
              meta: {requireAuth: true},
              component: resolve => require(['@/view/service/buying/data/data4/index.vue'], resolve)
            },
            {
              path: 'data5',  // 数据5地址
              meta: {requireAuth: true},
              component: resolve => require(['@/view/service/buying/data/data5/index.vue'], resolve)
            }
          ]
        },
        {
          path: 'purchase', // 推荐 路由地址
          meta: {requireAuth: true},
          component: resolve => require(['@/view/service/purchase/index.vue'], resolve),
        },
        {
          path: 'history', // 视频 路由地址
          meta: {requireAuth: true},
          component: resolve => require(['@/view/service/history/index.vue'], resolve),
        }
      ]
    },
    {
      path: '/device', // 设备 路由地址
      meta: {requireAuth: true},
      component: resolve => require(['@/view/device/device.vue'], resolve),
      children : []
    }
  ]
// })
// 页面刷新时，重新赋值token

if (localStorage.token) {
    store.commit('token',localStorage.token)
    // this.$store.commit('token',window.localStorage.getItem('token'))
   
}

const router = new Router({
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(r=>r.meta.requireAuth)) {
        if (store.state.token) {
            next();
            // console.log(1)
        }
        else {
            next({
                path: '/page',
                // query: {redirect: to.fullPath}
            })
            // console.log(2)
            // console.log(store.state.token)
        }
    }
    else {
        next();
        // console.log(3)
    }
})

export default router;
