<template>
  <section class="tour-edit">
    <div class="form-edit">
      <el-form v-if="tourToEdit" action="">
        <el-form-item>
          <label for="title">Title</label>
          <el-input
            id="title"
            v-model="tourToEdit.title"
            placeholder="Title"
            type="text"
          />
        </el-form-item>
        <el-form-item>
          <label for="country">Country</label>
          <el-input
            id="country"
            v-model="tourToEdit.country"
            placeholder="Country"
            type="text"
          />
        </el-form-item>
        <el-form-item>
          <label for="price">Price</label>
          <el-input-number
            id="price"
            class="input-number"
            v-model.number="tourToEdit.price"
            placeholder="Price"
            type="number"
          />
        </el-form-item>
        <el-form-item>
          <label for="capacity">Capacity</label>
          <el-input-number
            id="capacity"
            v-model.number="tourToEdit.capacity"
            placeholder="Capacity"
            type="number"
          />
        </el-form-item>
        <el-form-item>
          <label for="daysCount">Days Count</label>
          <el-input-number
            id="daysCount"
            v-model.number="tourToEdit.daysCount"
            placeholder="Days"
            type="number"
          />
        </el-form-item>
        <el-form-item>
          <label for="Difficulty">Difficulty</label>
          <el-input-number
            id="Difficulty"
            v-model.number="tourToEdit.difficulty"
            placeholder="Difficulty"
            type="number"
          />
        </el-form-item>
        <el-form-item>
          <label for="tags">Tags</label>
          <el-select
            id="tags"
            v-model="tourToEdit.tags"
            multiple
            placeholder="Select"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <label for="description">Description</label>
          <el-input
            id="description"
            type="textarea"
            maxlength="100"
            show-word-limit
            v-model="tourToEdit.description"
            :autosize="{ minRows: 2, maxRows: 6 }"
            placeholder="Description"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <label for="uploadImages" class="upload-images">
            Upload Images
            <i class="fas fa-cloud-upload-alt">
              <input
                id="uploadImages"
                class="file-input"
                multiple
                type="file"
              />
            </i>
          </label>
        </el-form-item>
        <label for="tourMap"> Enter Tour Checkpoints </label>
        <tour-map id="tourMap" @setCheckPoints="setCheckPoints" />
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
        await this.$store.dispatch({
          type: "saveTour",
          tour: this.tourToEdit,
        });
        this.$router.push(`/`);
      } catch (err) {
        console.log("Cannot Save Tour", err);
      }
    },
    async loadTour(id) {
      try {
        const tour = await this.$store.dispatch({
          type: "getTourToEdit",
          id,
        });
        this.tourToEdit = tour;
      } catch (err) {
        console.log("Cannot load Tour", err);
      }
    },
    setCheckPoints(cp) {
      this.tourToEdit.locs = cp;
    },
  },
  components: {
    tourMap,
  },
};
</script>
