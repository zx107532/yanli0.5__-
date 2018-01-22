import  Vue from 'vue'
import Vuex from 'vuex'
import stote from '@/vuex/store.js'
import router from '@/router/videotape.js'
Vue.use(Vuex)
document.addEventListener( "plusready", onPlusReady, false );
function onPlusReady() {
    
}
(function createLocalPushMsg() {
    var options = {
        cover:false
    };
    var str = '测试测试';
    plus.push.createMessage(str,"LocalMSG",options);
    if(plus.os.name=="IOS"){
        plus.nativeUI.alert('*如果无法创建消息，请到"设置"->"通知"中配置应用在通知中心显示!')
    };
})();