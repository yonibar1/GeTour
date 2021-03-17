<template>
  <section class="tour-app">
    <tour-filter />
    <ul class="categories">
      <li>
        <router-link to="/">
          <div class="category-card">
            <img src="../assets/img/hero.jpg" alt="" />
          </div>
          Europe
        </router-link>
      </li>
      <li>
        <router-link to="/">
          <div class="category-card">
            <img src="../assets/img/hero.jpg" alt="" />
          </div>
          Asia
        </router-link>
      </li>
      <li>
        <router-link to="/">
          <div class="category-card">
            <img src="../assets/img/hero.jpg" alt="" />
          </div>
          Australia
        </router-link>
      </li>
      <li>
        <router-link to="/">
          <div class="category-card">
            <img src="../assets/img/hero.jpg" alt="" />
          </div>
          USA
        </router-link>
      </li>
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
