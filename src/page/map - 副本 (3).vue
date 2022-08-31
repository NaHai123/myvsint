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
  name: 'HelloWorld',
  data () {
    return {
      points: []
    }
  },
  methods: {
    map () {
      let map = new window.BMap.Map(this.$refs.allmap) // 创建Map实例
      map.centerAndZoom(new window.BMap.Point(116.404, 39.915), 15) // 初始化地图,设置中心点坐标和地图级别
      map.addControl(new window.BMap.MapTypeControl({ // 添加地图类型控件
        mapTypes: [
          window.BMAP_NORMAL_MAP,
          window.BMAP_HYBRID_MAP,
        ]
      }))
      map.setCurrentCity('四川省') // 设置地图显示的城市 此项是必须设置的
      map.enableScrollWheelZoom(true)// 开启鼠标滚轮缩放
      //新增代码
      function showPoly(pointList) {
        //循环显示点对象
        for (var c = 0; c < pointList.length; c++) {
          var marker = new BMap.Marker(pointList[c]);
          //将途经点按顺序添加到地图上
          map.addOverlay(marker);
          //设置标签
          //var label = new BMap.Label(c + 1, { offset: new BMap.Size(20, -10) });
          //marker.setLabel(label);
        }
    }
        //随机生成100个坐标点
        for (var i = 0; i < 100; i++) {
        var position = new BMap.Point(116+(Math.random() * 40 + 85)%1, 39+(Math.random() * 30 + 21)%1);
        this.points.push(position)
      }
      //标点
      showPoly(this.points);


  },
  },
mounted () {
    this.map()
  }
}

</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#allmap {
    width: 100%;
    height: 790px;
}
</style>
