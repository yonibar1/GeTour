<template>
  <section class="tour-edit">
    <div class="form-edit">
      <el-form v-if="tourToEdit" action="">
        <h2>Plan Your Own Tour</h2>
        <el-form-item>
          <label for="title">Title</label>
          <el-input
            require
            id="title"
            v-model="tourToEdit.title"
            placeholder=""
            type="text"
          />
        </el-form-item>
        <el-form-item>
          <label for="country">Country</label>
          <el-input
            id="country"
            v-model="tourToEdit.country"
            placeholder=""
            type="text"
          />
        </el-form-item>
        <el-form-item>
          <label for="date">Date</label>
          <el-date-picker
            id="date"
            v-model="tourToEdit.startedAt"
            type="date"
            placeholder="When the tour starts?"
            value-format="timestamp"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <label for="tags">Tour Tags</label>
          <el-select
            id="tags"
            v-model="tourToEdit.tags"
            multiple
            placeholder="Select tags "
          >
            <el-option
              v-for="option in options"
              :key="option.id"
              :label="option.label"
              :value="option.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <div class="quantities-container">
          <el-form-item>
            <label for="price">Tour Price</label>
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
        </div>

        <el-form-item>
          <label for="description">Description</label>
          <el-input
            id="description"
            type="textarea"
            maxlength="600"
            show-word-limit
            v-model="tourToEdit.description"
            :autosize="{ minRows: 6, maxRows: 6 }"
            placeholder="Add information about you tour"
          >
          </el-input>
        </el-form-item>
        <el-form-item class="images-section">
          <upload-image @save="saveImg" />
          <div class="imgs-container">
            {{ tourToEdit.imgs.length }} / 5
            <img
              class="uploaded-img"
              v-for="(url, idx) in tourToEdit.imgs"
              :key="idx"
              :src="url"
            />
          </div>
        </el-form-item>
        <label for="tourMap">
          Enter Tour Checkpoints (Don't forget to save them)</label
        >
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
import uploadImage from "../cmps/upload-image";
import { socketService } from "../services/socket.service";
export default {
  name: "tourEdit",
  data() {
    return {
      tourToEdit: null,
      options: [
        {
          label: "Water Trail",
          value: { txt: "Water Trail", class: "fas fa-water" },
          id: "t101",
        },
        {
          label: "Hiking Tour",
          value: { txt: "Hiking Tour", class: "fas fa-hiking" },
          id: "t102",
        },
        {
          label: "Camping Tour",
          value: { txt: "Camping", class: "fas fa-campground" },
          id: "t103",
        },
        {
          label: "For Children",
          value: { txt: "For Children", class: "fas fa-child" },
          id: "t104",
        },
        {
          label: "Urbanic",
          value: { txt: "Urbanic Tour", class: "fas fa-city" },
          id: "t105",
        },
        {
          label: "Nature",
          value: { txt: "Nature Tour", class: "fas fa-tree" },
          id: "t106",
        },
        {
          label: "Food",
          value: { txt: "Food Included", class: "fas fa-utensils" },
          id: "t107",
        },
      ],
    };
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
  },
  created() {
    const id = this.$route.params.tourId;
    this.loadTour(id);
  },
  methods: {
    saveImg(url) {
      this.tourToEdit.imgs.push(url);
    },
    setTags(ids) {
      const options = ids.map((id) => {
        return this.options.find((opt) => {
          return opt.id === id;
        });
      });
      const tags = options.map((opt) => {
        return opt.value;
      });
      return tags;
    },
    async saveTour() {
      try {
        this.tourToEdit.tags = this.setTags(this.tourToEdit.tags);
        await this.$store.dispatch({
          type: "saveTour",
          tour: this.tourToEdit,
        });
        const msg = {
          title: `Tour added by - ${this.loggedInUser.fullname}`,
          message: `${this.loggedInUser.fullname} has added a tour at - ${this.tourToEdit.country}`,
        };
        socketService.emit("add msg", msg);
        this.$router.push(`/`);
      } catch (err) {
        console.log("Cannot Save Tour", err);
        if (!this.$store.getters.loggedInUser) {
          this.$notify({
            title: "Cannot save tour",
            message: "Please login first",
            duration: 6000,
            type: "error",
            position: "top-right",
          });
        }
      }
    },
    async loadTour(id) {
      try {
        const tour = await this.$store.dispatch({
          type: "getTourToEdit",
          id,
        });
        this.tourToEdit = tour;
        console.log("this.tourToEdit", this.tourToEdit);
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
    uploadImage,
  },
};
</script>
