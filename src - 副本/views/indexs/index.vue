<!--
 * @Author: daidai
 * @Date: 2022-03-04 09:23:59
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-05-07 11:05:02
 * @FilePath: \web-pc\src\pages\big-screen\view\indexs\index.vue
-->
<template>
  <div class="contents">

    <!--注释2-  改变中间和右边的排版即可调整本页面  -->

      <form label="选择配置">
		<select
    	v-model="selectConfig"
    	required=true
        style="margin-top:6%;margin-left:2.3%;height:3%;width:10%;position:absolute;z-index:2;font-size:14px;"
        >
		  <option value="LMoe多专家集成预报模型" selected:disabled>LMoe多专家集成预报模型</option>
          <option value="LightNet雷电预报模型">&nbsp&nbsp&nbsp&nbsp LightNet雷电预报模型</option>
          <option value="ADSNet雷电预报模型">&nbsp&nbsp&nbsp&nbsp ADSNet雷电预报模型</option>
          <option value="PredRNN时空序列预报模型">PredRNN时空序列预报模型</option>
    	</select>


           <el-button type="primary" style="opacity:80%;margin-top:6%;margin-left:13%;height:3%;width:4%;position:absolute;z-index:2;font-size:14px;text-align:center;"
                v-on:click="doPre">预报
           </el-button>

      </form>

    <div style="width: 1300px; height:1000px; margin-top: 1%">   <!--注释3-  改变地图边框高度改center-map.vue中mapwrap；改变地图大小改center-map.vue中init中zoom  -->

      <CenterMap class="contetn_center_top" />

    </div>

    <div class="contetn_right">
      <ItemWrap
        class="contetn_left-bottom contetn_lr-item"
        title="雷电高发时刻"
      >
      {{this.selectCity}}
            <RightTop />   <!--注释1-  用于"雷电高发时刻"里数据显示  -->
      </ItemWrap>

      <ItemWrap
        class="contetn_left-bottom contetn_lr-item"
        title="实时预测雷电发生情况TOP10(京津冀)"
        style="padding: 0 10px 16px 10px"
      >
             <RightCenter />
      </ItemWrap>

    </div>

  </div>
</template>

<script>
import LeftTop from './left-top.vue'
import LeftCenter from "./left-center.vue";
import LeftBottom from "./left-bottom.vue";
import CenterMap from "./center-map.vue";
import CenterBottom from "./center-bottom.vue";
import RightTop from "./right-top.vue";
import RightCenter from "./right-center.vue";
import RightBottom from "./right-bottom.vue";

export default {
  components: {
    LeftTop,
    LeftCenter,
    LeftBottom,
    CenterMap,
    RightTop,
    RightCenter,
    RightBottom,
    CenterBottom,
  },
  data() {
    return {
          selectConfig:'LMoe多专家集成预报模型' ,  //2023-3-25新增，用于传输给后端预报接口doPre参数，有一个默认值
          selectCity: '',  //2023-4-6新增，点击选择城市
    };
  },
  filters: {
    numsFilter(msg) {
      return msg || 0;
    },
  },
  created() {
  },

  mounted() {
            //2023-4-6新增，点击选择城市
            this.$bus.$on('msg',(msg) => {
               this.selectCity = msg;
              console.log(msg)
            })},
  methods: {
      //2023-3-24新增
      doPre()
      {
            var d=new Date()
            var month = d.getMonth()+1
            var timeNow = d.getFullYear().toString()+("0" + month).slice(-2).toString()+("0" + d.getDate()).slice(-2).toString()+("0" + d.getHours()).slice(-2).toString()+"00"
          	//预报页面：预报
			console.log(timeNow)
            this.$http.post("http://172.31.246.20:8081/train/doPre",
           {
               'time': timeNow,
               'configName': this.selectConfig
                  },
           {
              headers:{'Content-Type':'application/json'},
              emulateJSON:true
           }).then(
              success=>{
                             console.log("获取的doPre接口返回值为")
                             console.log(success)
                       }
                  );
      }
  },
};
</script>
<style lang="scss" scoped>
// 内容
.contents {
  .contetn_left,
  .contetn_right {
    width: 540px;
    box-sizing: border-box;
    // padding: 16px 0;
  }

  .contetn_center {
    width: 720px;
  }

  //左右两侧 三个块
  .contetn_lr-item {
    height: 310px;
  }

  .contetn_center_top {
    width: 100%;
  }

  // 中间
  .contetn_center {
    display: flex;
    flex-direction: column;
    justify-content: space-around;


  }

  .contetn_center-bottom {
    height: 315px;
  }

  //左边 右边 结构一样
  .contetn_left,
  .contetn_right {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    position: relative;

  
  }
}


@keyframes rotating {
    0% {
        -webkit-transform: rotate(0) scale(1);
        transform: rotate(0) scale(1);
    }
    50% {
        -webkit-transform: rotate(180deg) scale(1.1);
        transform: rotate(180deg) scale(1.1);
    }
    100% {
        -webkit-transform: rotate(360deg) scale(1);
        transform: rotate(360deg) scale(1);
    }
}
</style>
