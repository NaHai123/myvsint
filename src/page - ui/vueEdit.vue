<template>
    <div>
		<section class="data_section">
			<el-col :span="6"><div class="data_list today_head" style="padding:10px;background:#00BFFF;"><span class="data_num head">配置数据源</span></div></el-col>
			<el-col :span="6"><div class="data_list today_head" style="padding:10px;background:#AAAAAA;"><span class="data_num head">配置解析方式</span></div></el-col>
			<el-col :span="6"><div class="data_list today_head" style="padding:10px;background:#AAAAAA;"><span class="data_num head">结果确认</span></div></el-col>
			<el-col :span="6"><div class="data_list today_head" style="padding:10px;background:#AAAAAA;"><span class="data_num head">加入环境</span></div></el-col>
		</section>

		<section class="data_section">
		      <el-col :span="4"><div class="data_list today_head"><span class="data_num head">基础信息：</span></div></el-col>
		      <br><br>
		      <form>
                 <span style="margin-left:0%;font-size: 20px;padding: 4px;">
                       环境名称:</span>
                       <input type="text" name="环境名称" style="margin-left:2%;border-style: solid;width:500px;">
                       <br>
                       <br>
              </form>
              <form action="">
                   <span style="margin-left:0%;font-size: 20px;padding: 4px;">配置方式:</span>
                   <input style="margin-left:2%;" type="radio" name="sex" value="male"><span style="font-size: 20px;padding: 4px;">一键配置(conda支持)</span>
                   <input style="margin-left:2%;" type="radio" name="sex" value="female"><span style="font-size: 20px;padding: 4px;">打包上传</span>
              </form>
		      <form>
		         <br>
                 <span style="margin-left:0%;font-size: 20px;padding: 4px;">
                       请输入conda配置标准库名:版本号</span>
                       <input type="text" name="环境名称" placeholder="包请用#分割 例如 torch:3.6#numpy:3.5" style="margin-left:2%;border-style: solid;width:500px;">
                       <br>
                       <br>
              </form>
		</section>

		<section class="data_section">
		      <el-col :span="4"><div class="data_list today_head"><span class="data_num head">高级选项：</span></div></el-col>
		      <br><br>
		      <form>
                 <span style="margin-left:0%;font-size: 20px;padding: 4px;">
                       高级设置1(待定):</span>
                       <input type="text" name="环境名称" style="margin-left:2%;border-style: solid;width:500px;">
                       <br>
                       <br>
              </form>
              <form action="">
                   <span style="margin-left:0%;font-size: 20px;padding: 4px;">高级设置2(待定):</span>
                   <input style="margin-left:2%;" type="radio" name="sex" value="male"><span style="font-size: 20px;padding: 4px;">a</span>
                   <input style="margin-left:2%;" type="radio" name="sex" value="female"><span style="font-size: 20px;padding: 4px;">b</span>
              </form>
		</section>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import { quillEditor } from 'vue-quill-editor'

    export default {
        data(){
            return {
                content: '<h3>文本编辑</h3>',
			    editorOption: {

		        }
            }
        },
    	components: {
    		headTop,
    		quillEditor,
    	},
        computed: {
          	editor() {
	        	return this.$refs.myQuillEditor.quill
	      	}
        },
        methods: {
		    onEditorReady(editor) {
		        console.log('editor ready!', editor)
		    },
		    submit(){
                console.log(this.content);
                this.$message.success('提交成功！');
            }
        },
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
</style>
