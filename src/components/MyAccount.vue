<template>
  <div class="bg-white p-6 shadow-md">
    <h1 class="text-2xl font-semibold text-gray-800 mb-6">Hesabım</h1>

    <!-- Profile Form -->
    <form class="space-y-6">
      <div>
        <label class="block text-sm font-medium text-gray-700">İsim</label>
        <input
          type="name"
          v-model="userData.name"
          readonly
          class="mt-1 p-2 border border-gray-300 rounded w-full" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">E-posta</label>
        <input
        v-model="userData.email"
          type="email"
          class="mt-1 p-2 border border-gray-300 rounded w-full" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700"
          >Telefon Numarası</label
        >
        <input
          type="tel"
          v-model="userData.phone"
          class="mt-1 p-2 border border-gray-300 rounded w-full" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Şifre</label>
        <input
          type="password"
          placeholder="Şifrenizi değiştirmek istiyorsanız yeni şifrenizi girin ve kaydedin."
          class="mt-1 p-2 border border-gray-300 rounded w-full" />
      </div>
      <div class="flex justify-end">
        <button
          type="submit"
          class="bg-quaternary flex items-center border-2 border-quaternary text-white py-[0.5rem] px-4 hover:bg-white hover:text-primary hover:border-white hover:-translate-y-1 hover:translate-x-0.5 transition duration-300">
          Değişiklikleri Kaydet
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

const props = defineProps(["userData"]);

onMounted(() => {
  console.log("my account page mounted");
});
</script>
