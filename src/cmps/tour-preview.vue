<template>
  <section class="tour-preview">
    <router-link :to="'/details/' + tour._id">
      <div class="mini-user-container">
        <div class="mini-user-img">
          <img :src="`${tour.byUser.imgUrl}`" alt="" />
        </div>
        <router-link class="link" :to="'/user-profile/' + tour.byUser._id">
          <p class="mini-user-fullname">{{ tour.byUser.fullname }}</p>
        </router-link>
      </div>
      <div class="preview-img-container">
        <img v-if="tour.imgs.length" :src="`${tour.imgs[0]}`" alt="" />
        <img v-else src="../assets/img/default-thumbnail.jpeg" alt="" />
      </div>
      <div class="tour-description-container">
        <h3>{{ tour.title }}</h3>
        <p>{{ tour.country }}</p>
        <div class="little-container">
          <p>{{ tour.daysCount }} Days</p>
          <p v-if="tour.members < tour.capacity">
            {{ tour.members }}/{{ tour.capacity }} Joined
          </p>
          <p v-else>Fully Booked</p>
        </div>
        <div class="price-rate-container">
          <h3 class="price">${{ tour.price }}</h3>
          <p>
            <i class="el-icon-star-on"></i>{{ rateToShow }}
            <span class="reviews-length"> （{{ tour.reviews.length }}）</span>
          </p>
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
  computed: {
    rateToShow() {
      if (this.tour.reviews.length) {
        var sum = this.tour.reviews.reduce(function (sum, { rate }) {
          return (sum += rate);
        }, 0);
        const rate = sum / this.tour.reviews.length;
        var rateToShow = rate.toFixed(1);
        return rateToShow;
      } else {
        return 0;
      }
    },
  },
  methods: {},
  created() {
    this.rate = this.tour.rate;
  },
};
</script>
