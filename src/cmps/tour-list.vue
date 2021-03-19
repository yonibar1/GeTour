<template>
  <section>
    <tour-filter />
    <div class="tour-list">
      <ul>
        <li v-for="tour in tours" :key="tour._id">
          <tour-preview :tour="tour"></tour-preview>
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
  methods: {},
  created() {},
  components: {
    tourPreview,
    tourFilter,
  },
};
</script>
