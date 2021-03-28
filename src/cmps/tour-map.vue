<template>
  <section class="map-container">
    <div v-if="!this.locs" class="create-map-container">
      <GmapMap
        ref="mapRef"
        :center="{ lat: 31.771959, lng: 35.217018 }"
        :zoom="9"
        map-type-id="terrain"
        style="width: 100%; height: 200px"
        @click="addCheckPoint"
      >
        <GmapMarker
          :key="index"
          v-for="(c, index) in checkPoints"
          :position="c"
          :clickable="true"
          :draggable="true"
          @click="center = c"
        />
      </GmapMap>
      <el-button @click="saveCheckPoints">Save Check Points</el-button>
      <el-button @click="clearChechPoints">Clear</el-button>
    </div>

    <div v-else class="details-map-container">
      <GmapMap
        ref="mapRef"
        :center="{ lat: locs[0].lat, lng: locs[0].lng }"
        :zoom="10"
        map-type-id="terrain"
        style="width: 100%; height: 400px"
        @click="addCheckPoint"
      >
        <GmapMarker
          :key="index"
          v-for="(c, index) in locs"
          :position="c"
          :clickable="true"
          :draggable="true"
          @click="center = c"
        />
      </GmapMap>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    locs: {
      type: Array,
    },
  },
  data() {
    return {
      checkPoints: [],
    };
  },
  methods: {
    addCheckPoint(ev) {
      const pos = {
        lat: ev.latLng.lat(),
        lng: ev.latLng.lng(),
      };
      this.checkPoints.push(pos);
    },
    saveCheckPoints() {
      this.$emit("setCheckPoints", this.checkPoints);
      this.checkPoints = [];
    },
    clearChechPoints() {
      this.checkPoints = [];
      this.$emit("setCheckPoints", this.checkPoints);
    }
  }
};
</script>
