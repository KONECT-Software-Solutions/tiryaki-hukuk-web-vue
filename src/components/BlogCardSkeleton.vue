<template>
  <div
    class="mx-auto border border-gray-200 bg-white pb-4 w-full overflow-hidden flex flex-col">
    <!-- Title Section -->
    <div class="p-4 h-16 w-full">
      <div class="h-6 animate-pulse bg-gray-200 rounded"></div>
    </div>
    <!-- Image Section -->
    <div class="relative flex-grow-0">
      <div class="h-64 animate-pulse bg-gray-200 rounded mb-4"></div>
      <!-- Date Badge -->
      <div
        class="absolute flex items-center bottom-0 left-4 bg-gray-400 text-white px-4 py-2 text-center h-12 lg:h-10">
        <div
          class="text-3xl w-8 lg:text-xl font-bold border-r border-white pr-4 h-full flex items-center"></div>
        <div
          class="flex pl-4 w-10 animate-pulse flex-col items-center justify-center h-full">
          <div class="text-sm lg:text-xs"></div>
          <div class="text-sm lg:text-xs"></div>
        </div>
      </div>
    </div>
    <!-- Description Section -->
    <div class="pt-4 px-4 flex-grow flex flex-col justify-between">
      <div class="h-6 bg-gray-200 animate-pulse rounded mb-2"></div>
      <div class="h-6 bg-gray-200 animate-pulse rounded mb-2"></div>
      <div class="h-6 bg-gray-200 animate-pulse rounded mb-2"></div>
      <!-- Button -->
      <div class="h-6 w-16 bg-gray-200 animate-pulse rounded mb-2"></div>
    </div>
  </div>
</template>
