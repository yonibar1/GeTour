<template>
  <section class="tour-filter">
    <form action="">
      <div class="con">
        <el-input
          class="destination-input"
          placeholder="Destination"
          v-model="filterBy.byDestination"
          clearable
        >
        </el-input>
      </div>
      <el-date-picker
        v-model="filterBy.byDate"
        type="daterange"
        align="right"
        start-placeholder="Start Date"
        end-placeholder="End Date"
        default-value="2010-10-01"
      >
      </el-date-picker>
      <div class="price-input" @click="toggleRangeBox()">{{ priceToShow }}</div>
      <div v-if="isOpen" class="range-box-modal">
        <div class="range-box-modal-header">
          <h4>Pick Your Price</h4>
          <el-slider v-model="filterBy.byPriceRange" range :max="2000">
          </el-slider>
        </div>
        <div class="price-box-container">
          <div class="min-box">
            min price
            <br />
            <span> $ {{ filterBy.byPriceRange[0] }} </span>
          </div>
          -
          <div class="min-box">
            max price
            <br />
            <span> $ {{ filterBy.byPriceRange[1] }} </span>
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
      isOpen: false,
      priceToShow: "Price",
      filterBy: {
        byDestination: "",
        byDate: "",
        byPriceRange: [0, 2000],
      },
    };
  },
  computed: {},
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
      const min = this.filterBy.byPriceRange[0];
      const max = this.filterBy.byPriceRange[1];
      this.priceToShow = `$${min} - $${max}`;
    },
    async setFilter(country) {
      let copyFilterBy = JSON.parse(JSON.stringify(this.filterBy));
      if(country) {
        copyFilterBy.byDestination = country;
      }
      copyFilterBy.byPriceRange = {
        min: this.filterBy.byPriceRange[0],
        max: this.filterBy.byPriceRange[1],
      };
      await this.$store.dispatch({
        type: "setFilter",
        filter: copyFilterBy,
      });
      this.$emit("setFilter");
    },
  },
  created() {
  if(this.$route.params.country) {
    this.setFilter(this.$route.params.country)
  }
  }
  
};
</script>
