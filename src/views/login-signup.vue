<template>
  <section class="login-signup">
    <img class="logo" src="../assets/logo-signs-green.svg" alt="" />
    <form @submit.prevent="login" v-if="isLogin">
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
      <el-button round plain type="success">Login</el-button>
      <a class="set-form-link" @click="setForm">Dont You Have an account yet?</a>
    </form>
    <form @submit.prevent="signup" v-else>
      <img class="auth-logo" src="../assets/Signup.svg" alt="" />
      <label class="profile-picture-upload">
        <i class="fas fa-cloud-upload-alt">
          <input
            type="file"
            required
            @change="handleFile"
            class="file-input"
            multiple
          />
        </i>
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
      <el-button plain round type="success">Sign Up</el-button>
      <a class="set-form-link" @click="setForm">Already Have an account?</a>
    </form>
  </section>
</template>

<script>
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
    signup() {
      console.log(this.signupData);
      // this.$store
      //   .dispatch({ type: "saveUser", user: this.loggedinUser })
      //   .then(() => {
      //     // this.$router.push("/tour-app");
      //   });
    },
    login() {
      console.log(this.loginData);
      // this.$store
      //   .dispatch({ type: "saveUser", user: this.loggedinUser })
      //   .then(() => {
      //     // this.$router.push("/tour-app");
      //   });
    },
    handleFile(ev) {
      console.log(ev.target.files);
    },
  },
};
</script>
