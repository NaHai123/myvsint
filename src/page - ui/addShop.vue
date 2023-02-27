<template>
    <div id="back">
        <head-top></head-top>
        <el-row style="margin-top: 20px;color:white;">
  			<el-col :span="12" :offset="4">
		        <el-form :model="formData" :rules="rules" ref="formData" label-width="110px" class="demo-formData">
					<el-form-item label="环境名称" prop="name">
						<el-input v-model="formData.name"></el-input>
					</el-form-item>
					<el-form-item label="配置标准库" prop="address">
						<el-autocomplete
						  v-model="formData.address"
						  :fetch-suggestions="querySearchAsync"
						  placeholder="包请用#分割 例如 torch:3.6#numpy:3.5"
						  style="width: 100%;"
						  @select="addressSelect"
						></el-autocomplete>
					</el-form-item>
					<el-form-item label="高级设置1" prop="phone">
						<el-input v-model.number="formData.phone" maxLength="11"></el-input>
					</el-form-item>
					<el-form-item label="高级设置2" prop="description">
						<el-input v-model="formData.description"></el-input>
					</el-form-item>
					<el-form-item label="高级设置3" prop="promotion_info">
						<el-input v-model="formData.promotion_info"></el-input>
					</el-form-item>
					<el-form-item label="高级设置4">
						<el-cascader
						  :options="categoryOptions"
						  v-model="selectedCategory"
						  change-on-select
						></el-cascader>
					</el-form-item>
					<el-form-item label="高级设置5" style="white-space: nowrap;">
						<span>选项1</span>
						<el-switch on-text="" off-text="" v-model="formData.is_premium"></el-switch>
						<span>选项2</span>
						<el-switch on-text="" off-text="" v-model="formData.delivery_mode"></el-switch>
						<span>选项3</span>
						<el-switch on-text="" off-text="" v-model="formData.new"></el-switch>
					</el-form-item>
					<el-form-item style="white-space: nowrap;">
						<span>选项4</span>
						<el-switch on-text="" off-text="" v-model="formData.bao"></el-switch>
						<span>选项5</span>
						<el-switch on-text="" off-text="" v-model="formData.zhun"></el-switch>
						<span>选项6</span>
						<el-switch on-text="" off-text="" v-model="formData.piao"></el-switch>
					</el-form-item>
					<el-form-item label="分配存储大小" prop="float_delivery_fee">
						<el-input-number v-model="formData.float_delivery_fee" :min="0" :max="20"></el-input-number>
					</el-form-item>
					<el-form-item label="分配内存大小" prop="float_minimum_order_amount">
						<el-input-number v-model="formData.float_minimum_order_amount" :min="0" :max="100"></el-input-number>
					</el-form-item>
					<el-form-item label="训练数据时间区间" style="white-space: nowrap;">
						<el-time-select
							placeholder="起始时间"
							v-model="formData.startTime"
							:picker-options="{
							start: '05:30',
							step: '00:15',
							end: '23:30'
							}">
						</el-time-select>
						<el-time-select
							placeholder="结束时间"
							v-model="formData.endTime"
							:picker-options="{
							start: '05:30',
							step: '00:15',
							end: '23:30',
							minTime: formData.startTime
							}">
						</el-time-select>
					</el-form-item>

					<el-form-item label="上传雷电数据">
						<el-upload
						  class="avatar-uploader"
						  :action="baseUrl + '/v1/addimg/shop'"
						  :show-file-list="false"
						  :on-success="handleShopAvatarScucess"
						  :before-upload="beforeAvatarUpload">
						  <img v-if="formData.image_path" :src="baseImgPath + formData.image_path" class="avatar">
						  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>
					<el-form-item label="上传训练权重">
						<el-upload
						  class="avatar-uploader"
						  :action="baseUrl + '/v1/addimg/shop'"
						  :show-file-list="false"
						  :on-success="handleBusinessAvatarScucess"
						  :before-upload="beforeAvatarUpload">
						  <img v-if="formData.business_license_image" :src="baseImgPath + formData.business_license_image" class="avatar">
						  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>
					<el-form-item label="上传训练模型">
						<el-upload
						  class="avatar-uploader"
						  :action="baseUrl + '/v1/addimg/shop'"
						  :show-file-list="false"
						  :on-success="handleServiceAvatarScucess"
						  :before-upload="beforeAvatarUpload">
						  <img v-if="formData.catering_service_license_image" :src="baseImgPath + formData.catering_service_license_image" class="avatar">
						  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>
					<el-form-item label="高级设置6">
						<el-select v-model="activityValue" @change="selectActivity" :placeholder="activityValue">
						    <el-option
						      	v-for="item in options"
						      	:key="item.value"
						      	:label="item.label"
						      	:value="item.value">
						    </el-option>
						</el-select>
					</el-form-item>
					<el-table
					    :data="activities"
					    style="min-width: 600px;margin-bottom: 20px;"
						align="cneter"
					    :row-class-name="tableRowClassName">
					    <el-table-column
					      prop="icon_name"
					      label="已有配置"
					      align="cneter"
					      width="120">
					    </el-table-column>
					    <el-table-column
					      prop="name"
					      label="配置名称"
					      align="cneter"
					      width="120">
					    </el-table-column>
					    <el-table-column
					      prop="description"
					      align="cneter"
					      label="配置详情">
					    </el-table-column>
					    <el-table-column
					    	label="操作"
					    	width="120">
					    <template slot-scope="scope">
					        <el-button
					          size="small"
					          type="danger"
					          @click="handleDelete(scope.$index)">删除</el-button>
					    </template>
					    </el-table-column>
					</el-table>
					<el-form-item class="button_submit">
						<el-button type="primary" @click="submitForm('formData')">立即创建</el-button>
					</el-form-item>
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
    			formData: {
					name: '', //店铺名称
					address: '', //地址
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
					name: [
						{ required: true, message: '请输入环境名称', trigger: 'blur' },
					],
					address: [
						{ required: true, message: '请输入conda配置标准库名:版本号', trigger: 'blur' }
					],
					phone: [
						{ required: true, message: '请输入高级设置1' },
						{ type: 'number', message: '电话号码必须是数字' }
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
		        	icon_name: '模型1',
		        	name: '大创雷电预测配置',
		        	description: '基于深度学习的机理与数据融合灾害性天气预报',
			    }],
			    baseUrl,
			    baseImgPath,
			    categoryOptions: [],
			    selectedCategory: ['快餐便当', '简餐']
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
    			if (queryString) {
	    			try{
	    				const cityList = await searchplace(this.city.id, queryString);
	    				if (cityList instanceof Array) {
		    				cityList.map(item => {
		    					item.value = item.address;
		    					return item;
		    				})
		    				cb(cityList)
	    				}
	    			}catch(err){
	    				console.log(err)
	    			}
    			}
		    },
		    addressSelect(address){
		    	this.formData.latitude = address.latitude;
		    	this.formData.longitude = address.longitude;
		    	console.log(this.formData.latitude, this.formData.longitude)
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
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						Object.assign(this.formData, {activities: this.activities}, {
							category: this.selectedCategory.join('/')
						})
						try{
							let result = await addShop(this.formData);
							if (result.status == 1) {
								this.$message({
					            	type: 'success',
					            	message: '添加成功'
					          	});
					          	this.formData = {
									name: '', //店铺名称
									address: '', //地址
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
						        };
						        this.selectedCategory = ['快餐便当', '简餐'];
						        this.activities = [{
						        	icon_name: '减',
						        	name: '满减优惠',
						        	description: '满30减5，满60减8',
							    }];
							}else{
								this.$message({
					            	type: 'error',
					            	message: result.message
					          	});
							}
							console.log(result)
						}catch(err){
							console.log(err)
						}
					} else {
						this.$notify.error({
							title: '错误',
							message: '请检查输入是否正确',
							offset: 100
						});
						return false;
					}
				});
			},
		}
    }
</script>

<style lang="less">
	@import '../style/mixin';
	#back{
background:url("../assets/img/background.png");
width:100%;
height:100%;
background-attachment: fixed;
}
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
