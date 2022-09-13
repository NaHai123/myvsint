<template>
  <div id="app">
    <div
      id="allmap"
      ref="allmap"
    ></div>
    <router-view></router-view>
  </div>

</template>
<script>
export default {
  name: 'app',
  data () {
    return {
      points: [],     //存放经纬度坐标
      backdata:[],    //存放后端数据
    }
  },
    created(){
     //this.init();
  },
  methods: {
        showPoly(pointList,map) {
        /*
        //循环显示点对象
        for (let c = 0; c < pointList.length; c++) {
          var marker = new BMap.Marker(pointList[c]);
          //将途经点按顺序添加到地图上
          map.addOverlay(marker);
          //设置标签
          //var label = new BMap.Label(c + 1, { offset: new BMap.Size(20, -10) });
          //marker.setLabel(label);
        }
        */
        let options = {
          size: BMAP_POINT_SIZE_NORMAL,
          shape: BMAP_POINT_SHAPE_CIRCLE,
          color: '#eeee00'
        };
        let pointCollection = new BMap.PointCollection(pointList,options)
        map.addOverlay(pointCollection);
    },
        //读取后端数据，本版本只接收后端一个经纬度。 //存在问题：接收后端数据需刷新两次页面！！！
        init(){
            this.$http.post("http://127.0.0.1:8000/model1/",
           {'uid':0},
           {
              headers:{'Content-Type':'application/json'},z
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
      let map = new window.BMap.Map(this.$refs.allmap) // 创建Map实例
      map.centerAndZoom(new window.BMap.Point(116.404, 39.915), 5) // 初始化地图,设置中心点坐标和地图级别
      map.addControl(new window.BMap.MapTypeControl({ // 添加地图类型控件
        mapTypes: [
          window.BMAP_NORMAL_MAP,
          window.BMAP_HYBRID_MAP,
        ]
      }))
      map.setCurrentCity('四川省') // 设置地图显示的城市 此项是必须设置的
      map.enableScrollWheelZoom(true)// 开启鼠标滚轮缩放
      //新增代码
      //标点
      this.showPoly(this.points,map);
            if (this.timer){
          clearInterval(this.timer);
  }else {
       this.timer = setInterval( ()=>{map.clearOverlays();this.points=[];this.init();console.log(this.points);this.showPoly(this.points,map);},5000 );  //5000ms刷新一次
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
   this.init();this.map();
},

destroyed () {
     //销毁定时刷新timer
     clearInterval(this.timer);
},
}

</script>
<style>
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
</style>
