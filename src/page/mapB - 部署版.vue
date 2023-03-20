<template>
 <div>
  <iframe src="http://101.43.203.170:13887/#/index" id="mobsf" scrolling="no" frameborder="0" style="position:absolute;top:0;left: 16.6%;right:0px;bottom:100px;"></iframe>
 </div>
</template> 
 
<script>
 export default {
  data () {
   return {
   }
  },
  mounted(){
   /**
   * iframe-宽高自适应显示 
   */
   function changeMobsfIframe(){
    const mobsf = document.getElementById('mobsf');
    const deviceWidth = document.body.clientWidth;
    const deviceHeight = document.body.clientHeight;
    mobsf.style.width = (Number(deviceWidth)*0.834) + 'px'; //数字是页面布局宽度差值
    mobsf.style.height = (Number(deviceHeight)) + 'px'; //数字是页面布局高度差
   }

   changeMobsfIframe()

   window.onresize = function(){
    changeMobsfIframe()
   }
  }
 }
</script>
