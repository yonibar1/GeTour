<template>
  <section class="app-header">
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
export default {};
</script>
