<template>
  <el-collapse v-model="activeNames">
    <el-collapse-item :title="item.GuestName" name="1">
      <div>
        <div class="row">
          <div class="col-md-7" style="text-align: left">
            <span>Mã yêu cầu: {{ item.ID }}</span><br/>
            <span>Địa chỉ: {{ item.NameLocation }}</span><br/>
            <span>Số điện thoại: {{ item.GuestTelephone }}</span>
          </div>
          <div class="col-md-5">
            <el-button
              size="mini"
              :type="typeButton()" @click="onButtonClicked">{{titleButton()}}</el-button>
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
      activeNames: ['1'],
      itemModel: {}
    };
  },
  methods: {
    onButtonClicked() {
      this.$emit('acceptedRequest', this.item);
    },
    titleButton() {
      if (this.item.Status == 3) {
        return 'Nhận yêu cầu'
      } else if (this.item.Status == 5) {
        return 'Tiếp tục xử lý'
      }
      return 'Không có xe'
    },
    typeButton() {
      if (this.item.Status == 3) {
        return 'success'
      } else if (this.item.Status == 5) {
        return 'warning'
      }
      return 'danger'
    }
  },
  watch: {
    item (newValue, oldValue) {
      this.itemModel = newValue
    }
  }
}
</script>

<style lang="css">
</style>
