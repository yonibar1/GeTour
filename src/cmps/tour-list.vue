<template>
  <section>
    <div class="tour-list">
      <div class="list-filter-container">
        <button>Price</button>
        <button>Guid</button>
        <button>Top Rated</button>
      </div>
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
  },
};
</script>
