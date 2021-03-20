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
      filterBy: this.$store.getters.filterBy,
    };
  },
  methods: {
    async loadTours() {
      if (!this.filterBy.length) {
        console.log('this.filterBy:', this.filterBy)
        const tours = await this.$store.dispatch({ type: "query" });
        this.tours = tours;
      }
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
