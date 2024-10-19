<template>
  <button
    @click="goToHomeAndScroll('attorneys-section')"
    class="bg-quaternary flex items-center border border-quaternary text-white py-[0.7rem] px-5 hover:bg-white hover:text-primary hover:border-black hover:-translate-y-1 hover:translate-x-0.5 transition duration-300">
    <i class="ri-live-line pr-2 text-xl"></i>
    <span>Online Danışmanlık Al</span>
  </button>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) {
    // Get the top position of the section relative to the document
    const sectionPosition = section.getBoundingClientRect().top + window.pageYOffset;    

    // Scroll to the adjusted position
    window.scrollTo({
      top: sectionPosition - 100,
      behavior: 'smooth',
    });
  }
};
const goToHomeAndScroll = (sectionId) => {
  if (route.path === "/") {
    // If already on the home page, directly scroll
    scrollToSection(sectionId);
  } else {
    router.push({ path: "/", query: { section: sectionId } });
  }
};
</script>
