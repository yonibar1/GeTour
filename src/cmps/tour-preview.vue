<template>
  <section class="tour-preview">
    <router-link :to="'/details/' + tour._id">
      <div class="preview-img-container">
        <img :src="`${tour.imgs[0]}`" alt="" />
      </div>
      <div class="tour-description-container">
        <div class="mini-user-container">
          <div class="mini-user-img">
            <img :src="`${tour.byUser.imgUrl}`" alt="" />
          </div>
          <router-link :to="'/user-profile/' + tour.byUser._id">
            <p class="mini-user-fullname">{{ tour.byUser.fullname }}</p>
          </router-link>
        </div>
        <h3>{{ tour.title }}</h3>
        <p>{{ tour.country }}</p>
        <div class="little-container">
          <p>{{ tour.daysCount }} Days</p>
          <p>{{ tour.members }}/{{ tour.capacity }} Joined</p>
        </div>
        <div class="price-rate-container">
          <h3 class="price">${{ tour.price }}</h3>
          <p>
            <i class="el-icon-star-on"></i>{{ tour.rate }}
            <span class="reviews-length"> ({{ tour.reviews.length }})</span>
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
  methods: {},
  created() {
    this.rate = this.tour.rate;
  },
};
</script>
