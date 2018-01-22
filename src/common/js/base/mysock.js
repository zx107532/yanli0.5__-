import SockJS from 'sockjs-client';
import "./stomp.js";
import store from '@/vuex/store';
var getMsg=function(WebSocketurl,stompurl,queuename,id,password){
        // 初始化 ws 对象
    if (location.search == '?ws') {
        // var ws = new WebSocket('ws://192.168.0.200:15674/ws');
        var ws = new WebSocket(WebSocketurl+'/ws');
    } else {
        // var ws = new SockJS('http://192.168.0.200:15674/stomp');
        var ws = new SockJS(stompurl);
    }

    // 获得Stomp client对象
    var client = Stomp.over(ws);
    var  msgDetail=null;
    // SockJS does not support heart-beat: disable heart-beats
    client.heartbeat.outgoing = 0;
    client.heartbeat.incoming = 0;
    //client.debug = pipe('#second');
    let sss  = null
    // 定义连接成功回调函数
    function on_connect(x) {
        //data.body是接收到的数据
        // client.subscribe("/queue/test", function(data) {
            client.subscribe(queuename, function(data) {
            var msg = data.body;
            alert("收到数据：" + msg);
            // d1.innerHTML=msg
            store.commit("msgMount",msg)
        });
    };

    // 定义错误时回调函数
    var on_error =  function() {
        console.log('error');
    };

    // 连接RabbitMQ
    // client.connect('admin', 'admin', on_connect, on_error, '/');
    client.connect(id, password, on_connect, on_error, '/');
    console.log(">>>连接上http://192.168.0.200:15674");
    }

//导出参数
var vun = {
    getMsg
}
export {
    vun
}
