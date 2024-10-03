<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 z-50"></div>
  <div
    tabindex="-1"
    class="fixed inset-0 flex items-center justify-center z-50 w-full md:inset-0 h-[calc(100%-1rem)] max-h-screen">
    <div class="relative w-[36rem] max-h-full overflow-y-auto">
      <!-- Modal content -->
      <div class="bg-white">
        <div class="flex pt-4 px-4 items-center justify-between">
          <span class="font-medium text-lg">Şifrenizi mi unuttunuz?</span>
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
          <!-- Forgot Password Section -->
          <div class="flex-1 bg-white p-4 border border-gray-300">
            <div
              v-if="
                !forgotPasswordSuccessMessage || !forgotPasswordErrorMessage
              "
              class="text-center bg-slate-50 text-slate-600 border-slate-300 border rounded-md p-2 mb-4">
              Şifre sıfırlama emailinin gönderilmesi 10 dakikayı bulabilir.
              Lütfen spam klasörünü kontrol ediniz.
            </div>
            <div
              v-if="forgotPasswordSuccessMessage"
              class="text-center text-green-600 border border-green-400 rounded-md p-2">
              {{ forgotPasswordSuccessMessage }}
            </div>
            <div
              v-if="forgotPasswordErrorMessage"
              class="text-center text-red-600 border border-red-400 rounded-md p-2">
              {{ forgotPasswordErrorMessage }}
            </div>
            <form
              @submit.prevent="handleForgotPassword"
              class="mt-4"
              v-if="!emailSended">
              <div class="mb-4">
                <label class="block text-sm font-medium mb-2">Email*</label>
                <input
                  type="email"
                  v-model="forgotPasswordEmail"
                  class="w-full p-2 border border-gray-300 rounded"
                  required />
              </div>
              <button
                v-if="!isLoading"
                type="submit"
                class="w-full bg-quaternary text-white py-2">
                Şifre Yenileme Linki Gönder
              </button>
              <div v-else class="w-full bg-quaternary text-white py-2">
                <LoadingSpinner :text="'Mail Gönderiliyor'" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import LoadingSpinner from "./LoadingSpinner.vue";

const emits = defineEmits(["close"]);

const forgotPasswordEmail = ref(""); // Email for forgot password
const forgotPasswordSuccessMessage = ref(null);
const forgotPasswordErrorMessage = ref(null);
const emailSended = ref(false);
const isLoading = ref(false);

const handleForgotPassword = async () => {
  forgotPasswordSuccessMessage.value = null;
  forgotPasswordErrorMessage.value = null;
  isLoading.value = true;

  try {
    // Send password reset email
    await sendPasswordResetEmail(auth, forgotPasswordEmail.value);
    forgotPasswordErrorMessage.value = null;
    forgotPasswordSuccessMessage.value =
      "Şifre yenileme linki email adresinize gönderildi.";
    emailSended.value = true;
  } catch (error) {
    console.error("Error sending password reset email:", error);
    forgotPasswordSuccessMessage.value = null;
    forgotPasswordErrorMessage.value =
      "Bir hata oluştu. Lütfen tekrar deneyiniz.";
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped></style>
