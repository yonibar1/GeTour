<template>
    <section class="tour-app">
        <tour-filter />
        Categories:
        <ul>
            <li><router-link>Europe</router-link></li>
            <li><router-link>Asia</router-link></li>
            <li><router-link>Australia</router-link></li>
            <li><router-link>USA</router-link></li>
        </ul>
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
