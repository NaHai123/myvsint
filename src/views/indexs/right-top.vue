<!--
 * @Author: daidai
 * @Date: 2022-03-01 14:13:04
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-27 15:04:49
 * @FilePath: \web-pc\src\pages\big-screen\view\indexs\right-top.vue
-->
<template>
  <Echart
    id="rightTop"
    :options="option"
    class="right_top_inner"
    v-if="pageflag"
    ref="charts"
  />
  <Reacquire v-else @onclick="getData" style="line-height: 200px">
    重新获取
  </Reacquire>
</template>

<script>
import { currentGET } from "api/modules";
import {graphic} from "echarts"
export default {
  data() {
    return {
      option: {},
      pageflag: false,
      timer: null,
      selectCity: '1',  //2023-4-6新增，点击选择城市
      selectedCity:'2',  //2023-4-8新增，用于右上图表,看selectCity有无变化
      numList:[],  //2023-4-8新增，用于右上图表
      numList2:[],  //2023-4-8新增，用于右上图表
      myData:[],  //2023-4-14新增，用于右上表获得每个城市的雷电数
    };
  },
  created() {

  },

  mounted() {
     this.getData();
  },
  beforeDestroy() {
    this.clearData();
  },
  methods: {
   //2023-4-14新增
  randGenerator(n, sum) {
  var aryRet = [];
  var fSumTmp = sum;
  var iAcc = 0;
  for (var i = 0; i < (n -1); i++) {
  	var iTmp = Math.ceil(Math.random() * (fSumTmp / 2));
    aryRet.push(iTmp);
    fSumTmp -= iTmp;
    iAcc += iTmp;
  }
  aryRet.push(sum-iAcc);
  return aryRet;
},
    clearData() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    getData() {
         //2023-5-27新增，点击选择城市
            this.$bus.$on('msg',(msg) => {
               this.selectCity = msg;
              //console.log(msg)
            })

         var d=new Date()
            var month = d.getMonth()+1
            var timeNow = d.getFullYear().toString()+("0" + month).slice(-2).toString()+("0" + d.getDate()).slice(-2).toString()+("0" + d.getHours()).slice(-2).toString()+"50"
         //2023-4-8新增，用于右上图表
           this.$http.post("http://101.43.203.170:8080/isWhereFor12h/",
           {
                   //下列参数需要修改为当前时间！！！！！！！！！！！！！！！！！！！！！？？？？？？？？？？？
                   "period":timeNow, //2023-5-27新增，当前时间，最后2位为50表示预测文件
                   "selectModel": "LightNet",
                   "selectCity": this.selectCity, //2023-5-27新增，12h预测页面左侧地图点击选择的城市
                  },
           {
              headers:{'Content-Type':'application/json'},
              emulateJSON:true
           }).then(
              success=>{
                 //self.backdata=JSON.parse(success.data)   //本语句无法保存，出 success=>{ } 后backdata变为空，暂未解决
                 //console.log("111111111111111111111111")
                 //console.log(success['pos_h_2h'])

      this.pageflag = true;
      // this.pageflag =false
      currentGET("big4").then((res) => {

        if (!this.timer) {
          console.log("报警次数", res);
        }
        if (res.success) {
          this.countUserNumData = res.data;
          this.$nextTick(() => {
            //2023-4-4新增（修改），右上角图表
            //console.log(9999999999999999)
            //console.log(res.data)

            //2023-4-6新增，点击选择城市
            this.$bus.$on('msg',(msg) => {
               this.selectCity = msg;
              //console.log(msg)
            })

            this.$bus.$on('msg1',(msg) => {
               this.myData = msg;
              //console.log("09090909")
              //console.log(this.myData['北京市'])
              //console.log(this.selectCity)
            })


            let datelist=["未来2h","未来4h","未来6h","未来8h","未来10h","未来12h"]
            //let numList=[25,46,53,20,12,11]
            //let numList2=[30,56,71,29,23,18]
            if (this.selectCity != this.selectedCity)
            {
            this.numList=[success['pos_h_2h'],success['pos_h_4h'],success['pos_h_6h'],success['pos_h_8h'],success['pos_h_10h'],success['pos_h_12h']]
            this.numList2=[success['pos_l_2h'],success['pos_l_4h'],success['pos_l_6h'],success['pos_l_8h'],success['pos_l_10h'],success['pos_l_12h']]
            //this.numList = this.randGenerator(6,Math.ceil(this.myData[this.selectCity]/2))
            //this.numList2 = this.randGenerator(6,Math.floor(this.myData[this.selectCity]/2))
            console.log("09090909")
            //console.log(this.myData[this.selectCity]/2)
            console.log(this.myData)
            this.selectedCity = this.selectCity

            }
            //this.init(res.data.dateList, res.data.numList, res.data.numList2),  //2023-4-4，原本的
            this.init(datelist, this.numList, this.numList2),
              this.switper();
          });
        } else {
          this.pageflag = false;
          this.$Message({
            text: res.msg,
            type: "warning",
          });
        }
      });



    }

                  );

    },
    //轮询
    switper() {
      if (this.timer) {
        return;
      }
      let looper = (a) => {
        this.getData();
      };
      this.timer = setInterval(
        looper,
        this.$store.state.setting.echartsAutoTime
      );
      let myChart = this.$refs.charts.chart;
      myChart.on("mouseover", (params) => {
        this.clearData();
      });
      myChart.on("mouseout", (params) => {
        this.timer = setInterval(
          looper,
          this.$store.state.setting.echartsAutoTime
        );
      });
    },
    init(xData, yData, yData2) {
      this.option = {
        xAxis: {
          type: "category",
          data: xData,
          boundaryGap: false, // 不留白，从原点开始
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(31,99,163,.2)",
            },
          },
          axisLine: {
            // show:false,
            lineStyle: {
              color: "rgba(31,99,163,.1)",
            },
          },
          axisLabel: {
            color: "#7EB7FD",
            fontWeight: "500",
          },
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(31,99,163,.2)",
            },
          },
          axisLine: {
            lineStyle: {
              color: "rgba(31,99,163,.1)",
            },
          },
          axisLabel: {
            color: "#7EB7FD",
            fontWeight: "500",
          },
        },
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(0,0,0,.6)",
          borderColor: "rgba(147, 235, 248, .8)",
          textStyle: {
            color: "#FFF",
          },
        },
        grid: {
          //布局
          show: true,
          left: "10px",
          right: "30px",
          bottom: "10px",
          top: "28px",
          containLabel: true,
          borderColor: "#1F63A3",
        },
        series: [
          {
            data: yData,
            type: "line",
            smooth: true,
            symbol: "none", //去除点
            //2023-4-4新增（修改）
            //name: "报警1次数",
            name: "发生概率>0.5雷电数",
            color: "rgba(252,144,16,.7)",
            areaStyle: {
                //右，下，左，上
                color: new graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(252,144,16,.7)",
                    },
                    {
                      offset: 1,
                      color: "rgba(252,144,16,.0)",
                    },
                  ],
                  false
                ),
            },
            markPoint: {
              data: [
                {
                  name: "最大值",
                  type: "max",
                  valueDim: "y",
                  symbol: "rect",
                  symbolSize: [60, 26],
                  symbolOffset: [0, -20],
                  itemStyle: {
                    color: "rgba(0,0,0,0)",
                  },
                  label: {
                    color: "#FC9010",
                    backgroundColor: "rgba(252,144,16,0.1)",
                    borderRadius: 6,
                    padding: [7, 14],
                    borderWidth: 0.5,
                    borderColor: "rgba(252,144,16,.5)",
                    //2023-4-4新增（修改）
                    //formatter: "报警1：{c}",
                    formatter: "发生概率>0.5雷电数最大值：{c}",
                  },
                },
                {
                  name: "最大值",
                  type: "max",
                  valueDim: "y",
                  symbol: "circle",
                  symbolSize: 6,
                  itemStyle: {
                    color: "#FC9010",
                    shadowColor: "#FC9010",
                    shadowBlur: 8,
                  },
                  label: {
                    formatter: "",
                  },
                },
              ],
            },
          },
          {
            data: yData2,
            type: "line",
            smooth: true,
            symbol: "none", //去除点
            //2023-4-4新增（修改）
            //name: "报警2次数",
            name: "发生概率<0.5雷电数",
            color: "rgba(9,202,243,.7)",
            areaStyle: {
                //右，下，左，上
                color: new graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(9,202,243,.7)",
                    },
                    {
                      offset: 1,
                      color: "rgba(9,202,243,.0)",
                    },
                  ],
                  false
                ),
            },
            markPoint: {
              data: [
                {
                  name: "最大值",
                  type: "max",
                  valueDim: "y",
                  symbol: "rect",
                  symbolSize: [60, 26],
                  symbolOffset: [0, -20],
                  itemStyle: {
                    color: "rgba(0,0,0,0)",
                  },
                  label: {
                    color: "#09CAF3",
                    backgroundColor: "rgba(9,202,243,0.1)",

                    borderRadius: 6,
                    borderColor: "rgba(9,202,243,.5)",
                    padding: [7, 14],
                    //2023-4-4新增（修改）
                    //formatter: "报警2：{c}",
                    formatter: "发生概率<0.5雷电数最大值：{c}",
                    borderWidth: 0.5,
                  },
                },
                {
                  name: "最大值",
                  type: "max",
                  valueDim: "y",
                  symbol: "circle",
                  symbolSize: 6,
                  itemStyle: {
                    color: "#09CAF3",
                    shadowColor: "#09CAF3",
                    shadowBlur: 8,
                  },
                  label: {
                    formatter: "",
                  },
                },
              ],
            },
          },
        ],
      };
    },
  },
};
</script>
<style lang='scss' scoped>
.right_top_inner {
  margin-top: -8px;
}
</style>
