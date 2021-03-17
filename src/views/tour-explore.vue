<template>
    <section class="tour-explore">
        fdgfdsf
        {{ tours }}
        <tour-list v-if="tours" :tours="tours"></tour-list>
    </section>
</template>

<script>
import tourList from '../cmps/tour-list';
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
        console.log('loading tours...');
        this.loadTours();
    },
    components: {
        tourList,
    },
};
</script>
