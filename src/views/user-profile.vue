<template>
  <section class="user-profile">
    <div class="left-container">
      <div v-if="user" class="avatar">
        <img :src="user.imgUrl" />
      </div>
    </div>
    <div class="right-container">
      <h3>Requests</h3>
      <div v-if="orders" class="requests-container">
        <div v-for="order in orders" :key="order._id" class="request-card">
          Tour Name: {{ order.tour.title }}
          <div class="buyer">
            <div class="buyer-details">
              <img :src="order.buyer.imgUrl" />
              <h4>{{ order.buyer.fullname }}</h4>
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
      <!-- <h2>Tours</h2> -->
      <!-- <div class="user-created-tours">
          <ul v-if="toursByUser">
            <li v-for="tour in toursByUser" :key="tour._id">
              <tour-preview :tour="tour"></tour-preview>
            </li>
          </ul>
        </div> -->
    </div>
  </section>
</template>

<script>
export default {
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
