document.addEventListener('plusready', onPlusReady, false);
// import  Vue from 'vue'
// import Vuex from 'vuex'
import stote from '@/vuex/store.js'
import $ from 'jquery'
// import coordtransform from 'coordtransform'
// 扩展API加载完毕，现在可以正常调用扩展API
function onPlusReady(){
	plus.geolocation.getCurrentPosition(function(p){
    // var gcj02tobd09=coordtransform.gcj02tobd09(p.coords.longitude,p.coords.latitude);
    var datas = {
      lng:p.coords.longitude,
      lat:p.coords.latitude,
      city:p.address.city,
      cityCode:p.address.cityCode,
      country:p.address.country,
      district:p.address.district,
      poiName:p.address.poiName,
      province:p.address.province,
      street:p.address.street,
      streetNum:p.address.streetNum
    };
    stote.commit("location",datas)

    // alert('OK')
    // console.log(p)
    // console.log(gcj02tobd09)

	  // stote.commit('location',p)
		/*alert('Geolocation\nLatitude:' + p.coords.latitude + '\nLongitude:' + p.coords.longitude + '\nAltitude:' + p.coords.altitude+'\naddress:'+p.address.district);*/
	}, function(e){
		// alert('Geolocation error: ' + e.message);
	} ,{provider:'baidu',coordsType:'bd09ll',geocode:true,enableHighAccuracy:true});
	// console.log(msg)

}

var loca = {
  onPlusReady
}
export  {
  loca
}
