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
      <div class="user-created-tours">
        <h2>My Tours</h2>
      </div>
    </div>
  </section>
</template>

<script>
import tourPreview from '../cmps/tour-preview.vue';
export default {
  components: { tourPreview },
  name: "user-profile",
  data() {
    return {
      user: null,
      toursByUser: []
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
      } catch {
        console.log("Cant Show Tour Details");
      }
    },
    async loadToursByUser() {
      try {
        const userId = this.user._id
        const tours = await this.$store.dispatch({
          type: "loadToursByUser",
          userId
        })
          console.log('tours USER-PROFILE:', tours)
        this.toursByUser = tours
      } catch {
        console.log("Cant Show Tours By User");
      }
    },
  },
  computed: {
    users() {
      console.log("this.$store.getters.user:", this.$store.getters.users);
      return this.$store.getters.user;
    },
  },
  created() {
    this.user = this.loadUser();
    this.toursByUser = this.loadToursByUser();
  },
  watch: {
    "$route.params.userId"() {
      this.loadUser();
    },
  },
};
</script>
