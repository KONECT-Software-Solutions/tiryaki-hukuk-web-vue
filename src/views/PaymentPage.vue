<template>
  <div>
    <section class="relative bg-cover bg-center h-20 md:h-28">
      <div class="absolute inset-0 bg-[rgb(34,40,49)]"></div>
    </section>

    <div class="flex min-h-screen px-0 md:px-20 lg:px-32 2xl:px-60 bg-gray-100">
      <!-- Side Menu -->

      <!-- Main Content -->
      <main class="flex-1 px-4 my-auto">
        <div
          class="mx-auto max-w-lg bg-white border border-gray-300 px-8 py-8 mb-4 space-y-3 relative">
          <div
            v-if="isLoading"
            class="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-95">
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
              v-if="paymentStatus === null"
              class="flex flex-col space-y-3 mt-2 items-strech">
              <!-- Payment Instructions -->
              <div class="space-y-4 text-center w-full">
                <MessageWrapper type="normal">
                  Randevunuzun iptal olmaması için randevudan 24 saat önce
                  ödemeyi tamamlamanız gerekmektedir.
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
              v-if="paymentStatus === 'success'"
              class="flex flex-col space-y-3 mt-2 items-strech">
              <!-- Payment Instructions -->
              <div class="space-y-4 mb-2 text-center w-full">
                <MessageWrapper type="success">
                  Ödemeniniz başarı ile tamamlandı.
                </MessageWrapper>
                <MessageWrapper type="normal">
                  Randevularınızı görmek için aşşağıdaki butona tıklayınız.
                </MessageWrapper>

                <!-- Payment Action Button -->

                <!-- Payment Action Button -->

                <router-link :to="'/hesabim'">
                  <button
                    class="bg-tertiary w-full mt-4 text-white py-[0.7rem] px-4">
                    Randevularım
                  </button>
                </router-link>
              </div>
            </div>
            <div
              v-if="paymentStatus === 'failure'"
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
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import axios from "axios";
import MessageWrapper from "../wrappers/MessageWrapper.vue";
import LoadingSpinner from "../components/LoadingSpinner.vue";

const router = useRouter();
const route = useRoute();
const store = useStore();

const isLoading = ref(true);
const paymentStatus = ref(null);
const meetingData = ref(null);

// get id from router
const meetingId = route.params.id;

const fetchMeetingById = async (id) => {
  try {
    const meetingDocRef = doc(db, "meetings", id);
    const meetingDoc = await getDoc(meetingDocRef);
    if (meetingDoc.exists()) {
      const data = meetingDoc.data();
      return data;
    }
  } catch (error) {
    console.error("Error fetching meeting by ID:", error);
  }
};
const updateMeetingPaymentToken = async (id, paymentToken) => {
  try {
    const meetingDocRef = doc(db, "meetings", id);
    await updateDoc(meetingDocRef, { payment_token: paymentToken });
    console.log(`Updated payment token for meeting ${id}`);
  } catch (error) {
    console.error("Error updating payment token:", error);
  }
};

const updateMeetingPaymentStatus = async (id, paymentStatus, status) => {
  try {
    const meetingDocRef = doc(db, "meetings", id);
    await updateDoc(meetingDocRef, {
      payment_status: paymentStatus,
      status: status,
    });
    console.log(`Updated payment status and status for meeting ${id}`);
  } catch (error) {
    console.error("Error updating payment status and status:", error);
  }
};

const initializePayment = async () => {
  isLoading.value = true;
  console.log(meetingData.value);
  const paymentData = {
    locale: "tr",
    conversationId: meetingData.value.appointment_token || "123456789",
    price: meetingData.value.price,
    paidPrice: meetingData.value.price * 1.2, // Adjust logic as needed
    currency: "TRY",
    basketId: "B67832",
    paymentGroup: "PRODUCT",
    callbackUrl: `http://127.0.0.1:5000/callback?source=randevu-ode&id=${meetingId}`,
    enabledInstallments: ["2", "3", "6", "9"],
    buyer: {
      id: meetingData.value.customer_id || "BY789",
      name: meetingData.value.customer_name || "John Doe",
      surname: "Doe",
      gsmNumber: meetingData.value.customer_phone || "+905350000000",
      email: meetingData.value.customer_email || "email@email.com",
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
      contactName: meetingData.value.customer_name || "John Doe",
      city: "Istanbul",
      country: "Turkey",
      address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
      zipCode: "34732",
    },
    billingAddress: {
      contactName: meetingData.value.customer_name || "John Doe",
      city: "Istanbul",
      country: "Turkey",
      address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
      zipCode: "34732",
    },
    basketItems: [
      {
        id: meetingData.value.attorney_id || "BI101",
        name: "Legal Services",
        category1: meetingData.value.category,
        category2: meetingData.value.type,
        itemType: "VIRTUAL",
        price: meetingData.value.price,
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
    console.log("Payment token received:", paymentToken);

    await updateMeetingPaymentToken(meetingId, paymentToken);

    if (response.paymentPageUrl) {
      window.location.href = response.paymentPageUrl;
    } else {
      console.log("Payment failed:", response);
      isLoading.value = false;
    }
  } catch (error) {
    console.error("Error processing payment:", error);
    isLoading.value = false;
    alert("Ödeme sayfasına yönlendirilirken bir hata oluştu.");
  }
};

onMounted(async () => {
  const data = await fetchMeetingById(meetingId);
  meetingData.value = data;
  console.log("meeting data fetched", meetingData.value);

  const paymentStatusQuery = route.query.status;
  const paymentTokenQuery = route.query.token;

  // Check if this is a first-time payment attempt or returning from gateway
  if (
    meetingData.value.payment_token === null &&
    meetingData.value.payment_status === "0"
  ) {
    // First time visiting, no query expected
    console.log("First time payment initiation.");
  } else {
    // Returning from payment gateway, query params should exist
    if (paymentStatusQuery && paymentTokenQuery) {
      console.log("Returning from payment gateway.");
      if (paymentTokenQuery === meetingData.value.payment_token) {
        console.log("Tokens match. Finalizing payment.");
        paymentStatus.value = paymentStatusQuery;

        // Update payment status in Firestore
        if (paymentStatusQuery === "success") {
          await updateMeetingPaymentStatus(meetingId, "1", "1"); // Assuming "2" means paid
        }
      } else {
        console.log("Token mismatch.");
        alert("Invalid payment URL.");
        router.push("/hesabim"); // Example action: redirect to retry payment
      }
    } else {
      console.log("Expected query params not found.");
      alert("Ödeme tamamlanmadı. Tekrar deneyin");
    }
  }
  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
});
</script>
