<template>

    <div class="fillcontain">
       <head-top></head-top>
      <el-row>
        <el-col :span="24">
            <div class="grid-content bg-purple-dark" style="text-align: center;">
                在线ssh连接服务器
            </div>
        </el-col>
    </el-row>
        <el-form label-width="80px" :model="connectData">
       <el-form-item label="主机">
                 <el-input placeholder="请输入主机IP" v-model="connectData.host"></el-input>
        </el-form-item>
        <el-form-item label="端口">
            <el-input placeholder="请输入端口号" v-model="connectData.port"></el-input>
        </el-form-item>
        <el-form-item label="账号">
            <el-input placeholder="请输入账号" v-model="connectData.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input  type='password' placeholder="请输入密码" v-model="connectData.password" show-password
                      @keyup.enter.native="onSubmit"></el-input>
        </el-form-item>
        <el-form-item label="连接方式">
        <template>
            <el-radio v-model="type" label="1">ssh</el-radio>
            <el-radio v-model="type" label="2">sftp</el-radio>
        </template>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">保存信息</el-button>
            <el-button @click="reset">重置</el-button>
            <el-button @click="test">输出</el-button>
        </el-form-item>

    </el-form>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {adminList, adminCount} from '@/api/getData'
    import storage from '../store/index'

    export default {
        data(){
            return {
                tableData: [],
                currentRow: null,
                offset: 0,
                limit: 20,
                count: 0,
                currentPage: 1,
                connectData:{
                    operate: 'connect',
                    host: '101.34.221.238',
                    port: '22',
                    username: 'root',
                    password: 'Tt070711'
                },
                type: '1',//连接类型
            }
        },
    	components: {
    		headTop,
    	},
    
        methods: {
                reset: function () {
                this.connectData.host = '';
                this.connectData.username = '';
                this.connectData.password = '';
            },
            test: function () {
                //将json对象转换为json字符串，传给后端
                console.log(JSON.stringify(storage.state.sshlogin) )
            },
               onSubmit: function () {
                console.log('submit!');
				// adminList.vue
                storage.commit('saveSSHLoginInfo', this.connectData)
              // storage = localStorage;
                
             //   storage.setItem("connectData", JSON.stringify(this.connectData));
              //  console.log(storage.getItem("connectData"))
                if(this.type == '1'){
                    window.location.href = '#/ssh';
                }else {
                    window.location.href = '101.34.221.238:8088/sftp';
                }

            }
        }

    }
</script>

<style lang="less">
	@import '../style/mixin';
    .table_container{
        padding: 20px;
    }

            .el-row {
            margin-bottom: 20px;

        &
        :last-child {
            margin-bottom: 0;
        }

        }
        .el-col {
            border-radius: 4px;
        }

        .bg-purple-dark {
            background: #99a9bf;
        }

        .bg-purple {
            background: #d3dce6;
        }

        .bg-purple-light {
            background: #e5e9f2;
        }

        .grid-content {
            border-radius: 4px;
            min-height: 36px;
        }

        .row-bg {
            padding: 10px 0;
            background-color: #f9fafc;
        }
</style>


