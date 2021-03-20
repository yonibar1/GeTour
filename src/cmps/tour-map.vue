<template>
  <section class="map-container">
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
  </section>
</template>

<script>
export default {
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
    },
  },
  data() {
    return {
      checkPoints: [],
    };
  },
};
</script>
