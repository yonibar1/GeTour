<template>
  <section class="user-profile">
    <div class="left-container">
      <div class="avatar">
        <img :src="user.imgUrl" alt=""/>
      </div>
    </div>
    <div class="right-container">
      <div class="user-title">
      <h1>Your Profile</h1>
      <h2>{{ user.fullname }}</h2>
      </div>
      <div class="main">
      <h2>My Tours</h2>
      </div>
    </div>
  </section>
</template>



<script>
export default {
  name: "user-progile",
  data() {
    return {
      user: {
        fullname: "Shoshana Bar",
        imgUrl:
          "https://res.cloudinary.com/yonibar/image/upload/v1616444443/stefan-stefancik-QXevDflbl8A-unsplash_uos7x2.jpg",
      },
    };
  },
};
</script>