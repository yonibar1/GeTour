<template>
  <section>
    <div class="tour-list">
      <ul v-if="tours">
        <li v-for="tour in tours" :key="tour._id">
          <tour-preview :tour="tour"></tour-preview>
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
  components: {
    tourPreview,
  },
};
</script>
