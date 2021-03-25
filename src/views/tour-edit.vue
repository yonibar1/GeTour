<template>
    <section class="tour-edit">
        <div class="form-edit">
            <h3>Plan Your Special Tour</h3>
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
                <!-- <el-form-item>
          <label for="members">Members</label>
          <el-input-number
            id="members"
            class="input-number"
            v-model.number="tourToEdit.members"
            placeholder="Members"
            type="number"
          />
        </el-form-item> -->
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
                    <el-date-picker
                        v-model="tourToEdit.startedAt"
                        type="date"
                        placeholder="Pick a day"
                        value-format="timestamp"
                    >
                    </el-date-picker>
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
                        <!--    options: [
        {
          label: "Water Trail",
          value: { txt: "Water Trail", class: "fas fa-water" },
        }, -->
                        <el-option
                            v-for="(item, idx) in options"
                            :key="idx"
                            :label="item.label"
                            :value="item.value.class"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <label for="description">Description</label>
                    <el-input
                        id="description"
                        type="textarea"
                        maxlength="600"
                        show-word-limit
                        v-model="tourToEdit.description"
                        :autosize="{ minRows: 2, maxRows: 6 }"
                        placeholder="Description"
                    >
                    </el-input>
                </el-form-item>
                <el-form-item>
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
import tourMap from '../cmps/tour-map';
import uploadImage from '../cmps/upload-image';
export default {
    name: 'tourEdit',
    data() {
        return {
            tourToEdit: null,
            options: [
                {
                    label: 'Water Trail',
                    value: { txt: 'Water Trail', class: 'fas fa-water' },
                },
                {
                    label: 'Hiking Tour',
                    value: { txt: 'Hiking Tour', class: 'fas fa-hiking' },
                },
                {
                    label: 'Camping Tour',
                    value: { txt: 'Camping', class: 'fas fa-campground' },
                },
                {
                    label: 'For Children',
                    value: { txt: 'For Children', class: 'fas fa-child' },
                },
                {
                    label: 'Urbanic',
                    value: { txt: 'Urbanic Tour', class: 'fas fa-city' },
                },
                {
                    label: 'Nature',
                    value: { txt: 'Nature Tour', value: 'fas fa-tree' },
                },
                {
                    label: 'Food',
                    value: { txt: 'Food Included', value: 'fas fa-utensils' },
                },
            ],
        };
    },
    computed: {},
    created() {
        const id = this.$route.params.tourId;
        this.loadTour(id);
    },
    methods: {
        saveImg(url) {
            this.tourToEdit.imgs.push(url);
        },
        async saveTour() {
            try {
                await this.$store.dispatch({
                    type: 'saveTour',
                    tour: this.tourToEdit,
                });
                this.$router.push(`/`);
            } catch (err) {
                console.log('Cannot Save Tour', err);
            }
        },
        async loadTour(id) {
            try {
                const tour = await this.$store.dispatch({
                    type: 'getTourToEdit',
                    id,
                });
                this.tourToEdit = tour;
                console.log('this.tourToEdit', this.tourToEdit);
            } catch (err) {
                console.log('Cannot load Tour', err);
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
