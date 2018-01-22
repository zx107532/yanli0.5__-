// document.addEventListener('plusready', onPlusReady, false);
var  r = null;
  var url='';
var route = '_doc/audio/';//存放音频
var server='http://182.151.104.205:16000/elderly/chat/publishchat';//服务器地址
// var server='http://182.151.104.205:16000/elderly/chat/publishchat';//服务器地址
var files=[];
//录取音频
// function onPlusReady() {
//   r = plus.audio.getRecorder();
// }
function startReady (touid) {
r =  plus.audio.getRecorder()
if (r == null) {
    alert('未准备好')
    return
}
r.record({filename:route}, function (p) {
 alert('录制成功'+ p)
    plus.io.resolveLocalFileSystemURL(p, function (entry) {
      // alert(touid)
      console.log(entry.toLocalURL());
      files.push({
      	path:entry.toLocalURL(),
      	name:entry.name
      });
      upload(touid);//H5上传语音
      // startPlay(entry.toLocalURL())
    }, function (e) {

    })
}, function (e) {
    alert('录制失败'+ e.message)
})
}
//停止录音
function stopReady () {
r.stop()
}
//播放音频

function startPlay (url) {
var p = plus.audio.createPlayer(url);
// alert(url)
p.play()
}


// 上传文件
let n = null
let nn = null
function upload(touid){
  // if(!n){
  //   n = new Date().getTime()
  // }
// console.log(new Date().getTime(),n)
	if(files.length<=0){
		plus.nativeUI.alert("没有添加上传文件！");
		return;
	}

	var wt=plus.nativeUI.showWaiting();
	var task=plus.uploader.createUpload(server,
		{method:"POST"},
		function(t,status){ //上传完成
      let te = JSON.parse(t.responseText)
      console.log(t)
			if(status==200){
        startPlay
        files = [];
        if(te.message=='周围无用户'){
          plus.nativeUI.toast("附近没有人")
        }
				wt.close();
			}else{
        files = []
				wt.close();
			}
		}
	);
	task.addData('userId',localStorage.mobilephone);
  task.addData('toUserIds',touid);
  console.log(files[0].path)
	for(var i=0;i<files.length;i++){
		var f=files[i];
		task.addFile(f.path,{key:'file'});
	}
  task.setRequestHeader("authorization",localStorage.mobilephone+'_'+localStorage.token)
	task.start();
}


//存放函数方法
var fun = {
stopReady,//使用touchstart事件调用
startReady,//使用touchend事件调用
startPlay//播放语音
};
//往页面传函数方法
export {
fun
}
