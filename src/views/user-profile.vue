<template>
  <section class="user-profile">
    <div class="left-container">
      <div v-if="user" class="avatar">
        <img :src="user.imgUrl" />
        <span>{{ user.fullname }}</span>
      </div>
      <h3>Pending / Accepted</h3>
      <p class="sub-header">
        {{ orders.length }} New items • {{ responeRate }}% Respone rate
      </p>
      <div v-if="orders.length" class="requests-container">
        <div v-for="order in orders" :key="order._id" class="request-card">
          <div class="order-details-container">
            <img :src="order.buyer.imgUrl" />
            <div class="details">
              <router-link class="link" :to="'/user-profile/' + order.buyer._id"
                >By: {{ order.buyer.fullname }}</router-link
              >
              <p>Status:{{ order.status }}</p>
              <div class="mini-details">
                <span v-if="order.guestsCount > 1"
                  >{{ order.guestsCount }} guests •
                </span>
                <span v-else>{{ order.guestsCount }} guest • </span>
                <span>{{ order.totalPrice }}$ •</span>
                <p>{{ order.tour.title }}</p>
              </div>
            </div>
          </div>
          <div v-if="order.status === 'pending'" class="btn-container">
            <el-button
              @click="updateOrderStatus(order, true)"
              class="btn-confirm"
              plain
              >Confirm</el-button
            >
            <el-button
              @click="updateOrderStatus(order, false)"
              class="btn-decline"
              plain
              >Decline</el-button
            >
          </div>
          <div v-if="order.status === 'confirmed'" class="confirmed">
            Confirmed
          </div>
          <div v-if="order.status === 'declined'" class="declined">
            Declined
          </div>
          <el-badge v-if="order.status === 'pending'" :value="'!'" class="item">
          </el-badge>
        </div>
      </div>
    </div>
    <div class="right-container">
      <h2>Statistics</h2>
      <div class="chart-container">
        <chart
          v-if="toursByUser.length && orders.length"
          :tours="toursByUser"
          :orders="orders"
          class="chart"
        />
      </div>
    </div>
    <h2>Tours</h2>
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
  </section>
</template>

<script>
import chart from "../cmps/chart";
import tourPreview from "../cmps/tour-preview";
import { socketService } from "../services/socket.service";
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
    responeRate() {
      if (this.orders.length) {
        let count = 0;
        this.orders.forEach((order) => {
          if (order.status !== "pending") count++;
        });
        return Math.ceil((count / this.orders.length) * 100);
      } else return 0;
    },
  },
  methods: {
    async updateOrderStatus(order, dif) {
      try {
        if (dif) {
          order.status = "confirmed";
        } else {
          order.status = "declined";
        }
        await this.$store.dispatch({ type: "saveOrder", order });
        this.loadOrdersByGuide(this.loggedInUser._id);
      } catch (err) {
        console.log("Cannot update order", err);
      }
    },
    async removeTour(id) {
      try {
        await this.$store.dispatch({ type: "removeTour", id });
        await this.loadToursByUser(this.user._id);
      } catch (err) {
        console.log("Cannot remove tour", err);
      }
    },
    async onEditTour(id) {
      this.$router.push(`/edit/${id}`);
    },
    async loadOrdersOfTour(tours) {
      try {
        const toursIds = tours.map((tour) => {
          return tour._id;
        });
        await this.$store.dispatch({
          type: "loadOrdersByTour",
          toursIds,
        });
      } catch (err) {
        console.log("Cannot load orders", err);
      }
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
        return user;
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
  async created() {
    this.user = await this.loadUser();
    socketService.setup();
    socketService.emit("order topic", this.user._id);
    socketService.on("addOrder", (order) => {
      this.orders.push(order);
      this.loadUser();

      // this.loadOrdersByGuide(this.user._id);
    });
  },
  destroyed() {
    socketService.off("order topic");
    socketService.off("addOrder");
  },
  watch: {
    "$route.params.userId"() {
      this.loadUser();
    },
  },
  components: {
    tourPreview,
    chart,
  },
};
</script>
