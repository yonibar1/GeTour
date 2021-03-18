<template>
  <section>
    <!-- <div class="list-filter-container">
      <button>Price</button>
      <button>Guide</button>
      <button>Top Rated</button>
    </div> -->
    <tour-filter />
    <div class="tour-list">
      <ul>
        <li v-for="tour in tours" :key="tour._id">
          <tour-preview @removeTour="removeTour" :tour="tour"></tour-preview>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import tourPreview from "./tour-preview";
import tourFilter from "./tour-filter";
export default {
  props: {
    tours: {
      type: Array,
    },
  },
  data() {
    return {};
  },
  methods: {
    removeTour(id) {
      this.$store.dispatch({ type: "removeTour", id });
    },
  },
  created() {},
  components: {
    tourPreview,
    tourFilter,
  },
};
</script>
