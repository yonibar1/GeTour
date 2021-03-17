<template>
  <section class="tour-edit">
    <form v-if="tourToEdit" @submit.prevent="saveTour" action="">
      {{tourToEdit}}
      <input v-model="tourToEdit.title" placeholder="Title" type="text" />
      <input v-model="tourToEdit.price" placeholder="Price" type="number" />
      <input
        v-model="tourToEdit.capacity"
        placeholder="Capacity"
        type="number"
      />
      <input v-model="tourToEdit.daysCount" placeholder="Days" type="number" />
      <input
        v-model="tourToEdit.difficulty"
        placeholder="Difficulty"
        type="number"
      />
      <select v-model="tourToEdit.tags">
        <option value="children">Suitable for children</option>
        <option value="water">Water Trail</option>
        <option value="urbanic">Urbanic</option>
        <option value="nature">Nature</option>
        <option value="food">Food</option>
      </select>
      <textarea
        v-model="tourToEdit.description"
        placeholder="Description"
        cols="30"
        rows="10"
      ></textarea>
      <input multiple type="file" />
      <!-- V-MODEL ON FILE INPUT -->
      <button>Save</button>
    </form>
  </section>
</template>

<script>
export default {
  name: "tourEdit",
  data() {
    return {
      tourToEdit: null,
    };
  },
  computed: {},
  created() {
    const id = this.$route.params.id;
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