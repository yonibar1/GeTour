<template>
    <section class="tour-app">
        <div class="hero-container">
            <img src="../assets/img/hero.jpg" alt="" />
            <tour-filter />
        </div>
        <div class="categories-container">
            <h1>Top Places</h1>
            <ul class="categories">
                <li>
                    <router-link to="/explore">
                        <div class="category-card">
                            <img src="../assets/categories/europe.jpg" alt="" />
                        </div>
                        Best tours in Europe
                    </router-link>
                </li>
                <li>
                    <router-link to="/explore">
                        <div class="category-card">
                            <img src="../assets/categories/asia.jpg" alt="" />
                        </div>
                        Best tours in Asia
                    </router-link>
                </li>
                <li>
                    <router-link to="/explore">
                        <div class="category-card">
                            <img
                                src="../assets/categories/australia.jpg"
                                alt=""
                            />
                        </div>
                        Best tours in Australia
                    </router-link>
                </li>
                <li>
                    <router-link to="/explore">
                        <div class="category-card">
                            <img src="../assets/categories/usa.jpg" alt="" />
                        </div>
                        Best tours in USA
                    </router-link>
                    <router-link to="/explore">
                        <el-button round>See All</el-button>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="guides-container">
            <h1>Top guides of the week</h1>
            <router-link to="/explore">
                <el-button round>See All</el-button>
            </router-link>
            <ul class="categories">
                <li>
                    <router-link to="/explore">
                        <div class="avatar-card">
                            <img
                                src="../assets/demo-guides/guide1.jpg"
                                alt=""
                            />
                        </div>
                        Alison Bergers
                    </router-link>
                </li>
                <li>
                    <router-link to="/explore">
                        <div class="avatar-card">
                            <img
                                src="../assets/demo-guides/guide2.jpg"
                                alt=""
                            />
                        </div>
                        Bobo Lato
                    </router-link>
                </li>
                <li>
                    <router-link to="/explore">
                        <div class="avatar-card">
                            <img
                                src="../assets/demo-guides/guide3.jpg"
                                alt=""
                            />
                        </div>
                        Bamia Nice
                    </router-link>
                </li>
                <li>
                    <router-link to="/explore">
                        <div class="avatar-card">
                            <img
                                src="../assets/demo-guides/guide4.jpg"
                                alt=""
                            />
                        </div>
                        Shimi Lo
                    </router-link>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
import tourFilter from '@/cmps/tour-filter.vue';

export default {
    name: 'tour-app',
    components: {
        tourFilter,
    },
};
</script>
