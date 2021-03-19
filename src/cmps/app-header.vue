<template >
  <section class="app-header" ref="header" >
    <div class="logo-container">
      <router-link to="/">
        <img v-if="!isScrolling" src="@/assets/logo-w.svg" alt="" />
        <img v-else src="@/assets/logo1.svg" alt=""/>
      </router-link>
    </div>
    <nav>
      <router-link to="/edit">Become a guide</router-link> |
      <router-link to="/login-signup">Signup</router-link> |
      <router-link to="/login-signup">Login</router-link>
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
      console.log($route);
      //   console.log(this.$refs);
      //   console.log("hoh");
      //   if (window.scrollY > 10) {
      //     console.log("yesssss");
      //     this.isScrolling = true;
      //     this.$refs.header.style.backgroundColor = "white";
      //   } else {
      //     this.isScrolling = false;
      //     this.$refs.header.style.backgroundColor = "transparent";
      //   }
    },
  },
  // watch: {
  //   $route: {
  //     deep: true,
  //     immediate: true,
  //     handler: function (val) {
  //       if (val.fullPath === "/") {
  //         console.log("im home");
  //         window.addEventListener("scroll", this.onScroll);
  //         console.log(this.$refs);
  //         // this.$refs.header.classList.remove("relative-pos");
  //       } else {
  //         console.log("not home");
  //         this.$refs.header.classList.add("relative-pos");
  //         window.removeEventListener("scroll", this.onScroll);
  //       }
  //     },
  //   },
  // },
};
</script>
