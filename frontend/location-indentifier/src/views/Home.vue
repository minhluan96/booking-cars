<template>
  <div class="home">
    <NavBar />
    <div class="row">
      <div class="col-md-3">
        <Request :requests="requests"/>
      </div>
      <div class="col-md-9">
        <Maps />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar.vue'
import Request from '@/components/Request.vue'
import Maps from '@/components/Map.vue'

export default {
  name: 'home',
  components: {
    NavBar,
    Request,
    Maps
  },
  data () {
    return {
      requests: []
    }
  },
  mounted() {
    var requestPayload = { 'return_ts': 0, 'page': 1, 'per_page': 10 }
    this.$store.dispatch('setupWS').then(value => {
      console.log(value)
      this.requests.results.push(value)
      console.log('after', this.requests)
    })
    this.$store.dispatch('getRequests', requestPayload)
      .then(value => {
        this.requests = value
      })
  }
}
</script>
