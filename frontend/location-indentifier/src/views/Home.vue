<template>
  <div class="home">
    <NavBar />
    <div class="row">
      <div class="col-md-3">
        <Request />
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
  }
}
</script>
