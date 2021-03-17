<template>
  <section class="tour-app">
    <tour-filter/>
  </section>
</template>

<script>
// import tourList from "@/cmps/tour-list.vue";
import tourFilter from "@/cmps/tour-filter.vue";

export default {
  name: "tour-app",
  components: {
    // tourList,
    tourFilter,
  },
};
</script>
