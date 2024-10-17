<template>
  <div
    class="mx-auto max-w-xl border border-gray-200 bg-white pb-4 overflow-hidden flex flex-col">
    <!-- Title Section -->

    <!-- Image Section -->
    <div class="relative flex-grow-0">
      <img :src="blog.image" alt="Meeting Image" loading="lazy" class="w-full" />
      <!-- Date Badge -->
      <div
        class="absolute flex items-center bottom-0 left-4 bg-tertiary text-white px-4 py-2 text-center h-12 lg:h-10">
        <div
          class="text-3xl lg:text-xl font-bold border-r border-white pr-4 h-full flex items-center">
          {{ blog.day }}
        </div>
        <div class="flex pl-4 flex-col items-center justify-center h-full">
          <div class="text-sm lg:text-xs">{{ blog.year }}</div>
          <div class="text-sm lg:text-xs">{{ blog.month }}</div>
        </div>
      </div>
    </div>
    <!-- Description Section -->
    <div class="pt-4 px-4 flex-grow flex flex-col justify-between">
      <h2 class="text-lg text-slate-800 font-semibold mb-2">
        {{ blog.title }}
      </h2>
      <p class="text-slate-500 mb-4 leading-7 flex-grow">
        {{ blog.description }}
      </p>
      <!-- Button -->
      <router-link
        :to="'/blog/' + blog.slug + '/' + blog.id"
        class="bg-tertiary text-white px-4 py-2 self-start">
        Daha Fazla
      </router-link>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  blog: Object,
});
</script>
