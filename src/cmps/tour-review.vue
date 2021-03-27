<template>
  <section class="tour-review">
    <ul v-if="tour.reviews">
      <li v-for="review in tour.reviews" :key="review.id">
        <div class="review">
          <div class="mini-user">
            <div class="mini-user-img">
              <img :src="review.byUser.imgUrl" alt="" />
            </div>
            <div class="mini-user-details">
              <router-link :to="`/user-profile/${review.byUser._id}`">
                {{ review.byUser.fullname }}
              </router-link>
              <h6>{{ review.createdAt | moment }}</h6>
            </div>
          </div>
          <div class="ranks-txt">
            <p>{{ review.txt }}</p>
            <div class="review-rate">
              <el-rate
                v-model="review.rate"
                disabled
                :colors="colors"
                text-color="green"
              >
              </el-rate>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="add-review-container">
      <form @submit.prevent="addReview()">
        <el-input
          type="textarea"
          maxlength="300"
          v-model="reviewToEdit.txt"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="We Need Your Opinion"
        >
        </el-input>
        <div class="block">
          <div class="rate-block">
            <span class="rate-txt">Rate this tour: </span>
            <el-rate allow-half v-model.number="reviewToEdit.rate"></el-rate>
          </div>
          <button>Add Review</button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import moment from "moment";
export default {
  props: {
    tour: {
      type: Object,
    },
  },
  data() {
    return {
      colors: ["#42ABA7", "#42ABA7", "#42ABA7"],
      reviewToEdit: {
        txt: "",
        createdAt: Date.now(),
        rate: null,
      },
    };
  },
  methods: {
    async addReview() {
      const { _id, fullname, imgUrl } = this.$store.getters.loggedInUser;
      this.reviewToEdit.byUser = { _id, fullname, imgUrl };
      await this.$store.dispatch({
        type: "addReview",
        review: this.reviewToEdit,
        tourId: this.tour._id,
      });
      this.reviewToEdit.txt = "";
      this.reviewToEdit.rate = null;
      this.reviewToEdit.createdAt = Date.now();
    },
  },
  filters: {
    moment: function (date) {
      return moment(date).fromNow();
    },
  },
};
</script>
