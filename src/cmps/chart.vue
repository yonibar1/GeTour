<script>
import { Doughnut } from "vue-chartjs";

export default {
  props: {
    tours: {
      type: Array,
    },
    orders: {
      type: Array,
    },
  },
  extends: Doughnut,
  created() {},
  computed: {},
  data() {
    return {
      tourTitles: [],
      tourProfits: [],
    };
  },
  mounted() {
    this.tours.forEach((tour) => {
      this.tourTitles.push(tour.title);
      let sum = 0;
      this.orders.forEach((order) => {
        if (order.tour._id === tour._id) {
          sum += order.totalPrice;
        }
      });
      this.tourProfits.push(sum);
    });
    this.renderChart({
      labels: this.tourTitles,
      datasets: [
        {
          label: "Price",
          backgroundColor: [
            "#42ABA7",
            "#00A9F3",
            "#00717E",
            "#D4FADD",
            "#0075BA",
            "#9EB0A2",
          ],
          data: this.tourProfits,
        },
      ],
    });
  },
};
</script>