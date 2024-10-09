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
            class="max-w-[300px] md:max-w-[200px] lg:max-w-[330px] h-auto"
            alt="iyzico" />
        </div>
      </div>
      <div v-if="in24Hours" class="flex flex-col space-y-3 mt-2 items-center">
        <!-- Payment Instructions -->
        <div class="space-y-3 text-center">
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
      <div v-else class="flex flex-col space-y-3 mt-2 items-center">
        <!-- Payment Instructions -->
        <div class="space-y-4 text-center">
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
          class="bg-quaternary flex w-full justify-center items-center border border-quaternary text-white py-[0.7rem] px-5 hover:bg-white hover:text-primary hover:border-black hover:scale-105 transition duration-300">
          Devam Et
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, onMounted, ref } from "vue";
import LoadingSpinner from "./LoadingSpinner.vue";
import MessageWrapper from "../wrappers/MessageWrapper.vue";
import axios from "axios";

const emits = defineEmits(["continueStep5"]);
const props = defineProps(["in24Hours"]);
const loaderOn = ref(true);

const handleContinue = () => {
  emits("continueStep5");
};

const handlePayment = async () => {
  const paymentData = {
    locale: "tr",
    conversationId: "123456789",
    price: "1",
    paidPrice: "1.2",
    currency: "TRY",
    basketId: "B67832",
    paymentGroup: "PRODUCT",
    callbackUrl: "https://tiryakihukuk.com/test",
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

  try {
    // Flask backend'ine istek gönderiyoruz
    const response_json = await axios.post(
      "http://localhost:5000/initialize-payment",
      paymentData
    );
    // convert str json response data to js object data
    const response = JSON.parse(response_json.data.iyzico_response);

    // const token = response.token;
    // Gelen yanıt ile İyzico ödeme formuna yönlendirme
    const paymentPageUrl = response.paymentPageUrl;
    if (paymentPageUrl) {
      window.location.href = `${paymentPageUrl}`;
    } else {
      console.log(data);
      console.log("Ödeme başlatılamadı.");
    }
  } catch (error) {
    console.error("Ödeme işlemi sırasında hata:", error);
  }
};

const retrievePaymentResult = async (token) => {
  const request_data = {
    locale: "tr",
    conversationId: "123456789",
    token: token,  // Make sure you pass the token dynamically
  };

  try {
    const response_json = await axios.post(
      "http://127.0.0.1:5000/retrieve-payment-result",
      request_data,  // Send the request data as a POST body
      {
        headers: {
          'Content-Type': 'application/json',  // Ensure the Content-Type is set
        },
      }
    );
    const response = JSON.parse(response_json.data.payment_result);
    console.log("retrieve payment result", response);
  } catch (error) {
    console.error("Ödeme sonucu alınamadı:", error);
  }
};

onMounted(() => {

  console.log("in24Hours", props.in24Hours);
  setTimeout(() => {
    loaderOn.value = false;
  }, 1500);

  // When the user is redirected back to the callback URL, get the token from the query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");

  if (token) {
    // Call the function to retrieve the payment result
    retrievePaymentResult(token);
  } else {
    console.error("Token not found in the URL");
  }
});
</script>

<style scoped>
/* Add any additional custom styling here */
</style>
