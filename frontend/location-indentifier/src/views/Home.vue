<template>
  <div class="home">
    <NavBar />
    <div class="row">
      <div class="col-md-3">
        <Request :requests="requests" @refreshRequestList="refreshListHandler"
          @requestItemSelected="requestItemHandler" @requestNextPage="fetchNewData"/>
      </div>
      <div class="col-md-9">
        <Maps :request="request" @locationUpdated="locationUpdatedHandler" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar.vue'
import Request from '@/components/Request.vue'
import Maps from '@/components/Map.vue'
import utils from '@/store/utils'
import axios from 'axios'

export default {
  name: 'home',
  components: {
    NavBar,
    Request,
    Maps
  },
  data () {
    return {
      requests: [],
      request: {},
      currentPage: 1
    }
  },
  methods: {
    requestItemHandler(args) {
      this.request = args
      var requestID = args.ID
      var processingStatus = 5
      var user_id = utils.getUserID()
      var requestPayload = {
        ID: requestID,
        Status: processingStatus,
        StaffID: user_id
      }
      this.$store.dispatch('updateRequestStatus', requestPayload)
        .then(value => {
          this.request = value
          return this.$store.dispatch('sendRequestForManagers', requestPayload)
          this.$message({ type: 'success', message: `Tiếp nhận yêu cầu thành công` });
        }).then(value => {
          //send request for manager sucessfully
        })
        .catch(err => {
          this.$message({ type: 'error', message: `Có lỗi xảy ra: ${err}` });
        })
    },
    locationUpdatedHandler(args) {
      var self = this
      var requestID = args.ID
      if (requestID == -1 || this.request == null) {
        this.$message({ type: 'error', message: 'Vui lòng chọn request tương ứng' });
        return
      }

      this.$store.dispatch('updateRequestGeocode', args)
        .then(value => {
          self.request = {}
          return this.$store.dispatch('sendRequestForDrivers', value)
        }).then(value => {
          self.$message({
            type: 'success',
            message: `Xử lý thành công`
          });
          return this.$store.dispatch('sendRequestForManagers', args)
        }).then(value => {
          //send request for manager sucessfully
        }).catch(err => {
          self.$message({
            type: 'error',
            message: `Có lỗi xảy ra: ${err}`
          });
        })
    },
    fetchNewData(args) {
      var ts = 0
      var self = this
      var requestPayload = { 'return_ts': ts, 'page': args, 'per_page': 5 }
      this.currentPage = args
      this.$store.dispatch('getRequests', requestPayload)
        .then(value => {
          console.log(value)
          this.requests = value
        }).catch(err => {
          if (err.response.status === 403) {
            self.$message({ type: 'error', message: "Đã hết phiên sử dụng. Vui lòng đăng nhập lại"})
            localStorage.removeItem('user')
            self.$router.push('/login')
          }
        })
    },
    isBrowserSupportSocket() {
      return window.WebSocket || window.MozWebSocket
    },
    receivedRequestValue(value) {
      var self = this
      var id = value.ID
      if (self.requests.results == null) {
        return
      }
      var updatedItem = self.requests.results.find(function(element) {
        return element.ID == id;
      })

      var requestPayload = { 'return_ts': 0, 'page': this.currentPage, 'per_page': 5 }
      this.$store.dispatch('getRequests', requestPayload)
        .then(value => {
          console.log('get all request', value)
          self.requests = value
        })
    },
    setupWebSocket() {
      var self = this
      window.WebSocket = window.WebSocket || window.MozWebSocket
      var clientSocket = new WebSocket('ws://localhost:40510');

      clientSocket.onopen = function () {
          clientSocket.send('hello server');
      }

      clientSocket.onmessage = function (e) {
        var value = JSON.parse(e.data)
        self.receivedRequestValue(value)
      }
    },
    refreshListHandler(args) {
      if (!args) return
      console.log('refresh list')
      var requestPayload = { 'return_ts': 0, 'page': this.currentPage, 'per_page': 5 }
      this.$store.dispatch('getRequests', requestPayload)
        .then(value => {
          this.$message({
            type: 'success',
            message: `Đã cập nhật danh sách yêu cầu`
          });
          this.requests = value
        })
    },
    setupLP() {
      var self = this
      var user_id = utils.getUserID()
      var headers = {
          'Content-Type': 'application/json',
          'x-access-token': utils.getAccessToken()
      }
      var ts = 0
      var fetchRefreshRequestAPI = function () {
        axios.get(`http://127.0.0.1:3000/requests/refresh?ts=${ts}&staffID=${user_id}`,
           { headers })
          .then(result => {
            if (result.status === 200) {
              ts = result.data.return_ts
              var items = result.data.results
              console.log(items)
              for (var item of items) {
                self.receivedRequestValue(item)
              }
            }
          }).catch(err => {
            self.$message({ type: 'error', message: `Có lỗi xảy ra: ${err}` });
          }).then(() => {
            fetchRefreshRequestAPI()
          })
      }
      fetchRefreshRequestAPI()
    }
  },
  mounted() {
    var ts = 0
    var requestPayload = { 'return_ts': ts, 'page': 1, 'per_page': 5 }
    var self = this
    if (this.isBrowserSupportSocket()) {
      console.log('browser support websocket')
      this.setupWebSocket()
    } else {
      console.log("browser doesn't support websocket")
      this.setupLP()
    }

    this.$store.dispatch('getRequests', requestPayload)
      .then(value => {
        this.requests = value
      }).catch(err => {
        if (err.response.status === 403) {
          self.$message({ type: 'error', message: "Đã hết phiên sử dụng. Vui lòng đăng nhập lại"})
          localStorage.removeItem('user')
          self.$router.push('/login')
        }
      })
  }
}
</script>
