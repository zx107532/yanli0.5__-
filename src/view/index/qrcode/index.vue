<template>
	<div class="qrcontainer">
		<div class="header">
			<div @click="back()">取消</div>
			<div @click="setFlash">开灯</div>
		</div>
		<div id= "bcid" ></div>
		<div class="footer" @click="scanPicture">从相册选取</div>
	</div>
</template>
<style lang="less" scoped>

@import '~less/variable';
.qrcontainer{//容器，沾满全屏
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background:#000000;
	z-index: 10;
	color: @color-l;
	font-size: .3rem;
	.header{//顶部开灯取消
		line-height: .9rem;
		height: .9rem;
		position: absolute;
		width: 100%;
		z-index: 10;
		div:nth-child(1){
			float: left;
			margin-left: .2rem;
		}
		div:nth-child(2){
			float: right;
			margin-right: .2rem;
		}
	}
	.footer{//底部相册选取
		position: fixed;
		bottom: 0;
		height: .9rem;
		width: 100%;
		line-height: .9rem;
		text-align: center;
	}
	#bcid {	//扫描容器
	position: absolute;
	top: .3rem;
	height:28%;
	width:34%;
	}
}
</style>
<script>
export default {
	data(){
		return{
			width:"",
			height:"",
			scan:null
		}
	},
	methods:{
		onmarked( type, result ) {//扫描成功返回函数
					var text = '未知: ';
					switch(type){
						case plus.barcode.QR:
						text = 'QR: ';
						break;
						case plus.barcode.EAN13:
						text = 'EAN13: ';
						break;
						case plus.barcode.EAN8:
						text = 'EAN8: ';
						break;
					}
//					alert( text+result );//处理生成二维码效果
					this.scan.cancel();
					this.scan.close();
			},
			back(){//顶部取消按钮
				history.go(-1);
				this.cancel()
			},
			cancel(){//关闭扫描控件方法
				this.scan.cancel();
				this.scan.close();
			},
			startRecognize() {//创建扫描控件
				var filter;//扫描控件样式
				var styles = {frameColor: "#29E52C",scanbarColor: "#29E52C",background: ""}
						this.scan = new plus.barcode.Barcode('bcid',filter,styles);
						this.scan.onmarked =this.onmarked;
						this.startScan()
					},
			startScan() {//开始扫描
						this.scan.start();
					},
			 setFlash() {//开启闪光灯
				this.scan.setFlash(true);
			},
			 scanPicture() {//从相册选择图片识别
			 var onmarked=this.onmarked;
				plus.gallery.pick(function(path){
					plus.barcode.scan(path,onmarked,function(error){//错误处理函数
						alert( "无法识别此图片" );
					});
				},function(err){
					alert("Failed: "+err.message);
				});
		}
	},
	mounted(){
		var start=this.startRecognize;
		var back=this.cancel;
		setTimeout(function() {//组件加载完，延时启动扫描
				start();
		}, 1500);
		plus.key.addEventListener("backbutton", function() {//安卓返回按键处理
					back()
				});
	},
	 deactivated(){//扫描完将组件销毁
		this.$destroy()
	 }
}
</script>
