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
        console.log(val.fullPath, "hander");
        if (val.fullPath !== "/") {
          console.log(val, "val");
          this.$refs.header.classList.add("lala");
        } else {
          window.addEventListener("scroll", () => {
            if (window.scrollY > 10) {
              console.log(val.fullPath, "added event listener");
              this.$refs.header.style.backgroundColor = "white";
            } else {
              this.$refs.header.style.backgroundColor = "transparent";
            }
            this.$refs.header.classList.remove("lala");
          });
        }
      },
    },

    // }
    // $route(val) {},
    // '$route'(val) {
    //   if (val.fullPath === "/" && val.name === "tour-app") {
    //     window.addEventListener("scroll", () => {
    //       if (window.scrollY > 10) {
    //         console.log('added listener');
    //         this.$refs.header.style.backgroundColor = "white";
    //       } else {
    //         this.$refs.header.style.backgroundColor = "transparent";
    //       }
    //     });
    //   }
    // },
    // },
  },
};
</script>
