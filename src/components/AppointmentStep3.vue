<template>
  <div
    class="flex flex-col space-y-4 items-start md:space-y-0 md:flex-row mx-auto md:max-w-4xl">
    <div class="flex flex-col md:mr-4 space-y-3">
      <div class="bg-white p-4 border h-min border-gray-300">
        <div class="flex my-2">
          <div>
            <img
            :src="`/assets/images/${attorneyData.id}.webp`"
            alt="Profile Image"
              class="md:w-44 object-cover" />
            <button
              class="px-4 py-1 border my-2 w-full text-sm text-gray-800 rounded-md hover:bg-gray-200">
              Hakkında
            </button>
          </div>
          <div class="flex flex-col justify-start max-w-xl">
            <div class="flex justify-between ml-2 items-start">
              <div>
                <h2 class="text-lg text-nowrap md:text-xl font-semibold">
                  {{ attorneyData.name }}<span> / </span
                  ><span class="text-gray-600 font-normal text-base md:text-lg"
                    >Avukat</span
                  >
                </h2>
              </div>
            </div>

            <div class="mt-2 space-y-1 text-sm md:text-base text-gray-600">
              <div class="flex items-center space-x-2">
                <i class="fas fa-globe"></i>
                <span>{{ attorneyData.experience }} + Yıllık Tecrübe</span>
              </div>
              <div class="flex items-center space-x-2">
                <i class="fas fa-university"></i>
                <span>{{ attorneyData.university }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="flex items-center">
          <i class="text-2xl mr-2" :class="iconClass"></i>
          <p class="px-1">{{ displayText }}</p>
        </div>
        <div class="flex items-center">
          <i class="ri-price-tag-3-line mr-2 text-2xl"></i>
          <span>{{ formData.price }} TL</span>
        </div>
        <div class="flex items-center mb-2">
          <i class="ri-calendar-line mr-2 text-2xl"></i>
          <div class="px-1 flex text-wrap md:text-nowrap items-center">
            {{ formData.dateForDisplay }}
            <span class="ml-1"> {{ formData.day }}</span>
            <span
              class="flex ml-2 items-center text-nowrap bg-yellow-100 rounded-xl px-2 text-sm">
              <i class="ri-time-fill mr-1 text-lg"></i>{{ formData.slot }} -
              {{ formData.endTime }}</span
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
            v-for="file in uploadedFiles"
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
                  <p class="break-word">{{ file.name }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-else
          class="text-center text-sm md:text-base border bg-slate-50 text-slate-600 border-slate-300 rounded-md p-2">
          <p class="text-sm  font-normal">
            Herhangi bir evrak eklenmedi.
          </p>
        </div>
      </div>
    </div>
    <div class="flex flex-col items-center bg-white p-4 border border-gray-300 justify-center mx-auto max-w-xl">
        <div class="flex flex-col space-y-3 justify-center max-w-xl">
          <div
            class="text-center text-sm md:text-base border bg-slate-50 text-slate-600 border-slate-300 rounded-md p-2">
            Görüşmenizden önce avukatınıza göndermek istediğiniz
            <span class="font-semibold">notunuz veya dosyanız</span> var ise
            lütfen ekleyiniz.
          </div>
          <div
          class="text-center text-sm md:text-base border bg-slate-50 text-slate-600 border-slate-300 rounded-md p-2">
          Paylaştığınız bilgilerin gizliliği ve güvenliği bizim için
            önemlidir. Dosyalarınız
            <span class="font-semibold">asla</span> kaydedilmez ve paylaşılmaz.
          </div>
          <label
            for="message"
            class="block mb-3 text-sm text-gray-900">
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
                  <p class="text-xs text-gray-500">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
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
            @click="handleSubmit"
            type="submit"
            class="bg-primary w-full text-white py-[0.5rem] px-4">
            Devam Et
          </button>
        </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, onUpdated } from "vue";

const props = defineProps(["formData", "attorneyData"]);
const emits = defineEmits(["continueStep4"]);

const notes = ref("");
const uploadedFiles = ref([]);


const iconClass = computed(() => {
  switch (props.formData.selectedType) {
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
});

const displayText = computed(() => {
  switch (props.formData.selectedType) {
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
});


const handleFileUpload = (event) => {
  const files = event.target.files;
  handleFiles(files);
};

const handleDrop = (event) => {
  const files = event.dataTransfer.files;
  // Handle file drop logic here
  handleFiles(files);
};
const handleFiles = (files) => {
  // Handle files (both click and drop)
  Array.from(files).forEach((file) => {
    uploadedFiles.value.push({
      file: file,
      name: file.name.length > 20 
        ? file.name.substring(0, 10) + "..." + file.name.substring(file.name.length - 10) 
        : file.name,
      size: file.size,
      type : file.type,
    });
  });
  console.log(files);
};

const handleSubmit = () => {
  console.log("handleSubmit step 3");
  // emit event to parent component with uploaded files data
  emits("continueStep4", uploadedFiles.value, notes.value); // Correctly call the emit function
};
const formatSize = (size) => {
  if (size < 1024) {
    return size + " B";
  } else if (size < 1024 * 1024) {
    return (size / 1024).toFixed(2) + " KB";
  } else if (size < 1024 * 1024 * 1024) {
    return (size / (1024 * 1024)).toFixed(2) + " MB";
  } else {
    return (size / (1024 * 1024 * 1024)).toFixed(2) + " GB";
  }
};

const formatName = (name) => {
  return name.length > 20
    ? name.substring(0, 10) + "..." + name.substring(name.length - 10)
    : name;
};

onMounted(() => {
  console.log("AppointmentStep3 mounted");

});

</script>

<style scoped>
.break-word {
  word-break: break-all;
}
</style>
