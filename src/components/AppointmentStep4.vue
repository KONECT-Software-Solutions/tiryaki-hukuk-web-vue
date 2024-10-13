<template>
  <div
    class="mx-auto max-w-lg bg-white border border-gray-300 px-8 py-8 mb-4 space-y-3 relative">
    <div
      v-if="loaderOn"
      class="absolute inset-0 flex items-center justify-center bg-white bg-opacity-95">
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
        v-if="
          props.appointmentProcessData.in24Hours &&
          props.appointmentProcessData.paymentStatus === null
        "
        class="flex flex-col space-y-3 mt-2 items-center">
        <!-- Payment Instructions -->
        <div class="space-y-4 text-center">
          <MessageWrapper type="normal">
            Randevunuz 24 saat içinde olduğu için ödemenizi şuan yapmanız
            gerekmektedir.
          </MessageWrapper>
          <MessageWrapper type="normal">
            Ödemenizi aşağıdaki butona tıklayarak
            <span class="italic font-semibold">iyzico</span> güvencesi ile
            tamamlayabilirsiniz. Ödeme yapıldıktan sonra ödeme ve randevunuz ile
            alakalı size e-posta ile bilgilendirme maili gelecektir. test
          </MessageWrapper>
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
      <div
        v-else-if="
          !props.appointmentProcessData.in24Hours &&
          props.appointmentProcessData.paymentStatus !== 'success'
        "
        class="flex flex-col space-y-3 mt-2 items-center">
        <!-- Payment Instructions -->
        <div class="space-y-4 mb-2 text-center">
          <MessageWrapper type="normal">
            Şuan ödeme yapmak zorunda değilsiniz. Lütfen randevu tarihinden 24
            saat önce ödemenizi tamamlayınız.
          </MessageWrapper>
          <MessageWrapper type="normal">
            Ödemenizi sağ üst taraftaki Hesabım sekmesinden tamamlayabilirsiniz.
            Randevudan 24 saat önce ödeme yapılmaz ise randevu iptal olacaktır.
          </MessageWrapper>
        </div>

        <!-- Payment Action Button -->
        <button
          @click="handleContinue"
          class="bg-primary w-full text-white py-[1rem] px-4 flex justify-center">
          Devam Et
        </button>
      </div>
      <div
        v-if="
          props.appointmentProcessData.in24Hours &&
          props.appointmentProcessData.paymentStatus === 'success'
        "
        class="flex flex-col space-y-3 mt-2 items-center">
        <!-- Payment Instructions -->
        <div class="space-y-4 mb-2 text-center">
          <MessageWrapper type="success">
            Ödemeniniz başarı ile tamamlandı.
          </MessageWrapper>
          <MessageWrapper type="normal">
            Randevunuzu tamamlamak için lütfen devam ediniz.
          </MessageWrapper>
        </div>

        <!-- Payment Action Button -->
        <button
          @click="handleContinue"
          class="bg-primary w-full text-white py-[1rem] px-4 flex justify-center">
          Devam Et
        </button>
      </div>
      <div
        v-if="
          props.appointmentProcessData.in24Hours &&
          props.appointmentProcessData.paymentStatus === 'failure'
        "
        class="flex flex-col space-y-3 mt-2 items-center">
        <!-- Payment Instructions -->
        <div class="space-y-4 mb-2 text-center">
          <MessageWrapper type="error">
            Ödeme yapılırken bir hata oluştu.
          </MessageWrapper>
          <MessageWrapper type="normal">
            Tekrar denemek için lütfen aşağıdaki butona tıklayınız.
          </MessageWrapper>
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
  </div>
</template>

<script setup>
import { defineProps, defineEmits, onMounted, ref, computed } from "vue";
import LoadingSpinner from "./LoadingSpinner.vue";
import MessageWrapper from "../wrappers/MessageWrapper.vue";
import axios from "axios";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

const emits = defineEmits(["continueStep5", "notAuthenticated"]);
const props = defineProps(["appointmentProcessData"]);

const store = useStore();
const route = useRoute();

const loaderOn = ref(true);
const isAuthenticated = computed(() => store.getters.isAuthenticated);

const handleContinue = () => {
  emits("continueStep5");
};

const handleAuth = () => {
  emits("notAuthenticated");
};

const handlePayment = async () => {
  const appointment = props.appointmentProcessData;

  // convert appointment.userData.lastLoginAt timestamp to "2015-10-05 12:43:35" format
  // convert appointment.userData.createdAt timestamp to "2013-04-21 15:12:09" format

  const paymentData = {
    locale: "tr",
    conversationId: appointment.appointmentToken || "123456789",
    price: appointment.formData.price, // Use actual price
    paidPrice: appointment.formData.price * 1.2, // Example, adjust as needed
    currency: "TRY",
    basketId: "B67832",
    paymentGroup: "PRODUCT",
    callbackUrl: "http://127.0.0.1:5000/callback",
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
        price: appointment.formData.price,
      },
    ],
  };
  try {
    // Flask backend'ine istek gönderiyoruz
    const response_json = await axios.post(
      "http://localhost:5000/initialize-payment",
      paymentData
    );
    // convert str json response data to js object data
    const response = JSON.parse(response_json.data.iyzico_response);
    const paymentToken = response.token;
    console.log("get the payment token and setting it to vuex", paymentToken);
    store.commit("setAppointmentProcessData", { paymentToken });
    // Gelen yanıt ile İyzico ödeme formuna yönlendirme
    const paymentPageUrl = response.paymentPageUrl;
    if (paymentPageUrl) {
      window.location.href = `${paymentPageUrl}`;
    } else {
      console.log("response = ", response);
      console.log("Ödeme başlatılamadı.");
    }
  } catch (error) {
    console.error("Ödeme işlemi sırasında hata:", error);
  }
};

onMounted(() => {
  setTimeout(() => {
    loaderOn.value = false;
  }, 1500);

  if (isAuthenticated.value) {
    console.log("Authenticated");
    console.log("isAuthenticated.value = ", isAuthenticated.value);

    //check querry parameters for payment status and token
    const paymentToken_state = props.appointmentProcessData.paymentToken;
    const paymentStatus_state = props.appointmentProcessData.paymentStatus;

    if (!paymentStatus_state) {
      console.log("paymentStatus_state = ", paymentStatus_state);
      console.log("paymentToken_state = ", paymentToken_state);
      // check if payment status and token exists in the route query

      const paymentStatus = route.query.status;
      const paymentToken = route.query.token;
      // if payment status and token exists
      if (paymentStatus && paymentToken) {
        console.log("paymentStatus = ", paymentStatus);
        console.log("paymentToken = ", paymentToken);
        // if token equals to props.appointmentProcessData.paymentToken
        if (paymentToken === props.appointmentProcessData.paymentToken) {
          // if payment status equals to "success"
          if (paymentStatus === "success") {
            // set appointmentProcessData.status to "success"
            store.commit("setAppointmentProcessData", {
              paymentStatus: "success",
            });
          } else if (paymentStatus === "failure") {
            // if payment status equals to "failure"
            // set appointmentProcessData.status to "failure"
            store.commit("setAppointmentProcessData", {
              paymentStatus: "failure",
            });
          }
        }
      }
    }else{
      console.log("payment status and token already exists in state")
    }
  } else {
    console.log("Not Authenticated");
    handleAuth();
    console.log("isAuthenticated.value = ", isAuthenticated.value);
  }

  console.log("AppointmentStep5 mounted");
});
</script>

<style scoped>
/* Add any additional custom styling here */
/*
  const paymentData = {
    locale: "tr",
    conversationId: "123456789",
    price: "1",
    paidPrice: "1.2",
    currency: "TRY",
    basketId: "B67832",
    paymentGroup: "PRODUCT",
    callbackUrl: "http://127.0.0.1:5000/callback",
    enabledInstallments: ["2", "3", "6", "9"],
    buyer: {
      id: "BY789",
      name: "John",
      surname: "Doe",
      gsmNumber: "+905350000000",
      email: "email@email.com",
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
      contactName: "Jane Doe",
      city: "Istanbul",
      country: "Turkey",
      address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
      zipCode: "34732",
    },
    billingAddress: {
      contactName: "Jane Doe",
      city: "Istanbul",
      country: "Turkey",
      address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
      zipCode: "34732",
    },
    basketItems: [
      {
        id: "BI101",
        name: "Binocular",
        category1: "Collectibles",
        category2: "Accessories",
        itemType: "PHYSICAL",
        price: "0.3",
      },
      {
        id: "BI102",
        name: "Game code",
        category1: "Game",
        category2: "Online Game Items",
        itemType: "VIRTUAL",
        price: "0.5",
      },
      {
        id: "BI103",
        name: "Usb",
        category1: "Electronics",
        category2: "Usb / Cable",
        itemType: "PHYSICAL",
        price: "0.2",
      },
    ],
  };
*/
</style>
