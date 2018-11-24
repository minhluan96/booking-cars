<template>
  <div style="position: relative">
    <gmap-map
      id="map"
      :center="center"
      :zoom="16"
      :options="options"
      map-type-id="terrain">
      <gmap-marker :position="center">
      </gmap-marker>
    </gmap-map>
    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <el-autocomplete style="width: 100%"
            v-model="state4"
            :fetch-suggestions="querySearchAsync"
            placeholder="Tìm kiếm địa chỉ"
            @select="handleSelect">
            <i class="el-icon-search el-input__icon"
              slot="suffix">
            </i>
          </el-autocomplete>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
  import Vue from 'vue'
  import * as VueGoogleMaps from 'vue2-google-maps'
  Vue.use(VueGoogleMaps, {
    load: {
      key: "AIzaSyBkwRNAhT2ic6ZMR3i10ms51YhUJGHTXaQ",
      libraries: 'places'
    }
  })
  export default {
    data () {
      return {
        state4: '',
        timeout: null,
        center: {
          lat: 10.762558,
          lng: 106.681426
        },
        options: {
          disableDefaultUI : true,
          styles: [{
            'featureType': 'water',
            'stylers': [{'saturation': 43}, {'lightness': -11}, {'hue': '#0088ff'}]
          }, {
            'featureType': 'road',
            'elementType': 'geometry.fill',
            'stylers': [{'hue': '#ff0000'}, {'saturation': -100}, {'lightness': 99}]
          }, {
            'featureType': 'road',
            'elementType': 'geometry.stroke',
            'stylers': [{'color': '#808080'}, {'lightness': 54}]
          }, {
            'featureType': 'landscape.man_made',
            'elementType': 'geometry.fill',
            'stylers': [{'color': '#ece2d9'}]
          }, {
            'featureType': 'poi.park',
            'elementType': 'geometry.fill',
            'stylers': [{'color': '#ccdca1'}]
          }, {
            'featureType': 'road',
            'elementType': 'labels.text.fill',
            'stylers': [{'color': '#767676'}]
          }, {
            'featureType': 'road',
            'elementType': 'labels.text.stroke',
            'stylers': [{'color': '#ffffff'}]
          }, {'featureType': 'poi', 'stylers': [{'visibility': 'off'}]}, {
            'featureType': 'landscape.natural',
            'elementType': 'geometry.fill',
            'stylers': [{'visibility': 'on'}, {'color': '#b8cb93'}]
          }, {'featureType': 'poi.park', 'stylers': [{'visibility': 'on'}]}, {
            'featureType': 'poi.sports_complex',
            'stylers': [{'visibility': 'on'}]
          }, {'featureType': 'poi.medical', 'stylers': [{'visibility': 'on'}]}, {
            'featureType': 'poi.business',
            'stylers': [{'visibility': 'simplified'}]
          }]
        }
      }
    },
    methods: {
      querySearchAsync(queryString, cb) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          //cb(results);
        }, 3000 * Math.random());
      },
      handleSelect(item) {
        console.log(item);
      }
    }
  }
</script>
<style>
  #map {
    min-height: calc(100vh - 90px);
  }

  .container {
    position: absolute;
    top: 10px;
    left: 0px;
    z-index: 99;
  }
</style>
