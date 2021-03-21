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
          Explore
        </button></router-link>
      |
      <router-link to="/edit">
        <button :class="{ scrollClass: isScrolling }">
          Become a guide
        </button></router-link
      >
      |
      <router-link to="/login-signup"
        ><button :class="{ scrollClass: isScrolling }">
          Login / Signup
        </button></router-link
      >
    </nav>
  </section>
</template>
<script>
export default {
  data() {
    return {
      isScrolling: false,
      isStaticPos: false,
    };
  },
  methods: {
    onScroll() {
      if (window.scrollY > 10) {
        this.isScrolling = true;
      } else {
        this.isScrolling = false;
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
};
</script>
