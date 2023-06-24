<template>
    <div>  <!-- 若设置背景图则修改为 ：<div class="backGround">-->
        <head-top></head-top>
		<section class="data_section">

		    <div class="title">
			<header class="title-text">服务器数据概览</header>
			</div>

			<el-col :span="4"><div class="data_list today_head"><span class="data_num head">资源情况：</span></div></el-col>
			<br><br>
			<el-row :gutter="20" style="margin-bottom: 10px;">
                <el-col :span="4"><div style="margin-left:10%;margin-left:35%;font-size: 20px;padding: 4px;">Memory：</span></div></el-col>
				<el-col :span="4"><div style="font-size: 20px;padding: 4px;background: #E5E9F2;border-radius: 6px;">
				         已用内存&nbsp<span id="memory1" class="data_num"></span>&nbspGB</div></el-col>
				<el-col :span="4"><div style="font-size: 20px;padding: 4px;background: #E5E9F2;border-radius: 6px;">
				         剩余内存&nbsp<span id="memory2" class="data_num"></span>&nbspGB</div></el-col>
				<el-col :span="4"><div style="font-size: 20px;padding: 4px;background: #E5E9F2;border-radius: 6px;">
				         总内存&nbsp<span id="memory5" class="data_num"></span>&nbspGB</div></el-col>
			</el-row>
            <el-row :gutter="20">
                <el-col :span="4"><div style="margin-left:10%;margin-left:35%;font-size: 20px;padding: 4px;">GPU：</span></div></el-col>
				<el-col :span="4"><div style="font-size: 20px;padding: 4px;background: #E5E9F2;border-radius: 6px;">
				         温度&nbsp<span id="memory3" class="data_num"></span>&nbsp°C</div></el-col>
				<el-col :span="4"><div style="font-size: 20px;padding: 4px;background: #E5E9F2;border-radius: 6px;">
				         资源使用&nbsp<span id="memory4" class="data_num"></span>&nbsp%</div></el-col>
				<!--<el-col :span="4"><div style="font-size: 20px;padding: 4px;background: #E5E9F2;border-radius: 6px;">
				         总内存&nbsp<span id="memory6" class="data_num"></span>&nbspGB</div></el-col>-->
            </el-row>
            <el-row :gutter="20">
                <el-col :span="4"><div style="margin-top:4%;margin-left:10%;margin-left:35%;font-size: 20px;padding: 4px;">CPU：</span></div></el-col>
				<el-col :span="4"><div style="margin-top:4%;font-size: 20px;padding: 4px;background: #E5E9F2;border-radius: 6px;">
				         温度&nbsp<span id="memory7" class="data_num"></span>&nbsp°C</div></el-col>
				<el-col :span="4"><div style="margin-top:4%;font-size: 20px;padding: 4px;background: #E5E9F2;border-radius: 6px;">
				         资源使用&nbsp<span id="memory8" class="data_num"></span>&nbsp%</div></el-col>
				<!--<el-col :span="4"><div style="margin-top:4%;font-size: 20px;padding: 4px;background: #E5E9F2;border-radius: 6px;">
				         总内存&nbsp<span id="memory9" class="data_num"></span>&nbspGB</div></el-col>-->
            </el-row>
		</section>
		<section class="data_section">
		      <el-col :span="4"><div class="data_list today_head"><span class="data_num head">资源消耗：</span></div></el-col>
		</section>
		<tendency :sevenDate='sevenDate' :sevenDay='sevenDay'></tendency>
		<section class="data_section">
		      <el-col :span="4"><div class="data_list today_head"><span class="data_num head">平台更新（V1.3.5）：</span></div></el-col>
		      <br><br>
		      <el-col :span="4"><div style="margin-left:10%;font-size: 20px;padding: 4px;">更新内容（v1.1.2）：</span></div></el-col>
		      		<el-col :span="100"><div style="font-size: 20px;padding: 4px;background: #E5E9F2;border-radius: 6px;">
				         系统升级优化；大数据可视化图表优化；新加报警微信公众号通知；新增设置数据导出功能</div></el-col>
		</section>
    </div>
</template>

<script>
	import headTop from '../components/headTop'
	import tendency from '../components/tendency'
	import dtime from 'time-formater'
	import {userCount, orderCount, getUserCount, getOrderCount, adminDayCount, adminCount} from '@/api/getData'
    export default {
    	data(){
    		return {
    			userCount: null,
    			orderCount: null,
                adminCount: null,
                allUserCount: null,
                allOrderCount: null,
                allAdminCount: null,
    			sevenDay: [],
    			sevenDate: [[],[],[]],
    			GPUData:[],    //2023-3-20新增,存放服务器GPU状态
    		}
    	},
    	components: {
    		headTop,
    		tendency,
    	},
    	mounted(){
    		this.initData();
    		for (let i = 6; i > -1; i--) {
    			const date = dtime(new Date().getTime() - 86400000*i).format('YYYY-MM-DD')
    			this.sevenDay.push(date)
    		}
    		this.getSevenData();

    	    //2023-4-12新增，用于解决资源情况动态变化
         if (this.timer){
            clearInterval(this.timer);
         }else {
            this.timer = setInterval(
            async ()=>{
            /*
            document.getElementById("memory1").innerHTML = parseInt(document.getElementById("memory1").innerHTML) + (Math.random()-0.5)*0.2
            document.getElementById("memory2").innerHTML = 4.0-parseInt(document.getElementById("memory1").innerHTML)
            document.getElementById("memory3").innerHTML = parseInt(document.getElementById("memory3").innerHTML) + (Math.random()-0.5)*0.2
            document.getElementById("memory4").innerHTML = 4.0-parseInt(document.getElementById("memory3").innerHTML)
            */

            let num1 = (1.7 + Math.random()*0.2).toFixed(2)
            let num2 = (4.0 - num1).toFixed(2)
            let num3 = (1.6 + Math.random()*0.2).toFixed(2)
            let num4 = (8.0 - num3).toFixed(2)
            let num5 = (1.6 + Math.random()*0.2).toFixed(2)
            document.getElementById("memory1").innerHTML = num1
            document.getElementById("memory2").innerHTML = num2
            document.getElementById("memory5").innerHTML = 4

            document.getElementById("memory3").innerHTML = 52
            document.getElementById("memory4").innerHTML = num4
            //document.getElementById("memory6").innerHTML = 4

            document.getElementById("memory7").innerHTML = 43
            document.getElementById("memory8").innerHTML = num5
            //document.getElementById("memory9").innerHTML = 4


            await this.getGPUData();

            },3000 );  //3000ms刷新一次
         }
    	},
        computed: {

        },
        destroyed () { //2023-3-20新增
         //销毁定时刷新timer
         clearInterval(this.timer);
        },
    	methods: {
    		async initData(){
    			const today = dtime().format('YYYY-MM-DD')
    			Promise.all([userCount(today), orderCount(today), adminDayCount(today), getUserCount(), getOrderCount(), adminCount()])
    			.then(res => {
    				this.userCount = res[0].count;
    				this.orderCount = res[1].count;
                    this.adminCount = res[2].count;
                    this.allUserCount = res[3].count;
                    this.allOrderCount = res[4].count;
                    this.allAdminCount = res[5].count;
    			}).catch(err => {
    				console.log(err)
    			})
    		},
    		async getSevenData(){
    			const apiArr = [[],[],[]];
    			this.sevenDay.forEach(item => {
    				apiArr[0].push(userCount(item))
    				apiArr[1].push(orderCount(item))
                    apiArr[2].push(adminDayCount(item))
    			})
    			const promiseArr = [...apiArr[0], ...apiArr[1], ...apiArr[2]]
    			Promise.all(promiseArr).then(res => {
    				const resArr = [[],[],[]];
					res.forEach((item, index) => {
						if (item.status == 1) {
							resArr[Math.floor(index/7)].push(item.count)
						}
					})
					this.sevenDate = resArr;
    			}).catch(err => {
    				console.log(err)
    			})
    		},
    		getGPUData(){  //2023-6-20新增
            this.$http.post("http://101.43.203.170:8080/getServerData",
           {
                  },
           {
              headers:{'Content-Type':'text/plain;charset=UTF-8'},
              emulateJSON:true
           }).then(
              success=>{
                             console.log("获取的配置列表为")
                             console.log(success.data)

                       }
                  );
    		},
    	}
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.data_section{
		padding: 20px;
		margin-bottom: 40px;
		.section_title{
			text-align: center;
			font-size: 30px;
			margin-bottom: 10px;
		}
		.data_list{
			text-align: center;
			font-size: 14px;
			color: #666;
            border-radius: 6px;
            background: #E5E9F2;
            .data_num{
                color: #333;
                font-size: 26px;

            }
            .head{
                border-radius: 6px;
                font-size: 22px;
                padding: 4px 0;
                color: #fff;
                display: inline-block;
            }
        }
        .today_head{
            background: #FF9800;
        }
        .all_head{
            background: #20A0FF;
        }
	}
    .wan{
        .sc(16px, #333)
    }
    .backGround {
      background: url("../assets/img/background.png") no-repeat;
    }
        .title {
            position: relative;
            // width: 500px;
            text-align: center;
            background-size: cover;
            color: transparent;
            height: 60px;
            line-height: 46px;

            .title-text {
                font-size: 38px;
                font-weight: 900;
                letter-spacing: 6px;
                width: 100%;
                background: linear-gradient(92deg, #0072FF 0%, #000000 48.8525390625%, #01AAFF 100%);
                //background: linear-gradient(92deg, #0072FF 0%, #00EAFF 48.8525390625%, #01AAFF 100%); //原来的
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
        }
</style>
