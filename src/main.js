import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './vuex/store'
import './common/less/uiChange.less'      //改变ui库样式
import './common/less/index.less'         // 公用less集合
import './common/js/base/windowSize.js'   // 手机端自适应
import fastclick from 'fastclick'         // 手机端点击300毫秒延迟问题
import iView from 'iview';                // UI 组件
import 'iview/dist/styles/iview.css';     // 使用UI组件的CSS
import 'DPlayer/dist/DPlayer.min.css';     // 使用UI组件的CSS
import 'DPlayer/dist/DPlayer.min.js';     // 使用UI组件的CSS
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import myAxios from './common/js/base/axiosConfig.js'
import {loca} from './common/js/base/location'
// import resource from 'vue-resource'
// import './common/js/base/back'
// Vue.use(resource)
// Vue.use(loca)
Vue.use(MintUI)
Vue.use(Vuex)
import BaiduMap from 'vue-baidu-map'
Vue.use(myAxios)
Vue.prototype.$ajax= myAxios
Vue.prototype.$loca= loca
Vue.use(iView);
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  // 安卓 dv4M7hd3T3EV8b997cAwQjowC5YGoqvM
  // 电脑 iGWVzbKZshGN5RhV9c39efrGqojGTATu
  ak: 'dv4M7hd3T3EV8b997cAwQjowC5YGoqvM'
})
Vue.config.productionTip = false
fastclick.attach(document.body);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
