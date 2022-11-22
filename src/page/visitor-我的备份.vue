<template>
<div>
    <div style="width: 100%;height: 80px;background-color: cadetblue;text-align:center;">
          块1
    </div>
    <div style="width: 100%;height: 620px;background-color: white;">
          <div style="width: 27%;height: 100%;background-color: lightblue;float: left;border-radius: 60px;text-align:center;">
                块2
          </div>
          <div style="width: 46%;height: 50%;background-color: lightblue;float: left;border-radius: 60px;text-align:center;">
                块3
          </div>
          <div style="width: 27%;height: 50%;background-color: lightblue;float: left;border-radius: 60px;text-align:center;">
                块4
          </div>
          <div style="width: 46%;height: 50%;background-color: lightblue;float: left;border-radius: 60px;text-align:center;">
                块5
          </div>
          <div style="width: 27%;height: 50%;background-color: lightblue;float: left;border-radius: 60px;text-align:center;">
                块6
          </div>

    </div>
</div>
</template>

<script>
	import headTop from '../components/headTop'
    import visitorPie from '@/components/visitorPie'
	import {getUserCity} from '@/api/getData'
    export default {
    	data(){
    		return {
    			pieData: {},
    		}
    	},
    	components: {
    		headTop,
            visitorPie,
    	},
    	mounted(){
    		this.initData();
    	},
    	methods: {
    		async initData(){
    			try{
    				const res = await getUserCity();
    				if (res.status == 1) {
    					this.pieData = res.user_city;
    				}else{
    					throw new Error(res)
    				}
    			}catch(err){
    				console.log('获取用户分布信息失败',err);
    			}
    		},
    	}
    }
</script>

<style lang="less">
	@import '../style/mixin';

</style>
