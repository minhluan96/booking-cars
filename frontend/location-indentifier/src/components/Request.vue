<template>
  <el-card class="box-card" style="overflow-y: scroll; overflow-x: hidden">
    <div slot="header" class="clearfix">
      <span><strong>DANH SÁCH CÁC REQUEST</strong></span>
      <el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-refresh">Làm mới danh sách</el-button>
    </div>
    <div v-for="o in 12" :key="o">
      <RequestItem />
    </div>
  </el-card>
</template>

<script>
import RequestItem from '@/components/RequestItem.vue'

export default {
  components: {
    RequestItem
  }
}
</script>

<style lang="css">
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 420px;
    height: calc(100vh - 80px);
  }

</style>
