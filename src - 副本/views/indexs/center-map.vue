<!--
 * @Author: daidai
 * @Date: 2022-03-01 11:17:39
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-29 15:50:18
 * @FilePath: \web-pc\src\pages\big-screen\view\indexs\center-map.vue
-->
<template>
  <div class="centermap">

     <!--注释1-  "雷电预测图"文字可移动到边框内  -->
    <div class="maptitle">
      <div class="zuo"></div>
      <span class="titletext">{{ maptitle }}</span>
      <div class="you"></div>
    </div>

    <div class="mapwrap">
      <dv-border-box-13>
        <div class="quanguo" @click="getData('china')" v-if="code !== 'china'">
          中国
        </div>

        <Echart id="CenterMap" :options="options" ref="CenterMap" />
      </dv-border-box-13>
    </div>
  </div>
</template>

<script>
import xzqCode from "../../utils/map/xzqCode";
import { currentGET } from "api/modules";
import * as echarts from "echarts";
import { GETNOBASE } from "api";
export default {
  data() {
    return {
      maptitle: "雷电预测图",
      options: {},
      code: "china", //china 代表中国 其他地市是行政编码
      echartBindClick: false,
      isSouthChinaSea: false, //是否要展示南海群岛  修改此值请刷新页面,
      //新增
      period:[202007111600,202007111700,202007111800,202007111900,202007112000,202007112100,202007112200,202007112300,202007120000,202007120100,202007120200,202007120300],   //存储要读取的真实数据的时间段
      periodID:-1,    //用于period[periodID]取各时间段真实数据文件
      backdata:[],    //存放后端数据
      selectCity: '',  //2023-4-6新增，点击选择城市
    };
  },
  created() {},

  mounted() {
    // console.log(xzqCode);
    this.getData("china");
  },
  methods: {
    getData(code) {
      currentGET("big8", { regionCode: code }).then((res) => {
        console.log("设备分布", res);
        if (res.success) {
          this.getGeojson(res.data.regionCode, res.data.dataList);
          this.mapclick();
        } else {
          this.$Message.warning(res.msg);
        }
      });
    },
    /**
     * @description: 获取geojson
     * @param {*} name china 表示中国 其他省份行政区编码
     * @param {*} mydata 接口返回列表数据
     * @return {*}
     */
    async getGeojson(name, mydata) {
      this.code = name;
      //如果要展示南海群岛并且展示的是中国的话
      let geoname=name
      if (this.isSouthChinaSea && name == "china") {
        geoname = "chinaNanhai";
      }
      //如果有注册地图的话就不用再注册 了
      let mapjson = echarts.getMap(name);
      if (mapjson) {
        mapjson = mapjson.geoJSON;
      } else {
        mapjson = await GETNOBASE(`./map-geojson/${geoname}.json`).then((res) => {
          return res;
        });
        echarts.registerMap(name, mapjson);
      }
      let cityCenter = {};
      let arr = mapjson.features;
      //根据geojson获取省份中心点
      arr.map((item) => {
        cityCenter[item.properties.name] =
          item.properties.centroid || item.properties.center;
      });
      let newData = [];
      mydata.map((item) => {
        if (cityCenter[item.name]) {
          newData.push({
            name: item.name,
            value: cityCenter[item.name].concat(item.value),
          });
        }
      });
      //新增
      console.log("mydata",mydata)
      console.log("newData",newData)
      mydata = []
      newData = []
      this.periodID = (this.periodID+1)%12
      /*
      this.$http.post("http://127.0.0.1:8000/model1/",
           {'uid':0,     //0表示取真实数据，1表示取预测数据
            'period':this.period[this.periodID]    //指示后端读取时间段202007111600的npy文件 ykcs
                  },
           {
              headers:{'Content-Type':'application/json'},
              emulateJSON:true
           }).then(
              success=>{
                 this.backdata=success.data   //本语句无法保存，出 success=>{ } 后backdata变为空，暂未解决
                 console.log("this.backdata",this.backdata)
                 //sessionStorage.setItem("success",success.data)  //存在问题：接收后端数据需刷新两次页面
              }
                  );
      */
           //2023-4-5新增，获取未来12h城市及其雷电数
           this.$http.post("http://101.43.203.170:13888/isWhere/",
           {
                   //下列参数需要修改！！！！！！！！！！！！！！！！！！！！！？？？？？？？？？？？
                   "period":"202007111650.npy",
                   "selectModel": "LightNet",
                  },
           {
              headers:{'Content-Type':'application/json'},
              emulateJSON:true
           }).then(
              success=>{
                 //self.backdata=JSON.parse(success.data)   //本语句无法保存，出 success=>{ } 后backdata变为空，暂未解决
                 //console.log("999999999999999999999999999")
                 //console.log(success)
      mydata.push({name: "北京市",value:success['dict']['北京市']})
      newData.push({name: "北京市",value:[116.38,39.9,success['dict']['北京市']]})
      mydata.push({name: "天津市",value:success['dict']['天津市']})
      newData.push({name: "天津市",value:[117.2,39.13,success['dict']['天津市']]})
      //mydata.push({name: "河北省",value:success['dict']['北京市']})
      //newData.push({name: "河北省",value:[114.26,38.03,88]})
      mydata.push({name: "石家庄市",value:success['dict']['石家庄市']})
      newData.push({name: "石家庄市",value:[114.36,38.13,success['dict']['石家庄市']]})
      mydata.push({name: "唐山市",value:success['dict']['唐山市']})
      newData.push({name: "唐山市",value:[118.3,39.8,success['dict']['唐山市']]})
      mydata.push({name: "秦皇岛市",value:success['dict']['秦皇岛市']})
      newData.push({name: "秦皇岛市",value:[119.2,40.1,success['dict']['秦皇岛市']]})
      mydata.push({name: "邯郸市",value:success['dict']['邯郸市']})
      newData.push({name: "邯郸市",value:[114.54,36.6,success['dict']['邯郸市']]})
      mydata.push({name: "邢台市",value:success['dict']['邢台市']})
      newData.push({name: "邢台市",value:[114.85,37.15,success['dict']['邢台市']]})
      mydata.push({name: "衡水市",value:success['dict']['衡水市']})
      newData.push({name: "衡水市",value:[115.85,37.8,success['dict']['衡水市']]})
      mydata.push({name: "沧州市",value:success['dict']['沧州市']})
      newData.push({name: "沧州市",value:[116.85,38.2,success['dict']['沧州市']]})
      mydata.push({name: "廊坊市",value:success['dict']['廊坊市']})
      newData.push({name: "廊坊市",value:[116.48,39.15,success['dict']['廊坊市']]})
      mydata.push({name: "保定市",value:success['dict']['保定市']})
      newData.push({name: "保定市",value:[115.2,39,success['dict']['保定市']]})
      mydata.push({name: "张家口市",value:success['dict']['张家口市']})
      newData.push({name: "张家口市",value:[115,41,success['dict']['张家口市']]})
      mydata.push({name: "承德市",value:success['dict']['承德市']})
      newData.push({name: "承德市",value:[117.6,41.3,success['dict']['承德市']]})
      this.init(name, mydata, newData);
                       }
                  );

      /*
      //2023-4-5新增，将下面注释掉
      mydata.push({name: "北京市",value:1779})
      newData.push({name: "北京市",value:[116.38,39.9,1779]})
      mydata.push({name: "海淀区",value:63})
      newData.push({name: "海淀区",value:[116.23,40.01,63]})
      mydata.push({name: "密云区",value:1028})
      newData.push({name: "密云区",value:[117,40.52,1028]})
      mydata.push({name: "怀柔区",value:688})
      newData.push({name: "怀柔区",value:[116.6,40.63,688]})
      mydata.push({name: "天津市",value:25})
      newData.push({name: "天津市",value:[117.2,39.13,25]})
      //mydata.push({name: "河北省",value:88})
      //newData.push({name: "河北省",value:[114.26,38.03,88]})
      mydata.push({name: "石家庄市",value:233})
      newData.push({name: "石家庄市",value:[114.36,38.13,233]})
      mydata.push({name: "唐山市",value:12})
      newData.push({name: "唐山市",value:[118.3,39.8,12]})
      mydata.push({name: "秦皇岛市",value:22})
      newData.push({name: "秦皇岛市",value:[119.2,40.1,22]})
      mydata.push({name: "邯郸市",value:18})
      newData.push({name: "邯郸市",value:[114.54,36.6,18]})
      mydata.push({name: "邢台市",value:123})
      newData.push({name: "邢台市",value:[114.85,37.15,450]})
      mydata.push({name: "衡水市",value:450})
      newData.push({name: "衡水市",value:[115.85,37.8,450]})
      mydata.push({name: "沧州市",value:67})
      newData.push({name: "沧州市",value:[116.85,38.2,67]})
      mydata.push({name: "廊坊市",value:668})
      newData.push({name: "廊坊市",value:[116.48,39.15,668]})
      mydata.push({name: "保定市",value:668})
      newData.push({name: "保定市",value:[115.2,39,668]})
      mydata.push({name: "张家口市",value:1128})
      newData.push({name: "张家口市",value:[115,41,1128]})
      mydata.push({name: "承德市",value:66})
      newData.push({name: "承德市",value:[117.6,41.3,66]})
      this.init(name, mydata, newData);
      */
    },
    init(name, data, data2) {
      console.log(data);
      let top = 80;  //地图与顶端边框距离
      let zoom = 1.1;  //地图大小
      //地图风格、大小设置？
      let option = {
        backgroundColor: "rgba(0,0,0,0)",
        tooltip: {
          show: false,
        },
        legend: {
          show: false,
        },
        visualMap: {
          left: 20,
          bottom: 20,
          pieces: [
            { gte: 1000, label: "1000个以上" }, // 不指定 max，表示 max 为无限大（Infinity）。
            { gte: 600, lte: 999, label: "600-999个" },
            { gte: 200, lte: 599, label: "200-599个" },
            { gte: 50, lte: 199, label: "49-199个" },
            { gte: 10, lte: 49, label: "10-49个" },
            { lte: 9, label: "1-9个" }, // 不指定 min，表示 min 为无限大（-Infinity）。
          ],
          inRange: {
            // 渐变颜色，从小到大
            color: [
              "#c3d7df",
              "#5cb3cc",
              "#8abcd1",
              "#66a9c9",
              "#2f90b9",
              "#1781b5",
            ],
          },
          textStyle: {
            color: "#fff",
          },
        },
        geo: {
          map: name,
          roam: false,
          selectedMode: false, //是否允许选中多个区域
          zoom: zoom,
          top: top,
          // aspectScale: 0.78,
          show: false,
        },
        series: [
          {
            name: "MAP",
            type: "map",
            map: name,
            // aspectScale: 0.78,
            data: data,
            // data: [1,100],
            selectedMode: false, //是否允许选中多个区域
            zoom: zoom,
            geoIndex: 1,
            top: top,
            tooltip: {
              show: true,
              formatter: function (params) {
                if (params.data) {
                  return params.name + "闪电数：" + params.data["value"]; //显示发生次数
                } else {
                  return params.name;
                }
              },
              backgroundColor: "rgba(0,0,0,.6)",
              borderColor: "rgba(147, 235, 248, .8)",
              textStyle: {
                color: "#FFF",
              },
            },
            label: {
              show: false,
              color: "#000",
              // position: [-10, 0],
              formatter: function (val) {
                // console.log(val)
                if (val.data !== undefined) {
                  return val.name.slice(0, 2);
                } else {
                  return "";
                }
              },
              rich: {},
            },
            emphasis: {
              label: {
                show: false,
              },
              itemStyle: {
                areaColor: "#389BB7",
                borderWidth: 3,   //选中省市时边界特效宽度
              },
            },
            itemStyle: {
              borderColor: "rgba(147, 235, 248, .8)",
              borderWidth: 1,
              areaColor: {
                type: "radial",
                x: 0.5,
                y: 0.5,
                r: 0.8,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(147, 235, 248, 0)", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(147, 235, 248, .2)", // 100% 处的颜色
                  },
                ],
                globalCoord: false, // 缺为 false
              },
              shadowColor: "rgba(128, 217, 248, .3)",
              shadowOffsetX: -2,
              shadowOffsetY: 2,
              shadowBlur: 10,
            },
          },
          {
            data: data2,
            type: "effectScatter",
            coordinateSystem: "geo",
            symbolSize: function (val) {
              return 8;   //标记点大小,原来为4
              // return val[2] / 50;
            },
            legendHoverLink: true,
            showEffectOn: "render",
            rippleEffect: {
              // period: 4,
              scale: 6,   //标记点大小？
              color: "rgba(255,255,255, 1)",
              brushType: "fill",
            },
            tooltip: {
              show: true,
              formatter: function (params) {
                if (params.data) {
                  return params.name + "闪电数：" + params.data["value"][2];
                } else {
                  return params.name;
                }
              },
              backgroundColor: "rgba(0,0,0,.6)",
              borderColor: "rgba(147, 235, 248, .8)",
              textStyle: {
                color: "#FFF",
              },
            },
            label: {
              formatter: (param) => {
                return param.name.slice(0, 2);
              },

              fontSize: 15,  //省市名、地名文字的大小
              offset: [0, 2],
              position: "bottom",
              textBorderColor: "#fff",
              textShadowColor: "#000",
              textShadowBlur: 10,
              textBorderWidth: 0,
              color: "#FFF",
              show: true,
            },
            // colorBy: "data",
            itemStyle: {
              color: "rgba(255,255,255,1)",
              borderColor: "rgba(2255,255,255,2)",
              borderWidth: 4,
              shadowColor: "#000",
              shadowBlur: 10,
            },
          },
        ],
         //动画效果
            // animationDuration: 1000,
            // animationEasing: 'linear',
            // animationDurationUpdate: 1000
      };
      this.options = option;
    },
    message(text) {
      this.$Message({
        text: text,
        type: "warning",
      });
    },
    mapclick() {
      if (this.echartBindClick) return;
      //单击切换到级地图，当mapCode有值,说明可以切换到下级地图
      this.$refs.CenterMap.chart.on("click", (params) => {
        // console.log(params);
        //console.log("666")
        //console.log(params.name)

        //2023-4-6新增，点击选择城市
        this.selectCity = params.name
        //$bus.$emit("aMsg", this.selectCity);
        //$bus.$emit("aMsg", '来自A页面的消息');
        //const bc = new BroadcastChannel("1111");
        this.$bus.$emit('msg', this.selectCity)

        let xzqData = xzqCode[params.name];
        if (xzqData) {
          //console.log("777")
          //console.log(xzqData)
          this.getData(xzqData.adcode);
        } else {
          //console.log("888")
          //console.log(xzqData)
          //2023-3-30新增，点击省级地图跳转到历史预测页面显示数据
          this.message("暂无下级地市!");
          //window.location.href="http://localhost:8002/#/map";
          //location.replace("http://localhost:8002/#/map");
          //location.assign("http://localhost:8002/#/map");
          alert("右上雷电高发时刻已更新为当前城市数据，现即将跳转页面显示可视化预报结果");
          //window.open("http://localhost:8002/#/map", "预测数据展示");  //本地版
          window.open("http://101.43.203.170:13886/#/map", "预测数据展示");  //部署版
        }
      });
      this.echartBindClick = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.centermap {
  margin-bottom: 30px;

  .maptitle {
    height: 60px;
    display: flex;
    justify-content: center;
    padding-top: 10px;
    box-sizing: border-box;

    .titletext {
      font-size: 28px;
      font-weight: 900;
      letter-spacing: 6px;
      background: linear-gradient(
        92deg,
        #0072ff 0%,
        #00eaff 48.8525390625%,
        #01aaff 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin: 0 10px;
    }

    .zuo,
    .you {
      background-size: 100% 100%;
      width: 29px;
      height: 20px;
      margin-top: 8px;
    }

    .zuo {
      background: url("../../assets/img/xiezuo.png") no-repeat;
    }

    .you {
      background: url("../../assets/img/xieyou.png") no-repeat;
    }
  }

  .mapwrap {
    height: 850px;  //地图高度
    width: 100%;
    // padding: 0 0 10px 0;
    box-sizing: border-box;
    position: relative;

    .quanguo {
      position: absolute;
      right: 20px;
      top: -46px;
      width: 80px;
      height: 28px;
      border: 1px solid #00eded;
      border-radius: 10px;
      color: #00f7f6;
      text-align: center;
      line-height: 26px;
      letter-spacing: 6px;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0, 237, 237, 0.5),
        0 0 6px rgba(0, 237, 237, 0.4);
    }
  }
}
</style>
