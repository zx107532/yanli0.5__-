import  Vue from 'vue'
import Vuex from 'vuex'
import stote from '@/vuex/store.js'
import router from '@/router/index.js'
// import {loca} from '@/common/js/base/location.js'

// import myAxios from './common/js/base/axiosConfig.js'
Vue.use(Vuex);
var phoneList = [];
var files = [];
var server = 'http://182.151.104.205:16000/elderly/dynamics/publishtext';//服务器地址
//选取图片来源
function showActionSheet(show){
  var conf = stote.state.camera;
  var divid=conf.id;
  var actionbuttons=[{title:"拍照"},{title:"相册选取"}];
  var actionstyle={title:"选择照片",cancel:"取消",buttons:actionbuttons};
  plus.nativeUI.actionSheet(actionstyle,function (e) {
    if(e.index==1){
      getImg(divid);
      // router.push({path:'/read/publish'})
    }else if(e.index==2){
        galleryImg(divid);
      router.push({path:'/read/publish'})
    }
  })
}

function getImg() {//打开相机
    plus.camera.getCamera().captureImage(function(p){
        plus.io.resolveLocalFileSystemURL(p,function (entry) {
            files.push({
                path:entry.toLocalURL(),
                category:'img'
            });
          compressImage(entry.toLocalURL())
            // base64(entry.toLocalURL());
            stote.state.phone.push({
                src : entry.toLocalURL()
            });
        });
    });

}
function galleryImg() {//获取相册
    plus.gallery.pick(function(p){
        files.push({
            path:p,
            category:'img'
        });
      compressImage(p)
        // base64(p);
        stote.state.phone.push({
            src : p
        });

    });
}
//压缩图片
function compressImage(url){
  plus.zip.compressImage({
      src:url,//src: (String 类型 )压缩转换原始图片的路径
      dst:"_doc/upload",//压缩转换目标图片的路径
      quality:50,//quality: (Number 类型 )压缩图片的质量.取值范围为1-100
      overwrite:true//overwrite: (Boolean 类型 )覆盖生成新文件
    },
    function(event) {
      stote.state.userPic.push({
        src:event.target,
        cropShow:true
      })
    },function(error) {
    });
}
//图片转base64编码格式
function base64(url){
    plus.io.resolveLocalFileSystemURL(url,function (entry) {
        entry.file(function (file) {
            let fileReader = new plus.io.FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onloadend = function (p) {
                let imgbase64 = p.target.result.toString();
                files.push(imgbase64);
                // console.log(imgbase64);
            }
        })
    });
};



//上传

//
// function upload(msg) {
//     var str = files.join('分隔');
//     let data = {
//         'photo':str
//     };
//     console.log(Vue)
//     myAxios.uploader(data)
// }
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

function upload(msg){
  // loca.onPlusReady()
  let p = stote.state.location;
let province = p.province;
  let city = p.city;
  let district = p.district;
  let street = p.street;
  let streetNum = p.streetNum;
  let lat = p.lat;
  let lng = p.lng;
  // console.log(msg)

    // alert(n.x,n.y);


    if(files.length<=0 && msg == ''){
        plus.nativeUI.toast("内容不能为空！");
        return;
    }
    // var wt=plus.nativeUI.showWaiting();
    var task=plus.uploader.createUpload(server,
        {method:"POST"},function(t,status){ //上传完成
          console.log(t)
            if(status==200){
                let txt = JSON.parse(t.responseText);
                console.log(txt)
                if(txt.state == '0'){
                  plus.nativeUI.alert('成功'+status);
                  // files = [];
                }else{
                  plus.nativeUI.toast(txt.message);
                  // files = []
                }
            }else{
                plus.nativeUI.alert("上传失败："+status+t);
                console.log(t)
                // files = []
            }
        },
    );
    task.addData('userID',localStorage.mobilephone);
    task.addData('userName',localStorage.myname);
    task.addData('tags','12');
    task.addData('detail',msg);
    task.addData('permission','1');
    task.addData('province',province);
    task.addData('city',city);
    task.addData('region',district);
    task.addData('collectTime',getNowFormatDate());
    task.addData('posDetail',street+streetNum);
    task.addData('lat',JSON.stringify(lat));
    task.addData('lng',JSON.stringify(lng));
    task.addData('contentType','Text');
    if(files != []){
      for(var i=0;i<files.length;i++){
        var f=files[i];
        console.log(f.path);
        task.addFile(f.path,{key:'file'+i,mime:'file'});
      }
    }
    task.setRequestHeader("authorization",localStorage.mobilephone+'_'+localStorage.token)
    task.start();
    files = [];
  // });
}


var fun = {
    showActionSheet,//选取来源
    galleryImg,//打开相册
    getImg,//拍照
    upload

};

export {
  fun
}
