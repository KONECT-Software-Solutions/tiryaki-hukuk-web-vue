<template>
  <div>
    <section class="relative bg-cover bg-center h-20 md:h-28">
      <div class="absolute inset-0 bg-[rgb(34,40,49)]"></div>
    </section>

    <div class="flex min-h-screen px-0 md:px-20 lg:px-32 2xl:px-60 bg-gray-100">
      <!-- Side Menu -->

      <!-- Main Content -->
      <main class="flex-1 px-4">
        <div
          v-if="loading"
          class="flex flex-col animate-pulse items-center space-y-2 my-8 justify-center">
          <div class="bg-gray-300 p-4 h-16 border border-gray-300 w-full"></div>
          <div class="bg-gray-300 p-4 h-36 border border-gray-300 w-full"></div>
          <div class="bg-gray-300 p-4 h-36 border border-gray-300 w-full"></div>
          <div class="bg-gray-300 p-4 h-36 border border-gray-300 w-full"></div>
          <div class="bg-gray-300 p-4 h-36 border border-gray-300 w-full"></div>
        </div>
        <div v-else class="p-2 my-8">
            <PaymentForm :id="id" />

        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import PaymentForm from "../components/PaymentForm.vue";
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const loading = ref(true);

const id = ref(router.currentRoute.value.params.id);

onMounted(() => {
    setTimeout(() => {
        loading.value = false;
    }, 500);
});
</script>
