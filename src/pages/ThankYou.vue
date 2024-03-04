<script>
/**
 * Page-thankyou component
 */
export default {
  data() {
    return {};
  },
};
</script>
<template>
  <div class="container-fluid py-5">
    <div class="container">
      <h2 class="text-center py-3">Thank you for your order!</h2>
      <p class="text-center py-3">
        "We want to extend our heartfelt gratitude for choosing us. Your order
        has been received and is now being processed with care. At
        <img src="../assets/img/DELIVEBOO.svg" alt="logo" />, we strive to
        provide exceptional service, and your trust means the world to us. Rest
        assured, our team is diligently working to ensure that your order is
        handled promptly and accurately. If you have any questions or concerns,
        please don't hesitate to reach out to our customer support team. Once
        again, thank you for your order. We truly appreciate your business and
        look forward to serving you again in the future."
      </p>
      <div class="text-center py-3">
        <router-link :to="{ name: 'home' }" class="btn"
          >Back to Home</router-link
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../style/partials/variables" as *;
.container-fluid {
  background-color: $primary_green;
  min-height: 100vh;
}

h2 {
  font-size: 3rem;
  color: $primary_violet;
}

p {
  background-color: $primary_violet;
  color: white;
  padding: 1rem;
  border-radius: 25px;
  margin: 0;
  font-size: 1.5rem;
}
img {
  width: 100px;
}

.btn {
  background-color: $primary_violet;
  color: white;
}
</style>
