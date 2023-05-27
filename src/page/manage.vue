<template>
	<div class="manage_page fillcontain">
	<!--2023-4-13新增注释，隐藏/显示侧边栏
	<el-button type="primary"
		style="position:absolute;z-index:2;margin-top:8%;margin-left:10%;color:white;background:#383838;border-color:#808080;"
		@click="showAndHidden1">
		隐藏/显示侧边栏
	</el-button>
	-->
		<el-row style="height: 100%;">
	  		<el-col id="sidebar1" :span="4" style="min-height: 100%; background-color: #324057;">
				<el-menu text-align:Left:default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
					<el-menu-item index="manage"><i class="el-icon-menu"></i>服务器数据概览</el-menu-item>


					<el-submenu index="2">
						<template slot="title"><i class="el-icon-star-on"></i>模型训练监控</template>
						<el-menu-item index="trainingEnvironmentConfiguration">训练环境配置</el-menu-item>
						<el-menu-item index="visitor">模型训练监控</el-menu-item>
						<!-- <el-menu-item index="modelDeployment">用户数据</el-menu-item> -->
					</el-submenu>

					<el-submenu index="3">
						<template slot="title"><i class="el-icon-edit"></i>模型定性分析</template>
						<!-- <el-menu-item index="uploadImg">上传图片</el-menu-item> -->
						<el-menu-item index="modelEffectVerification">模型效果验证</el-menu-item>
					</el-submenu>

					<el-submenu index="4">
						<template slot="title"><i class="el-icon-document"></i>模型输出可视化</template>
						<el-menu-item index="modelDeployment">模型部署页面</el-menu-item>
						<el-menu-item index="map">历史雷电预测情况</el-menu-item>
						<el-menu-item index="mapB">未来12小时雷电预测</el-menu-item>

					</el-submenu>
					<el-submenu index="5">
						<template slot="title"><i class="el-icon-plus"></i>系统运维服务</template>
						<el-menu-item index="sshlogin">ssh登陆信息</el-menu-item>
					    <el-menu-item index="ssh">终端界面</el-menu-item>
						<el-menu-item index="systemLogConfiguration">系统日志配置</el-menu-item>

					</el-submenu>


					<el-submenu index="6">
						<template slot="title"><i class="el-icon-setting"></i>用户信息</template>
						<el-menu-item index="adminSet">管理员设置</el-menu-item>
						<!-- <el-menu-item index="sendMessage">发送通知</el-menu-item> -->
					</el-submenu>
					<el-submenu index="7">
						<template slot="title"><i class="el-icon-warning"></i>系统说明</template>
						<el-menu-item index="explain">说明</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-col>
			<el-col id="sidebar2" :span="0" style="height: 100%;overflow: auto;">
				<keep-alive>
				    <router-view></router-view>
				</keep-alive>
			</el-col>
		</el-row>
  	</div>
</template>

<script>
    export default {
        data () {
           return {
               isHide:1,
           }
        },
		computed: {
			defaultActive: function(){
				return this.$route.path.replace('/', '');
			}
		},
		methods: {
		   //2023-4-3新增，用于选择是否显示平台侧边栏
           showAndHidden1(){
            var div1=document.getElementById("sidebar1");
            var div2=document.getElementById("sidebar2");
            console.log(div2)
            if(div1.style.display=='block')
            {

                div1.style.display='none';
                this.isHide = 1;
                //window.location.reload()
                //$("#sidebar2").load(location.href + "#sidebar2","")
                //window.location.reload("#sidebar2")
                //div2.$(Load())
                //$('#sidebar2').load('#sidebar2');
                //window.location.reload(false)
                //window.location.reload(true)
                //$("#sidebar2").load(location.href+" #sidebar2>*","");
                //$( "#sidebar2" ).load(window.location.href + " #sidebar2" );
                //$("#sidebar2").load(location.href + " #sidebar2>*", "");
                //$('#sidebar2').load(document.URL +  ' #sidebar2');
            }
            else
            {
                div1.style.display='block';
                this.isHide = 0;
            }
            },
		},
    }
</script>


<style lang="less" scoped>
	@import '../style/mixin';
	.manage_page{

	}
</style>
