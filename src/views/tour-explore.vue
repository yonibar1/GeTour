<template>
    <section class="tour-explore">
        <tour-filter />
        <tour-list v-if="tours" :tours="tours"></tour-list>
    </section>
</template>

<script>
import tourList from '../cmps/tour-list';
import tourFilter from '../cmps/tour-filter';
export default {
    data() {
        return {
            tours: [],
        };
    },
    methods: {
        async loadTours() {
            const tours = await this.$store.dispatch({ type: 'query' });
            this.tours = tours;
        },
    },
    created() {
        this.loadTours();
    },
    components: {
        tourList,
        tourFilter,
    },
};
</script>
