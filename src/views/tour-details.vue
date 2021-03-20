<template>
    <section v-if="tour" class="tour-details">
        <div class="details-container-primary">
            <h2>{{ tour.title }}</h2>
            <div class="images-container">
                <div class="first-img">
                    <img src="../assets/img/hero3.jpg" alt="" />
                </div>
                <div class="img-2">
                    <img src="../assets/img/hero2.jpg" alt="" />
                </div>
                <div class="img3">
                    <img src="../assets/img/hero3.jpg" alt="" />
                </div>
                <div class="img4">
                    <img src="../assets/img/hero.jpg" alt="" />
                </div>
            </div>
        </div>
        <div class="order-details-container">
            <div class="details-container-secondry">
                <h3>{{ tour.startedAt | moment }}</h3>
                <h3>Tour Duration: {{ tour.daysCount }} Days</h3>
                <h3>
                    {{ tour.members }}/{{ tour.capacity }} Travellers In Tour
                </h3>
                <h4>{{ tour.tags }}</h4>
                <!-- <h3>{{ tour.locs.name }}</h3> -->
                <p>{{ tour.description }}</p>
            </div>
            <div class="tour-order">
                <!-- <el-form @submit.prevent="orderAtrip"> -->
                <el-form>
                    <el-form-item label="Price:">
                        {{ tour.price }}</el-form-item
                    >
                    <el-form-item label="How Many Travellers :">
                        <el-input-number type="number" />
                    </el-form-item>
                    <el-form-item label="Any Speacial Requests:">
                        <el-input
                            type="textarea"
                            maxlength="100"
                            show-word-limit
                            :autosize="{ minRows: 2, maxRows: 4 }"
                            placeholder="Any Speacial Requests..."
                        >
                        </el-input>
                    </el-form-item>
                    <el-form-item label="To Pay:">{{
                        tour.price
                    }}</el-form-item>
                    <el-button @click="orderAtrip">Order Tour</el-button>
                </el-form>
            </div>
        </div>
        <div class="review-list">
            <tour-review :tour="tour" :reviews="reviews" />
        </div>
        <chat :tourId="tour._id" />
        <div class="order-modal">
            <el-dialog
                title="Your Order"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose"
            >
                <h3>{{ tour.title }}</h3>
                <h4>{{ tour.startedAt | moment }}</h4>
                <p>
                    Your Order Has been sent to the tour guide for approval we
                    will let you know as soon as possible
                </p>
                <hr />
                <h3>Total Price: ${{ tour.price }}</h3>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="dialogVisible = false"
                        >Confirm</el-button
                    >
                </span>
            </el-dialog>
        </div>
        F
    </section>
</template>

<script>
import tourReview from '../cmps/tour-review';
import moment from 'moment';
import chat from '@/cmps/chat.vue';
export default {
    data() {
        return {
            reviews: [],
            dialogVisible: false,
        };
    },
    created() {
        this.loadTour();
    },
    computed: {
        tour() {
            return this.$store.getters.tour;
        },
        // users() {
        //     return this.$store.getters.users;
        // },
        // loggedInUser() {
        //     return this.$store.getters.loggedinUser;
        // },
    },
    filters: {
        moment: function(date) {
            return moment(date).format('dddd , DD/MM/YYYY');
        },
    },
    methods: {
        async loadTour() {
            try {
                const id = this.$route.params.tourId;
                await this.$store.dispatch({
                    type: 'loadTour',
                    id,
                });
                this.reviews = this.tour.reviews;
                // this.$store.dispatch({ type: 'loadUsers' });
            } catch {
                console.log('Cant Show Tour Details');
            }
        },
        async handleClose(done) {
            try {
                this.$confirm('Are you sure to close this dialog?');
                await done();
            } catch {
                console.log('Cant Show Tour Details');
            }
        },

        async orderAtrip() {
            this.dialogVisible = true;
        },
    },
    watch: {
        '$route.params.tourId'() {
            this.loadTour();
        },
    },
    components: {
        tourReview,
        chat,
    },
};
</script>
