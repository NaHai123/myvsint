<template>
  <baidu-map class="bm-view" ak="WkQm52ps4kw23O9DuEI0PqRdhKOja8zM">
  </baidu-map>
</template>

<script>
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
export default {
  components: {
    BaiduMap
  }
}
</script>

<style>
.bm-view {
  width: 50%;
  height: 300px;
}
</style>