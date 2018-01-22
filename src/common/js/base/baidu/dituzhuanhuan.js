import './convertor'
// import 'http://api.map.baidu.com/api?v=2.0&ak=YMiMl15VHvB6WGMaju5DAu4AQVpzYMlW'
function maps(cen) {
  var baidu = document.createElement('script');
  baidu.src = 'http://api.map.baidu.com/api?v=2.0&ak=YMiMl15VHvB6WGMaju5DAu4AQVpzYMlW';
  baidu.type = 'text/javascript';
  document.body.appendChild(baidu);
  var ggPoint = new BMap.Point(cen.lng,cen.lat);
  var bm = new BMap.Map("allmap");
  bm.centerAndZoom(ggPoint, 15);
  bm.addControl(new BMap.NavigationControl());
  //添加gps marker和label
  var markergg = new BMap.Marker(ggPoint);
  bm.addOverlay(markergg); //添加GPS marker

var datas = []
  //坐标转换完之后的回调函数
  translateCallback = function (data){
    if(data.status === 0) {
      var marker = new BMap.Marker(data.points[0]);
      bm.addOverlay(marker);
      datas = data
    }
  }

  setTimeout(function(){
    var convertor = new BMap.Convertor();
    var pointArr = [];
    pointArr.push(ggPoint);
    convertor.translate(pointArr, 1, 5, translateCallback)
  }, 1000);
  return datas
}
var d = {
  maps
}
export {
  d
}
