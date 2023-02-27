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

          <div style="width: 25%;height: 82%;float: left;border-style: solid;background-color:rgba(255,255,255,0.1);border-color: black;margin-left:80px">
                 <div style="height:5%;text-align:left;;color:white;font-size:150%;margin-left:10px" font-size:40px>
                          模型列表
                 </div>
                 <div style="float:left;color:white;margin-top:10px;width:30%">
                 模型名称：
                 </div>
                <input type="search" name="" id="" style="width:100px;height:30px;border-style: solid;border-color:black;margin:5px">
                        <button type="button" style="width:40px;height:20px">搜索</button>
               <details style="color:white;text-align:left">
                       <summary>全部</summary>
                       <ol>
                           <li>模型1</li>
                           <li>模型2</li>
                           <li>模型3</li>
                       </ol>
                   </details>
                <details style="color:white;text-align:left">
                        <summary>时间序列</summary>
                         <ol>
                        <li>Adsnet</li>
                        <li>Lightnet</li>

                        </ol>
               </details>

          </div>
          <div style="width:35%;height: 40%;color:white;border-style: solid;border-color: black;background-color:rgba(255,255,255,0.1);float: left;text-align:center;margin-left:5px">
               <p>{{name}}</p>
               <div style="width:25%;height: 20%;color:white;border-style: solid;border-color: rgba(255,255,255,0.1);background-color:rgba(255,255,80,0.1);float: left;text-align:center;margin-left:5px;margin-top:50px">
               epoch
               <div>
               {{epoch}}
               </div>
               </div>
                <div style="width:25%;height: 20%;color:white;border-style: solid;border-color: rgba(255,255,255,0.1);background-color:rgba(255,255,80,0.1);float: left;text-align:center;margin-left:40px;margin-top:50px">
                内存
                 <div>
                 {{memory}}
                 </div>
                </div>
                 <div style="width:25%;height: 20%;color:white;border-style: solid;border-color: rgba(255,255,255,0.1);background-color:rgba(255,255,80,0.1);float: left;text-align:center;margin-left:40px;margin-top:50px">
                 loss
                 <div>
                 {{loss}}
                 </div>
                 </div>
                  <div style="width:30%;height: 20%;color:white;border-style: solid;border-color: rgba(255,255,255,0.1);background-color: rgba(255,255,80,0.1);float: left;text-align:center;margin-left:145px;margin-top:50px">
                     currentmaxets
                     <div>
                     {{curren}}
                     </div>
                  </div>
          </div>
          <div style="width: 20%;color:white;height: 40%;float: left;border-style: solid;border-color: black;background-color:rgba(255,255,255,0.1);text-align:center;margin-left:5px">
                历史数据
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
          <div style="width: 35%;height: 40%;float: left;border-style: solid;border-color: black;background-color:rgba(255,255,255,0.1);margin-left:5px;margin-top:5px">
               <button style="width: 20%;height: 10%;margin-top:5px;background-color:lightblue" type="button">
               终止
               </button>
               <div style="width: 45%;color:black;height: 80%;line-height:2.5;border-radius:5px;background-color:rgba(255,255,255,0.4);margin-left:10px;text-align:left;border-style: solid;margin-top:10px">
               模型分类：{{kind}}</br>
               模型训练人：{{trainer}}</br>
               模型消耗资源：{{cost}}</br>
               模型运行状态：{{state}}</br>
               开始时间：{{start}}</br>
               结束时间：{{end}}
               </div>
          </div>

          <div style="width: 20%;height: 40%;color:white;font-size:20;float: left;background-color:rgba(255,255,255,0.1);border-style: solid;border-color: black;margin-top:5px;margin-left:5px">
                <div style="width:42%;height:8%;color:white;border-style:solid;border-color:lightblue;margin-left:7px；margin-top:10px">
                                模型报错历史
                                <div>
                                {{history}}
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
 history :"hello",
 kind:2,
 trainer:3,
 cost:4,
 state:5,
 start:6,
 end:7,
 h1:'none',
 h2:"none",
 h3:"none",
 epoch:1,
 memory:1,
 loss:1,
 curren:3,
 name:1
}
},
created(){
this.$http.get('http://localhost:8002/static/2.json')
.then(res=>{
this.name=res.data.name,
this.kind=res.data.kind
this.trainer=res.data.trainer
this.history=res.data.history
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
}

};
</script>

