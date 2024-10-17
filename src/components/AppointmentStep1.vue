<template>
  <form
    @submit.prevent="handleSubmit"
    class="flex flex-col items-center justify-center mx-auto max-w-xl">
    <div class="bg-white p-4 border border-gray-300 mb-2 w-full">
      <label class="block text-lg font-medium mb-2">Danışma Alanı</label>
      <select
        v-model="formData.selectedArea"
        required
        class="w-full p-2 border text-sm border-gray-300 rounded focus:ring-black focus:ring-0">
        <option
          v-for="area in appointmentProcessData.attorneyData.practiceAreas"
          :key="area">
          {{ area }}
        </option>
      </select>
    </div>
    <div class="bg-white p-4 border border-gray-300 mb-2 w-full">
      <label for="topic" class="block text-lg font-medium mb-2"
        >Danışma Sebebi</label
      >
      <textarea
        id="topic"
        v-model="formData.topic"
        rows="4"
        class="block p-2.5 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-black focus:ring-0"
        placeholder="Lütfen görüşmek istediğiniz konu ile ilgili kısa bir bilgi verin."
        required></textarea>
    </div>

    <div class="bg-white p-4 border border-gray-300 mb-2 text-sm w-full">
      <label class="block text-lg font-medium mb-2">Görüşme Türü</label>
      <div class="flex flex-col space-y-2">
        <div
          v-for="option in uniqueOptions"
          :key="option.id"
          :class="[
            'flex items-center justify-between p-2 px-3 border rounded-md cursor-pointer',
            formData.selectedType === option.value
              ? 'border-slate-400 bg-slate-50'
              : 'border-gray-300',
          ]"
          @click="formData.selectedType = option.value">
          <div class="flex items-center space-x-2">
            <input
              required
              type="radio"
              class="form-radio checked:bg-slate-500 checked:border-transparent"
              :class="
                formData.selectedType === option.value
                  ? 'text-slate-500'
                  : 'text-gray-500'
              "
              name="radio"
              :id="option.id"
              :value="option.value"
              v-model="formData.selectedType"
              @click.stop />
            <label :for="option.id" class="text-gray-700">{{
              option.label
            }}</label>
          </div>
          <div
            :class="
              formData.selectedType === option.value
                ? ['text-slate-500', 'text-3xl']
                : ['text-gray-500', 'text-3xl']
            ">
            <i :class="option.icon"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white p-4 border border-gray-300 mb-2 w-full">
      <label class="block text-lg font-medium mb-2">Danışma Süresi</label>
      <select
        v-model="formData.selectedDuration"
        required
        class="w-full p-2 border text-sm border-gray-300 rounded focus:ring-black focus:ring-0">
        <option v-for="duration in durations" :key="duration" :value="duration">
          {{ duration }} dk
        </option>
      </select>
    </div>
    <div
      class="bg-white p-4 border flex items-center justify-between border-gray-300 mb-2 w-full">
      <label class="block text-lg font-medium">Randevu Ücreti</label>
      <div class="flex items-center">
        <i class="ri-price-tag-3-line mr-2 text-2xl"></i>
        <span class="text-2xl">{{ price }} TL</span>
      </div>
    </div>
    <div class="bg-white p-4 border border-gray-300 mb-3 w-full">
      <label class="block text-lg font-medium mb-2">Randevu Tarihi</label>
      <div class="flex flex-col space-y-3">
        <div class="flex items-center">
          <i class="ri-calendar-line mr-2 text-2xl"></i>
          <div class="px-1 flex text-sm md:text-base items-center">
            {{ appointmentProcessData.selectedDateForDisplay }}
            <span class="ml-2">{{ appointmentProcessData.selectedDay }}</span>
            <span
              class="flex ml-2 items-center text-nowrap bg-yellow-100 rounded-xl px-2 text-sm">
              <i class="ri-time-fill mr-1 text-lg"></i
              >{{ appointmentProcessData.selectedSlot }} -
              {{ endTime || "..." }}</span
            >
          </div>
        </div>
        <div>
          <input
            id="kvkk"
            type="checkbox"
            class="p-2 border mr-1 border-gray-300 rounded"
            required />
          <label for="kvkk" class="text-sm text-slate-500">
            Tiryaki Hukuk ve Arabuluculuk'un Kişisel Verilerin İşlenmesine
            Yönelik
            <router-link :to="'/kvkk'" target="_blank" class="text-blue-500">
              KVKK Aydınlatma Metni'ni </router-link
            >okudum ve kabul ediyorum.
          </label>
        </div>
        <div>
          <input
            id="mss"
            type="checkbox"
            class="p-2 border mr-1 border-gray-300 rounded"
            required />
          <label for="mss" class="text-sm text-slate-500">
            Tiryaki Hukuk ve Arabuluculuk'un
            <router-link :to="'/mss'" target="_blank" class="text-blue-500">
              Mesafeli Satış Sözleşmesi'ni </router-link
            >okudum ve kabul ediyorum.
          </label>
        </div>
        <div>
          <input
            id="iptal-iade"
            type="checkbox"
            class="p-2 border mr-1 border-gray-300 rounded"
            required />
          <label for="iptal-iade" class="text-sm text-slate-500">
            Tiryaki Hukuk ve Arabuluculuk'un
            <router-link
              :to="'/iptal-iade'"
              target="_blank"
              class="text-blue-500">
              İptal ve İade Koşulları'nı </router-link
            >okudum ve kabul ediyorum.
          </label>
        </div>
        <button
          type="submit"
          class="bg-tertiary w-full md:w-auto mt-4 text-white py-[0.5rem] px-4">
          Devam Et
        </button>
      </div>
    </div>
  </form>
</template>

<script setup>
import {ref, computed, onMounted } from "vue";

const props = defineProps(["appointmentProcessData"]);
const emits = defineEmits(["continueStep2"]);

const formData = ref({
  selectedArea: props.appointmentProcessData.attorneyData.practiceAreas[0],
  topic: "",
  selectedType: "",
  selectedDuration: "",
});

const typeMapping = {
  "Telefonla Görüşme": { value: "phone", icon: "ri-phone-line" },
  "Online Video Görüşme": { value: "video", icon: "ri-video-on-line" },
  "Yüz Yüze Görüşme": { value: "inPerson", icon: "ri-user-line" },
};

const options = computed(() => {
  return props.appointmentProcessData.attorneyData.appointment_settings.map(
    (setting, index) => {
      const { value, icon } = typeMapping[setting.type] || {};
      return {
        id: index + 1,
        value: value || setting.type.toLowerCase(),
        price: setting.price,
        duration: setting.duration,
        label: setting.type,
        icon: icon || "ri-question-line", // Default icon if not found
      };
    }
  );
});

const uniqueOptions = computed(() => {
  const unique = {};
  options.value.forEach((option) => {
    if (!unique[option.value]) {
      unique[option.value] = option;
    }
  });
  return Object.values(unique);
});

const durations = computed(() => {
  return props.appointmentProcessData.attorneyData.appointment_settings
    .filter(
      (setting) =>
        (typeMapping[setting.type]?.value || setting.type.toLowerCase()) ===
        formData.value.selectedType
    )
    .map((setting) => setting.duration);
});

const price = computed(() => {
  if (
    !props.appointmentProcessData.attorneyData ||
    !props.appointmentProcessData.attorneyData.appointment_settings
  )
    return 0;
  const setting =
    props.appointmentProcessData.attorneyData.appointment_settings.find(
      (setting) =>
        (typeMapping[setting.type]?.value || setting.type.toLowerCase()) ===
          formData.value.selectedType &&
        setting.duration === formData.value.selectedDuration
    );
  return setting ? setting.price : 0;
});

const endTime = computed(() => {
  if (
    !props.appointmentProcessData.selectedSlot ||
    !formData.value.selectedDuration
  )
    return "";
  const [hours, minutes] = props.appointmentProcessData.selectedSlot
    .split(":")
    .map(Number);
  const end = new Date();
  end.setHours(hours, minutes + formData.value.selectedDuration);
  return end.toTimeString().slice(0, 5);
});

const handleSubmit = () => {
  const formData_ = {
    selectedArea: formData.value.selectedArea,
    topic: formData.value.topic,
    selectedType: formData.value.selectedType,
    selectedDuration: formData.value.selectedDuration,
    price: price.value,
    endTime: endTime.value,
  };
  emits("continueStep2", formData_);
};
onMounted(() => {});
</script>
