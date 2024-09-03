<template>
  <!-- Cancel Modal-->
  <div v-if="showCancelModal">
    <div class="fixed inset-0 bg-black bg-opacity-50 z-50"></div>
    <div
      tabindex="-1"
      class="fixed inset-0 flex items-center justify-center z-50 w-full md:inset-0 h-[calc(100%-1rem)] max-h-screen">
      <div class="relative p-4 w-[36rem] max-h-full overflow-y-auto">
        <!-- Modal content -->
        <div class="bg-white">
          
          <div class="flex p-4 items-center justify-between">
            <span class="font-medium text-lg">Randevuyu iptal et.</span>
            <button
              type="button"
              @click="showCancelModal = false"
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
          <div>
            <p class="p-4  text-slate-900">
              Randevuyu iptal etmek istediğinizden emin misiniz? Bu işlem geri
              alınamaz.
            </p>
          </div>
          <div class="flex items-center py-4 pr-12 justify-end space-x-3">
            <button
              @click="cancel(meetingId)"
              class="px-4 py-1 border bg-slate-100 text-slate-700 hover:bg-slate-700 hover:text-slate-100 transition duration-300">
              <LoadingSpinner
                v-if="showLoadingSpinner"
                :text="' Randevu İptal Ediliyor'" />
              <div v-if="!showLoadingSpinner">Evet</div>
            </button>
            <button
              v-if="!showLoadingSpinner"
              @click="showCancelModal = false"
              class="px-4 py-1 border bg-quaternary text-white hover:bg-white hover:text-quaternary transition duration-30000">
              Hayır
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-white md:p-6 shadow-md">
    <h1 class="text-2xl font-semibold p-2 text-gray-800 mb-2 md:mb-6">
      Randevularım
    </h1>
    <div
      v-if="loading"
      class="flex flex-col animate-pulse items-center space-y-2 justify-center">
      <div class="bg-gray-300 p-4 h-36 border border-gray-300 w-full"></div>
      <div class="bg-gray-300 p-4 h-36 border border-gray-300 w-full"></div>
      <div class="bg-gray-300 p-4 h-36 border border-gray-300 w-full"></div>
      <div class="bg-gray-300 p-4 h-36 border border-gray-300 w-full"></div>
    </div>
    <div v-else class="space-y-4">
      <div
        v-if="meetingsData.length > 0"
        v-for="meeting in meetingsData"
        :key="meeting.id"
        class="p-4 border bg-gray-50 hover:shadow-lg hover:border-gray-300">
        <div class="flex flex-col md:flex-row justify-between">
          <div class="space-y-1">
            <h2 class="text-lg font-medium">{{ meeting.attorney_name }}</h2>
            <div class="flex text-nowrap items-center">
              {{ meeting.date_for_display }}
              <span class="ml-2">{{ meeting.day }}</span>
              <span
                class="flex items-center text-nowrap bg-yellow-100 rounded-xl px-2 text-sm">
                <i class="ri-time-fill mr-1 text-lg"></i>{{ meeting.slot }} -
                {{ meeting.end_time || "..." }}</span
              >
            </div>
            <div class="flex items-center">
              <i class="text-xl mr-1" :class="iconClass(meeting.type)"></i>
              <p>{{ displayText(meeting.type) }}</p>
            </div>
          </div>
          <div class="md:text-right text-slate-800 space-y-1">
            <p class="text-lg font-medium">
              {{ getStatusText(meeting.status) }}
            </p>
            <p>{{ meeting.price }} TL</p>
            <p
              :class="[
                meeting.is_paid === true,
                'text-green-500 font-medium',
                meeting.is_paid === false,
                'text-red-500 font-medium',
              ]">
              {{ meeting.is_paid === true ? "Ödendi" : "Ödenmedi" }}
            </p>
          </div>
        </div>
        <div class="mt-4 flex justify-end space-x-2">
          <button
            @click="
              showCancelModal = true;
              meetingId = meeting.id;
            "
            class="px-4 py-1 border bg-slate-100 text-slate-700 hover:bg-slate-700 hover:text-slate-100 transition duration-300">
            İptal Et
          </button>
          <router-link
            :to="'/odeme/' + meeting.id"
            class="px-4 py-1 border bg-quaternary text-white hover:bg-white hover:text-quaternary transition duration-30000">
            Öde
          </router-link>
        </div>
      </div>
      <div v-if="noMeeting">
        <p>Henüz randevunuz bulunmamaktadır.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import LoadingSpinner from "../components/LoadingSpinner.vue";
import axios from "axios";
import { useRouter } from "vue-router";

const props = defineProps({
  meetingsData: Array,
  loading: Boolean,
  noMeeting: Boolean,
});

const emits = defineEmits(["cancel", "pay"]);

const router = useRouter();

const showCancelModal = ref(false);
const showLoadingSpinner = ref(false);
const meetingId = ref(null);

const getStatusText = (status) => {
  switch (status) {
    case "0":
      return "Randevu İsteği Yollandı";
    case "1":
      return "Randevu Kabul Edildi";
    case "2":
      return "Görüşme Tamamlandı";
    case "3":
      return "Randevu Reddedildi";
    case "4":
      return "Müşteri Onayı Bekleniyor";
    case "5":
      return "Avukat Onayı Bekleniyor";
    case "6":
      return "Randevu İptal Edildi";
    default:
      return "Unknown Status";
  }
};

const iconClass = (type) => {
  switch (type) {
    case "video":
      return "ri-video-on-line";
    case "phone":
      return "ri-phone-line";
    case "inPerson":
      return "ri-user-line";
    // Add more cases as needed
    default:
      return "ri-question-line"; // Default icon
  }
};

const displayText = (type) => {
  switch (type) {
    case "video":
      return "Online Video Görüşme";
    case "phone":
      return "Telefonla Görüşme";
    case "inPerson":
      return "Yüz Yüze Görüşme";
    // Add more cases as needed
    default:
      return "Belirtilmemiş"; // Default text
  }
};

const cancel = (id) => {
  showLoadingSpinner.value = true;
  console.log("emitting Cancel appointment");
  emits("cancel", id);
  setTimeout(() => {
    showLoadingSpinner.value = false;
    showCancelModal.value = false;
  }, 2000);
};

const pay = (id) => {
  console.log("Pay appointment", id);
  // go to payment page with router
  router.push(`/odeme/${id}`);
};

onMounted(() => {});
</script>
