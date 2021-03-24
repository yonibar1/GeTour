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
      <div class="main">
        <h2>My Tours</h2>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "user-profile",
  data() {
    return {
      user: null,
      // user: {
      //     fullname: 'Shoshana Bar',
      //     imgUrl:
      //         'https://res.cloudinary.com/yonibar/image/upload/v1616444443/stefan-stefancik-QXevDflbl8A-unsplash_uos7x2.jpg',
      // },
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
        // this.reviews = this.tour.reviews;
      } catch {
        console.log("Cant Show Tour Details");
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
    console.log("user:", this.user);
  },
  watch: {
    "$route.params.userId"() {
      this.loadUser();
    },
  },
};
</script>
