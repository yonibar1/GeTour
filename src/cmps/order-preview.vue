<template>
  <section class="order-preview">
    <h3>Tour: {{ order.tour.title }}</h3>
    <p>Status: {{ order.status }}</p>
    <p>Request: {{ order.requests }}</p>
  </section>
</template>

<script>
export default {
  props: {
    order: {
      type: Object,
    },
  },
};
</script>
