<template>
  <section class="login-signup">
    <img class="logo" src="../assets/logo-signs-green.svg" alt="" />
    <form @submit.prevent="login" v-if="isLogin" name="login">
      <img class="auth-logo" src="../assets/Login.svg" alt="" />
      <label>
        <input
          type="text"
          required
          v-model="loginData.username"
          placeholder="User Name"
        />
      </label>
      <label>
        <input
          type="password"
          required
          v-model="loginData.password"
          placeholder="Password"
        />
      </label>
      <button round plain type="success">Login</button>
      <a class="set-form-link" @click="setForm"
        >Dont You Have an account yet?</a
      >
    </form>
    <form @submit.prevent="signup" v-else name="signup" novalidate>
      <img class="auth-logo" src="../assets/Signup.svg" alt="" />
      <label class="profile-picture-upload">
        <!-- <upload-image @save="setImgUrl" /> -->
        <upload-image @save="setImgUrl" />
      </label>
      <label>
        <input required v-model="signupData.fullname" placeholder="Full Name" />
      </label>
      <label>
        <input
          type="text"
          required
          v-model="signupData.username"
          placeholder="User Name"
        />
      </label>
      <label>
        <input
          type="password"
          required
          v-model="signupData.password"
          placeholder="Password"
          show-password
        />
      </label>
      <button>Sign Up</button>
      <a class="set-form-link" @click="setForm">Already Have an account?</a>
    </form>
  </section>
</template>

<script>
import uploadImage from "../cmps/upload-image";
export default {
  name: "login-signup",
  data() {
    return {
      loginData: {
        username: "",
        password: "",
      },
      signupData: {
        imgUrl: "",
        fullname: "",
        username: "",
        password: "",
      },
      isLogin: true,
    };
  },
  computed: {},
  methods: {
    setForm() {
      this.isLogin = !this.isLogin;
    },
    setImgUrl(url) {
      this.signupData.imgUrl = url;
    },
    async signup() {
      console.log(this.signupData);
      if (!this.signupData.imgUrl)
        this.signupData.imgUrl =
          "https://res.cloudinary.com/yonibar/image/upload/v1616747547/default-profile_gmmqxp.png";
      await this.$store.dispatch({
        type: "signup",
        userData: this.signupData,
      });
      this.$router.push("/");
    },
    async login() {
      await this.$store.dispatch({ type: "login", user: this.loginData });
      this.$router.push("/");
    },
  },
  components: {
    uploadImage,
  },
};
</script>
