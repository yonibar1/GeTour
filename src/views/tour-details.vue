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
                <h3>
                    {{ tour.members }}/{{ tour.capacity }} Travellers In Tour
                </h3>
                <h3>Tour Date: {{ tour.startedAt | moment }}</h3>
                <h3>{{ tour.daysCount }} Days</h3>
                <h4>{{ tour.tags }}</h4>
                <!-- <h3>{{ tour.locs.name }}</h3> -->
                <p>{{ tour.description }}</p>
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
        <div class="review-list">
            <h2>reviews:</h2>
            <ul v-if="reviews">
                <li v-for="review in reviews" :key="review.id">
                    <div class="review">
                        <div class="mini-user">
                            <div class="mini-user-img">
                                <img src="../assets/img/avatar.jpg" alt="" />
                            </div>
                            <div class="mini-user-details">
                                <router-link :to="`user/${review.byUser._id}`">
                                    {{ review.byUser.fullname }}
                                </router-link>
                                <h6>{{ review.createdAt | moment }}</h6>
                            </div>
                        </div>
                        <div class="ranks-txt">
                            <h3>❞{{ review.txt }}❞</h3>
                            <p>
                                {{ review.rate }}<i class="el-icon-star-on"></i>
                            </p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <!-- <form @submit.prevent="addReview()">
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
        </form> -->
        <!-- <chat :tourId="tour._id" />  -->
    </section>
</template>

<script>
import moment from 'moment';
// import chat from '@/cmps/chat.vue';
export default {
    data() {
        return {
            // reviewToEdit: {
            //     txt: '',
            //     aboutTourId: null,
            // },
            reviews: [],
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
    methods: {
        async loadTour() {
            try {
                const id = this.$route.params.tourId;
                const tour = await this.$store.dispatch({
                    type: 'loadTour',
                    id,
                });
                this.reviews = tour.reviews;
                console.log('  this.reviews:', this.reviews);

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
    // async orderTour() {
    //   console.log("Ordering");
    // },
    // async addReview() {
    //     await this.$store.dispatch({
    //         type: 'addReview',
    //         review: this.reviewToEdit,
    //     });
    //     this.reviewToEdit = { txt: '', aboutUserId: null };
    // },
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
