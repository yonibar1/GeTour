<template>
    <section v-if="tour" class="tour-details">
        <div class="details-container-primary">
            <h2>
                {{ tour.title }}
                <el-rate
                    show-score
                    allow-half
                    v-model="tour.rate"
                    disabled
                    text-color="#ff9900"
                >
                </el-rate>
                <span class="reviews-length">({{ tour.reviews.length }})</span>
            </h2>
            <h5>{{ tour.daysCount }} Days In {{ tour.country }}</h5>
            <div class="images-container">
                <div class="first-img">
                    <img :src="tour.imgs[0]" alt="" />
                </div>
                <div class="img-2">
                    <img :src="tour.imgs[1]" alt="" />
                </div>
                <div class="img3">
                    <img :src="tour.imgs[2]" alt="" />
                </div>
                <div class="img4">
                    <img :src="tour.imgs[3]" alt="" />
                </div>
                <div class="img5">
                    <img :src="tour.imgs[4]" alt="" />
                </div>
            </div>
        </div>
        <div class="order-details-container">
            <div class="details-container-secondry">
                <h3>{{ tour.startedAt | moment }}</h3>
                <h3 class="tour-members">
                    {{ tour.members }}/{{ tour.capacity }} Travellers In Tour
                </h3>
                <div class="icons-container">
                    <div
                        class="display-icons"
                        v-for="(tag, idx) in tour.tags"
                        :key="idx"
                    >
                        <i :class="tag.class"> </i>
                        <h4>{{ tag.txt }}</h4>
                    </div>
                </div>

                <!-- <h3>{{ tour.locs.name }}</h3> -->
                <p>{{ tour.description }}</p>
            </div>
            <div class="tour-order">
                <el-form>
                    <div class="form-order-main-details">
                        <h4>Price: {{ tour.price }}</h4>
                        <h2>
                            <i class="el-icon-star-on">{{ tour.rate }}</i>
                            <span class="reviews-length"
                                >({{ tour.reviews.length }})</span
                            >
                        </h2>
                    </div>
                    <el-input-number
                        v-model="order.guestsCount"
                        @change="handleChange"
                        :min="1"
                        :max="10"
                    ></el-input-number>
                    <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="Any Speaicel Requests?"
                        v-model="order.request"
                    >
                    </el-input>
                    <h4>Total Price: {{ totalPriceToShow }}</h4>
                    <el-button @click="orderAtrip">Order Tour</el-button>
                </el-form>
            </div>
        </div>
        <div class="review-list">
            <tour-review :tour="tour" />
        </div>
        <!-- <chat :tourId="tour._id" /> -->
        <div class="order-modal">
            <el-dialog
                title="Your Order"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose"
            >
                <h3>
                    {{ tour.title }}
                </h3>
                <h5>{{ tour.country }}</h5>
                <h4>{{ tour.startedAt | moment }}</h4>
                <p>
                    Your Order Has been sent to the tour guide for approval we
                    will let you know as soon as possible
                </p>
                <hr />
                <h3>Your Special Requests: {{ order.request }}</h3>
                <h3>Total Price: ${{ totalPriceToShow }}</h3>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="handleConfirm(tour)"
                        >Confirm</el-button
                    >
                </span>
            </el-dialog>
        </div>
    </section>
</template>

<script>
import tourReview from '../cmps/tour-review';
import moment from 'moment';
// import chat from '@/cmps/chat.vue';
export default {
    data() {
        return {
            reviews: [],
            dialogVisible: false,
            order: {
                guestsCount: 1,
                request: '',
            },
        };
    },
    created() {
        this.loadTour();
    },
    computed: {
        tour() {
            return this.$store.getters.tour;
        },
        totalPriceToShow() {
            console.log(
                'this.tour.price * this.order.guestsCount:',
                this.tour.price * this.order.guestsCount
            );
            return this.tour.price * this.order.guestsCount;
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
        async handleConfirm(tour) {
            this.dialogVisible = false;
            this.order.totalPrice = tour.price * this.order.guestsCount;
            this.order.tour = {
                _id: tour._id,
                title: tour.title,
                imgUrl: tour.imgUrl,
            };
            this.$store.dispatch({
                type: 'saveOrder',
                tour,
                order: this.order,
            });
            this.order.guestsCount = 1;
            this.order.request = '';
        },
        handleChange(value) {
            console.log(value);
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
        // chat,
    },
};
</script>
