<template>
  <div>
    <!-- HERO SECTION START -->
    <!-- :style="{ backgroundImage: `url(${blog.image})` }" -->
    <section
      class="relative hero-bg bg-secondary bg-cover bg-center h-[60vh] md:h-[60vh]">
      <div class="absolute inset-0 bg-black opacity-65"></div>
      <div
        v-if="!loading"
        class="relative container px-4 md:px-20 lg:px-32 2xl:px-60 py-2 flex flex-col items-start justify-end h-full">
        <div
          class="flex items-center bg-tertiary text-white px-4 py-2 text-center h-14 mb-3">
          <div
            class="text-4xl font-bold border-r border-white pr-4 h-full flex items-center">
            {{ blog.day }}
          </div>
          <div class="flex pl-4 flex-col items-center justify-center h-full">
            <div class="">{{ blog.year }}</div>
            <div class="">{{ blog.month }}</div>
          </div>
        </div>
        <h1 class="text-white text-4xl font-[500] mb-4">
          {{ blog.title }}
        </h1>
        <p class="text-slate-200 text-lg mb-8">
          {{ blog.description }}
        </p>
      </div>
    </section>
    <!-- HERO SECTION END -->

    <!-- MAIN CONTENT START -->
    <div>
      <div v-if="loading">
        <div class="animate-pulse">
          <div class="h-10 bg-gray-200 rounded mb-4"></div>
          <div class="h-64 bg-gray-200 rounded mb-4"></div>
          <div class="h-6 bg-gray-200 rounded mb-2"></div>
          <div class="h-6 bg-gray-200 rounded mb-2"></div>
          <div class="h-6 bg-gray-200 rounded mb-2"></div>
        </div>
      </div>
      <div v-else-if="blog" class="bg-gray-50">
        <div
          class="mx-auto px-4 container md:px-12 py-10 md:py-16 lg:py-24 flex flex-col justify-center lg:items-start lg:flex-row">
          <!-- Left Section -->
          <div class="max-w-3xl lg:pr-10">
            <img :src="blog.image" alt="Blog Image" class="w-full mb-6" />

            <div
              class="text-slate-700 border-b mb-8 blog-content"
              v-html="blog.content"></div>
            <div></div>
            <h1 class="text-2xl mb-4">Yorum Yap</h1>
            <div class="flex-1">
              <form class="bg-gray-100 p-10 rounded">
                <div class="mb-4">
                  <input
                    type="name"
                    placeholder="İsim"
                    class="w-full px-3 py-2 border border-gray-300 rounded" />
                </div>
                <div class="mb-4">
                  <input
                    type="surname"
                    placeholder="Soy İsim"
                    class="w-full px-3 py-2 border border-gray-300 rounded" />
                </div>
                <div class="mb-4">
                  <input
                    type="email"
                    placeholder="Email"
                    class="w-full px-3 py-2 border border-gray-300 rounded" />
                </div>
                <div class="mb-4">
                  <textarea
                    placeholder="Yorum"
                    class="w-full px-3 py-2 border border-gray-300 h-48 rounded"></textarea>
                </div>
                <div class="flex justify-end">
                  <button
                    type="submit"
                    class="bg-primary text-white py-[0.5rem] px-4">
                    Gönder
                  </button>
                </div>
              </form>
            </div>
          </div>

          <!-- Right Sidebar -->
          <div class="lg:w-auto">
            <!-- Categories -->
            <div class="mt-6 lg:mt-0">
              <h4 class="text-lg font-semibold mb-3">Kategoriler</h4>
              <ul class="text-gray-600 text-[15px]">
                <li
                  v-for="category in categories"
                  :key="category"
                  class="mb-2 flex items-center pb-2 justify-between border-b border-gray-200 hover:translate-x-4 hover:font-semibold transition duration-300">
                  <router-link :to="'/blog'">
                    <span>{{ category }}</span></router-link
                  ><i class="ri-arrow-right-s-line"></i>
                </li>
              </ul>
            </div>

            <!-- Recent Posts -->
            <div class="mb-6 mt-6">
              <h4 class="text-lg font-semibold mb-3">Son Blog Yazılarımız</h4>
              <ul>
                <li class="mb-4 flex">
                  <img
                    src="../assets/images/blog-card-image.png"
                    alt="Recent Post 1"
                    class="w-16 h-16 mr-4" />
                  <div>
                    <a href="#" class="hover:underline">Geçmiş Blog Yazısı 1</a>
                    <p class="text-sm text-gray-600">Oct. 18, 2019</p>
                  </div>
                </li>
                <li class="mb-4 flex">
                  <img
                    src="../assets/images/blog-card-image.png"
                    alt="Recent Post 2"
                    class="w-16 h-16 mr-4" />
                  <div>
                    <a href="#" class="hover:underline">Geçmiş Blog Yazısı 2</a>
                    <p class="text-sm text-gray-600">Oct. 18, 2019</p>
                  </div>
                </li>
                <li class="mb-4 flex">
                  <img
                    src="../assets/images/blog-card-image.png"
                    alt="Recent Post 3"
                    class="w-16 h-16 mr-4" />
                  <div>
                    <a href="#" class="hover:underline">Geçmiş Blog Yazısı 3</a>
                    <p class="text-sm text-gray-600">Oct. 18, 2019</p>
                  </div>
                </li>
              </ul>
            </div>

            <!-- Tags -->
            <div class="mb-6">
              <h4 class="text-lg font-semibold mb-3">Etiketler</h4>
              <div class="flex flex-wrap uppercase text-[11px]">
                <span
                  v-for="(tag, index) in blog.tags"
                  :key="index"
                  class="border border-gray-300 hover:border-black rounded-md text-black px-3 py-1 mr-2 mb-2 transition-colors duration-300 ease-in-out"
                  >{{ tag }}</span
                >
              </div>
            </div>
            <!-- Blog Yazısını Paylaş -->
            <div class="mb-6">
              <h4 class="text-lg font-semibold mb-3">Blog Yazısını Paylaş</h4>
              <div class="flex space-x-4">
                <a href="#" aria-label="Twitter">
                  <div
                    class="bg-tertiary rounded-full w-8 h-8 flex items-center text-white justify-center hover:scale-150 transition duration-300">
                    <i class="ri-twitter-fill text-xl"></i>
                  </div>
                </a>
                <a href="#" aria-label="Facebook">
                  <div
                    class="bg-tertiary rounded-full w-8 h-8 flex items-center text-white justify-center hover:scale-150 transition duration-300">
                    <i class="ri-facebook-fill text-xl"></i>
                  </div>
                </a>
                <a href="#" aria-label="Linkedin">
                  <div
                    class="bg-tertiary rounded-full w-8 h-8 flex items-center text-white justify-center hover:scale-150 transition duration-300">
                    <i class="ri-linkedin-fill text-xl"></i>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center py-16">
        <h2 class="text-2xl font-semibold mb-4">Blog not found</h2>
        <p class="text-lg mb-8">
          Aradığınız blog yazısı bulunamadı. Tüm blog yazılarımızı incelemek
          için aşağıdaki butona tıklayabilirsiniz.
        </p>
        <router-link
          to="/blog"
          class="bg-brown-500 text-white px-4 py-2 rounded self-start mt-4">
          Blog Yazılarına Git
        </router-link>
      </div>
    </div>

    <!-- MAIN CONTENT END -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUpdated } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const route = useRoute();
const store = useStore();
const blogId = route.params.id;
const loading = ref(true);

const blog = computed(() => store.getters.getBlogById(blogId));

const categories = ref([
  "Tüm Yazılar",
  "Blog Yazısı",
  "Haberler",
  "Hukuk",
  "Son Dakika",
]);

onMounted(async () => {
  if (!blog.value) {
    await store.dispatch("fetchBlogById", blogId);
    console.log("Blog fetched", blog.value.content);
  }
  loading.value = false;
  const { slug, id } = route.params;
  console.log(slug, id);
});
</script>

<style scoped>
.hero-bg {
  background-image: url("../assets/images/blog-page-bg.jpg");
}

.cursor-pointer {
  cursor: pointer;
}
.blog-content :deep(h1) {
  font-size: 2.5rem;
  font-weight: 600;
}

.blog-content :deep(h2) {
  font-size: 2rem;
  font-weight: 500;
}

.blog-content :deep(h3) {
  font-size: 1.75rem;
  font-weight: 500;
}

.blog-content :deep(h4) {
  font-size: 1.5rem;
  font-weight: 500;
}

.blog-content :deep(h5) {
  font-size: 1.25rem;
  font-weight: 500;
}

.blog-content :deep(h6) {
  font-size: 1rem;
  font-weight: 500;
}

.blog-content :deep(p) {
  line-height: 1.6;
}

.blog-content :deep(strong) {
  font-weight: bold;
}

.blog-content :deep(em) {
  font-style: italic;
}

.blog-content :deep(u) {
  text-decoration: underline;
}

.blog-content :deep(blockquote) {
  border-left: 4px solid #ccc;
  padding-left: 1rem;
  color: #666;
  margin: 1.5rem 0;
  font-style: italic;
}

.blog-content :deep(a) {
  color: #3490dc;
  text-decoration: underline;
}

.blog-content :deep(a:hover) {
  color: #1d68a7;
}

.blog-content :deep(ol) {
  list-style-type: decimal;
  margin: 1rem 0;
  padding-left: 1.5rem;
}

.blog-content :deep(ul) {
  list-style-type: disc;
  margin: 1rem 0;
  padding-left: 1.5rem;
}

.blog-content :deep(li) {
  margin-bottom: 0.5rem;
}

.blog-content :deep(.ql-align-right) {
  text-align: right;
}

.blog-content :deep(.ql-align-center) {
  text-align: center;
}

.blog-content :deep(.ql-align-justify) {
  text-align: justify;
}
</style>
