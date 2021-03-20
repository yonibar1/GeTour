<template>
  <section class="tour-filter">
    <form action="">
      <div class="con">
        <el-input
          class="destination-input"
          placeholder="Destination"
          v-model="destinationVal"
          clearable
        >
        </el-input>
      </div>
      <el-date-picker
        v-model="dateVal"
        type="daterange"
        align="right"
        start-placeholder="Start Date"
        end-placeholder="End Date"
        default-value="2010-10-01"
      >
      </el-date-picker>
      <div @click="toggleRangeBox()">{{ priceToShow }}</div>
      <div v-if="isOpen" class="range-box">
        <div class="rane-box-header">
          <h4>Pick Your Price</h4>
          <el-slider v-model="value" range :max="200"> </el-slider>
        </div>
        <div class="price-box-container">
          <div class="min-box">
            min price
            <br />
            <span> $ {{ value[0] }} </span>
          </div>
          -
          <div class="min-box">
            max price
            <br />
            <span> $ {{ value[1] }} </span>
          </div>
        </div>
      </div>
      <router-link to="/explore">
        <el-button
          @click="setFilter()"
          class="save-btn"
          icon="el-icon-search"
          circle
        ></el-button>
      </router-link>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      dateVal: "",
      destinationVal: "",
      value: 0,
      isOpen: false,
      priceToShow: "Price",
    };
  },
  methods: {
    toggleRangeBox() {
      if (this.isOpen === true) {
        this.isOpen = false;
        this.setPrice();
      } else {
        this.isOpen = true;
      }
    },
    setPrice() {
      console.log(this.value);
      const min = this.value[0];
      const max = this.value[1];
      this.priceToShow = `$${min} - $${max}`;
    },
    setFilter() {
      const filterBy = {
        byDestination: this.destinationVal,
        byDate: this.dateVal,
        byPriceRange: {
          min: this.value[0],
          max: this.value[1],
        },
      };
      console.log(filterBy);
    },
  },
};
</script>
