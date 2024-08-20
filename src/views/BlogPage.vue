<template>
  <div>
    <!-- HERO SECTION START -->
    <section class="relative hero-bg bg-cover bg-center h-[30vh] md:h-[50vh]" style="background-attachment: fixed;">
      <div class="absolute inset-0 bg-black opacity-30"></div>
      <div
        class="relative container mx-auto md:px-16 px-8 py-12 flex flex-col items-center justify-end h-full">
        <h1 class="text-white text-4xl lg:text-5xl font-[700] mb-4">Blog</h1>
      </div>
    </section>
    <!-- HERO SECTION END -->
    
    <!-- CATEGORY PICKER START -->
    <div class="w-full border-b border-gray-200 text-center">
      <div
        class="flex justify-center h-16 mx-auto overflow-x-auto md:overflow-visible">
        <div
          v-for="category in categories"
          :key="category"
          @click="selectCategory(category)"
          :class="[
            'cursor-pointer flex-shrink-0 transition-colors duration-500 flex items-center text-sm md:text-base ease-in-out px-2 md:px-8 hover:bg-neutral-100 hover:text-black',
            selectedCategory === category
              ? ' text-base md:text-lg text-slate-800 border-b-2 border-quaternary'
              : 'text-slate-500',
          ]">
          {{ category }}
        </div>
      </div>
    </div>
    <!-- CATEGORY PICKER END -->

    <!-- MAIN CONTENT START -->

    <BlogsGallery :selectedCategory="selectedCategory" :showMoreButton="true" :initialBlogCount="6" class="py-16 md:py-24 px-4 md:px-20 lg:px-32 2xl:px-60"/>
    <!-- MAIN CONTENT END -->
  </div>
</template>

<script setup>
import { ref } from "vue";
import BlogsGallery from "../components/BlogsGallery.vue";

// Categories and selected category
const categories = ref([
  "Tüm Yazılar",
  "Blog Yazısı",
  "Haberler",
  "Hukuk",
  "Son Dakika",
]);
const selectedCategory = ref(categories.value[0]);

const selectCategory = (category) => {
  selectedCategory.value = category;
};

</script>

<style scoped>
.hero-bg {
  background-image: url("../assets/images/blog-page-bg.webp");
  background-size: cover;
  background-position: center;
  background-attachment: fixed; 
}
.cursor-pointer {
  cursor: pointer;
}
</style>
