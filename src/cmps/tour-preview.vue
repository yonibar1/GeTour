<template>
    <section class="tour-preview">
        <h2>{{ tour.title }}</h2>
        <h3>{{ tour.byUser.fullname }}</h3>
        <h4>{{ tour.daysCount }} Days</h4>
        <h4>{{ tour.members }} Members</h4>
        <h3>{{ tour.price }} $</h3>
        {{ tour.rate }}
        <router-link :to="'/tour-details/' + tour._id">Details</router-link> |
        <router-link to="/edit">Edit</router-link> |
    </section>
</template>

<script>
export default {
    props: {
        tour: {
            type: Object,
        },
    },
    created() {},
};
</script>
