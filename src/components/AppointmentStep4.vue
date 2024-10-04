<template>
  <div
    class="mx-auto max-w-lg bg-white border border-gray-300 p-4 mb-4 space-y-3 relative">
    <div
      v-if="isCreatingMeeting && userData"
      class="absolute inset-0 flex items-center justify-center bg-white bg-opacity-95">
      <LoadingSpinner :text="'Randevu oluşturuluyor'" />
    </div>

    <div v-if="in24Hours">
      <!-- Payment Section (when in24Hours is true) -->
      <div class="flex flex-col items-center text-center">
        <div
          class="flex bg-white items-center justify-center rounded-full h-32 w-32 shrink-0">
          <svg
            class="w-28 h-28 text-tertiary"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24">
            <path
              d="M11.0049 2L18.3032 4.28071C18.7206 4.41117 19.0049 4.79781 19.0049 5.23519V7H21.0049C21.5572 7 22.0049 7.44772 22.0049 8V16C22.0049 16.5523 21.5572 17 21.0049 17L17.7848 17.0011C17.3982 17.5108 16.9276 17.9618 16.3849 18.3318L11.0049 22L5.62486 18.3318C3.98563 17.2141 3.00488 15.3584 3.00488 13.3744V5.23519C3.00488 4.79781 3.28913 4.41117 3.70661 4.28071L11.0049 2ZM11.0049 4.094L5.00488 5.97V13.3744C5.00488 14.6193 5.58406 15.7884 6.56329 16.5428L6.75154 16.6793L11.0049 19.579L14.7869 17H10.0049C9.4526 17 9.00488 16.5523 9.00488 16V8C9.00488 7.44772 9.4526 7 10.0049 7H17.0049V5.97L11.0049 4.094ZM11.0049 12V15H20.0049V12H11.0049ZM11.0049 10H20.0049V9H11.0049V10Z"></path>
          </svg>
        </div>
        <p class="text-lg border-b mb-3 border-gray-300 p-2 font-medium">
          Randevunuz 24 saat içinde olduğu için ödemenizi şuan yapmanız
          gerekmektedir.
        </p>

        <div
          class="px-1 text-lg w-full flex flex-col text-wrap md:text-nowrap items-center">
          <span>Toplam Tutar: <span class="font-semibold">XX TL</span></span>
        </div>
      </div>
      <div class="flex flex-col space-y-3 mt-2 items-center">
        <!-- Payment Instructions -->
        <div class="space-y-3 text-center">
          <div
            class="text-center text-sm md:text-base border bg-slate-50 text-slate-600 border-slate-300 rounded-md p-2">
            <p>
              Ödemenizi aşağıdaki butona tıklayarak
              <span class="italic font-semibold">iyzico</span> güvencesi ile
              tamamlayabilirsiniz. Ödeme yapıldıktan sonra ödeme ve randevunuz
              ile alakalı size e-posta ile bilgilendirme maili gelecektir.
            </p>
          </div>
        </div>

        <!-- Payment Action Button -->
        <button
          @click="handlePayment"
          type="submit"
          class="bg-[#6a994e] w-full text-white py-[1rem] px-4 flex justify-center">
          <img
            src="../assets/icons/iyzico_ile_ode_horizontal_white.svg"
            class="w-36"
            alt="iyzico-ile-ode" />
        </button>
      </div>
    </div>

    <div v-else>
      <!-- Payment Section (when in24Hours is true) -->
      <div class="flex flex-col items-center text-center space-y-2">
        <div
          class="flex bg-white items-center justify-center rounded-full h-32 w-32 shrink-0">
          <svg
            class="w-28 h-28 text-tertiary"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24">
            <path
              d="M11.0049 2L18.3032 4.28071C18.7206 4.41117 19.0049 4.79781 19.0049 5.23519V7H21.0049C21.5572 7 22.0049 7.44772 22.0049 8V16C22.0049 16.5523 21.5572 17 21.0049 17L17.7848 17.0011C17.3982 17.5108 16.9276 17.9618 16.3849 18.3318L11.0049 22L5.62486 18.3318C3.98563 17.2141 3.00488 15.3584 3.00488 13.3744V5.23519C3.00488 4.79781 3.28913 4.41117 3.70661 4.28071L11.0049 2ZM11.0049 4.094L5.00488 5.97V13.3744C5.00488 14.6193 5.58406 15.7884 6.56329 16.5428L6.75154 16.6793L11.0049 19.579L14.7869 17H10.0049C9.4526 17 9.00488 16.5523 9.00488 16V8C9.00488 7.44772 9.4526 7 10.0049 7H17.0049V5.97L11.0049 4.094ZM11.0049 12V15H20.0049V12H11.0049ZM11.0049 10H20.0049V9H11.0049V10Z"></path>
          </svg>
        </div>
        <p class="text-lg border-b mb-3 border-gray-300 p-2 font-medium">
          Şuan ödeme yapmak zorunda değilsiniz. Lütfen randevu tarihinden 24 saat önce ödemenizi tamamlayınız.
        </p>

        <div
          class="px-1 text-lg w-full flex flex-col text-wrap md:text-nowrap items-center">
          <span>Toplam Tutar: <span class="font-semibold">XX TL</span></span>
        </div>
      </div>
      <div class="flex flex-col space-y-3 mt-2 items-center">
        <!-- Payment Instructions -->
        <div class="space-y-3 text-center">
          <div
            class="text-center text-sm md:text-base border bg-slate-50 text-slate-600 border-slate-300 rounded-md p-2">
            <p>Ödemenizi sağ üst taraftaki Hesabım sekmesinden tamamlayabilirsiniz. Randevudan 24 saat önce ödeme yapılmaz ise randevu iptal olacaktır.</p>
          </div>
        </div>

        <!-- Payment Action Button -->
        <button
            @click="handleContinue"
            class="bg-primary w-full text-white py-[0.5rem] px-4">
            Devam Et
          </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, onMounted } from "vue";
import LoadingSpinner from "./LoadingSpinner.vue";

const emits = defineEmits(["continueStep5"]);
const props = defineProps(["in24Hours"]);

const handleContinue = () => {
  emits("continueStep5");
};

const handlePayment = () => {
  // Handle payment logic here
  console.log("Payment initiated");

};

onMounted(() => {
  console.log("in24Hours", props.in24Hours);
});
</script>

<style scoped>
/* Add any additional custom styling here */
</style>
