<template>
  <section class="tour-edit">
    <div class="edit-background-image-container">
      <img src="@/assets/img/signup-img.jpg" />
      <el-form v-if="tourToEdit" action="">
        <el-form-item label-position="left" label="Title ">
          <el-input
            v-model="tourToEdit.title"
            placeholder="Title"
            type="text"
          />
        </el-form-item>
        <el-form-item label="Price">
          <el-input-number
            class="input-number"
            v-model.number="tourToEdit.price"
            placeholder="Price"
            type="number"
          />
        </el-form-item>
        <el-form-item label="Capacity ">
          <el-input-number
            v-model.number="tourToEdit.capacity"
            placeholder="Capacity"
            type="number"
          />
        </el-form-item>
        <el-form-item label="Days Count ">
          <el-input-number
            v-model.number="tourToEdit.daysCount"
            placeholder="Days"
            type="number"
          />
        </el-form-item>
        <el-form-item label="Difficulty ">
          <el-input-number
            v-model.number="tourToEdit.difficulty"
            placeholder="Difficulty"
            type="number"
          />
        </el-form-item>
        <el-form-item label="Tags ">
          <el-select v-model="tourToEdit.tags" multiple placeholder="Select">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Description ">
          <el-input
            type="textarea"
            maxlength="100"
            show-word-limit
            v-model="tourToEdit.description"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="Description"
          >
          </el-input>
        </el-form-item>
        <el-form-item label-position="left">
          <label class="upload-images">
            Upload Images
            <i class="fas fa-cloud-upload-alt">
              <input class="file-input" multiple type="file" />
            </i>
          </label>
          <!-- V-MODEL ON FILE INPUT -->
        </el-form-item>
        <tour-map />
        <el-button @click="saveTour" v-if="tourToEdit._id"
          >Update Tour</el-button
        >
        <el-button @click="saveTour" v-else>Create Tour</el-button>
      </el-form>
    </div>
  </section>
</template>

<script>
import tourMap from "../cmps/tour-map";
export default {
  name: "tourEdit",
  data() {
    return {
      tourToEdit: null,
      options: [
        { label: "Water Trail", value: "water trail" },
        { label: "For Children", value: "for children" },
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
  components: {
    tourMap,
  },
};
</script>