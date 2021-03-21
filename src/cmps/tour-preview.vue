<template>
  <section class="tour-preview">
    <router-link :to="'/tour-details/' + tour._id">
      <div class="preview-img-container">
        <img src="../assets/img/hero.jpg" alt="" />
      </div>
      <div class="tour-description-container">
        <div class="mini-user-container">
          <div class="mini-user-img">
            <img src="../assets/img/avatar.jpg" alt="" />
          </div>
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
          <p><i class="el-icon-star-on"></i>{{ tour.rate }}</p>
        </div>
      </div>
    </router-link>
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
  methods: {},
  created() {
    this.rate = this.tour.rate;
  },
};
</script>
