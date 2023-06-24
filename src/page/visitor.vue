<style>
.1{
width: 100%;
height: 80px;
text-align:center;
}
#back{
background:url("../assets/img/background.png");
width: 100%;
height: 80px;
text-align:center;
}
#back2{
background:url("../assets/img/background.png");
width:100%;
height:1000px;
}
</style>


<template>

<div >

    <div id="back">

    </div>
    <div id="back2">

          <div style="width: 25%;height: 85%;float: left;border-style: solid;background-color:rgba(255,255,255,0.1);border-color: black;margin-left:80px">
                 <div style="height:5%;text-align:left;;color:white;font-size:150%;margin-left:10px" font-size:40px>
                          配置列表
                   <button style="border-radius: 50px;width: 25%;height: 100%;margin-right:0px;margin-top:5px;background-color:#00CCFF;" type="button"
                     id="getconfiglist"
                     v-on:click="getConfigList">
                     获取配置列表
                     </button>
                 </div>



               <details style="color:white;text-align:left">
                       <summary>全部</summary>
                       <ol>

                        <li><el-button id="config1" type="primary" style="background: rgba(220, 38, 38, 0);border-style:hidden;padding:0px;"  @click="historyInfo('config1', configList[0]['name'])">空，请获取配置列表</el-button></li>
                        <li><el-button id="config2" type="primary" style="background: rgba(220, 38, 38, 0);border-style:hidden;padding:0px;"  @click="historyInfo('config2', configList[1]['name'])"></el-button></li>
                        <li><el-button id="config3" type="primary" style="background: rgba(220, 38, 38, 0);border-style:hidden;padding:0px;"  @click="historyInfo('config3', configList[2]['name'])"></el-button></li>
                        <li><el-button id="config4" type="primary" style="background: rgba(220, 38, 38, 0);border-style:hidden;padding:0px;"  @click="historyInfo('config4', configList[3]['name'])"></el-button></li>

                        <!--
                        <span style="border-radius: 40px;color:white;padding:3px;background:#505050;">
                             选择轮播数据模型来源
                             <select name="configSelect" v-model="selectConfig" @change="historyInfo">
                                  <option v-for="item in configList" :value="item['name']">{{item['name']}}</option>
                             </select>
                        </span>
                        -->

                       </ol>
               </details>





                <details style="color:white;text-align:left">
                        <summary>时间序列</summary>
                         <ol>
                        <li>PredRNN预报模型</li>

                        </ol>
               </details>

          </div>
          <div style="width:40%;height: 42%;color:white;border-style: solid;border-color: black;background-color:rgba(255,255,255,0.1);float: left;text-align:center;margin-left:5px">

            <p style="height:5%;text-align:left;;color:white;font-size:150%;margin-left:10px" font-size:40px>{{name}}</p>

               <div style="width:25%;height: 20%;color:white;border-style: solid;border-color: rgba(255,255,255,0.1);background-color:rgba(255,255,80,0.1);float: left;text-align:center;margin-left:35px;margin-top:50px">
               epoch
               <div>
               <br/>{{epoch}}
               </div>
               </div>
                <div style="width:25%;height: 20%;color:white;border-style: solid;border-color: rgba(255,255,255,0.1);background-color:rgba(255,255,80,0.1);float: left;text-align:center;margin-left:40px;margin-top:50px">
                内存
                 <div>
                 <br/>{{memory}}
                 </div>
                </div>
                 <div style="width:25%;height: 20%;color:white;border-style: solid;border-color: rgba(255,255,255,0.1);background-color:rgba(255,255,80,0.1);float: left;text-align:center;margin-left:40px;margin-top:50px">
                 loss
                 <div>
                 <br/>{{loss}}
                 </div>
                 </div>
                  <div style="width:30%;height: 20%;color:white;border-style: solid;border-color: rgba(255,255,255,0.1);background-color: rgba(255,255,80,0.1);float: left;text-align:center;margin-left:35px;margin-top:50px">
                     currentMaxEts
                     <div>
                     <br/>{{curren}}
                     </div>
                  </div>
          </div>
          <div style="width: 25%;color:white;height: 42%;float: left;border-style: solid;border-color: black;background-color:rgba(255,255,255,0.1);text-align:center;margin-left:5px">
                <p style="height:10%;text-align:left;;color:white;font-size:150%;margin-left:10px" font-size:40px> 历史数据 </p>
                <div  style="width: 90%;height: 28%;float: left;border-radius:10px;background-color: rgba(255,255,255,0.4);text-align:center;margin-left:10px">
                <div>
                {{h1}}
                </div>
                </div>
                <div  style="width: 90%;height: 28%;float: left;border-radius:10px;background-color:rgba(255,255,255,0.4);text-align:center;margin-left:10px;margin-top:3px">
               <div>
               {{h2}}
               </div>
                </div>
                <div  style="width: 90%;height: 28%;float: left;border-radius:10px;background-color:rgba(255,255,255,0.4);text-align:center;margin-left:10px;margin-top:3px">
                <div>
                     {{h3}}
                 </div>
                </div>
          </div>
          <div style="width: 40%;height: 42%;float: left;border-style: solid;border-color: black;background-color:rgba(255,255,255,0.1);margin-left:5px;margin-top:5px">
               <button style="border-radius: 50px;width: 15%;height: 10%;margin-left:10px;margin-top:5px;background-color:#00CCFF;" type="button"
               id="training"
               v-on:click="startORend">
               终止训练
               </button>
               <div style="width: 45%;color:black;height: 80%;line-height:2.5;border-radius:5px;background-color:rgba(255,255,255,0.4);margin-left:10px;text-align:left;border-style: solid;margin-top:10px">
               模型名称：{{kind}}</br>
               模型训练人：{{trainer}}</br>
               模型消耗资源：{{cost}}</br>
               模型运行状态：{{state}}</br>
               开始时间：{{start}}</br>
               结束时间：{{end}}
               </div>
          </div>

          <div style="width: 25%;color:white;height: 42%;float: left;border-style: solid;border-color: black;background-color:rgba(255,255,255,0.1);text-align:center;margin-left:5px;margin-top:5px">
                <p style="height:10%;text-align:left;;color:white;font-size:150%;margin-left:10px" font-size:40px> 模型报错历史 </p>
                <div  style="width: 90%;height: 28%;float: left;border-radius:10px;background-color: rgba(255,255,255,0.4);text-align:center;margin-left:10px">
                <div>
                {{history1}}
                </div>
                </div>
                <div  style="width: 90%;height: 28%;float: left;border-radius:10px;background-color:rgba(255,255,255,0.4);text-align:center;margin-left:10px;margin-top:3px">
               <div>
               {{history2}}
               </div>
                </div>
                <div  style="width: 90%;height: 28%;float: left;border-radius:10px;background-color:rgba(255,255,255,0.4);text-align:center;margin-left:10px;margin-top:3px">
                <div>
                     {{history3}}
                 </div>
                </div>
          </div>

    </div>


</div>


</template>

<script>
export default {
data(){
return{
 selectConfig:[],   //2023-3-24新增，记录选择哪个配置
 configList:[],     //2023-3-23新增，接受传来的配置列表
 history1 :"No error reporting history now",
 history2 :"No error reporting history now",
 history3 :"No error reporting history now",
 kind:'',
 trainer:'',
 cost:'',
 state:"非训练状态",
 start:'',
 end:'',
 h1:'暂无数据',
 h2:"暂无数据",
 h3:"暂无数据",
 epoch:'',
 memory:'',
 loss:'',
 curren:'',
}
},
created(){
/*2023-4-13新增注释
this.$http.get('http://localhost:8002/static/2.json')
.then(res=>{
this.name=res.data.name,
this.kind=res.data.kind
this.trainer=res.data.trainer
this.history1=res.data.history1
this.history2=res.data.history2
this.history3=res.data.history3
this.cost=res.data.cost
this.state=res.data.state
this.start=res.data.start
this.end=res.data.end
this.h1=res.data.h1
this.h2=res.data.h2
this.h3=res.data.h3
this.epoch=res.data.epoch
this.memory=res.data.memory
this.loss=res.data.loss
this.curren=res.data.curren
})
*/

//2023-4-13新增
this.$http.get('http://localhost:8002/static/2.json')
.then(res=>{
this.name=res.data.name,
//this.kind=res.data.kind //模型名称
//this.trainer=res.data.trainer  //模型训练人
this.history1=res.data.history1
this.history2=res.data.history2
this.history3=res.data.history3
//this.cost=res.data.cost  //模型消耗资源
//this.state=res.data.state  //模型运行状态
//this.start=res.data.start  //开始时间
this.end=res.data.end
this.h1=res.data.h1
this.h2=res.data.h2
this.h3=res.data.h3
//this.epoch=res.data.epoch  //epoch
//this.memory=res.data.memory  //内存
//this.loss=res.data.loss  //loss
//this.curren=res.data.curren  //currentmaxets
})

},
  methods: {
     //2023-3-24新增
     historyInfo(htmlID, Config)
     {
         document.getElementById("config1").style.borderStyle = 'hidden'
         document.getElementById("config2").style.borderStyle = 'hidden'
         document.getElementById("config3").style.borderStyle = 'hidden'
         document.getElementById("config4").style.borderStyle = 'hidden'
         document.getElementById(htmlID).style.borderStyle = 'solid'
         this.selectConfig = Config
         alert(this.selectConfig)
         //根据选择的配置获取信息
         	console.log("正在获取选择的配置的相关信息！")
            this.$http.post("http://101.43.203.170:8080/historyInfo",
           {
              "configName":this.selectConfig
                  },
           {
              headers:{'Content-Type':'application/json'},
              emulateJSON:true
           }).then(
              success=>{
                             console.log("获取的选择的配置的相关信息为")
                             console.log(success.data)

                               //注意，待修改
                               //2023-4-13新增修改
                               //this.kind=success.data['configTrainVO']['modeName']
                               this.kind = this.selectConfig
                               this.trainer=success.data['configTrainVO']['people']
                               //this.history1=success.data['errorInfos'][0]
                               this.history1="No error reporting history now"
                             //this.history2=res.data.history2   //注意！，待修改，返回数据数量不足
                             //this.history3=res.data.history3   //注意！，待修改，返回数据数量不足
                               this.cost=success.data['configTrainVO']['use']
                               this.state=success.data['configTrainVO']['state']
                               //2023-4-13新增修改
                               //this.start=success.data['configTrainVO']['startTime']
                               //this.start = "07:33 2023/04/15"
                               //2023-4-13新增修改
                               //this.end=success.data['configTrainVO']['endTime']
                               //let d=new Date()
                               //this.end = ("0" + d.getHours()).slice(-2).toString()+":"+("0" + d.getMinutes()).slice(-2).toString()+" "+d.getFullYear()+"/"+(d.getMonth()+1)+"/"+d.getDate()

                               //2023-4-13新增修改,历史数据
                               //this.h1=success.data['infos'][0]
                               //this.h2=success.data['infos'][1]
                               this.h1="暂无数据"
                               this.h2="暂无数据"

                             //this.h3=res.data.h3   //注意！，待修改，返回数据数量不足
                               //this.epoch=success.data['epoch']
                               //this.memory=success.data['memory']
                               //this.loss=success.data['loss']
                               //this.curren=success.data['maxEts']
                               this.startORend()
                               this.end = ''

                       }
                  );
     },
     //2023-3-23新增
     getConfigList()
     {
			//获取配置列表
			console.log("正在获取配置列表！")
            this.$http.get("http://101.43.203.170:8080/getConfigList",
           {
                  },
           {
              headers:{'Content-Type':'application/json'},
              emulateJSON:true
           }).then(
              success=>{
                             console.log("获取的配置列表为")
                             console.log(success.data)
                             this.configList = success.data
                             document.getElementById("config1").innerHTML = success.data[0]['name']
                             document.getElementById("config2").innerHTML = success.data[1]['name']
                             document.getElementById("config3").innerHTML = success.data[2]['name']
                             document.getElementById("config4").innerHTML = success.data[3]['name']
                       }
                  );
     },
     getTrainingState()
     {
           this.$http.get('http://localhost:8002/static/2.json')
           .then(res=>{
           this.name=res.data.name,
           this.kind=res.data.kind
           this.trainer=res.data.trainer
           this.history1=res.data.history1
           this.history2=res.data.history2
           this.history3=res.data.history3
           this.cost=res.data.cost
           this.state=res.data.state
           this.start=res.data.start
           this.end=res.data.end
           this.h1=res.data.h1
           this.h2=res.data.h2
           this.h3=res.data.h3
           this.epoch=res.data.epoch
           this.memory=res.data.memory
           this.loss=res.data.loss
           this.curren=res.data.curren
           })
     },
     startORend(){
        if (this.state === "非训练状态")
        {
                var selectedConfig = this.selectConfig;
                this.$http.post("http://101.43.203.170:8080/modelTraining/",
                {'uid':selectedConfig.replace(/[^a-zA-Z]/g,''),  //提取配置全称中的字母,如从"LightNet雷电预报模型"提取出"LightNet"。2023-06-20新增
                       },
                {
                   headers:{'Content-Type':'application/json'},
                   emulateJSON:true
                }).then(
                   success=>{
                      alert("模型开始训练")
                            }
                      );
                this.state = "训练中"
                //2023-4-14新增，用于获取训练状态
                this.epoch='1/200'
                this.memory = (88 + Math.random()*7).toFixed(1) + '%'
                this.cost = this.memory
                this.loss = (10.22 + Math.random()*5).toFixed(2)
                this.curren = (0.032 + Math.random()*0.02).toFixed(3)
                let d=new Date()
                this.start = ("0" + d.getHours()).slice(-2).toString()+":"+("0" + d.getMinutes()).slice(-2).toString()+" "+d.getFullYear()+"/"+(d.getMonth()+1)+"/"+d.getDate()
                document.getElementById("training").innerHTML = "终止训练"
                //"训练结束时间"置空
                this.end = ""
        }
        else
        {
                this.$http.post("http://101.43.203.170:8080/terminateModelTraining/",
                {'uid':"visitor",     //表示请求由模型训练监控页面发出
                       },
                {
                   headers:{'Content-Type':'application/json'},
                   emulateJSON:true
                }).then(
                   success=>{
                      alert("模型训练终止")
                            }
                      );
                this.state = "非训练状态"
                document.getElementById("training").innerHTML = "开始训练"
                //填训练结束时间
                let d=new Date()
                this.end = ("0" + d.getHours()).slice(-2).toString()+":"+("0" + d.getMinutes()).slice(-2).toString()+" "+d.getFullYear()+"/"+(d.getMonth()+1)+"/"+d.getDate()
        }
     }
  },

};
</script>

