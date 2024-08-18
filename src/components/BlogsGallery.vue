<template>
  <div class="w-full">
    <div
      v-if="filteredBlogs.length > 0"
      key="blogs"
      :class="gridClass"
      class="relative">
      <!-- I will try this later <div class="absolute h-2/5 w-full bottom-0 bg-gradient-to-t from-white to-transparent z-50"></div>-->
      <div
        v-for="(columnBlogs, index) in splitBlogs(visibleBlogs, columnCount)"
        :key="index"
        class="flex flex-col gap-4">
        <div v-for="blog in columnBlogs" :key="blog.id">
          <BlogCard :blog="blog" />
        </div>
      </div>
    </div>
    <div v-else>
      <div key="blogs" class="grid grid-cols-3 gap-4">
        <div
          v-for="(columnBlogs, index) in [
            [{ a: 1 }, { a: 1 }, { a: 1 }],
            [{ a: 1 }, { a: 1 }, { a: 1 }],
            [{ a: 1 }, { a: 1 }],
          ]"
          :key="index"
          class="flex flex-col gap-4">
          <div v-for="blog in columnBlogs" :key="blog.id">
            <BlogCardSkeleton />
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="filteredBlogs.length > visibleCount && showMoreButton"
      class="text-center mt-4">
      <button
        @click="visibleCount += 3"
        class="bg-tertiary text-white px-4 py-2 self-start">
        Daha Fazla Blog Göster
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useStore } from "vuex";
import BlogCard from "../components/BlogCard.vue";
import BlogCardSkeleton from "../components/BlogCardSkeleton.vue";

const props = defineProps([
  "selectedCategory",
  "initialBlogCount",
  "showMoreButton",
]);

const visibleCount = ref(props.initialBlogCount);
const visibleBlogs = computed(() => {
  return filteredBlogs.value.slice(0, visibleCount.value);
});

// Setup Vuex store
const store = useStore();
const blogsData = computed(() => store.state.blogs);

// Filtered blogs based on selected category
const filteredBlogs = computed(() => {
  if (props.selectedCategory === "Tüm Yazılar") {
    return blogsData.value;
  }
  return blogsData.value.filter(
    (blog) => blog.category === props.selectedCategory
  );
});

// Function to split blogs into columns dynamically
const splitBlogs = (blogs, columns) => {
  const result = [];
  for (let i = 0; i < columns; i++) {
    result.push([]);
  }
  blogs.forEach((blog, index) => {
    result[index % columns].push(blog);
  });
  return result;
};

// Dynamic column count based on screen size
const columnCount = ref(3);

const updateColumnCount = () => {
  const width = window.innerWidth;
  if (width < 768) {
    columnCount.value = 1;
  } else if (width < 1024) {
    columnCount.value = 2;
  } else if (width >= 1024) {
    columnCount.value = 3;
  }
};

// Computed property to get the grid class
const gridClass = computed(() => {
  return `grid grid-cols-${columnCount.value} gap-4`;
});

onMounted(async () => {
  await store.dispatch("fetchBlogs");

  updateColumnCount();
  window.addEventListener("resize", updateColumnCount);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateColumnCount);
});
</script>
