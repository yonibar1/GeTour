<template>
  <section class="tour-list">
    <ul>
      <li v-for="tour in tours" :key="tour._id">
        <tour-preview :tour="tour"></tour-preview>
      </li>
    </ul>
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
  methods: {},
  created() {},
  components: {
    tourPreview,
  },
};
</script>
