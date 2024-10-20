<template>
  <div class="bg-white p-6 shadow-md relative">
    <div
      v-if="isLoading"
      class="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-65">
      <LoadingSpinner :text="''" />
    </div>
    <h1 class="text-2xl font-semibold text-gray-800 mb-6">Hesabım</h1>
    <div class="mb-4">
      <MessageWrapper v-if="forgotPasswordSuccessMessage" type="success">
        {{ forgotPasswordSuccessMessage }}
      </MessageWrapper>
      <MessageWrapper v-if="forgotPasswordErrorMessage" type="error">
        {{ forgotPasswordErrorMessage }}
      </MessageWrapper>
    </div>

    <!-- Profile Form -->
    <div class="space-y-6">
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
          readonly
          class="mt-1 p-2 border border-gray-300 rounded w-full" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700"
          >Telefon Numarası</label
        >
        <input
          type="tel"
          readonly
          v-model="userData.phone"
          class="mt-1 p-2 border border-gray-300 rounded w-full" />
      </div>
      <div class="flex justify-end">
        <button
          @click="handlePasswordChange(userData.email)"
          class="bg-quaternary flex items-center border-2 border-quaternary text-white py-[0.5rem] px-4 hover:-translate-y-1 hover:translate-x-0.5 transition duration-300">
          Şifre Değiştir
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import LoadingSpinner from "./LoadingSpinner.vue";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import MessageWrapper from "../wrappers/MessageWrapper.vue";

const props = defineProps(["userData"]);
const isLoading = ref(false);
const forgotPasswordSuccessMessage = ref(null);
const forgotPasswordErrorMessage = ref(null);

const handlePasswordChange = async (email) => {
  forgotPasswordSuccessMessage.value = null;
  forgotPasswordErrorMessage.value = null;
  isLoading.value = true;

  try {
    // Send password reset email
    const response = await sendPasswordResetEmail(auth, email);

    console.log("Password reset email sent:", response);
    forgotPasswordSuccessMessage.value =
      "Şifre yenileme linki email adresinize gönderildi. Mailin size ulaşması 10 dakikayı bulabilir. Lütfen spam klasörünü kontrol ediniz.";
  } catch (error) {
    console.error("Error sending password reset email:", error);
    forgotPasswordErrorMessage.value =
      "Bir hata oluştu. Lütfen tekrar deneyiniz.";
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  console.log("my account page mounted");
});
</script>
