<template>
  <div>
    <!-- HERO SECTION START -->
    <section class="relative bg-cover bg-center h-20 md:h-28">
      <div class="absolute inset-0 bg-[rgb(34,40,49)]"></div>
    </section>
    <!-- HERO SECTION END -->

    <!-- MAIN CONTENT START -->
    <div class="py-6 px-6 bg-gray-50">
      <div>
        <ol class="flex md:px-10 lg:px-36 items-center mb-4 sm:mb-5">
          <!--  half step trial 
          :class="{
              'after:border-tertiary after:w-full': currentStep > 1,
              'after:border-tertiary after:w-2/5': currentStep === 1,
            }"
            -->
          <li
            :class="{
              'after:border-tertiary ': currentStep > 1,
              'after:border-gray-200 ': currentStep === 1,
            }"
            class="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block">
            <div
              class="flex flex-col items-center justify-center bg-tertiary rounded-full h-14 w-14 shrink-0">
              <svg
                class="text-white w-6 h-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 14">
                <path
                  d="M18 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM2 12V6h16v6H2Z" />
                <path
                  d="M6 8H4a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2Zm8 0H9a1 1 0 0 0 0 2h5a1 1 0 1 0 0-2Z" />
              </svg>
            </div>
          </li>
          <li
            :class="{
              'after:border-tertiary': currentStep > 2,
              'after:border-gray-200': currentStep === 2,
            }"
            class="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block">
            <div
              :class="{
                'bg-tertiary ': currentStep > 2,
                'bg-gray-100 ': currentStep <= 2,
              }"
              class="flex items-center justify-center h-14 w-14 rounded-full shrink-0">
              <svg
                class="w-6 h-6"
                :class="{
                  'text-white ': currentStep > 2,
                  'text-slate-400 ': currentStep <= 2,
                }"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 16">
                <path
                  d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
              </svg>
            </div>
          </li>
          <li
            :class="{
              'after:border-tertiary': currentStep > 3,
              'after:border-gray-200': currentStep === 3,
            }"
            class="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block">
            <div
              :class="{
                'bg-tertiary ': currentStep > 3,
                'bg-gray-100': currentStep <= 3,
              }"
              class="flex items-center justify-center rounded-full h-14 w-14 shrink-0">
              <svg
                class="w-6 h-6"
                :class="{
                  'text-white ': currentStep > 3,
                  'text-slate-400 ': currentStep <= 3,
                }"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20">
                <path
                  d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
              </svg>
            </div>
          </li>
          <li class="flex items-center">
            <div
              :class="{
                'bg-tertiary ': currentStep === 4,
                'bg-gray-100 ': currentStep < 4,
              }"
              class="flex items-center justify-center rounded-full h-14 w-14">
              <svg
                class="p-1 w-6 h-6 rounded-full"
                :class="{
                  'text-tertiary bg-white ': currentStep === 4,
                  'text-white bg-slate-400 ': currentStep < 4,
                }"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 12">
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5.917 5.724 10.5 15 1.5" />
              </svg>
            </div>
          </li>
        </ol>
      </div>

      <div v-if="loading">
        <SkeletonLoader />
      </div>

      <AppointmentStep1
        v-if="currentStep === 1 && !loading"
        @continueStep2="handleContinueStep2"
        :attorneyData="attorneyData"
        :dateForDisplay="dateForDisplay"
        :day="day"
        :slot="slot" />
      <AppointmentStep2
        v-if="currentStep === 2"
        @continueStep3="handleContinueStep3" />
      <AppointmentStep3
        v-if="currentStep === 3"
        :formData="formData"
        :attorneyData="attorneyData"
        @continueStep4="handleContinueStep4" />
      <AppointmentStep4
        v-if="currentStep === 4"
        :formData="formData"
        :attorneyData="attorneyData"
        :uploadedFiles="uploadedFiles" />
    </div>
    <!-- MAIN CONTENT END -->
  </div>
</template>

<script setup>
import { onMounted, ref, computed, onUpdated } from "vue";
import { useStore } from "vuex";
import AppointmentStep1 from "../components/AppointmentStep1.vue";
import AppointmentStep2 from "../components/AppointmentStep2.vue";
import AppointmentStep3 from "../components/AppointmentStep3.vue";
import AppointmentStep4 from "../components/AppointmentStep4.vue";
import SkeletonLoader from "../components/SkeletonLoader.vue";

const store = useStore();

const currentStep = ref(1);
const loading = ref(true);

const steps = [{ number: 1 }, { number: 2 }, { number: 3 }, { number: 4 }];
const attorneyData = computed(() => store.state.attorney);
const dateTimePickerData = computed(() => store.getters.getDateTimePickerData);
const formData = ref({});
const uploadedFiles = ref({});

const date = computed(() => dateTimePickerData.value.selectedDate);
const day = computed(() => dateTimePickerData.value.selectedDay);
const slot = computed(() => dateTimePickerData.value.selectedSlot);
const dateForDisplay = computed(
  () => dateTimePickerData.value.selectedDateForDisplay
);

// Function to change the current step (for example, on button click)

const handleContinueStep2 = (formData_) => {
  formData.value = formData_;
  formData.value.date = date.value;
  formData.value.day = day.value;
  formData.value.slot = slot.value;
  formData.value.dateForDisplay = dateForDisplay.value;
  nextStep();
};

const handleContinueStep3 = () => {
  console.log("handleContinueStep3");
  nextStep();
};

const handleContinueStep4 = (uploadedFiles_, notes_) => {
  console.log("handleContinueStep4");
  uploadedFiles.value = uploadedFiles_;
  formData.value.notes = notes_;
  nextStep();
};

const nextStep = () => {
  if (currentStep.value < steps.length) {
    currentStep.value++;
    window.scrollTo(0, 0); // Scroll to the top of the window
  }
};

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

onMounted(async () => {
  console.log("AppointmentPage mounted");
  console.log("fetching attorney");

  const storedData = localStorage.getItem("dateTimePickerData");
  if (storedData) {
    const parsedData = JSON.parse(storedData);
    store.dispatch("updateDateTimePickerData", parsedData);
  }

  if (dateTimePickerData.value && dateTimePickerData.value.attorneyId) {
    console.log("fetching attorney");
    await store.dispatch(
      "fetchAttorneyById",
      dateTimePickerData.value.attorneyId
    );
  } else {
    // Handle the case when data is not present, e.g., redirect to a previous page or show an error
    console.error(
      "dateTimePickerData is missing. Redirecting or showing an error message."
    );
    // Example: router.push('/previous-page');
  }
  if (attorneyData.value) {
    loading.value = false;
  }
});
</script>

<style scoped>
.hero-bg {
  background-image: url("../assets/images/blog-page-bg.webp");
}
</style>
