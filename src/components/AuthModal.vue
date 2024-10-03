<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 z-50"></div>
  <div
    tabindex="-1"
    class="fixed inset-0 flex items-center justify-center z-50 w-full md:inset-0 h-[calc(100%-1rem)] max-h-screen">
    <div class="relative w-[36rem] max-h-full overflow-y-auto">
      <!-- Modal content -->
      <div class="bg-white">
        <div class="flex pt-4 px-4 items-center justify-between">
          <span class="font-medium text-lg">Giriş Yap</span>
          <button
            type="button"
            @click="$emit('close')"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              fill="none"
              viewBox="0 0 14 14">
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <div class="p-3">
          <Auth @signedIn="$emit('close')" @forgotPw="handleForgotPw" />
        </div>
  
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import Auth from "./Auth.vue";

const emits = defineEmits(["close", "forgotPw"]);

const handleForgotPw = () => {
  emits("close");
  emits("forgotPw");
};
</script>

<style scoped></style>
