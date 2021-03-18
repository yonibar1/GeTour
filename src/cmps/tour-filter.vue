<template>
  <section class="tour-filter">
    <form @submit.prevent="getAns()" action="" >
      <div class="con">
      <el-input
        class="destination-input"
        placeholder="Destination"
        v-model="desVal"
        clearable
      >
      </el-input>
      </div>
      <el-date-picker
        v-model="timeVal"
        type="datetimerange"
        align="right"
        start-placeholder="Start Date"
        end-placeholder="End Date"
        :default-time="['12:00:00', '08:00:00']">
      </el-date-picker>
      <el-button class="save-btn" icon="el-icon-search" circle></el-button>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      timeVal: '',
      desVal: ''
    };
  },
  methods: {
    // getAns() {
    //   var destination = this.desVal;
    //   var startTimestamp = this.timeVal[0].getTime();
    //   var endTimestamp = this.timeVal[1].getTime();
    // },
  },
};
</script>
