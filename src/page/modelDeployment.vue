<template>
    <div>
        <head-top></head-top>
        <el-row style="margin-top: 20px;">
  			<el-col :span="12" :offset="4">
		     
					
				
				
						<el-form :model="formData" :rules="rules" ref="formData" label-width="110px" class="demo-formData">
						<el-form-item label="配置名称" required=true>
							<el-input :disabled="true" value="LMoe多专家预报"></el-input>
						</el-form-item>
						

					<el-form-item label="预报程序入口"  required=true>
						<el-autocomplete
						  v-model="modelMainPath.path"
						  :fetch-suggestions="querySearchAsync"
						  style="width: 100%;"
						  @select="addressSelect"
						></el-autocomplete>
					</el-form-item>

					<el-form-item label="预报产品输出地址" required=true>
						<el-autocomplete
						  v-model="Log.path"
						  :fetch-suggestions="querySearchAsync"
						  style="width: 100%;"
						  @select="addressSelect"
						></el-autocomplete>
					</el-form-item>

					<el-table
					    :data="activities"
					    style="min-width: 600px;margin-bottom: 20px;"
						align="cneter"
					   >
					    <el-table-column
					      prop="name"
					      label="配置名称"
					      align="cneter"
					      width="120">
					    </el-table-column>
					    <el-table-column
					      prop="score_name"
					      label="配置指标名称"
					      align="cneter"
					      width="120">
					    </el-table-column>
					    <el-table-column
					      prop="score"
					      align="cneter"
					      label="指标数值">
					    </el-table-column>
					    <el-table-column
					    	label="操作"
					    	width="120">
					    <template>
					        <el-button
					          size="small"
					          type="submit"
							  @select="selectButton"
							  @click="selectButton"
					         >确定</el-button>
					    </template>
					    </el-table-column>
					</el-table>
					<el-input :disabled="true" 
				style="width: 100%;"
				title="true " 
				color="red"
				contextmenu="center"
				
				value="注意，输出文件命名里不能包含出年月日以外的命名数字，
				一个正确的文件输出名 201512121200.xxx"></el-input>
				 
					        <el-button
					          size="small"
					          type="success"
					         >部署</el-button>
					
				</el-form>

  			</el-col>
  		</el-row>
    </div>
</template>

<script>
    import headTop from '@/components/headTop'
    import {cityGuess, addShop, searchplace, foodCategory} from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env'
    export default {
    	data(){
    		return {
    			city: {},
				modelConfig:{
					configname: 'PredRNN模型训练配置', //店铺名称
					modelname:'PredRNN',
				},
				
				modelConfigList:[
{name:'LMoeEnvName(python3.6版)'},
{name:'ADSEnvName(python3.5版)'},
{name:'LightNetEnvName(python3.6版)'}]
				,

				modelMainPath:{
					path: '/home/pre/LMoe/main.py', //店铺名称
				},
				Log:{
					path: '/Data/output/LMoe/', //
				},
    			formData: {
					name: '123', //店铺名称
					address: '123', //地址
					latitude: '',
					longitude: '',
					description: '', //介绍
					phone: '',
					promotion_info: '',
					float_delivery_fee: 5, //运费
					float_minimum_order_amount: 20, //起价
					is_premium: true,
					delivery_mode: true,
					new: true,
					bao: true,
					zhun: true,
					piao: true,
					startTime: '',
       	 			endTime: '',
       	 			image_path: '',
       	 			business_license_image: '',
       	 			catering_service_license_image: '',

		        },
		        rules: {
					Configname: [
						{ required: true,message: '配置名称必填', trigger: 'blur' },
					],
					
					runPath: [
						{ required: true,message: '程序入口必填', trigger: 'blur' },
					],

					runPath: [
						{ required: true,message: '程序入口必填', trigger: 'blur' },
					],

					envs: [
						{ required: true,message: '环境必选', trigger: 'blur' },
					],
					
				},
				options: [{
		          	value: '选项1',
		          	label: '选项1'
		        }, {
		          	value: '选项2',
		          	label: '选项2'
		        }, {
		          	value: '选项3',
		          	label: '选项3'
		        }, {
		          	value: '选项4',
		          	label: '选项5'
		        }],
       	 		activityValue: '选项1',
				activities: [{
		        	icon_name: '1',
		        	name: 'LMoe多专家预报',
					score_name:'ETS',
		        	score: '0.1790',
			    },
				
				{
		        	icon_name: '2',
		        	name: 'ADSNet雷电预报模型',
					score_name:'ETS',
		        	score: '0.1660',
			    },
				{
		        	icon_name: '3',
		        	name: 'LightNet雷电预报模型',
					score_name:'ETS',
		        	score: '0.1440',
			    }],
			    
    		}
    	},
    	components: {
    		headTop,
    	},
    	mounted(){
    		this.initData();
    	},
    	methods: {



    		async initData(){
    			try{
    				this.city = await cityGuess();
    				const categories = await foodCategory();
    				categories.forEach(item => {
    					if (item.sub_categories.length) {
    						const addnew = {
    							value: item.name,
						        label: item.name,
						        children: []
    						}
    						item.sub_categories.forEach((subitem, index) => {
    							if (index == 0) {
    								return
    							}
    							addnew.children.push({
    								value: subitem.name,
						        	label: subitem.name,
    							})
    						})
    						this.categoryOptions.push(addnew)

    					}
    				})
    			}catch(err){
    				console.log(err);
    			}
    		},
			

    		async querySearchAsync(queryString, cb) {
				console.log('ok')
				console.log(queryString)
				this.modelConfigList.map(item => {
					console.log(item)
							item.value = item.name;
							return item;
							})
						

						cb(cityList)
			
		    },
		    addressSelect(address){
				console.log('ok222')
		    },
			handleShopAvatarScucess(res, file) {
				if (res.status == 1) {
					this.formData.image_path = res.image_path;
				}else{
					this.$message.error('上传图片失败！');
				}
			},
			handleBusinessAvatarScucess(res, file) {
				if (res.status == 1) {
					this.formData.business_license_image = res.image_path;
				}else{
					this.$message.error('上传图片失败！');
				}
			},
			handleServiceAvatarScucess(res, file) {
				if (res.status == 1) {
					this.formData.catering_service_license_image = res.image_path;
				}else{
					this.$message.error('上传图片失败！');
				}
			},
			beforeAvatarUpload(file) {
				const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png');
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isRightType) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isRightType && isLt2M;
			},
			tableRowClassName(row, index) {
		        if (index === 1) {
		        	return 'info-row';
		        } else if (index === 3) {
		        	return 'positive-row';
		        }
		        return '';
		    },
		    selectActivity(){
		    	this.$prompt('请输入活动详情', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		        }).then(({ value }) => {
		        	if (value == null) {
		        		this.$message({
				            type: 'info',
				            message: '请输入活动详情'
				        });
		        		return
		        	}
		          	let newObj = {};
		          	switch(this.activityValue){
		          		case '满减优惠':
		          			newObj= {
		          				icon_name: '减',
					        	name: '满减优惠',
					        	description: value,
		          			}
		          			break;
		          		case '优惠大酬宾':
		          			newObj= {
		          				icon_name: '特',
					        	name: '优惠大酬宾',
					        	description: value,
		          			}
		          			break;
		          		case '新用户立减':
		          			newObj= {
		          				icon_name: '新',
					        	name: '新用户立减',
					        	description: value,
		          			}
		          			break;
		          		case '进店领券':
		          			newObj= {
		          				icon_name: '领',
					        	name: '进店领券',
					        	description: value,
		          			}
		          			break;
		          	}
		          	this.activities.push(newObj);
		        }).catch(() => {
		          	this.$message({
		            	type: 'info',
		            	message: '取消输入'
		          	});
		        });
		    },
		    handleDelete(index){
		    	this.activities.splice(index, 1)
		    },
		    submitForm(formName) {
				
			},
		}
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.button_submit{
		text-align: center;
	}
	.avatar-uploader .el-upload {
	    border: 1px dashed #d9d9d9;
	    border-radius: 6px;
	    cursor: pointer;
	    position: relative;
	    overflow: hidden;
	}
	.avatar-uploader .el-upload:hover {
	    border-color: #20a0ff;
	}
	.avatar-uploader-icon {
	    font-size: 28px;
	    color: #8c939d;
	    width: 120px;
	    height: 120px;
	    line-height: 120px;
	    text-align: center;
	}
	.avatar {
	    width: 120px;
	    height: 120px;
	    display: block;
	}
	.el-table .info-row {
	    background: #c9e5f5;
	}

	.el-table .positive-row {
	    background: #e2f0e4;
	}
</style>
