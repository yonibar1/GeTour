<template>
  <section v-if="tour" class="tour-details">
    <!-- PRIMARY -->

    <div class="details-container-primary">
      <h2>{{ tour.title }}</h2>
      <div class="header-container">
        <div class="reviews">
          <el-rate
            show-score
            allow-half
            :value="totalRateToShow"
            disabled
            :colors="colors"
            text-color="$main-clr"
          >
          </el-rate>
          <span>({{ tour.reviews.length }})</span>
        </div>
        <p>•</p>
        <h5>{{ tour.daysCount }} Days In {{ tour.country }}</h5>
      </div>
      <div class="images-container">
        <div class="first-img">
          <img :src="tour.imgs[0]" alt="" />
        </div>
        <div class="img-2">
          <img :src="tour.imgs[1]" alt="" />
        </div>
        <div class="img3">
          <img :src="tour.imgs[2]" alt="" />
        </div>
        <div class="img4">
          <img :src="tour.imgs[3]" alt="" />
        </div>
        <div class="img5">
          <img :src="tour.imgs[4]" alt="" />
        </div>
      </div>
    </div>

    <div class="order-details-container">
      <!-- SECONDARY -->

      <div class="details-container-secondry">
        <div class="guide-container">
          <h2>
            {{ tour.byUser.fullname }}
          </h2>
          <img :src="tour.byUser.imgUrl" alt="" />
        </div>
        <h3>{{ tour.startedAt | moment }}</h3>
        <h2
          v-if="tour.members === tour.capacity || tour.members > tour.capacity"
        >
          Fully Booked
        </h2>
        <h3 v-else class="tour-members">
          {{ tour.members }}/{{ tour.capacity }} Travellers In Tour
        </h3>
        <div class="icons-container">
          <div class="display-icons" v-for="(tag, idx) in tour.tags" :key="idx">
            <i :class="tag.class"> </i>
            <h4>{{ tag.txt }}</h4>
          </div>
        </div>
        <p class="tour-desc">{{ tour.description }}</p>
        <hr />
        <div class="review-list">
          <tour-review :tour="tour" />
        </div>
      </div>

      <!-- ORDER BOX -->

      <div class="tour-order">
        <div class="form-order-main-details">
          <h4>Price: ${{ tour.price }}</h4>
          <div class="rate">
            <i class="el-icon-star-on"></i> {{ totalRateToShow }}
            <span class="reviews-length"
              >({{ tour.reviews.length }} Reviews)</span
            >
          </div>
        </div>
        <el-input-number
          v-model="order.guestsCount"
          @change="handleChange"
          :min="1"
          :max="limitCount"
        ></el-input-number>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="Any Special Requests?"
          v-model="order.requests"
        >
        </el-input>
        <h4>Total Price: ${{ totalPriceToShow }}</h4>
        <el-button class="btn-order" type="" @click="toggleModal"
          >Order Tour</el-button
        >
      </div>
    </div>
    <div class="order-modal">
      <el-dialog
        title="Your Order"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <h3 class="title">
          {{ tour.title }}
        </h3>
        <h4>{{ tour.country }}</h4>
        <h4 class="order-date">{{ tour.startedAt | moment }}</h4>
        <p v-if="order.requests">Your Special Requests: {{ order.requests }}</p>
        <h3 class="order-default-msg">
          Your Order Has been sent to the tour guide for approval we will let
          you know as soon as possible
        </h3>
        <hr />
        <h3>Total Price: ${{ totalPriceToShow }}</h3>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="handleConfirm(tour)"
            >Confirm</el-button
          >
        </span>
      </el-dialog>
    </div>

    <!-- MAP -->
    <tour-map :locs="tour.locs" />
  </section>
</template>

<script>
import tourReview from "../cmps/tour-review";
import moment from "moment";
import TourMap from "../cmps/tour-map.vue";
import { socketService } from "../services/socket.service";

export default {
  data() {
    return {
      colors: ["#42ABA7", "#42ABA7", "#42ABA7"],
      reviews: [],
      dialogVisible: false,
      order: {
        guestsCount: 1,
        requests: "",
      },
      limitCount: 0,
    };
  },
  async created() {
    await this.loadTour();
    this.setLimitCount();
    socketService.setup();
    socketService.emit("order topic", this.tour.byUser._id);
    socketService.emit("review topic", this.tour._id);
    socketService.on("review-added", (review) => {
      this.reviews.push(review);
    });
  },
  computed: {
    tour() {
      return this.$store.getters.tour;
    },
    totalPriceToShow() {
      return this.tour.price * this.order.guestsCount;
    },
    totalRateToShow() {
      if (this.reviews.length) {
        var stars = this.reviews;
        var sum = stars.reduce(function (sum, { rate }) {
          return (sum += rate);
        }, 0);
        const rate = sum / this.reviews.length;
        var rateToShow = Math.round((rate + Number.EPSILON) * 100) / 100;
        return rateToShow;
      } else {
        return 0;
      }
    },
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
  },
  filters: {
    moment: function (date) {
      return moment(date).format("dddd , DD/MM/YYYY");
    },
  },
  methods: {
    setLimitCount() {
      const diff = this.tour.capacity - this.tour.members;
      this.limitCount = diff;
    },
    async loadTour() {
      try {
        const id = this.$route.params.tourId;
        await this.$store.dispatch({
          type: "loadTour",
          id,
        });
        this.reviews = this.tour.reviews;
      } catch {
        console.log("Cant Show Tour Details");
      }
    },
    async handleClose(done) {
      try {
        this.$confirm("Are you sure to close this dialog?");
        await done();
      } catch {
        console.log("Cant Show Tour Details");
      }
    },
    async handleConfirm(tour) {
      if (!this.loggedInUser) {
        this.$router.push("/login-signup");
        return;
      }
      this.dialogVisible = false;
      this.order.totalPrice = tour.price * this.order.guestsCount;
      this.tour.members += this.order.guestsCount;
      this.order.tour = {
        _id: tour._id,
        title: tour.title,
        imgs: tour.imgs,
        _guideId: tour.byUser._id,
      };
      this.$store.dispatch({
        type: "saveTour",
        tour,
      });
      this.$store.dispatch({
        type: "saveOrder",
        tour,
        order: this.order,
      });
      socketService.emit("orderSent", this.order);
      const msg = {
        title: `Order Added by - ${this.loggedInUser.fullname}`,
        message: `${this.loggedInUser.fullname} Would Like To Join Your Tour In ${this.tour.title}`,
      };
       socketService.emit("private msg", this.tour.byUser._id);
       socketService.emit("add private msg",msg);
      // socketService.emit("add msg", msg);
      this.order.guestsCount = 1;
      this.order.requests = "";
    },
    handleChange(value) {
      console.log(value);
    },
    async toggleModal() {
      if (this.tour.members >= this.tour.capacity) return;
      this.dialogVisible = true;
    },
  },
  destroyed() {
    socketService.off("orderSent", this.order);
  },
  watch: {
    "$route.params.tourId"() {
      this.loadTour();
    },
  },
  components: {
    tourReview,
    TourMap,
  },
};
</script>
