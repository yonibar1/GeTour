<template>
  <section class="user-profile">
    <div class="left-container">
      <div v-if="user" class="avatar">
        <img :src="user.imgUrl" />
        <span>{{ user.fullname }}</span>
      </div>
      <h3>Booking's</h3>
      <div v-if="orders" class="requests-container">
        <div v-for="order in orders" :key="order._id" class="request-card">
          <div class="tour-mini-avatar">
            <!-- <img v-if="order.tour.imgs" :src="order.tour.imgs[0]" alt="" /> -->
            <p>{{ order.tour.title }}</p>
          </div>
          <div class="buyer">
            <div class="buyer-details">
              <img :src="order.buyer.imgUrl" />
              <router-link
                class="link"
                :to="'/user-profile/' + order.buyer._id"
                >{{ order.buyer.fullname }}</router-link
              >
            </div>
            <p>${{ order.totalPrice }}</p>
          </div>
          <p></p>
          <p v-if="order.requests">
            Special Requests :
            {{ order.requests }}
          </p>
          <p v-else>No Special Requests.</p>
          <p>Guests: {{ order.guestsCount }}</p>
          <div class="btn-container">
            <el-button>Confirm</el-button>
            <el-button>Decline</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="right-container">
      <h2>My Tours</h2>
      <div class="user-created-tours">
        <div v-for="tour in toursByUser" :key="tour._id">
          <tour-preview :tour="tour"></tour-preview>
          <div class="tour-btn-container">
            <el-button
              @click="onEditTour(tour._id)"
              circle
              class="el-icon-edit"
              type="info"
              plain
            ></el-button>
            <el-button
              @click="removeTour(tour._id)"
              circle
              class="el-icon-delete"
              plain
              type="danger"
            ></el-button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import tourPreview from "../cmps/tour-preview.vue";
import orderPreview from "../cmps/order-preview.vue";
export default {
  components: { tourPreview, orderPreview },
  name: "user-profile",
  data() {
    return {
      user: null,
      toursByUser: [],
      orders: [],
    };
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
  },
  methods: {
    async removeTour(id) {
      await this.$store.dispatch({ type: "removeTour", id });
      await this.loadToursByUser(this.user._id);
    },
    async onEditTour(id) {
      this.$router.push(`/edit/${id}`);
    },
    async loadOrdersOfTour(tours) {
      const toursIds = tours.map((tour) => {
        return tour._id;
      });
      const res = await this.$store.dispatch({
        type: "loadOrdersByTour",
        toursIds,
      });
      console.log(res, "Res At CMP");
    },
    async loadUser() {
      try {
        const id = await this.$route.params.userId;
        const user = await this.$store.dispatch({
          type: "loadUser",
          id,
        });
        this.user = user;
        await this.loadToursByUser(this.user._id);
        await this.loadOrdersByGuide(this.user._id);
      } catch {
        console.log("Cant Show USER");
      }
    },
    async loadToursByUser(userId) {
      try {
        const tours = await this.$store.dispatch({
          type: "loadToursByUser",
          userId,
        });
        this.toursByUser = tours;
      } catch {
        console.log("Cant Show Tours By User");
      }
    },
    async loadOrdersByGuide(guideId) {
      try {
        const orders = await this.$store.dispatch({
          type: "loadOrdersByGuide",
          guideId,
        });
        this.orders = orders;
      } catch {
        console.log("Cant show orders by user");
      }
    },
  },
  created() {
    this.user = this.loadUser();
  },
  watch: {
    "$route.params.userId"() {
      this.loadUser();
    },
  },
};
</script>
