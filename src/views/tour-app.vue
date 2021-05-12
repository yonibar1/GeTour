<template>
  <section class="tour-app">
    <div class="hero-container">
      <tour-filter />
      <div class="hero-line">
        <h1>Explore</h1>
        <h2>The best places</h2>
        <h1>With</h1>
        <h2 class="h2-2">The best guides<span>.</span></h2>
      </div>
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
          <router-link to="/explore/Thailand">
            <div class="category-card">
              <img
                src="https://res.cloudinary.com/yonibar/image/upload/v1620819642/chaing-mai-min_ec42xb.jpg"
                alt=""
              />
            </div>
            Thailand
          </router-link>
        </li>
        <li>
          <router-link to="/explore/Israel">
            <div class="category-card">
              <img
                src="https://res.cloudinary.com/yonibar/image/upload/v1620819642/western-wall-min_bzb341.jpg"
                alt=""
              />
            </div>
            Israel
          </router-link>
        </li>
        <li>
          <router-link to="/explore/Spain">
            <div class="category-card">
              <img
                src="https://res.cloudinary.com/yonibar/image/upload/v1620819640/barcelona-min_clinxc.jpg"
                alt=""
              />
            </div>
            Spain
          </router-link>
        </li>
        <li>
          <router-link to="/explore/Netherlands">
            <div class="category-card">
              <img
                src="https://res.cloudinary.com/yonibar/image/upload/v1620819646/amsterdam2-min_hhpffl.jpg"
                alt=""
              />
            </div>
            Netherlands
          </router-link>
        </li>
      </ul>
    </div>

    <!-- Become a guide -->

    <div class="become-guide-container">
      <div class="title">
        <h1>
          A journey of a thousand miles <br />
          begins with a single step
        </h1>
        <router-link to="/edit">
          <el-button class="become-btn" square>Become a guide</el-button>
        </router-link>
      </div>
    </div>

    <!-- TOURS -->

    <div class="tours-container">
      <div class="tours-title">
        <h1>Top Rated Tours</h1>
        <router-link to="/explore">
          <el-button round>See All</el-button>
        </router-link>
      </div>
      <div class="preview-container">
        <ul v-if="tours" class="tours">
          <li :key="tour._id" v-for="tour in tours.slice(0, 6)">
            <tour-preview :tour="tour" />
          </li>
        </ul>
      </div>
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
      country: null,
    };
  },
  methods: {
    async loadTours() {
      const tours = await this.$store.dispatch({ type: "query" });
      this.tours = tours;
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
