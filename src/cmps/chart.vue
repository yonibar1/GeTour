<script>
import { Bar } from "vue-chartjs";

export default {
  props: {
    tours: {
      type: Array,
    },
    orders: {
      type: Array,
    },
  },
  extends: Bar,
  created() {},
  computed: {},
  data() {
    return { tourTitles: [], tourPrices: [] };
  },
  mounted() {
    console.log(this.tours, "This TOURS FROM PROPS");
    console.log(this.orders, "This ORDERS FROM PROPS");
    this.tours.forEach((tour) => {
      this.tourTitles.push(tour.title);
      let sum = 0;
      this.orders.forEach((order) => {
        if (order.tour._id === tour._id) {
          sum += order.totalPrice;
        }
      });
      console.log(sum);
      this.tourPrices.push(sum);
      console.log(this.tourPrices, "tour PRICES");
      console.log(this.tourTitles, "tour TITLES");
    });
    this.renderChart({
      labels: this.tourTitles,
      datasets: [
        {
          label: "Price",
          backgroundColor: "#43aba7",
          data: this.tourPrices,
        },
      ],
    });
  },
};
</script>

