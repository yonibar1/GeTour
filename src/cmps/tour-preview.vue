<template>
    <section class="tour-preview">
        <h2>{{ tour.title }}</h2>
        <h3>{{ tour.byUser.fullname }}</h3>
        <h4>{{ tour.daysCount }} Days</h4>
        <h4>{{ tour.members }} Members</h4>
        <h3>{{ tour.price }} $</h3>
        {{ tour.rate }}
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
