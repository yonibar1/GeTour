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
    <nav ref="nav">
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
      <button class="btn-menu-close" @click="toggleMenu()"><img src="@/assets/arrow-right-g.svg" alt=""></button>
    </nav>
    <div v-if="isOpen" class="user-options-container">
      <p>Welcome {{ user.fullname }}</p>
      <router-link :to="'/user-profile/' + user._id">My Profile</router-link>
      <el-button plain type="danger" @click="logout">Logout</el-button>
    </div>
    <button class="btn-menu" @click="toggleMenu()">☰</button>
  </section>
</template>
<script>
import { socketService } from "../services/socket.service";
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
    toggleMenu() {
      this.$refs.nav.classList.toggle("menu-open");
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
    socketService.setup();
    socketService.emit("user msg", "msgs");
    socketService.on("show msg", ({ title, message }) => {
      this.$notify({
        title,
        message,
        position: "bottom-right",
      });
    });
  },
  destroyed() {
    socketService.off("user msg", "msgs");
  },
};
</script>
