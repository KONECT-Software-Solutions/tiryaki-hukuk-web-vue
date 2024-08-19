<template>
  <div>
    <!-- HERO SECTION START -->
    <section class="relative hero-bg bg-cover bg-center h-[30vh] md:h-[50vh]">
      <div class="absolute inset-0 bg-black opacity-30"></div>
      <div
        class="relative container mx-auto md:px-16 px-8 py-12 flex flex-col items-center justify-end h-full">
        <h1 class="text-white text-4xl lg:text-5xl font-[700] mb-4">
          Hizmetlerimiz
        </h1>
      </div>
    </section>
    <!-- HERO SECTION END -->

    <!-- MAIN CONTENT START -->
    <div class="container mx-auto md:py-[7em] py-[4em] md:px-12 px-4">
      <ServicesGrid />
     
      <div>
        
      </div>
    </div>

    <!-- MAIN CONTENT END -->
  </div>
</template>

<script setup>

import ServicesGrid from '../components/ServicesGrid.vue';
</script>

<style scoped>
.hero-bg {
  background-image: url("../assets/images/services-page-bg.webp");
}


</style>
