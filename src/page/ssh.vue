<template>
    <div class="fillcontain">
        <head-top></head-top>
        
       <el-button @click="attchssh">连接</el-button>
      <div id="terminal" style="width: 100%;height: 100%"></div>
    </div>
</template>

<script>
    import headTop from '@/components/headTop'
    import '../assets/js/xterm.js'
    import '../assets/js/webssh.js'
    import 'xterm/css/xterm.css'
    import { WSSHClient } from '../assets/js/webssh.js'
    import storage from '@//store/index'

    export default {
        data(){
            return {
                connectData:JSON.stringify(storage.state.sshlogin)
            }
        },
        created(){
            openTerminal(this.connectData)
        },
        computed: {
        
        },
    	components: {
    		headTop,
    	},
        methods: {
        openTerminal(connectData){
        var client = new WSSHClient();
        let term = new Terminal({
            cols: 97,
            rows: 37,
            cursorBlink: true, // 光标闪烁
            cursorStyle: "block", // 光标样式  null | 'block' | 'underline' | 'bar'
            scrollback: 10000, //回滚
            tabStopWidth: 8, //制表宽度
            screenKeys: true
        });
        term.on('data', function (data) {
            //键盘输入时的回调函数
            console.log('键盘输入了' + data)
            client.sendClientData(data);
        });
        term.open(document.getElementById('terminal'));
        //在页面上显示连接中...
        term.write('Connecting...\r\n');
        //执行连接操作
        client.connect({
            onError: function (error) {
                //连接失败回调
                term.writeln('Error: ' + error + '\r\n');

            },
            onConnect: function () {
                //连接成功回调
              client.sendInitData(connectData);
            },
            onClose: function () {
                //连接关闭回调
                term.write("\rconnection closed");

            },
            onData: function (data) {
                //收到数据时回调
                if (data.indexOf('\r\nlogout')>-1){
                    window.localStorage.clear();
                }
                term.write(data);
            }
        });
    },
                attchssh: function () {
                this.openTerminal(JSON.parse(this.connectData));
            }
}
    }
</script>

<style lang="less">
	@import '../style/mixin';
    @import '../assets/css/xterm.css';
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    .table_container{
        padding: 20px;
    }
    .Pagination{
        display: flex;
        justify-content: flex-start;
        margin-top: 8px;
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
</style>
