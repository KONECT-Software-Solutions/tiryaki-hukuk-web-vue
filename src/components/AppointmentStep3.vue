<template>
  <div
    class="flex flex-col space-y-4 items-start md:space-y-0 md:flex-row mx-auto md:max-w-4xl">
    <div class="flex flex-col md:mr-4 space-y-3">
      <div class="bg-white p-4 border h-min border-gray-300">
        <div class="flex my-2">
          <div>
            <img
              :src="`/assets/images/${appointmentProcessData.attorneyData.id}.webp`"
              alt="Profile Image"
              class="md:w-44 object-cover" />
          </div>
          <div class="flex flex-col justify-start max-w-xl">
            <div class="flex justify-between ml-2 items-start">
              <div>
                <h2 class="text-lg text-nowrap md:text-xl font-semibold">
                  {{ appointmentProcessData.attorneyData.name }}<span> / </span>
                  <span class="text-gray-600 font-normal text-base md:text-lg"
                    >Avukat</span
                  >
                </h2>
              </div>
            </div>

            <div class="mt-2 space-y-1 text-sm md:text-base text-gray-600">
              <div class="flex items-center space-x-2">
                <i class="fas fa-globe"></i>
                <span
                  >{{ appointmentProcessData.attorneyData.experience }} + Yıllık
                  Tecrübe</span
                >
              </div>
              <div class="flex items-center space-x-2">
                <i class="fas fa-university"></i>
                <span>{{
                  appointmentProcessData.attorneyData.university
                }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="flex items-center">
          <i class="text-2xl mr-2" :class="selectedOption.icon"></i>
          <p class="px-1">{{ selectedOption.text }}</p>
        </div>
        <div class="flex items-center">
          <i class="ri-price-tag-3-line mr-2 text-2xl"></i>
          <span>{{ appointmentProcessData.formData.price }} TL</span>
        </div>
        <div class="flex items-center mb-2">
          <i class="ri-calendar-line mr-2 text-2xl"></i>
          <div class="px-1 flex text-wrap md:text-nowrap items-center">
            {{ appointmentProcessData.selectedDateForDisplay }}
            <span class="ml-1"> {{ appointmentProcessData.selectedDay }}</span>
            <span
              class="flex ml-2 items-center text-nowrap bg-yellow-100 rounded-xl px-2 text-sm">
              <i class="ri-time-fill mr-1 text-lg"></i
              >{{ appointmentProcessData.selectedSlot }} -
              {{ appointmentProcessData.formData.endTime }}</span
            >
          </div>
        </div>
      </div>
      <div class="bg-white p-4 border border-gray-300">
        <label
          for="documents"
          class="block mb-2 text-sm font-semibold text-gray-900"
          >Görüşme Evrakları</label
        >
        <div v-if="uploadedFiles.length != 0" class="flex flex-col space-y-2">
          <div
            v-for="(file, index) in uploadedFiles"
            :key="file.name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="flex flex-col items-center justify-center mr-4">
                  <i class="ri-file-fill text-3xl"></i>
                  <p class="text-sm text-gray-500">
                    {{ formatSize(file.size) }}
                  </p>
                </div>
                <div>
                  <p class="break-word">{{ formatName(file.name) }}</p>
                </div>
              </div>

              <button
                @click="removeFile(index)"
                class="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-200 rounded-lg focus:outline-none">
                <svg
                  class="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    fill-rule="evenodd"
                    d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                    clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div
          v-else
          class="text-center text-sm md:text-base border bg-slate-50 text-slate-600 border-slate-300 rounded-md p-2">
          <p class="text-sm font-normal">Herhangi bir evrak eklenmedi.</p>
        </div>
        <MessageWrapper v-else type="normal">
          Herhangi bir evrak eklenmedi.
        </MessageWrapper>
      </div>
    </div>
    <div
      class="flex flex-col items-center bg-white p-4 border border-gray-300 justify-center mx-auto max-w-xl">
      <div class="flex flex-col space-y-3 justify-center max-w-xl">
        <MessageWrapper type="normal">
          Görüşmenizden önce avukatınıza göndermek istediğiniz
          <span class="font-semibold">notunuz veya dosyanız</span> var ise
          lütfen ekleyiniz.
        </MessageWrapper>
        <MessageWrapper type="normal">
          Paylaştığınız bilgilerin gizliliği ve güvenliği bizim için önemlidir.
          Dosyalarınız <span class="font-semibold">asla</span> 3. bir kişi ile
          paylaşılmaz.
        </MessageWrapper>
        <label for="message" class="block mb-3 text-sm text-gray-900">
          <textarea
            id="message"
            v-model="notes"
            rows="4"
            class="block p-2.5 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-black focus:ring-0"
            placeholder="Notlarınız buraya yazın..."></textarea>
        </label>

        <div>
          <label
            for="dropzone-file"
            class="flex flex-col items-center justify-center w-full h-64 border-2 hover:border-gray-400 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-200"
            @dragover.prevent
            @drop.prevent="handleDrop">
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                class="w-8 h-8 mb-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16">
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
              </svg>
              <div class="p-2 text-center">
                <p class="mb-2 text-sm text-gray-500">
                  <span class="font-semibold"
                    >Dosya yüklemek için tıklayın</span
                  >
                  yada sürükleyip bırakın
                </p>
                <p class="text-xs text-gray-500">PNG, JPG, PDF (MAX. 100MB)</p>
              </div>
            </div>
            <input
              id="dropzone-file"
              type="file"
              class="hidden"
              @change="handleFileUpload"
              multiple />
          </label>
        </div>
        <button
          v-if="!isLoading"
          @click="handleSubmit"
          type="submit"
          class="bg-tertiary w-full md:w-auto mt-4 text-white py-[0.5rem] px-4 disabled:bg-gray-400"
          :disabled="!isAuthenticated">
          Devam Et
        </button>
        <div v-else class="bg-tertiary w-full md:w-auto mt-4 text-white py-[0.5rem] px-4 disabled:bg-gray-400">
          <LoadingSpinner :text="''" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, watch } from "vue";
import { useStore } from "vuex";
import MessageWrapper from "../wrappers/MessageWrapper.vue";
import LoadingSpinner from "./LoadingSpinner.vue";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { db, storage } from "../firebase";
import { is } from "date-fns/locale";
import { set } from "date-fns";

const props = defineProps(["appointmentProcessData"]);
const emits = defineEmits(["continueStep4", "notAuthenticated"]);

const store = useStore();
const isAuthenticated = computed(() => store.getters.isAuthenticated);
const isLoading = ref(false);
// Load initial data from Vuex
const notes = ref(props.appointmentProcessData.notes || "");
const uploadedFiles = ref(
  props.appointmentProcessData.uploadedFiles || []
);
const userId = store.getters.getUserId;

// Display options
const displayOptions = {
  video: { text: "Online Video Görüşme", icon: "ri-video-on-line" },
  phone: { text: "Telefonla Görüşme", icon: "ri-phone-line" },
  inPerson: { text: "Yüz Yüze Görüşme", icon: "ri-user-line" },
};

const selectedOption = computed(() => {
  const type = props.appointmentProcessData.formData.selectedType || "default";
  return (
    displayOptions[type] || { text: "Belirtilmemiş", icon: "ri-question-line" }
  );
});

const handleDrop = (event) => {
  const files = event.dataTransfer.files;
  handleFiles(files);
};

const removeFile = (index) => {
  uploadedFiles.value.splice(index, 1);
};

const formatSize = (size) => {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
  return `${(size / (1024 * 1024)).toFixed(2)} MB`;
};

const formatName = (name) => {
  return name.length > 30
    ? `${name.substring(0, 15)}...${name.substring(name.length - 15)}`
    : name;
};

// File Handling Functions
const handleFileUpload = (event) => {
  const files = event.target.files;
  handleFiles(files);
};

const handleFiles = (files) => {
  const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
  const allowedTypes = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "application/pdf",
  ]; // also add docs here

  Array.from(files).forEach((file) => {
    if (file.size > MAX_FILE_SIZE) {
      alert(
        `${file.name} dosyası çok büyük. Yükleyeceğiniz dosyalar maximum 100MB olmalıdır.`
      );
      return;
    }
    if (!allowedTypes.includes(file.type)) {
      alert(
        `${file.name} dosya türü desteklenmiyor. Lütfen PNG, JPG, JPEG veya PDF dosyaları yükleyin.`
      );
      return;
    }
    uploadedFiles.value.push(file);
  });
};

// Helper function to upload files
const uploadFilesToFireStore = async () => {
  console.log("uploading files");
  const uploadedFiles_ = [];
  for (const file of uploadedFiles.value) {
    console.log("uploading file", file);
    const metadata = {
      type: file.type,
      size: file.size,
      name: file.name,
    };
    try {
      const fileRef = storageRef(storage, `temporary_documents/${userId}/${file.name}`);
      const snapshot = await uploadBytes(fileRef, file);
      console.log("File uploaded successfully:", snapshot.ref);
      const downloadUrl = await getDownloadURL(snapshot.ref);
      console.log("metadata", metadata);
      uploadedFiles_.push({ url: downloadUrl, metadata: metadata });
    } catch (error) {
      console.error(`Error uploading file ${fileObj.file}:`, error);
      throw new Error("File upload failed.");
    }
  }
  return uploadedFiles_;
};

// Submit and Authentication Handling
const handleSubmit = async () => {
  if (!notes.value) {
    alert("Lütfen bir not giriniz.");
    return;
  }

  isLoading.value = true;

  const uploadedFiles_ = await uploadFilesToFireStore();
  console.log("uploadedFiles_", uploadedFiles_);
  store.commit("setAppointmentProcessData", { uploadedFiles: uploadedFiles_ , notes: notes.value });
  setTimeout(() => {
    isLoading.value = false;
    emits("continueStep4");
  }, 1000);
};

const handleAuth = () => {
  emits("notAuthenticated");
};

onMounted(() => {
  console.log("uploadedFiles", uploadedFiles.value);
  if (!isAuthenticated.value) {
    handleAuth();
  }
});
</script>

<style scoped>
.break-word {
  word-break: break-all;
}
</style>
