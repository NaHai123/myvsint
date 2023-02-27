<template>
  <div id="app">
    <p id="demo">"111111"</p>

    <router-view></router-view>
  </div>

</template>
<script>
export default {
  name: 'app1',
  data () {
    return {
      points: [],     //存放经纬度坐标
      backdata:[],    //存放后端数据
    }
  },
  methods: {
    map () {
    /*
        //读取后端数据
             this.$http.get(`/127.0.0.1:8000/model/${this.$store.state.project.id}`, {

             project_id:this.$store.state.project.id,

         }).then(doc => {

         var code = doc.data.status;

         var msg = doc.data.msg;

         if (code == 0){//请求成功，可以根据不同的状态码返回值做出相应的动作

         this.backdata = doc.data.data.member//本数组存入后端数

         }
         })
    */

  /*
    //axios.get("json/category.json").then(function(res){
     var _this=this
     axios.post("http://127.0.0.1:8000/model/").then(function(res){
          _this.backdata =res.data.data
    })
  */

axios
      .post('http://127.0.0.1:8000/model/')
      .then(response => (this.backdata = JSON.parse(response)))
      .catch(function (error) { // 请求失败处理
        console.log(error);
      });
      //this.backdata=eval('(' + this.backdata + ')')



        var position = new BMap.Point(this.backdata[0][0],this.backdata[0][1])
        this.points.push(position)
      //标点
      showPoly(this.points);


  },
  update(){

         this.$http.get(`/127.0.0.1:8000/model/${this.$store.state.project.id}`, {

             project_id:this.$store.state.project.id,

         }).then(doc => {

         var code = doc.data.status;

         var msg = doc.data.msg;

         if (code == 0){//请求成功，可以根据不同的状态码返回值做出相应的动作

         this.points = doc.data.data.member//本数组存入后端数

         }
         })
         },
  },
mounted () {
    this.map()
  }
}

</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#allmap {
    width: 100%;
    height: 790px;
}
</style>
