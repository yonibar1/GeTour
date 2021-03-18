<template>
  <section class="tour-filter">
    <form @submit.prevent="whatInTheVal()" action="">
      <el-date-picker
        v-model="value"
        type="daterange"
        range-separator="To"
        start-placeholder="Start date"
        end-placeholder="End date"
      >
      </el-date-picker>
      <button>???</button>
      <!-- <router-link to="/explore">
        <button><i class="fas fa-search"></i></button>
      </router-link> -->
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      value: "",
    };
  },
  methods: {
    whatInTheVal() {
      var lala = this.value[0]
      var timestamp = lala.getTime();
      console.log('timestamp:', timestamp)
      console.log(new Date(timestamp))
    },
  },
};
</script>
