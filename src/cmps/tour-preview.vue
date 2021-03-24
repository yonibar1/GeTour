<template>
  <section class="tour-preview">
    <router-link :to="'/tour-details/' + tour._id">
      <div class="preview-img-container">
        <img :src="`${tour.imgs[0]}`" alt="" />
      </div>
      <div class="tour-description-container">
        <div class="mini-user-container">
          <div class="mini-user-img">
            <img :src="`${tour.byUser.imgUrl}`" alt="" />
          </div>
          <p>{{ tour.byUser.fullname }}</p>
        </div>
        <h3>{{ tour.title }}</h3>
        <p>{{ tour.country }}</p>
        <p>{{ tour.byUser.fullname }}</p>
        <p></p>
        <p>{{ tour.daysCount }} Days</p>
        <p>{{ tour.members }}/{{ tour.capacity }} Joined</p>
        <!-- <router-link :to="'/edit/' + tour._id">Edit</router-link> -->
        <div class="price-rate-container">
          <p>{{ tour.price }} $</p>
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
  // methods: {
  //   imgUrl() {
  //     return `../assets/demo-tours/${this.tour.imgUrl}.jpg`;
  //   },
  // },
  created() {
    this.rate = this.tour.rate;
  },
};
</script>
