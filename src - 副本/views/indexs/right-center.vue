<!--
 * @Author: daidai
 * @Date: 2022-03-01 15:51:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-29 15:12:46
 * @FilePath: \web-pc\src\pages\big-screen\view\indexs\right-bottom.vue
-->
<template>
  <div class="right_bottom">
    <dv-capsule-chart :config="config" style="width:100%;height:260px" />
  </div>
</template>

<script>
import { currentGET } from 'api/modules'
export default {
  data() {
    return {
      gatewayno: '',
      config: {
        showValue: true,
        unit: "次",
        data: []
      },

    };
  },
  created() {
    this.getData()

  },
  computed: {
  },
  mounted() { },
  beforeDestroy() {
    this.clearData()
  },
  methods: {
    clearData() {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    },
    //轮询
    switper() {
      if (this.timer) {
        return
      }
      let looper = (a) => {
        this.getData()
      };
      this.timer = setInterval(looper, this.$store.state.setting.echartsAutoTime);
    },

    //2023-4-5新增修改，把getData()原函数加在this.$http.post的then(success=>{ 加在这里 })里
    getData() {
               //2023-4-5新增，获取未来12h城市及其雷电数 (从高到低排序)
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
                 //console.log(success['list'][0])



      this.pageflag = true
      // this.pageflag =false
      currentGET('big7', { gatewayno: this.gatewayno }).then(res => {

        if (!this.timer) {
          console.log('报警排名', res);
        }
        if (res.success) {
          this.config = {
            ...this.config,
            /*
            //新增！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
            data: [{value:26+Math.floor(50*Math.random()),name: "北京市"},{value:15+Math.floor(50*Math.random()),name: "天津市"},
                   {value:36+Math.floor(60*Math.random()),name: "石家庄市"},{value:36+Math.floor(60*Math.random()),name: "唐山市"},
                   {value:36+Math.floor(60*Math.random()),name: "秦皇岛市"},{value:36+Math.floor(60*Math.random()),name: "邯郸市"},
                   {value:36+Math.floor(60*Math.random()),name: "邢台市"},{value:36+Math.floor(60*Math.random()),name: "衡水市"},
                   {value:36+Math.floor(60*Math.random()),name: "沧州市"},{value:36+Math.floor(60*Math.random()),name: "廊坊市"},
                   {value:36+Math.floor(60*Math.random()),name: "保定市"},{value:36+Math.floor(60*Math.random()),name: "张家口市"},
                   {value:36+Math.floor(60*Math.random()),name: "承德市"},
                   ]
            */
            //2023-4-5新增，注释掉
            //2023-4-3改，修改为TOP10
            /*
            data: [{value:126, name: "北京市"},{value:118, name: "天津市"},
                   {value:106, name: "石家庄市"},{value:101, name: "唐山市"},
                   {value:83, name: "秦皇岛市"},{value:78, name: "邯郸市"},
                   {value:76, name: "邢台市"},{value:56, name: "衡水市"},
                   {value:40, name: "沧州市"},{value:36, name: "廊坊市"},
                   ]
            */

                             //2023-4-3改，修改为TOP10
                   data: [{value: success['list'][0][1], name: success['list'][0][0]},{value: success['list'][1][1], name: success['list'][1][0]},
                   {value: success['list'][2][1], name: success['list'][2][0]},{value: success['list'][3][1], name: success['list'][3][0]},
                   {value: success['list'][4][1], name: success['list'][4][0]},{value: success['list'][5][1], name: success['list'][5][0]},
                   {value: success['list'][6][1], name: success['list'][6][0]},{value: success['list'][7][1], name: success['list'][7][0]},
                   {value: success['list'][8][1], name: success['list'][8][0]},{value: success['list'][9][1], name: success['list'][9][0]},
                   ]

          }
          this.switper()
        } else {
          this.pageflag = false
          this.srcList = []
          this.$Message({
            text: res.msg,
            type: 'warning'
          })
        }
      })


    }

                  );
                   }
  },
};
</script>
<style lang='scss' scoped>
.list_Wrap {
  height: 100%;
  overflow: hidden;
  :deep(.kong)   {
    width: auto;
  }
}

.sbtxSwiperclass {
  .img_wrap {
    overflow-x: auto;
  }

}

.right_bottom {
  box-sizing: border-box;
  padding: 0 16px;

  .searchform {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;

    .searchform_item {
      display: flex;
      justify-content: center;
      align-items: center;

      label {
        margin-right: 10px;
        color: rgba(255, 255, 255, 0.8);
      }

      button {
        margin-left: 30px;
      }

      input {}
    }
  }

  .img_wrap {
    display: flex;
    // justify-content: space-around;
    box-sizing: border-box;
    padding: 0 0 20px;
    // overflow-x: auto;

    li {
      width: 105px;
      height: 137px;
      border-radius: 6px;
      overflow: hidden;
      cursor: pointer;
      // background: #84ccc9;
      // border: 1px solid #ffffff;
      overflow: hidden;
      flex-shrink: 0;
      margin: 0 10px;

      img {
        flex-shrink: 0;
      }
    }




  }

  .noData {
    width: 100%;
    line-height: 100px;
    text-align: center;
    color: rgb(129, 128, 128);

  }
}
</style>