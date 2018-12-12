<template>
  <el-card class="box-card" style="overflow-y: scroll; overflow-x: hidden">
    <div slot="header" class="clearfix">
      <span><strong>DANH SÁCH CÁC YÊU CẦU</strong></span>
      <el-button style="float: right; padding: 3px 0" @click="refreshList()"
          type="text" icon="el-icon-refresh">Làm mới danh sách</el-button>
    </div>
    <div v-for="r in listRequest" :key="r.ID">
      <RequestItem :item="r" @acceptedRequest="itemClickHandler" />
    </div>
    <br>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="perPage"
      @current-change="handleCurrentChange"
      :total="totalItems">
    </el-pagination>
  </el-card>
</template>

<script>
import RequestItem from '@/components/RequestItem.vue'

export default {
  components: {
    RequestItem
  },
  props: ['requests'],
  data () {
    return {
      requestsModel: {},
      listRequest: [],
      selectedId: -1,
      totalItems: 0,
      perPage: 0
    }
  },
  methods: {
    itemClickHandler(args) {
      this.$emit('requestItemSelected', args);
    },
    handleCurrentChange(val) {
      this.$emit('requestNextPage', val);
    },
    refreshList() {
      this.$emit('refreshRequestList', true)
    }
  },
  watch: {
    requests (newValue, oldValue) {
      this.requestsModel = Object.assign({}, newValue)
      this.listRequest = this.requestsModel.results
      this.totalItems = this.requestsModel.totalPages * this.requestsModel.perPage
      this.perPage = this.requestsModel.perPage
    }
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
