<template>
<div >

    <div style="width: 100%;height: 80px;text-align:center;background-color:#0D1B4B;color:green">
          模型训练
    </div>
    <div style="width: 100%;height: 800px;background-color:#0D1B4B">

          <div style="width: 25%;height: 82%;float: left;border-style: solid;background-color:rgba(255,255,255,0.1);border-color: black;margin-left:80px">
                 <div style="height:5%;text-align:left;;color:white;font-size:150%;margin-left:10px" font-size:40px>
                          模型列表
                 </div>
                 <div style="float:left;color:whitel;margin-top:10px;width:30%">
                 模型名称：
                 </div>
                <input type="search" name="" id="" style="width:100px;height:30px;border-style: solid;border-color:black;margin:5px">
                        <button type="button" style="width:40px;height:20px">搜索</button>
               <details style="color:white;text-align:left">
                       <summary>全部</summary>
                       <ol>
                           <li>1</li>
                           <li>2</li>
                           <li>3</li>
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
               <p>LghitNet</p>
               <div style="width:25%;height: 20%;color:black;border-style: solid;border-color: black;background-color:#F5F5F5;float: left;text-align:center;margin-left:5px;margin-top:50px">
               epoch
               </div>
                <div style="width:25%;height: 20%;color:black;border-style: solid;border-color: black;background-color:#F5F5F5;float: left;text-align:center;margin-left:40px;margin-top:50px">
                内存
                </div>
                 <div style="width:25%;height: 20%;color:black;border-style: solid;border-color: black;background-color:#F5F5F5;float: left;text-align:center;margin-left:40px;margin-top:50px">
                 loss
                 </div>
                  <div style="width:30%;height: 20%;color:black;border-style: solid;border-color: black;background-color:#F5F5F5;float: left;text-align:center;margin-left:145px;margin-top:50px">
                     currentmaxets
                  </div>
          </div>
          <div style="width: 20%;color:white;height: 40%;float: left;border-style: solid;border-color: black;background-color:rgba(255,255,255,0.1);text-align:center;margin-left:5px">
                历史数据
                <div  style="width: 90%;height: 28%;float: left;border-radius:10px;background-color: rgba(255,255,255,0.4);text-align:center;margin-left:10px">
                </div>
                <div  style="width: 90%;height: 28%;float: left;border-radius:10px;background-color:rgba(255,255,255,0.4);text-align:center;margin-left:10px;margin-top:3px">
                </div>
                <div  style="width: 90%;height: 28%;float: left;border-radius:10px;background-color:rgba(255,255,255,0.4);text-align:center;margin-left:10px;margin-top:3px">
                </div>
          </div>
          <div style="width: 35%;height: 40%;float: left;border-style: solid;border-color: black;background-color:rgba(255,255,255,0.1);margin-left:5px;margin-top:5px">
               <button style="width: 20%;height: 10%;margin-top:5px;background-color:lightblue" type="button">
               终止
               </button>
               <div style="width: 45%;height: 80%;line-height:3;border-radius:10px;background-color:rgba(255,255,255,0.4);margin-left:10px;text-align:left;border-style: solid;margin-top:10px">
               模型分类：</br>
               模型训练人：</br>
               模型消耗资源：</br>
               模型运行状态：</br>
               开始时间：</br>
               结束时间：
               </div>
          </div>

          <div style="width: 20%;height: 40%;color:white;font-size:20;float: left;background-color:rgba(255,255,255,0.1);border-style: solid;border-color: black;margin-top:5px;margin-left:5px">
                <div style="width:42%;height:8%;color:white;border-style:solid;border-color:lightblue;margin-left:7px；margin-top:10px">
                                模型报错历史
                          </div>
          </div>

    </div>
</div>

</template>
<script>

</script>

<style>
.1{
width: 100%;
height: 80px;
text-align:center;

}

</style>
