<template >
  <section
    class="app-header"
    ref="header"
    :class="{ scrollClass: isScrolling, staticPos: isStaticPos }"
  >
    <div class="logo-container">
      <router-link to="/">
        <img v-if="!isScrolling" src="@/assets/logo-w.svg" alt="" />
        <img v-else src="@/assets/logo1.svg" alt="" />
      </router-link>
    </div>
    <nav>
      <router-link to="/explore">
        <button :class="{ scrollClass: isScrolling }">
          <span> Explore </span>
        </button></router-link
      >
      
      <router-link to="/edit">
        <button :class="{ scrollClass: isScrolling }">
          <span> Become a guide </span>
        </button></router-link
      >
      
      <router-link v-if="!user" to="/login-signup"
        ><button :class="{ scrollClass: isScrolling }">
          <span> Login / Signup </span>
        </button></router-link
      >
      <img
        v-else
        class="user-avatar"
        @click="isOpen = !isOpen"
        :src="user.imgUrl"
      />
    </nav>
    <div v-if="isOpen" class="user-options-container">
      <p>Welcome {{ user.fullname }}</p>
      <router-link :to="'user-profile/' + user._id">My Profile</router-link>
      <el-button plain type="danger" @click="logout">Logout</el-button>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      isScrolling: false,
      isStaticPos: false,
      isOpen: false,
    };
  },
  computed: {
    user() {
      return this.$store.getters.loggedInUser;
    },
  },
  methods: {
    onScroll() {
      if (window.scrollY > 10) {
        this.isScrolling = true;
      } else {
        this.isScrolling = false;
      }
    },
    async logout() {
      try {
        await this.$store.dispatch({ type: "logout" });
        this.isOpen = false;
      } catch (err) {
        console.log("Cannot logout", err);
      }
    },
    async getLoggedUser() {
      try {
        await this.$store.dispatch({ type: "getLoggedUser" });
      } catch (err) {
        console.log("Cannot Get Logged User", err);
      }
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler: function (val) {
        if (val.fullPath === "/") {
          window.addEventListener("scroll", this.onScroll);
          this.isScrolling = false;
          this.isStaticPos = false;
        } else {
          window.removeEventListener("scroll", this.onScroll);
          this.isStaticPos = true;
          this.isScrolling = true;
        }
      },
    },
  },
  created() {
    this.getLoggedUser();
  },
};
</script>
