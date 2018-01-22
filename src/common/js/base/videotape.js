// import  Vue from 'vue'
import Vuex from 'vuex'
import stote from '@/vuex/store.js'
import router from '@/router/index.js'
var server = 'http://182.151.104.205:16000/elderly/dynamics/publishvideo'//服务器地址
// var server = 'http://192.168.0.200:8080/elderly/dynamics/publishvideo'//服务器地址
var i=1;
var files=[];
//录像
function getVideo(){
    var cmr = plus.camera.getCamera();
    cmr.startVideoCapture(function(p){
        // alert('成功：'+p);
        plus.io.resolveLocalFileSystemURL(p, function(entry){

            files.push({
                path:entry.toLocalURL(),
                name:entry.name,
                category:'video'
            });
            stote.state.videoEntry.push({
                videoSrc:entry.toLocalURL()
            });
            router.push({path:'/read/videoplay'});
            // stote.state.commit('videoEntry',entry)
        }, function(e){
            alert('读取录像文件错误：'+e.message);
        } );
    }, function(e){
        alert('失败：'+e.message);
    }, {filename:'_doc/camera/',index:i});
}

function getNowFormatDate() {//获取时间
  var date = new Date();
  var seperator1 = "-";
  var seperator2 = ":";
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
    + " " + date.getHours() + seperator2 + date.getMinutes()
    + seperator2 + date.getSeconds();
  return currentdate;
}

function upload(text){
  let p = stote.state.location
  let province=p.province;
  let city = p.city;
  let district =p.district;
  let street = p.street;
  let streetNum = p.streetNum;
  let lat = p.lat;
  let lng = p.lng;

    if(files.length<=0){
        plus.nativeUI.alert("没有添加上传文件！");
        return;
    }
    var wt=plus.nativeUI.showWaiting();
    var task=plus.uploader.createUpload(server,
        {method:"POST"},
        function(t,status){ //上传完成
          console.log(t)
            if(status==200){
                plus.nativeUI.alert('成功'+status+t);
                stote.commit('videoEntry',[])
                wt.close();
                files = []
              router.push({path:'/read/video'})
            }else{
                plus.nativeUI.alert("上传失败："+status+t);
                wt.close();
            }
        }
    );
  task.addData('userID',localStorage.mobilephone);
  task.addData('userName',localStorage.myname);
  task.addData('tags','12');
  task.addData('permission','1');
  task.addData('province',province);
  task.addData('city',city);
  task.addData('region',district);
  task.addData('posDetail',street+streetNum);
  task.addData('collectTime',getNowFormatDate());
  task.addData('lat',JSON.stringify(lat));
  // alert(lat)
  task.addData('lng',JSON.stringify(lng));
  // alert(lng)
  task.addData('contentType','Video');
  task.addData('profile',text);
  task.addData('detail',text);
  task.addData('picture',stote.state.videoimg);
  alert('3')
  console.log(stote.state.videoimg)
    for(var i=0;i<files.length;i++){
        var f=files[i];
        console.log(f.path);
        task.addFile(f.path,{key:'file'+i,mime:'file'});
    }
  task.setRequestHeader("authorization",localStorage.mobilephone+'_'+localStorage.token)
    task.start();
}

var func = {
    getVideo,
    upload
};

export {
    func
}

