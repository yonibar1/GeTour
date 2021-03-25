<template>
  <section class="user-profile">
    <div class="left-container">
      <div class="avatar">
        <img :src="user.imgUrl" alt="" />
      </div>
    </div>
    <div class="right-container">
      <div class="user-title">
        <h1>Your Profile</h1>
        <h2>{{ user.fullname }}</h2>
      </div>
      <div class="user-created-tours">
        <h2>My Created Tours</h2>
        <ul v-if="toursByUser">
          <li v-for="tour in toursByUser" :key="tour._id">
            <tour-preview :tour="tour"></tour-preview>
          </li>
        </ul>
      </div>
      <div class="user-orders">
        <h2>My Orders</h2>
        <ul v-if="ordersByUser">
          <li v-for="order in ordersByUser" :key="order._id">
            <h3>1. {{ order.tour.title }}</h3>
          </li>
        </ul>
        <h2 v-else>You have no orders</h2>
      </div>
    </div>
  </section>
</template>

<script>
import tourPreview from "../cmps/tour-preview.vue";
export default {
  components: { tourPreview },
  name: "user-profile",
  data() {
    return {
      user: null,
      toursByUser: [],
      ordersByUser: [],
    };
  },
  methods: {
    async loadUser() {
      try {
        const id = await this.$route.params.userId;
        const user = await this.$store.dispatch({
          type: "loadUser",
          id,
        });
        this.user = user;
        this.toursByUser = this.loadToursByUser(this.user._id);
        this.ordersByUser = this.loadOrdersByUser(this.user._id);
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
    async loadOrdersByUser(userId) {
      try {
        const orders = await this.$store.dispatch({
          type: "loadOrdersByUser",
          userId,
        });
        console.log(orders, "Orders at CMP");
        this.ordersByUser = orders;
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
