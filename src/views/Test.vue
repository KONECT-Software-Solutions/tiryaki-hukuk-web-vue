<template>
  <div class="kvkk-content">
    <section class="relative bg-cover bg-center h-20 md:h-28">
      <div class="absolute inset-0 bg-[rgb(34,40,49)]"></div>
    </section>

    <div
      class="flex min-h-screen px-4 py-6 md:px-16 lg:px-32 2xl:px-60 md:py-24 bg-gray-100">
      <!-- Side Menu -->
      <AppointmentStep4 :in24Hours="true" class="mt-10"></AppointmentStep4>


    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import AppointmentStep4 from "../components/AppointmentStep4.vue";
</script>

<style scoped>
.kvkk-content {
  line-height: 1.7;
  font-size: 1rem;
  color: #333;
}
.kvkk-content h1,
.kvkk-content h2 {
  color: #2c3e50;
}
.kvkk-content ul {
  padding-left: 20px;
}
.kvkk-content p {
  margin-bottom: 1rem;
}
</style>
