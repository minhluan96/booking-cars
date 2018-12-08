<template>
  <div style="position: relative">
    <gmap-map
      id="map"
      :center="start.center"
      :zoom="16"
      ref="gmap"
      :options="options"
      map-type-id="terrain">
      <gmap-marker ref="markers" :position="start.center" :title="start.title" :icon="start.startIcon"  :draggable="true" @drag="updateCoordinates">
      </gmap-marker>

      <gmap-marker ref="finishMarkers" :position="finish.finishCenter" :title="finish.title" :icon="finish.finishIcon" :draggable="true" @drag="updateFinishPositionCoordinates">
      </gmap-marker>
    </gmap-map>
    <div class="container">
      <div class="row">
        <div class="col-md-10" style="text-align: left">

          <GmapAutocomplete class="autocomplete-input" @place_changed="setPlace">
          </GmapAutocomplete>

          <el-select v-model="selectedOption" filterable placeholder="Select">
            <el-option
              v-for="item in optionSelects"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

          <el-button slot="append" icon="el-icon-search" @click="usePlace()"></el-button>
        </div>
      </div>
      <div class="row">
        <div class="col-md-10">
          <el-card style="margin-top: 10px">
            <div class="clearfix">
              <span style="float: left"><strong>Thông tin tiếp nhận</strong></span>
              <span style="float: right; color: red">{{selectedRequest.StatusName}}</span>
              <br/>
              <br/>
              <span style="float: left; text-align: left; white-space: pre-line;">{{requestInfo()}}</span>
              <el-button style="float: right; padding: 3px 0" icon="el-icon-edit" type="text"
                @click="emitRequestGeocode" :disabled="disableButton()">Ghi nhận yêu cầu</el-button>
            </div>
          </el-card>
        </div>
      </div>
      <div class="row">

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
    props: ['request'],
    data () {
      return {
        state4: '',
        timeout: null,
        marker: null,
        finishedMarker: null,
        inputData: '',
        map: null,
        mapModel: null,
        selectedRequest: {},
        directionsService: null,
        directionsDisplay: null,
        geocoder: null,
        place: null,
        start: {
          position: {
            lat: 0,
            lng: 0
          },
          center: {
            lat: 10.762558,
            lng: 106.681426
          },
          startIcon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
          title: "Nơi đón",
          address: ""
        },
        finish: {
          finishPosition: {
            lat: 0,
            lng: 0
          },
          finishCenter: {
            lat: 10.762977,
            lng: 106.686948
          },
          finishIcon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          title: "Điểm dừng",
          address: ""
        },
        optionSelects: [
          {
            value: 1,
            label: 'Điểm đón'
          }, {
            value: 2,
            label: 'Điểm dừng'
          }
        ],
        selectedOption: 1,
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
      usePlace() {
        if (this.place) {
          var location = { lat: this.place.geometry.location.lat(), lng: this.place.geometry.location.lng() }
          if (this.selectedOption == 1) {
            this.marker.$markerObject.setPosition(location)
            this.start.position.lat = location.lat
            this.start.position.lng = location.lng
            this.start.address = this.place.formatted_address
            this.selectedOption = 2
          } else {
            this.finishedMarker.$markerObject.setPosition(location)
            this.finish.finishPosition.lat = location.lat
            this.finish.finishPosition.lng = location.lng
            this.finish.address = this.place.formatted_address
            this.selectedOption = 1
          }
          this.place = null;
          this.mapModel.panTo(location)
          this.calculateRoutes()
        }
      },
      geocodeAddress(geocoder, resultsMap) {
        var self = this
        geocoder.geocode({ 'address': this.inputData }, function(results, status) {
          if (status === 'OK') {
            var location = { lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng() }
            resultsMap.$mapObject.panTo(location)
            self.marker.$markerObject.setPosition(location)
            self.start.position.lat = location.lat
            self.start.position.lng = location.lng
          } else {
            self.$message({
              type: 'error',
              message: 'Không tìm được địa điểm'
            });
          }
        })
      },
      updateCoordinates(marker) {
        this.start.position.lat = marker.latLng.lat()
        this.start.position.lng = marker.latLng.lng()
        this.calculateRoutes()
      },
      updateFinishPositionCoordinates(marker) {
        this.finish.finishPosition.lat = marker.latLng.lat()
        this.finish.finishPosition.lng = marker.latLng.lng()
        this.calculateRoutes()
      },
      emitRequestGeocode() {
        if ((this.start.position.lat == 0 && this.start.position.lng == 0) ||
            (this.finish.finishPosition.lat == 0 && this.finish.finishPosition.lng == 0)  || this.request.ID == null) {
          this.$message({ type: 'error', message: 'Không đủ thông tin để ghi nhận' });
          return
        }

        var packageInfo = {
          ID: this.request.ID,
          start: {
            Lat: this.start.position.lat,
            Lng: this.start.position.lng,
            name: this.selectedRequest.NameLocation,
            address: this.start.address
          },
          end: {
            Lat: this.finish.finishPosition.lat,
            Lng: this.finish.finishPosition.lng,
            name: this.selectedRequest.FinishLocationName,
            address: this.finish.address
          },
          Guest: {
            name: this.selectedRequest.GuestName,
            phone: this.selectedRequest.GuestTelephone,
            note: this.selectedRequest.Note
          }
        }
        this.$confirm(`Bạn có chắc chắn với các thông tin đã nhập?`, 'Lưu ý kiểm tra lại thông tin', {
          confirmButtonText: 'Đồng ý',
          cancelButtonText: 'Hủy bỏ',
          type: 'warning'
        }).then(() => {
          this.resetAllValues()
          this.$emit('locationUpdated', packageInfo)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Hủy ghi nhận'
          });
        });
      },
      requestInfo() {
        if (this.selectedRequest.GuestName == null && this.selectedRequest.NameLocation == null) {
          return 'Không có thông tin để hiển thị'
        }
        return `Tên khách hàng: ${this.selectedRequest.GuestName}
                Địa chỉ đón: ${this.selectedRequest.NameLocation}
                Địa chỉ dừng: ${this.selectedRequest.FinishLocationName}`
      },
      disableButton() {
        return this.selectedRequest.ID == null
      },
      setPlace(place) {
        this.place = place
      },
      calculateRoutes() {
        var self = this
        var start = new google.maps.LatLng(self.start.position.lat, self.start.position.lng)
        var end = new google.maps.LatLng(self.finish.finishPosition.lat, self.finish.finishPosition.lng);
        var request = {
          origin: start,
          destination: end,
          travelMode: google.maps.TravelMode.DRIVING
        }
        self.directionsService.route(request, function(response, status) {
          if (status == google.maps.DirectionsStatus.OK) {
            self.directionsDisplay.setDirections(response);
            self.directionsDisplay.setMap(self.map)
          } else {
            console.log("Directions Request from " + start.toUrlValue(6) + " to " + end.toUrlValue(6) + " failed: " + status)
          }
        });
      },
      resetAllValues() {
        this.directionsDisplay.setMap(null);
        this.start.position.lat = 0
        this.start.position.lng = 0
        this.finish.finishPosition.lat = 0
        this.finish.finishPosition.lng = 0
        this.start.address = ""
        this.finish.address = ""
        this.selectedOption = 1
      }
    },
    mounted() {
      this.$gmapApiPromiseLazy().then(() => {
        this.geocoder = new google.maps.Geocoder();
        this.directionsService = new google.maps.DirectionsService();
        this.directionsDisplay = new google.maps.DirectionsRenderer();
      })
      var self = this
      this.$refs.gmap.$mapPromise.then(map => {
        self.map = map
      });
      this.marker = this.$refs.markers
      this.finishedMarker = this.$refs.finishMarkers
      this.mapModel = this.$refs.gmap
    },
    watch: {
      request (newValue, oldValue) {
        this.selectedRequest = newValue
        this.resetAllValues()
      }
    }
  }
</script>
<style>
  #map {
    min-height: calc(100vh - 90px);
  }

  .autocomplete-input {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    outline: 0;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 65%;
  }

  .container {
    position: absolute;
    top: 10px;
    left: 0px;
    z-index: 99;
  }
</style>
