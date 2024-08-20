<template>
  <div>
    <!-- HERO SECTION START -->
    <section class="relative hero-bg bg-cover bg-center h-screen" style="background-attachment: fixed;">      <div class="absolute inset-0 bg-black opacity-50"></div>
      <div
        class="relative px-8 md:px-20 lg:px-32 2xl:px-60 py-12 flex flex-col items-start justify-center h-full">
        <h2 class="text-white text-lg font-bold mb-2">
          TIRYAKI HUKUK & ARABULUCULUK'A HOŞ GELDİNİZ
        </h2>
        <h1 class="text-white text-4xl lg:text-5xl font-bold mb-4">
          Bizim için önemli olan:
          <span class="text-white">
            <span v-for="(char, index) in displayText" :key="index">{{
              char
            }}</span
            >|
          </span>
        </h1>
        <p class="text-white text-base md:text-lg lg:text-xl mb-8">
          Geniş hizmet yelpazemiz ve uzman kadromuz ile hukuki sorunlarınızda
          yanınızdayız.
        </p>
        <div
          class="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-2 justify-center">
          <button
            @click="scrollToSection('services-section')"
            class="bg-white flex items-center text-primary border-2 border-white py-[0.5rem] px-4 hover:bg-quaternary hover:text-white hover:border-quaternary hover:-translate-y-1 hover:translate-x-0.5 transition duration-300">
            <i class="ri-global-line pr-2 text-xl"></i>
            <span>Çalışma Alanlarımız</span>
          </button>
          <button
            @click="scrollToSection('attorneys-section')"
            class="bg-quaternary flex items-center border-2 border-quaternary text-white py-[0.5rem] px-4 hover:bg-white hover:text-primary hover:border-white hover:-translate-y-1 hover:translate-x-0.5 transition duration-300">
            <i class="ri-live-line pr-2 text-xl"></i>
            <span>Online Danışmanlık Al</span>
          </button>
        </div>
      </div>
    </section>
    <!-- HERO SECTION END -->

    <!-- MAIN CONTENT START -->
    <!-- MAIN CONTENT START -->
    <div
      class="flex flex-col space-y-10 md:space-y-20 py-28 px-4 md:px-20 lg:px-32 2xl:px-60 bg-gray-50">
      <WelcomeHome />
      <div id="services-section">
        <ServicesHome />
      </div>
      <HowToHome />
      <div id="attorneys-section">
        <h2 class="text-center text-3xl font-semibold md:mb-8">
          Avukatlarımız
        </h2>
        <AttorneyAppointmentCard />
      </div>
      <FAQHome />
      <div>
        <h2 class="text-center text-3xl font-semibold mb-8">
          Son Blog Yazılarımız
        </h2>
        <BlogsGallery
          :selectedCategory="'Tüm Yazılar'"
          :showMoreButton="false"
          :initialBlogCount="6" />
        <div class="text-center mt-4">
          <button
            @click="router.push('/blog')"
            class="bg-tertiary text-white px-4 py-2 self-start">
            Tüm Blog Yazılarını Görüntüle
          </button>
        </div>
      </div>
    </div>
    <!-- MAIN CONTENT END -->
    <!-- MAIN CONTENT END -->
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { nextTick } from "vue";

import AttorneyAppointmentCard from "../components/AttorneyAppointmentCard.vue";
import BlogsGallery from "../components/BlogsGallery.vue";
import FAQHome from "../components/FAQHome.vue";
import HowToHome from "../components/HowToHome.vue";
import ServicesHome from "../components/ServicesHome.vue";
import WelcomeHome from "../components/WelcomeHome.vue";

import { useRouter } from "vue-router";
import { useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) {
    console.log("scrolling to section id", sectionId);
    section.scrollIntoView({ behavior: "smooth" });
  } else {
    console.log("section not found", sectionId);
  }
};

const texts = [
  "Haklarınız.",
  "Özgürlüğünüz.",
  "Adaletiniz.",
  "Güvenliğiniz",
  "Geleceğiniz.",
];
const displayText = ref("");

const typeWriterEffect = async () => {
  while (true) {
    for (const text of texts) {
      for (let i = 0; i <= text.length; i++) {
        displayText.value = text.substring(0, i);
        await new Promise((resolve) => setTimeout(resolve, 150));
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
      for (let i = text.length; i >= 0; i--) {
        displayText.value = text.substring(0, i);
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }
};
// Watch for route changes to trigger scrolling

onMounted(() => {
  typeWriterEffect();
  if (route.query.section) {
    nextTick(() => {

      setTimeout(() => {
        scrollToSection(route.query.section);
      }, 500);
    });
  }
});
</script>

<style scoped>
.hero-bg {
  background-image: url("../assets/images/main-page-bg.webp");
  background-size: cover;
  background-position: center;
  background-attachment: fixed; 
}
</style>
