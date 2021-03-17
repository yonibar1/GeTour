<template>
  <section class="login-signup">
    <!-- Sign Up -->
    <h2>Sign Up</h2>
    <form @submit.prevent="signup">
      <label>
        <input type="file" />
      </label>
      <label>
        <input type="text" placeholder="Full Name" />
      </label>
      <label>
        <input type="text" placeholder="User Name" />
      </label>
      <label>
        <input type="password" placeholder="Password" />
      </label>
      <button>Sign Up</button>
    </form>

    <!-- Login -->
    <h2>login</h2>
    <form @submit.prevent="login">
      <label>
        <input type="text" placeholder="User Name" />
      </label>
      <label>
        <input type="password" placeholder="Password" />
      </label>
      <button>Login</button>
    </form>
  </section>
</template>

<script>
export default {
  name: "login-signup",
  methods: {
    signup() {
      // this.$store
      //   .dispatch({ type: "saveUser", user: this.loggedinUser })
      //   .then(() => {
      //     // this.$router.push("/tour-app");
      //   });
    },
    login() {
      // this.$store
      //   .dispatch({ type: "saveUser", user: this.loggedinUser })
      //   .then(() => {
      //     // this.$router.push("/tour-app");
      //   });
    },
  },
};
</script>
