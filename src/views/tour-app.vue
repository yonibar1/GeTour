<template>
  <section class="tour-app">
    <div class="hero-container">
      <img src="../assets/img/hero.jpg" alt="" />
      <tour-filter />
    </div>

    <!-- COUNTRIES -->

    <div class="countries-container">
      <div class="countries-title">
        <h1>Top Rated Destinations</h1>
        <router-link to="/explore">
          <el-button round>See All</el-button>
        </router-link>
      </div>
      <ul class="countries">
        <li>
          <router-link to="/explore">
            <div class="category-card">
              <img src="../assets/demo-tours/rome.jpg" alt="" />
            </div>
            Italy
          </router-link>
        </li>
        <li>
          <router-link to="/explore">
            <div class="category-card">
              <img src="../assets/demo-tours/western-wall.jpg" alt="" />
            </div>
            Israel
          </router-link>
        </li>
        <li>
          <router-link to="/explore">
            <div class="category-card">
              <img src="../assets/demo-tours/barcelona.jpg" alt="" />
            </div>
            Barcelona
          </router-link>
        </li>
        <li>
          <router-link to="/explore">
            <div class="category-card">
              <img src="../assets/demo-tours/amsterdam2.jpg" alt="" />
            </div>
            Netherlands
          </router-link>
        </li>
      </ul>
    </div>

    <!-- TOURS -->

    <div class="tours-container">
      <div class="tours-title">
        <h1>Our Tours</h1>
        <router-link to="/explore">
          <el-button round>See All</el-button>
        </router-link>
      </div>
      <div class="preview-container">
        <ul v-if="tours" class="tours">
          <li :key="tour._id" v-for="tour in tours.slice(0, 4)">
            <tour-preview :tour="tour" />
          </li>
        </ul>
      </div>
    </div>

    <!-- GUIDES -->

    <div class="guides-container">
      <div class="guides-title">
        <h1>Top rated guides</h1>
      </div>
      <ul class="guides">
        <li>
          <router-link to="/explore">
            <div class="avatar-card">
              <img src="../assets/demo-guides/guide1.jpg" alt="" />
            </div>
            Luke Tucker
          </router-link>
        </li>
        <li>
          <router-link to="/explore">
            <div class="avatar-card">
              <img src="../assets/demo-guides/guide2.jpg" alt="" />
            </div>
            William Watson
          </router-link>
        </li>
        <li>
          <router-link to="/explore">
            <div class="avatar-card">
              <img src="../assets/demo-guides/guide3.jpg" alt="" />
            </div>
            Amy Underwood
          </router-link>
        </li>
        <li>
          <router-link to="/explore">
            <div class="avatar-card">
              <img src="../assets/demo-guides/guide4.jpg" alt="" />
            </div>
            Simon Chapman
          </router-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import tourFilter from "@/cmps/tour-filter.vue";
import tourPreview from "@/cmps/tour-preview.vue";

export default {
  name: "tour-app",
  data() {
    return {
      tours: [],
    };
  },
  methods: {
    async loadTours() {
      const tours = await this.$store.dispatch({ type: "query" });
      console.log(tours, "In App");
      // @@@@@@@@@@@@@@@@@ BUG?? @@@@@@@@@@@@@@@@@@@@@
      // this.tours = tours;
      this.tours = tours[0];
      // @@@@@@@@@@@@@@@@@ BUG?? @@@@@@@@@@@@@@@@@@@@@
    },
  },
  created() {
    this.loadTours();
  },
  components: {
    tourFilter,
    tourPreview,
  },
};
</script>
