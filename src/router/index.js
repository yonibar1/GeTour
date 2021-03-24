import Vue from 'vue';
import VueRouter from 'vue-router';
import tourApp from '../views/tour-app.vue';
import tourExplore from '../views/tour-explore.vue';
import tourDetails from '../views/tour-details.vue';
import tourEdit from '../views/tour-edit.vue';
import about from '../views/about.vue';
import loginSignup from '../views/login-signup.vue';
import userProfile from '../views/user-profile.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'tour-app',
        component: tourApp,
    },
    {
        path: '/explore',
        name: 'tour-explore',
        component: tourExplore,
    },
    {
        path: '/explore/:country',
        name: 'tour-explore',
        component: tourExplore,
    },
    {
        path: '/login-signup',
        name: 'login-signup',
        component: loginSignup,
    },
    // {
    //     path: '/login-signup/:userId?',
    //     name: 'user-profile',
    //     component: userProfile,
    // },
    {
        path: '/edit/:tourId?',
        name: 'tour-edit',
        component: tourEdit,
    },
    {
        path: '/about',
        name: 'about',
        component: about,
    },
    {
        path: '/details/:tourId',
        name: 'tour-details',
        component: tourDetails,
    },
    {
        path: '/user-profile/:userId',
        name: 'tour-profile',
        component: userProfile,
    },
];

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes,
});

export default router;
