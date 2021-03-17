<template>
  <section class="tour-explore">
    <tour-list v-if="tours" :tours="tours"></tour-list>
  </section>
</template>

<script>
// import tourService from "../services/tour.service.js";
import tourList from "../cmps/tour-list";
export default {
  data() {
    return {
      tours: [],
    };
  },
  methods: {
    loadTours() {
      console.log("loading tours...");
      // const tours = tourService.query();
      // this.tours = tours;
    },
  },
  created() {
    this.loadTours();
  },
  components: {
    tourList,
  },
};
</script>

