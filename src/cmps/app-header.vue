<template >
  <section class="app-header" ref="header">
    <div class="logo-container">
      <router-link to="/">
        <img src="../assets/logo.svg" alt="" />
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
  watch: {
    $route: {
      deep: true,
      immediate: true,
      handler: function (val) {
        if (val.fullPath !== "/") {
          this.$refs.header.classList.add("lala");
        } else {
          window.addEventListener("scroll", () => {
            if (window.scrollY > 10) {
              this.$refs.header.style.backgroundColor = "white";
            } else {
              this.$refs.header.style.backgroundColor = "transparent";
            }
            this.$refs.header.classList.remove("lala");
          });
        }
      },
    },
  },
};
</script>
