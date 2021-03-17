<template>
  <section class="tour-preview">
    {{ tour.title }}
    {{ tour.price }}
    {{ tour.byUser.fullname }}
  </section>
</template>

<script>
export default {
  props: {
    tour: {
      type: Object,
    },
  },
};
</script>

<style>
</style>