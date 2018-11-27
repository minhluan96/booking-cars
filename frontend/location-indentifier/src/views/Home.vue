<template>
  <div class="home">
    <NavBar />
    <div class="row">
      <div class="col-md-3">
        <Request :requests="requests" @requestItemSelected="requestItemHandler"/>
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
      request: {}
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
          this.$message({ type: 'success', message: `Tiếp nhận yêu cầu thành công` });
        }).catch(err => {
          this.$message({ type: 'error', message: `Có lỗi xảy ra: ${err}` });
        })
    },
    locationUpdatedHandler(args) {
      var self = this
      var lat = args.Lat
      var lng = args.Lng
      var requestID = args.ID
      if (requestID == -1 || this.request == null) {
        this.$message({ type: 'error', message: 'Vui lòng chọn request tương ứng' });
        return
      }
      var requestPayload = {
        ID: requestID,
        Latitude: lat,
        Longtitude: lng
      }

      this.$store.dispatch('updateRequestGeocode', requestPayload)
        .then(value => {
          self.$message({
            type: 'success',
            message: `Xử lý thành công`
          });
          self.request = {}
        }).catch(err => {
          self.$message({
            type: 'error',
            message: `Có lỗi xảy ra: ${err}`
          });
        })
    }
  },
  mounted() {
    var requestPayload = { 'return_ts': 0, 'page': 1, 'per_page': 10 }
    var self = this

    window.WebSocket = window.WebSocket || window.MozWebSocket
    var clientSocket = new WebSocket('ws://localhost:40510');

    clientSocket.onopen = function () {
        clientSocket.send('hello server');
    }

    clientSocket.onmessage = function (e) {
      var value = JSON.parse(e.data)
      var id = value.ID
      var updatedItem = self.requests.results.find(function(element) {
        return element.ID == id;
      })
      if (updatedItem == null) {
        self.requests.results.push(value)
      } else {
        var index = self.requests.results.findIndex(x => x.ID == updatedItem.ID);
        updatedItem.Latitude = value.Latitude
        updatedItem.Status = value.Status
        updatedItem.StatusName = value.StatusName
        updatedItem.Longtitude = value.Longtitude
        self.requests.results.splice(index, index + 1)
        if (updatedItem.Status == 5 || updatedItem == 3) {
          self.requests.results.push(updatedItem)
        }
      }
    }

    this.$store.dispatch('getRequests', requestPayload)
      .then(value => {
        this.requests = value
      })
  }
}
</script>
