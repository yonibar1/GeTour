<template>
  <section class="tour-review">
    <div class="add-review-container">
      <h2>Add Your Review</h2>
      <form @submit.prevent="addReview()">
        <div class="block">
          <div class="rate-block">
            <span class="demonstration">Rate Your Tour</span>
            <el-rate allow-half v-model="reviewToEdit.rate"></el-rate>
          </div>
          <button>Add Review</button>
        </div>
        <el-input
          type="textarea"
          maxlength="100"
          v-model="reviewToEdit.txt"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="We Need Your Opinion"
        >
        </el-input>
      </form>
    </div>
    <ul v-if="reviews">
      <li v-for="review in reviews" :key="review.id">
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
              <!-- <h6>{{ review.createdAt }}</h6> -->
            </div>
          </div>
          <div class="ranks-txt">
            <h3>❞{{ review.txt }}❞</h3>
            <div class="review-rate">
              <el-rate v-model="review.rate" disabled text-color="#ff9900">
              </el-rate>
              <span>({{ tour.reviews.length }})</span>
            </div>
          </div>
        </div>
      </li>
    </ul>
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
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"],
      reviewToEdit: {
        txt: "",
        createdAt: Date.now(),
        rate: null,
        byUser: {
          fullname: "muki tuki",
          imgUrl: "someImg.jpg",
          _id: "u201",
        },
      },
    };
  },
  computed: {
    reviews() {
      return this.$store.getters.reviews;
    },
  },
  methods: {
    async addReview() {
      await this.$store.dispatch({
        type: "addReview",
        review: this.reviewToEdit,
        tourId: this.tour._id,
      });
      this.reviewToEdit = {
        txt: "",
        createdAt: Date.now(),
        rate: null,
        byUser: {
          fullname: "muki tuki",
          imgUrl: "someImg.jpg",
          _id: "u201",
        },
      };
    },
    async loadReviews(id) {
      await this.$store.dispatch({ type: "loadReviews", id });
    },
  },
  created() {
    this.loadReviews(this.tour._id);
  },
  filters: {
    moment: function (date) {
      return moment(date).fromNow();
    },
  },
};
</script>
