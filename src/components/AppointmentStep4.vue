<template>
  <div
    class="mx-auto max-w-lg bg-white border border-gray-300 px-8 py-8 mb-4 space-y-3 relative">
    <div
      v-if="isLoading"
      class="absolute inset-0 flex items-center z-10 justify-center bg-white bg-opacity-95">
      <LoadingSpinner :text="''" />
    </div>

    <div>
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
        <div class="py-[1rem] mx-auto flex justify-center w-full">
          <img
            src="../assets/icons/logo_band_colored.svg"
            class="max-w-[300px] min-w-[250px] h-auto"
            alt="iyzico" />
        </div>
      </div>
      <div
        v-if="isPaymentRequired && !isPaymentFinalized"
        class="flex flex-col space-y-3 mt-2 items-strech">
        <!-- Payment Instructions -->
        <div class="space-y-4 text-center w-full">
          <MessageWrapper type="normal">
            Randevunuz 24 saat içinde olduğu için ödemeyi şimdi yapmanız
            gerekmektedir.
          </MessageWrapper>
          <MessageWrapper type="normal">
            Ödemenizi aşağıdaki butona tıklayarak
            <span class="italic font-semibold">iyzico</span> üzerinden
            yapabilirsiniz.
          </MessageWrapper>
          <!-- Payment Action Button -->
          <button
            @click="initializePayment"
            type="submit"
            class="flex items-center justify-center w-full space-x-3 px-6 py-4 bg-gradient-to-r from-green-400 to-lime-400 text-white shadow-md hover:shadow-lg hover:from-green-500 hover:to-lime-500 transition-all duration-300 ease-in-out transform">
            <img
              src="../assets/icons/iyzico_ile_ode_horizontal_white.svg"
              class="w-36"
              alt="iyzico-ile-ode" />
          </button>
        </div>
      </div>
      <div
        v-else-if="!isPaymentRequired"
        class="flex flex-col space-y-3 mt-2 items-strech">
        <!-- Payment Instructions -->
        <div class="space-y-4 mb-2 text-center w-full">
          <MessageWrapper type="normal">
            Şuan ödeme yapmak zorunda değilsiniz. Lütfen randevu tarihinden 24
            saat önce ödemenizi tamamlayınız.
          </MessageWrapper>
          <MessageWrapper type="normal">
            Ödemenizi sağ üst taraftaki Hesabım sekmesinden tamamlayabilirsiniz.
            Randevudan 24 saat önce ödeme yapılmaz ise randevu iptal olacaktır.
          </MessageWrapper>

          <!-- Payment Action Button -->
          <button
            @click="handleContinue"
            class="bg-tertiary w-full mt-4 text-white py-[0.7rem] px-4">
            Devam Et
          </button>
        </div>
      </div>
      <div
        v-if="
          isPaymentRequired && paymentStatus === 'success' && isPaymentFinalized
        "
        class="flex flex-col space-y-3 mt-2 items-strech">
        <!-- Payment Instructions -->
        <div class="space-y-4 mb-2 text-center w-full">
          <MessageWrapper type="success">
            Ödemeniniz başarı ile tamamlandı.
          </MessageWrapper>
          <MessageWrapper type="normal">
            Randevunuzu tamamlamak için lütfen devam ediniz.
          </MessageWrapper>

          <!-- Payment Action Button -->
          <button
            @click="handleContinue"
            class="bg-tertiary w-full mt-4 text-white py-[0.7rem] px-4">
            Devam Et
          </button>
        </div>
      </div>
      <div
        v-if="
          isPaymentRequired && paymentStatus === 'failure' && isPaymentFinalized
        "
        class="flex flex-col space-y-4 mt-2 items-strech">
        <!-- Payment Instructions -->
        <div class="space-y-4 text-center w-full">
          <MessageWrapper type="error">
            Ödeme yapılırken bir hata oluştu.
          </MessageWrapper>
          <MessageWrapper type="normal">
            Tekrar denemek için lütfen aşağıdaki butona tıklayınız.
          </MessageWrapper>
          <button
            @click="initializePayment"
            type="submit"
            class="flex items-center justify-center w-full space-x-3 px-6 py-4 bg-gradient-to-r from-green-400 to-lime-400 text-white shadow-md hover:shadow-lg hover:from-green-500 hover:to-lime-500 transition-all duration-300 ease-in-out transform">
            <img
              src="../assets/icons/iyzico_ile_ode_horizontal_white.svg"
              class="w-36"
              alt="iyzico-ile-ode" />
          </button>
        </div>

        <!-- Payment Action Button -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, onMounted, ref, computed } from "vue";
import LoadingSpinner from "./LoadingSpinner.vue";
import MessageWrapper from "../wrappers/MessageWrapper.vue";
import axios from "axios";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

const emits = defineEmits(["continueStep5", "notAuthenticated"]);
const props = defineProps(["appointmentProcessData"]);

const store = useStore();
const route = useRoute();
const router = useRouter();

const isLoading = ref(true);
const isAuthenticated = computed(() => store.getters.isAuthenticated);

const isPaymentRequired = computed(
  () => props.appointmentProcessData.in24Hours
);
const paymentStatus = computed(
  () => props.appointmentProcessData.paymentStatus
);
const paymentToken = computed(() => props.appointmentProcessData.paymentToken);
const isPaymentFinalized = ref(false);

const handleContinue = () => {
  emits("continueStep5");
};

const handleAuth = () => {
  emits("notAuthenticated");
};

const initializePayment = async () => {
  isLoading.value = true; // Start loading

  const appointment = props.appointmentProcessData;

  const paymentData = {
    locale: "tr",
    conversationId: appointment.appointmentToken || "123456789",
    price: 1, // Use actual price
    paidPrice: appointment.formData.price * 1.2, // Example, adjust as needed
    currency: "TRY",
    basketId: "B67832",
    paymentGroup: "PRODUCT",
    callbackUrl: "http://127.0.0.1:5000/callback?source=randevu-olustur",
    enabledInstallments: ["2", "3", "6", "9"],
    buyer: {
      id: appointment.userData.uid || "BY789", // Use actual user data
      name: "John",
      surname: "Doe",
      gsmNumber: "+905350000000",
      email: appointment.userData.email || "email@email.com",
      identityNumber: "74300864791",
      lastLoginDate: "2015-10-05 12:43:35",
      registrationDate: "2013-04-21 15:12:09",
      registrationAddress: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
      ip: "85.34.78.112",
      city: "Istanbul",
      country: "Turkey",
      zipCode: "34732",
    },
    shippingAddress: {
      contactName: "John Doe",
      city: "Istanbul",
      country: "Turkey",
      address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
      zipCode: "34732",
    },
    billingAddress: {
      contactName: "John Doe",
      city: "Istanbul",
      country: "Turkey",
      address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
      zipCode: "34732",
    },
    basketItems: [
      {
        id: appointment.attorneyData.id || "BI101",
        name: "Legal Services",
        category1: appointment.formData.selectedArea,
        category2: appointment.formData.selectedType,
        itemType: "VIRTUAL",
        price: 1,
      },
    ],
  };

  try {
    const response_json = await axios.post(
      "http://localhost:5000/initialize-payment",
      paymentData
    );
    const response = JSON.parse(response_json.data.iyzico_response);

    const paymentToken = response.token;
    store.commit("setAppointmentProcessData", { paymentToken });

    const paymentPageUrl = response.paymentPageUrl;
    if (paymentPageUrl) {
      setTimeout(() => {
        window.location.href = `${paymentPageUrl}`;
      }, 1000);
    } else {
      console.log("Ödeme başlatılamadı.", response);
      isLoading.value = false;
    }
  } catch (error) {
    console.error("Ödeme işlemi sırasında hata:", error);
    isLoading.value = false;
    alert("Ödeme sayfasına yönlendirilirken bir hata oluştu.");
  }
};

onMounted(() => {
  if (!isAuthenticated.value) {
    handleAuth(); // Emit event if user is not authenticated
  }

  const paymentStatusQuery = route.query.status;
  const paymentTokenQuery = route.query.token;

  if (paymentToken.value === null && paymentStatus.value === null) {
    // First time visiting the payment page; no queries expected.
    console.log("First time payment initiation.");
  } else {
    // Payment was already initiated, we expect query params.
    if (paymentStatusQuery && paymentTokenQuery) {
      console.log("Returning from payment gateway.");
      // Validate token match
      if (paymentTokenQuery === paymentToken.value) {
        console.log("Tokens match. Payment finalized.");
        isPaymentFinalized.value = true;
        // Update the payment status in Vuex
        store.commit("setAppointmentProcessData", {
          paymentStatus: paymentStatusQuery,
        });
      } else {
        console.log("Tokens don't match. Possible tampered URL.");
        alert("Yanlış URL ile geldiniz. Lütfen tekrar deneyiniz.");
        // Optionally, redirect the user to the beginning of the process
        router.push("/error-page");
      }
    } else {
      // If no query params are found but we expect them, handle the error.
      console.log("Expected query parameters not found.");
      alert(
        "Bu sayfayı yalnızca ödeme sisteminden gelen URL ile görüntüleyebilirsiniz. "
      );
      // Optionally, log this error and take further action (e.g., restart payment process)
      router.push("/"); // Example action: redirect to retry payment
    }
  }
  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
});
</script>
