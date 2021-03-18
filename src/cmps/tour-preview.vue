<template>
  <section class="tour-preview">
    <div class="preview-img-container">
      <router-link :to="'/tour-details/' + tour._id">
        <img src="../assets/img/hero.jpg" alt="" />
      </router-link>
    </div>
    <div class="mini-user-container">
      <div class="mini-user-img"></div>
      <p>Guide Name</p>
    </div>
    <h3>{{ tour.title }}</h3>
    <p>{{ tour.byUser.fullname }}</p>
    <p></p>
    <p>{{ tour.daysCount }} Days</p>
    <p>{{ tour.members }}/{{ tour.capacity }} Joined</p>
    <!-- <router-link :to="'/edit/' + tour._id">Edit</router-link> -->
    <div class="price-rate-container">
      <p>{{ tour.price }} $</p>
      <p>{{ tour.rate }}⭐</p>
    </div>
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
