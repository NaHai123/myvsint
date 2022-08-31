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
  methods: {
    map () {
      let map = new window.BMap.Map(this.$refs.allmap) // 创建Map实例
      map.centerAndZoom(new window.BMap.Point(116.404, 39.915), 15) // 初始化地图,设置中心点坐标和地图级别
      map.addControl(new window.BMap.MapTypeControl({ // 添加地图类型控件
        mapTypes: [
          window.BMAP_NORMAL_MAP,
          window.BMAP_HYBRID_MAP
        ]
      }))
      map.setCurrentCity('四川省') // 设置地图显示的城市 此项是必须设置的
      map.enableScrollWheelZoom(true)// 开启鼠标滚轮缩放
    },
    //添加多个点
     clickHandler (e) {
      alert(`单击点的坐标为：${e.point.lng}, ${e.point.lat}`);
    },
    addPoints () {
      const points = [];
      for (var i = 0; i < 1000; i++) {
        const position = {lng: Math.random() * 40 + 85, lat: Math.random() * 30 + 21}
        points.push(position)
      }
      this.points = points
    }


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
  height: 1000px;
  overflow: hidden;
}
</style>
