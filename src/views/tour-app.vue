<template>
  <section class="tour-app">
    <tour-filter />
    Categories:
    <ul>
      <li><router-link to="/">Europe</router-link></li>
      <li><router-link to="/">Asia</router-link></li>
      <li><router-link to="/">Australia</router-link></li>
      <li><router-link to="/">USA</router-link></li>
    </ul>
  </section>
</template>

<script>
import tourFilter from "@/cmps/tour-filter.vue";

export default {
  name: "tour-app",
  components: {
    tourFilter,
  },
};
</script>
