
import $ from  'jquery'
import '@/common/js/base/webupload/webuploader.js'

var pp = null,ps = null,pi = null,pt = null
var r = null,url=''
var route = '_doc/audio/'
var audioList = []
var abc = '';
var server='####';//服务器地址
var method='POST';//上传方式

//录取音频

function startReady () {
  if (r == null) {
    alert('未准备好')
    return
  }
  r.record({filename:route}, function (p) {
//  alert('录制成功'+ p)
    plus.io.resolveLocalFileSystemURL(p, function (entry) {
//    console.log(entry)
      url = entry.toLocalURL()
      audioList.push(entry)
      uploaders(audioList)
      abc = entry
    }, function (e) {
      
    })
  }, function (e) {
    alert('录制失败'+ e.message)
  })
}
//停止录音
function stopReady () {
  r.stop()
//uploaders(audioList)
}
//播放音频

function startPlay () {
var p = plus.audio.createPlayer(url)

p.play()
}

function play(){
	stopReady()
	
}

//上传语音
var uploader = WebUploader.create({
	swf:'@/common/js/base/webupload/Uploader.swf',
	server:server,
	auto:true,
	resize:false,
	method:method
})
function tianjia(){
	console.log(abc)
	uploader.addFiles(audioList)
//	console.log(audioList[0].toLocalURL())
}
uploader.on('fileQueued',function(file){
	$('#thelist').append('<div id="'+file.id+'" class="item">'+
		'<h4 class="info">'+file.name+'</h4>'+
		'<p class="state">等待上传...</p>'+
		'</div>')
alert('2')
	console.log(file)
})
uploader.on('uploadSuccess',function(file){
	alert('成功')
	console.log(file)
})
uploader.on('uploadError',function(file){
	alert('失败')
	console.log(file)
})


//备用上传方案
//var files=[]
function uploaders(n){
	if(n.length<=0){
		plus.nativeUI.alert('内容不能为空')
		return
	}
//	var wt = plus.nativeUI.showWaiting()
	var tast = plus.uploader.createUpload(server,
		{method:method},
		function(t,status){
			console.log(t)
			console.log(status)
			if(status==200){
				console.log('上传成功:'+t.responseText);
//				audioList = []
					alert('成功')
			
			}else{
				console.log("上传失败:"+status)
				alert('失败')
			}
		}
	)
	for(var i=0;i<n.length;i++){
		var f=n[i]
		tast.addFile(f.toLocalURL(),{key:f.name})
	}
	tast.start()
}
//存放函数方法
var fun = {
stopReady,
startReady,
playAudio
}
//往页面传函数方法
export {
fun
}
