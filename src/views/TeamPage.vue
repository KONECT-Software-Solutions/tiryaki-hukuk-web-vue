<template>
  <div>
    <!-- HERO SECTION START -->
    <section class="relative hero-bg bg-cover bg-center h-[30vh] md:h-[50vh]" style="background-attachment: fixed;">
      <div class="absolute inset-0 bg-black opacity-30"></div>
      <div
        class="relative container mx-auto md:px-16 px-8 py-12 flex flex-col items-center justify-end h-full">
        <h1 class="text-white text-4xl lg:text-5xl font-[700] mb-4">
          Ekibimiz
        </h1>
      </div>
    </section>
    <!-- HERO SECTION END -->

    <div class="my-16 px-4 md:my-24">
      <AttorneyProfileCard />
    </div>
    <!-- MAIN CONTENT START -->

    <!-- MAIN CONTENT END -->
  </div>
</template>

<script setup>
import AttorneyProfileCard from "../components/AttorneyProfileCard.vue";
</script>

<style scoped>
.hero-bg {
  background-image: url("../assets/images/team-page-bg.webp");
  background-size: cover;
  background-position: center;
  background-attachment: fixed; 
}
</style>
