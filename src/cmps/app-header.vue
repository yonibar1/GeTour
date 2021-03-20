<template >
  <section class="app-header" ref="header">
    <div class="logo-container">
      <router-link to="/">
        <img v-if="!isScrolling" src="@/assets/logo-w.svg" alt="" />
        <img v-else src="@/assets/logo1.svg" alt="" />
      </router-link>
    </div>
    <nav>
      <router-link to="/edit"> <button>Become a guide</button></router-link> |
      <router-link to="/login-signup"><button>Sign Up</button></router-link> |
      <router-link to="/login-signup"><button>Login</button></router-link>
    </nav>
  </section>
</template>

   
<script>
export default {
  data() {
    return {
      isScrolling: false,
    };
  },
  methods: {
    onScroll() {
      if (window.scrollY > 10) {
        this.isScrolling = true;
        this.$refs.header.style.backgroundColor = "white";
        this.isScrolling = false;
        this.$refs.header.style.backgroundColor = "transparent";
      }
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler: function (val) {
        if (val.fullPath === "/") {
          console.log('in fafi');
          window.addEventListener("scroll", this.onScroll);
          this.isScrolling = false;
          this.$refs.header.classList.remove("relative-pos");
          this.$refs.header.style.backgroundColor = "transparent";
        } else {
          console.log("not home");
          this.isScrolling = true;
          window.removeEventListener("scroll", this.onScroll);
          this.$refs.header.classList.add("relative-pos");
          this.$refs.header.style.backgroundColor = "white";
        }
      },
    },
  },
};
</script>
