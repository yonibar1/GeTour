<template>
    <section class="tour-review">
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
                            <!-- <h6>{{ review.createdAt }}</h6> -->
                        </div>
                    </div>
                    <div class="ranks-txt">
                        <h3>❞{{ review.txt }}❞</h3>
                        <p>{{ review.rate }}<i class="el-icon-star-on"></i></p>
                    </div>
                </div>
            </li>
        </ul>
        <div class="add-review-container">
            <form @submit.prevent="addReview()">
                <el-input
                    type="textarea"
                    maxlength="100"
                   
                    v-model="reviewToEdit.txt"
                    :autosize="{ minRows: 2, maxRows: 4 }"
                    placeholder="We Need Your Opinion"
                >
                </el-input>
                <button>Add Review</button>
            </form>
        </div>
    </section>
</template>

<script>
import moment from 'moment';
export default {
    props: {
        tour: {
            type: Object,
        },
    },
    data() {
        return {
            reviewToEdit: {
                txt: '',
                createdAt: Date.now(),
                rate: 2,
                byUser: {
                    fullname: 'muki tuki',
                    avatar: 'avatar.jpg',
                    _id: 'u201',
                },
            },
        };
    },
    computed: {
        reviews() {
            return this.$store.getters.reviews;
        },
    },
    methods: {
        async addReview() {
            await this.$store.dispatch({
                type: 'addReview',
                review: this.reviewToEdit,
                tourId: this.tour._id,
            });
            this.reviewToEdit = { txt: '' };
        },
        async loadReviews(id) {
            await this.$store.dispatch({ type: 'loadReviews', id });
        },
    },
    created() {
        this.loadReviews(this.tour._id);
    },
    filters: {
        moment: function(date) {
            return moment(date).fromNow();
        },
    },
};
</script>

<style></style>
