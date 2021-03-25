<template>
  <section class="order-preview">
    {{ order.buyer.fullname }}
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
