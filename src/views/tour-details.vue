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
            <!-- <h2>Tour Guide: {{ tour.user.fullname }}</h2> -->
        </div>
        <div class="order-details-container">
            <div class="details-container-secondry">
                <h3>
                    {{ tour.members }}/{{ tour.capacity }} Travellers In Tour
                </h3>
                <!-- <span>{{ date | moment }}</span> -->
                <h3>Tour Date: {{ tour.startedAt | moment }}</h3>
                <h3>{{ tour.daysCount }} Days</h3>
                <!-- <h3>{{ tour.locs.name }}</h3> -->
            </div>
            <div class="tour-order">
                <form @submit.prevent="orderAtrip">
                    <h3>Price: {{ tour.price }}</h3>
                    <label>How Many Travellers <input type="number"/></label>
                    <label>Any Speacial Requests:</label>
                    <textarea placeholder="I Would Like..." />
                    <label>To Pay:{{ tour.price }}</label>
                    <button>Order Tour</button>
                </form>
            </div>
        </div>
        <!-- <ul class="review-list">
            <li v-for="review in reviews" :key="review._id">
                <p>
                    About
                    <router-link :to="`user/${review.aboutTour._id}`">
                        {{ review.aboutTour.name }}
                    </router-link>
                </p>
                <h3>{{ review.txt }}</h3>
                <p>
                    By
                    <router-link :to="`user/${review.byUser._id}`">
                        {{ review.byUser.fullname }}
                    </router-link>
                </p>
                <hr />
            </li>
        </ul>
        <form @submit.prevent="addReview()">
            <h2>What Do You Thinking About That Tour :</h2>
            <select v-model="reviewToEdit.aboutTourId">
                <option v-for="user in users" :key="user._id" :value="user._id">
                    {{ user.fullname }}
                </option>
            </select>
            <textarea
                placeholder="We Need Your Opinion"
                v-model="reviewToEdit.txt"
            ></textarea>
            <button>Save</button>
        </form>
        <chat :tourId="tour._id" /> -->
    </section>
</template>

<script>
import { tourService } from '../services/tour.service.js';
import moment from 'moment';
// import chat from '@/cmps/chat.vue';
export default {
    data() {
        return {
            // reviewToEdit: {
            //     txt: '',
            //     aboutTourId: null,
            // },
            tour: null,
        };
    },
    created() {
        this.loadTour();
    },
    computed: {
        // reviews() {
        //     return this.$store.getters.reviews;
        // },
        // users() {
        //     return this.$store.getters.users;
        // },
        // loggedInUser() {
        //     return this.$store.getters.loggedinUser;
        // },
    },
    methods: {
        async loadTour() {
            try {
                const id = this.$route.params.tourId;
                const tour = await tourService.getById(id);
                console.log('tour:', tour.imgs);
                this.tour = tour;
                // this.$store.dispatch({ type: 'loadReviews' });
                // this.$store.dispatch({ type: 'loadUsers' });
            } catch {
                console.log('Cant Show Tour Details');
            }
        },
        // async addReview() {
        //     await this.$store.dispatch({
        //         type: 'addReview',
        //         review: this.reviewToEdit,
        //     });
        //     this.reviewToEdit = { txt: '', aboutUserId: null };
        // },
    },
    filters: {
        moment: function(date) {
            return moment(date).format('MMMM Do YYYY, h:mm:ss a');
        },
    },
    watch: {
        '$route.params.tourId'() {
            this.loadTour();
        },
    },
    components: {
        // chat,
    },
};
</script>
