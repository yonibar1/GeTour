import Vue from 'vue';
import VueRouter from 'vue-router';
import tourApp from '../views/tour-app.vue';
import tourExplore from '../views/tour-explore.vue';
import tourDetails from '../views/tour-details.vue';
import tourEdit from '../views/tour-edit.vue';
import about from '../views/about.vue';

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
        path: '/:tourId',
        name: 'tour-details',
        component: tourDetails,
    },
    {
        path: '/:tourId?',
        name: 'tour-edit',
        component: tourEdit,
    },
    {
        path: '/about',
        name: 'about',
        component: about,
    },
];

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes,
});

export default router;
