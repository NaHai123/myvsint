<template>
  <div id="app">
    <div
      id="allmap"
      ref="allmap"
      style="position:absolute;height:100%;width:83.5%;"
    ></div>
    <router-view></router-view>
          <div style="position:absolute;z-index:2;margin-left:12px;margin-top:40%;width:82%;">
            <span style="border-radius: 40px;opacity:70%;color:white;padding:1px;background:#505050;" class="data_num head">
            &nbsp;&nbsp;真实雷电数据日期时间：{{this.period[this.periodID]}},
            预测雷电数据日期时间：{{this.predictPeriod[this.predictPeriodID]}}
            </span>
            <el-progress style="border-radius: 40px;opacity:70%;color:white;padding:1px;background:#505050;" :text-inside="true" :stroke-width="30" :percentage="percent" />
          </div>

          <el-col :span="4">
          <div class="data_list today_head"
               style="border-radius: 40px;padding:1px;color:white;background:#505050;opacity:70%;font-size: 40px;position:absolute;z-index:3;margin-top:2%;margin-left:4%;">
                      <span class="data_num head">&nbsp;&nbsp;实时预测雷电发生情况：</span>
          </div></el-col>
          <div style="border-radius: 40px;padding:1px;color:white;background:#505050;opacity:70%;font-size: 35px;position:absolute;z-index:3;margin-top:5.8%;margin-left:4%;">
               &nbsp;&nbsp;{{this.points.length}}&nbsp;&nbsp;
          </div>
          <div
             style="border-radius: 40px;width:35%;height:47%;padding:1px;background:#D0D0D0;opacity:70%;font-size: 40px;position:absolute;z-index:2;margin-top:9%;margin-left:4%;">
             <tendencyForMap :sevenDate='sevenDate' :sevenDay='sevenDay'></tendencyForMap>
          </div>
          <div>
          <el-button type="primary" style="opacity:70%;color:white;position:absolute;z-index:2;font-size:20px;background:#505050;border-color:#808080;padding:10px;border-radius: 40px;"
           v-on:click="pauseMap">暂停</el-button>
          <el-button type="primary"  style="opacity:70%;margin-left:4%;color:white;position:absolute;z-index:2;font-size:20px;background:#505050;border-color:#808080;padding:10px;border-radius: 40px;"
           v-on:click="continueMap">继续</el-button>
          </div>

          <div>
            <form style="opacity:70%;color:white;margin-left:50%;position:absolute;z-index:2;font-size:20px;background:#505050;border-color:#808080;padding:10px;border-radius: 40px;" >
              <label for="time">选择时间序号（1~12）：</label>   <!-- 用来获取焦点 ，点击“账号：”后可以选中input框，它里面的for对应下面的id -->
              <input type="number" id="time" v-model.trim="selectPeriodID">   <!-- 这里v-model收集的是input中输入的value值 , trim表示去掉输入框中前后的空格-->
              <!--   <br />   换行-->
              <el-button type="primary" style="color:white;background:#383838;border-color:#808080;"  @click="selectTime">提交</el-button>
            </form>
          </div>


  </div>

</template>
<script>
import lightning from '../page/lightning.png'  //新增，引入闪电图片
import tendencyForMap from '../components/tendencyForMap'            //用于map.vue的柱状图和折线图
export default {
  name: 'app',
  data () {
    return {
      points: [],     //存放真实经纬度坐标
      predictPoints: [],     //存放预测经纬度坐标
      backdata:[],    //存放后端数据
      predictBackdata:[],    //存放预测后端数据
      period:[202007111600,202007111700,202007111800,202007111900,202007112000,202007112100,202007112200,202007112300,202007120000,202007120100,202007120200,202007120300],   //存储要读取的真实数据的时间段
      predictPeriod:["202007111650_h0","202007111750_h1","202007111850_h2","202007111950_h3","202007112050_h4","202007112150_h5","202007112250_h6","202007112350_h7","202007120050_h8","202007120150_h9","202007120250_h10","202007120350_h11"], //存储要读取的预测数据的时间段
      periodID:-1,    //用于period[periodID]取各时间段真实数据文件
      selectPeriodID:1,
      predictPeriodID:-1,    //用于predictPeriod[predictPeriodID]取各时间段预测数据文件
      selectPredictPeriodID:-1,
      percent:0,          //用于进度条
      pause:0,             //1表示暂停，0表示运行
      sevenDay: ["0时\n0周\n0月","4时\n1周\n1月","8时\n2周\n2月","12时\n3周\n3月","16时\n4周\n4月","20时\n5周\n5月","24时(当前)\n6周(当前)\n6月(当前)"],      //用于map.vue的柱状图和折线图
      sevenDate: [[],[],[]],   //用于map.vue的柱状图和折线图
      baiduMap:null,
    }
  },
  //柱状图和折线图
  components: {
    		tendencyForMap,            //用于map.vue的柱状图和折线图
  },
    created(){
     //this.init();
     this.loadBMapLib();
  },
  methods: {
  selectTime(){
      this.selectPredictPeriodID = parseInt(this.selectPeriodID)-2  //this.selectPeriodID为字符串？？parseInt转换为数字
      this.periodID = parseInt(this.selectPeriodID)-2
      this.predictPeriodID = parseInt(this.selectPeriodID)-2
      this.baiduMap.clearOverlays();
      this.backdata=[];
      this.points=[];
      this.init();
      this.showPoly(this.points,this.baiduMap);
      this.addZoomControl(this.baiduMap);
      this.backdata=[];
      this.predictPoints=[];
      this.predictANDheatmap(this.baiduMap);
      this.ChartUpdate();
      this.selectPredictPeriodID = parseInt(this.selectPeriodID)-2  //this.selectPeriodID为字符串？？parseInt转换为数字
      this.periodID = parseInt(this.selectPeriodID)-2
      this.predictPeriodID = parseInt(this.selectPeriodID)-2
      this.pauseMap()
  },
    //表格动态变化
    ChartUpdate()
  {
	 let temp = this.predictPeriodID
 if (temp%2 == 0 || temp == 3)
	 {
	 this.sevenDate[0].push(Math.floor(Math.random()*250+50))
	 this.sevenDate[1].push(Math.floor(Math.random()*350+70))
	 this.sevenDate[2].push(Math.floor(Math.random()*500+100))
	 };
 if (temp == 0){
     this.sevenDate[0].length = 0;this.sevenDate[0].push(Math.floor(Math.random()*250+50))
     this.sevenDate[1].length = 0;this.sevenDate[1].push(Math.floor(Math.random()*350+70))
     this.sevenDate[2].length = 0;this.sevenDate[2].push(Math.floor(Math.random()*500+100))
     }  //若使用this.sevenDate[0] = []会消除_ob_:observer属性
	 console.log(this.sevenDate[0])
  },
    //继续
    continueMap: function () {
                   this.map();
                   this.pause = 0;   //1表示暂停，0表示运行
                   alert("继续演示")
                },
    //暂停
    pauseMap: function () {
                   clearInterval(this.timer);
                   this.pause = 1;   //1表示暂停，0表示运行
                   alert("暂停成功")
                },
    //添加BMapLib.heatmap
    loadBMapLib(){
        let script = document.createElement("script")
        script.type = "text/javascript"
        script.src = "http://api.map.baidu.com/library/Heatmap/2.0/src/Heatmap_min.js"
        document.body.appendChild(script)
    },
     //接收预测数据，描绘热力图
     predictANDheatmap(map) {
    /*
	var mapStyle = {
		features: ["road", "building", "water", "land"], //隐藏地图上的"poi",
		style: 'dark'//地图背景色
	};
	map.setMapStyle(mapStyle);
	*/
	 //获取后端预测的天气数据
	 this.predictPeriodID = (this.predictPeriodID+1)%12
     this.$http.post("http://127.0.0.1:8000/model1/",
           {'uid':1,     //0表示取真实数据，1表示取预测数据
            'period':this.predictPeriod[this.predictPeriodID]    //指示后端读取对于预测时间段predictPeriodID的npy文件 ykcs
                  },
           {
              headers:{'Content-Type':'application/json'},
              emulateJSON:true
           }).then(
              success=>{
                 //this.backdata=success.data   //本语句无法保存，出 success=>{ } 后backdata变为空，暂未解决
                 sessionStorage.setItem("predictSuccess",success.data)  //存在问题：接收后端数据需刷新两次页面
              }
                  );
                  //后端数据添加进points
                  this.predictBackdata = sessionStorage.getItem("predictSuccess")
                  this.predictBackdata = JSON.parse(this.predictBackdata)
                  console.log(111111111111111111111111)
                  console.log("predictPeriodID"+" "+this.predictPeriodID)

                 for (let c = 0; c < this.predictBackdata.length; c++) {
                  //!!!注意，此处增加了模拟数据，以用于前期展示。后期需删除掉点b 以及 a中的偏离!!!
                  let a = {"lng":this.predictBackdata[c][0],"lat":this.predictBackdata[c][1],"count":50+Math.random()*150}
                  let b = {"lng":this.predictBackdata[c][0]+Math.random(),"lat":this.predictBackdata[c][1]+Math.random(),"count":50+Math.random()*100}
                  this.predictPoints.push(a)
                  this.predictPoints.push(b)
                  }

	//开始添加热力图
    var gradient = {
    	0: 'rgb(102, 255, 0, 1)',         //0.7: 'rgb(0, 110, 255, 1)',   最后一位表示透明度，0为透明
    	0.5: 'rgb(255, 170, 0, 1)',         //0.8: 'rgb(241, 175, 6, 1)',
    	1: 'rgb(255, 0, 0, 1)'             //1: 'rgb(247, 46, 5, 1)'
    };
    let heatmapOverlay = new BMapLib.HeatmapOverlay({
	    "radius": 20
    });
    map.addOverlay(heatmapOverlay);
    heatmapOverlay.setDataSet({
	    data: this.predictPoints,
	    max: 200
    });
    heatmapOverlay.setOptions({
	    "gradient": gradient
    });
     /*
        let labelPoint = new BMap.Point(105.83,21.32);
    let opts = {
      position : labelPoint,    // 指定文本标注所在的地理位置
      offset   : new BMap.Size(30, -30)    //设置文本偏移量
    };
        let label = new BMap.Label("预测雷电数据日期时间："+this.predictPeriod[this.predictPeriodID], opts);  // 创建文本标注对象
        label.setStyle({
             color : "red",
             fontSize : "12px",
             height : "20px",
             lineHeight : "20px",
             fontFamily:"微软雅黑"
         });
     map.addOverlay(label);
     */
    },
    // 添加地图右上角固定显示
    addZoomControl(map) {
      function ZoomControl() {
        // 默认停靠位置和偏移量
        // eslint-disable-next-line no-undef
        this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT
        this.defaultOffset = new BMap.Size(100, 35)
      }
      // 通过JavaScript的prototype属性继承于BMap.Control
      ZoomControl.prototype = new BMap.Control()
      ZoomControl.prototype.initialize = function(map) {
        var div = document.createElement("div")
     // 添加文字说明
     //let text = "真实雷电数据日期时间+this.period[this.periodID].toString() 不成功"
     let text = "vsint雷电预测"
 div.appendChild(document.createTextNode(text));
 // 设置样式
 div.style.cursor = "pointer";
 div.style.border = "1px solid gray";
 div.style.backgroundColor = "white";
        map.getContainer().appendChild(div)
        // 将DOM元素返回
        return div
      }
      var myZoomCtrl = new ZoomControl()
      map.addControl(myZoomCtrl)
    },

        //标点、添加日期时间文本标注
        showPoly(pointList,map) {

        //方法1
        //循环显示点对象
        /*var myIcon = new BMap.Icon(require('./lightning.png'), new BMap.Size(20, 32), {//是引用图标的名字以及大小，注意大小要一样
           anchor: new BMap.Size(10, 30)//这句表示图片相对于所加的点的位置
                                });
                                */
        //使用本地图片作为标记点(物)。anchor设置图片偏移值
        let myIcon = new BMap.Icon(require('./lightning1.svg'), new BMap.Size(32,32),{anchor: new BMap.Size(16, 32)});
        for (let c = 0; c < pointList.length; c++) {
          var marker = new BMap.Marker(pointList[c],{ icon: myIcon });
          //将途经点按顺序添加到地图上
          map.addOverlay(marker);
          //设置标签
          //var label = new BMap.Label(c + 1, { offset: new BMap.Size(20, -10) });
          //marker.setLabel(label);
        }


        /*
        //方法2
        let options = {
          size: BMAP_POINT_SIZE_NORMAL,
          shape: BMAP_POINT_SHAPE_CIRCLE,
          color: '#eeee00'
        };
        let pointCollection = new BMap.PointCollection(pointList,options)
        map.addOverlay(pointCollection);

    //添加日期时间文本标注。！！！还需修改为固定在网页底部，暂未实现！！！
    //let labelPoint = new BMap.Point(105.83,19.32);
    //let opts = {
    //  position : labelPoint,    // 指定文本标注所在的地理位置
    //  offset   : new BMap.Size(30, -30)    //设置文本偏移量
    //};
    //let label = new BMap.Label("真实雷电数据日期时间："+this.period[this.periodID].toString(), opts);  // 创建文本标注对象
    //    label.setStyle({
    //         color : "red",
    //         fontSize : "12px",
    //         height : "20px",
    //         lineHeight : "20px",
    //         fontFamily:"微软雅黑"
    //     });
    // map.addOverlay(label);

     */

        /*
        //方法3
        //定义要素组存放marker
        let picGroupMarker = new L.featureGroup();
        //创建marker,注意坐标点对纬度在前,经度在后.
        let myMarker = L.marker([lat,lng]);
        //marker添加到要素组
        myMarker.addTo(picGroupMarker);
        //要素组添加到地图
        picGroupMarker.addTo(map);
        */
    },
        //读取后端数据，本版本只接收后端一个经纬度。 //存在问题：接收后端数据需刷新两次页面！！！
        init(){
            this.periodID = (this.periodID+1)%12
            console.log("periodID"+" "+this.periodID);
            this.percent = Number((100*(this.periodID)/11).toFixed(2))   //底部进度条进度，表示读取时间段，0为最近时间段，100%为最远时间段;percent保留2位小数
            this.$http.post("http://127.0.0.1:8000/model1/",
           {'uid':0,     //0表示取真实数据，1表示取预测数据
            'period':this.period[this.periodID]    //指示后端读取时间段202007111600的npy文件 ykcs
                  },
           {
              headers:{'Content-Type':'application/json'},
              emulateJSON:true
           }).then(
              success=>{
                 //this.backdata=success.data   //本语句无法保存，出 success=>{ } 后backdata变为空，暂未解决
                 sessionStorage.setItem("success",success.data)  //存在问题：接收后端数据需刷新两次页面
              }
                  );
                  //后端数据添加进points
                  this.backdata=sessionStorage.getItem("success")
                  this.backdata=JSON.parse(this.backdata)
                  let position = new BMap.Point(this.backdata[0][0],this.backdata[0][1])
           for (let c = 0; c < this.backdata.length; c++) {
                  position = new BMap.Point(this.backdata[c][0],this.backdata[c][1])
                  this.points.push(position)
                  }
     },
     //生成百度地图，并在地图上标记points中的坐标
    map(){
     //if ( this.pause!=1 ),避免暂停后再继续会重新刷新地图BMap。注意：会报错
     //if ( this.pause == 0 )
     //{
      //var map = new window.BMap.Map(this.$refs.allmap,{mapType:BMAP_HYBRID_MAP}) // 创建Map实例,默认显示卫星地图
      var map = new window.BMap.Map(this.$refs.allmap) // 创建Map实例,默认普通地图
      this.baiduMap = map
      //this.map = map  //新增，使map可被其他位置使用
      map.centerAndZoom(new window.BMap.Point(116.404, 39.915), 8) // 初始化地图,设置中心点坐标和地图级别
      map.addControl(new window.BMap.MapTypeControl({ // 添加地图类型控件
        mapTypes: [
          window.BMAP_NORMAL_MAP,
          window.BMAP_HYBRID_MAP,
        ]
      }))
      map.setCurrentCity('四川省') // 设置地图显示的城市 此项是必须设置的
      map.enableScrollWheelZoom(true)// 开启鼠标滚轮缩放
      /* 设置地图样式
      map.setMapStyleV3({
            styleId: 'b12c5211b047a1ccdd1fa247926d6692'
          });
      map.setMapStyle({
            style:"dark"
          });
      */
      map.setMapStyleV2({
            styleId: 'b12c5211b047a1ccdd1fa247926d6692'
          });
      //}
      //新增代码
      //标点
   //this.pause = 1,说明刚刚暂停过，现在将继续运行
   if (this.timer && this.pause!=1){
          clearInterval(this.timer);
  }else {
       this.timer = setInterval( ()=>{map.clearOverlays();this.backdata=[];this.points=[];this.init();this.showPoly(this.points,map);this.addZoomControl(map);this.backdata=[];this.predictPoints=[];this.predictANDheatmap(map);this.ChartUpdate();},3000 );  //5000ms刷新一次
  }
  }
 },
mounted () {
      //定时刷新页面
   /*
      if (this.timer){
          clearInterval(this.timer);
  }else {
       this.timer = setInterval( ()=>{this.init();this.showPoly(this.points,this.map);},5000 );  //5000ms刷新一次
  }
   */
   this.map();
},

destroyed () {
     //销毁定时刷新timer
     clearInterval(this.timer);
},
}

</script>
<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  //margin-top: 60px;
}
#allmap {
    width: 100%;
    height: 790px;
}
	@import '../style/mixin';
	.data_section{
		padding: 20px;
		margin-bottom: 40px;
		.section_title{
			text-align: center;
			font-size: 30px;
			margin-bottom: 10px;
		}
		.data_list{
			text-align: center;
			font-size: 14px;
			color: #666;
            border-radius: 6px;
            background: #E5E9F2;
            .data_num{
                color: #333;
                font-size: 26px;

            }
            .head{
                border-radius: 6px;
                font-size: 22px;
                padding: 4px 0;
                color: #fff;
                display: inline-block;
            }
        }
        .today_head{
            background: #FF9800;
        }
        .all_head{
            background: #20A0FF;
        }
	}
    .wan{
        .sc(16px, #333)
    }
</style>
