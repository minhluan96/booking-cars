<template>
  <el-collapse v-model="activeNames">
    <el-collapse-item :title="item.GuestName" name="1">
      <div>
        <div class="row">
          <div class="col-md-7" style="text-align: left">
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
      if (this.item.Status != 3) {
        return 'Tiếp tục xử lý'
      } else {
        return 'Nhận yêu cầu'
      }
    },
    typeButton() {
      if (this.item.Status != 3) {
        return 'warning'
      } else {
        return 'success'
      }
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
