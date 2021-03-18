<template >
  <section class="app-header" ref="header">
    <div class="logo-container">
      <router-link to="/">
        <img v-if="isScrolling === false" ref="logoImg" src="@/assets/logo-w.svg" alt="" />
        <img v-else src="@/assets/logo1.svg" alt="" />
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
      isScrolling: false
    }
  },
  watch: {
    $route: {
      deep: true,
      immediate: true,
      handler: function (val) {
        if (val.fullPath !== "/") {
          console.log(val, "val");
          this.$refs.header.classList.add("relative-pos");
        } else {
          window.addEventListener("scroll", () => {
            if (window.scrollY > 10) {
              this.isScrolling = true
              this.$refs.header.style.backgroundColor = "white";
            } else {
              this.isScrolling = false
              this.$refs.header.style.backgroundColor = "transparent";
            }
            this.$refs.header.classList.remove("relative-pos");
          });
        }
      },
    },
  },
};
</script>
