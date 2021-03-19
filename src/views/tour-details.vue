<template>
  <section v-if="tour" class="tour-details">
    <div class="details-container-primary">
      <h2>{{ tour.title }}</h2>
      <div class="images-container">
        <div class="first-img">
          <img src="../assets/img/hero3.jpg" alt="" />
        </div>
        <div class="img-2">
          <img src="../assets/img/hero2.jpg" alt="" />
        </div>
        <div class="img3">
          <img src="../assets/img/hero3.jpg" alt="" />
        </div>
        <div class="img4">
          <img src="../assets/img/hero.jpg" alt="" />
        </div>
      </div>
    </div>
    <div class="order-details-container">
      <div class="details-container-secondry">
        <h3>{{ tour.members }}/{{ tour.capacity }} Travellers In Tour</h3>
        <!-- <h3>Tour Date: {{ tour.startedAt | moment }}</h3> -->
        <h3>Tour Date: {{ tour.startedAt }}</h3>
        <h3>{{ tour.daysCount }} Days</h3>
        <h4>{{ tour.tags }}</h4>
        <!-- <h3>{{ tour.locs.name }}</h3> -->
        <p>{{ tour.description }}</p>
      </div>
      <div class="tour-order">
        <el-form @submit.prevent="orderAtrip">
          <el-form-item label="Price:"> {{ tour.price }}</el-form-item>
          <el-form-item label="How Many Travellers :">
            <el-input-number type="number" />
          </el-form-item>
          <el-form-item label="Any Speacial Requests:">
            <el-input
              type="textarea"
              maxlength="100"
              show-word-limit
              :autosize="{ minRows: 2, maxRows: 4 }"
              placeholder="Any Speacial Requests..."
            >
            </el-input>
          </el-form-item>
          <el-form-item label="To Pay:">{{ tour.price }}</el-form-item>
          <el-button>Order Tour</el-button>
        </el-form>
      </div>
    </div>
    <div class="review-list">
      <tour-review :tour="tour" :reviews="reviews" />
    </div>

    <!-- <chat :tourId="tour._id" />  -->
  </section>
</template>

<script>
import tourReview from "../cmps/tour-review";
// import chat from '@/cmps/chat.vue';
export default {
  data() {
    return {
      reviews: [],
    };
  },
  created() {
    this.loadTour();
  },
  computed: {
    tour() {
      return this.$store.getters.tour;
    },
    // users() {
    //     return this.$store.getters.users;
    // },
    // loggedInUser() {
    //     return this.$store.getters.loggedinUser;
    // },
  },
  methods: {
    async loadTour() {
      try {
        const id = this.$route.params.tourId;
        await this.$store.dispatch({
          type: "loadTour",
          id,
        });
        this.reviews = this.tour.reviews;
        // this.$store.dispatch({ type: 'loadUsers' });
      } catch {
        console.log("Cant Show Tour Details");
      }
    },
  },
  // async orderTour() {
  //   console.log("Ordering");
  // },
  watch: {
    "$route.params.tourId"() {
      this.loadTour();
    },
  },
  components: {
    tourReview,
    // chat,
  },
};
</script>
