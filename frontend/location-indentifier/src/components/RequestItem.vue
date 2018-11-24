<template>
  <el-collapse v-model="activeNames">
    <el-collapse-item title="Tên request" name="1">
      <div>
        <div class="row">
          <div class="col-sm-9" style="text-align: left">
            <span>12/12/2018 08:00</span>
          </div>
          <div class="col-sm-3">
            <el-button
              size="mini"
              type="success"
              @click="handleDelete(scope.$index, scope.row)">Nhận</el-button>
          </div>
        </div>
        <div class="row" style="text-align: left">
          <div class="col-sm-12">
              <p>Ghi chú nội dung</p>
          </div>
        </div>
      </div>
    </el-collapse-item>
  </el-collapse>


</template>

<script>
export default {
  data() {
      return {
        activeNames: ['1']
      };
    }
}
</script>

<style lang="css">
</style>
