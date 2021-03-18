<template>
  <section class="tour-edit">
    <form v-if="tourToEdit" @submit.prevent="saveTour" action="">
      <label>
        Title:
        <el-input v-model="tourToEdit.title" placeholder="Title" type="text" />
      </label>
      <label>
        Price:
        <el-input-number
          v-model.number="tourToEdit.price"
          placeholder="Price"
          type="number"
        />
      </label>
      <label>
        Capacity:
        <el-input-number
          v-model.number="tourToEdit.capacity"
          placeholder="Capacity"
          type="number"
        />
      </label>
      <label>
        Days Count:
        <el-input-number
          v-model.number="tourToEdit.daysCount"
          placeholder="Days"
          type="number"
        />
      </label>
      <label>
        Difficulty:
        <el-input-number
          v-model.number="tourToEdit.difficulty"
          placeholder="Difficulty"
          type="number"
        />
      </label>
      <label>
        Tags:
        <el-select v-model="tourToEdit.tags" multiple placeholder="Select">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>

        <!-- <select v-model="tourToEdit.tags">
          <option value="children">Suitable for children</option>
          <option value="water">Water Trail</option>
          <option value="urbanic">Urbanic</option>
          <option value="nature">Nature</option>
          <option value="food">Food</option>
        </select> -->
      </label>
      <label>
        Description:
        <el-input
          type="textarea"
          maxlength="100"
          show-word-limit
          v-model="tourToEdit.description"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="Description"
        >
        </el-input>
      </label>
      <label>
        Images:
        <input multiple type="file" />
      </label>
      <!-- V-MODEL ON FILE INPUT -->
      <button v-if="tourToEdit._id">Update Tour</button>
      <button v-else>Create Tour</button>
    </form>
  </section>
</template>

<script>
export default {
  name: "tourEdit",
  data() {
    return {
      tourToEdit: null,
      options: [
        { label: "Water", value: "water" },
        { label: "Children", value: "children" },
        { label: "Urbanic", value: "urbanic" },
        { label: "Nature", value: "nature" },
        { label: "Food", value: "food" },
      ],
    };
  },
  computed: {},
  created() {
    const id = this.$route.params.tourId;
    this.loadTour(id);
  },
  methods: {
    async saveTour() {
      try {
        await this.$store.dispatch({ type: "saveTour", tour: this.tourToEdit });
        this.$router.push(`/`);
      } catch (err) {
        console.log("Cannot Save Tour", err);
      }
    },
    async loadTour(id) {
      try {
        const tour = await this.$store.dispatch({ type: "getTourToEdit", id });
        this.tourToEdit = tour;
      } catch (err) {
        console.log("Cannot load Tour", err);
      }
    },
  },
};
</script>