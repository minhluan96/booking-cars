<template>
  <el-collapse v-model="activeNames">
    <el-collapse-item :title="item.GuestName" name="1">
      <div>
        <div class="row">
          <div class="col-sm-9" style="text-align: left">
            <span>Địa chỉ: {{ item.NameLocation }}</span><br/>
            <span>Số điện thoại: {{ item.GuestTelephone }}</span>
          </div>
          <div class="col-sm-3">
            <el-button
              size="mini"
              type="success">Nhận</el-button>
          </div>
        </div>
        <div class="row" style="text-align: left">
          <div class="col-sm-12">
              <p>Ghi chú: {{ item.Note }}</p>
          </div>
        </div>
      </div>
    </el-collapse-item>
  </el-collapse>


</template>

<script>
export default {
  props: ['item'],
  data() {
      return {
        activeNames: ['1']
      };
    }
}
</script>

<style lang="css">
</style>
