<template>
  <section class="tour-explore">
    <tour-list v-if="tours" :tours="tours"></tour-list>
  </section>
</template>

<script>
import tourList from "../cmps/tour-list";
export default {
  data() {
    return {
      tours: [],
    };
  },
  methods: {
    async loadTours() {
      const tours = await this.$store.dispatch({ type: "query" });
      this.tours = tours;
    },
  },
  mounted() {
    this.loadTours();
  },
  components: {
    tourList,
  },
};
</script>
