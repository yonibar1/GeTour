<template>
  <section class="tour-preview">
    <div class="preview-img-container">
      <router-link :to="'/tour-details/' + tour._id">
        <img src="../assets/img/hero.jpg" alt="" />
      </router-link>
    </div>
    <h3>{{ tour.title }}</h3>
    <p>{{ tour.byUser.fullname }}</p>
    <p></p>
    <p>{{ tour.daysCount }} Days</p>
    <p>{{ tour.members }}/{{ tour.capacity }} Joined</p>
    <router-link :to="'/edit/' + tour._id">Edit</router-link>
    <div class="price-rate-container">
      <p>{{ tour.price }} $</p>
      <el-rate
        v-model="value"
        disabled
        show-score
        text-color="#ff9900"
        score-template="{rate} points"
      >
      </el-rate>
      <!-- {{ tour.rate }}⭐ -->
    </div>
    <button @click="removeTour(tour._id)">X</button>
  </section>
</template>

<script>
export default {
  props: {
    tour: {
      type: Object,
    },
  },
  data() {
    return {
      rate: 0,
    };
  },
  methods: {
    removeTour(id) {
      this.$emit("removeTour", id);
    },
  },
  created() {
    this.rate = this.tour.rate;
  },
};
</script>
