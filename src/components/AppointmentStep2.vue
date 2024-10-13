<template>
  <ForgotPwModal v-if="showForgotPwModal" @close="showForgotPwModal = false" />
  <div class="flex flex-col items-center justify-center mx-auto max-w-xl">
    <div class="bg-white p-4 border border-gray-300 mb-4 w-full relative">
      <div>
        <div
          class="text-center bg-slate-50 text-slate-600 border border-slate-300 rounded-md p-2 mb-4">
          Randevunuz henüz
          <span class="font-semibold">onaylanmadı</span>. Onaylamak için lütfen
          giriş yapınız.
        </div>
        <div
          v-if="isCheckingAuth"
          class="absolute inset-0 flex items-center justify-center bg-white bg-opacity-65">
          <LoadingSpinner />
        </div>
        <Auth @signedIn="handleSignIn" @forgotPw="showForgotPwModal = true" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Auth from "./Auth.vue";
import ForgotPwModal from "./ForgotPwModal.vue";
import LoadingSpinner from "./LoadingSpinner.vue";
import { onMounted, ref, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const emits = defineEmits(["continueStep3"]);

const showForgotPwModal = ref(false);

const isCheckingAuth = ref(true); // Add state for checking auth status

const isAuthenticated = computed(() => store.getters.isAuthenticated);
const userData = computed(() => store.getters.getUser);

const handleSignIn = async () => {
  console.log("User signed in");
  emits("continueStep3", userData.value);
};

onMounted(() => {
  console.log("AppointmentStep2 mounted");
  if (isAuthenticated.value) {
    setTimeout(() => {
      isCheckingAuth.value = false;
      emits("continueStep3", userData.value);
    }, 1000);
  } else {
    setTimeout(() => {
      isCheckingAuth.value = false;
    }, 1000);
  }
  // wait 1 second to check auth status
});
</script>
