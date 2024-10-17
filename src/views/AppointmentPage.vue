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
          <li
            :class="{
              'after:border-tertiary': currentStep > 4,
              'after:border-gray-200': currentStep === 4,
            }"
            class="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block">
            <div
              :class="{
                'bg-tertiary ': currentStep > 4,
                'bg-gray-100': currentStep <= 4,
              }"
              class="flex items-center justify-center rounded-full h-14 w-14 shrink-0">
              <svg
                class="w-7 h-7"
                :class="{
                  'text-white ': currentStep > 4,
                  'text-slate-400 ': currentStep <= 4,
                }"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24">
                <path
                  d="M11.0049 2L18.3032 4.28071C18.7206 4.41117 19.0049 4.79781 19.0049 5.23519V7H21.0049C21.5572 7 22.0049 7.44772 22.0049 8V16C22.0049 16.5523 21.5572 17 21.0049 17L17.7848 17.0011C17.3982 17.5108 16.9276 17.9618 16.3849 18.3318L11.0049 22L5.62486 18.3318C3.98563 17.2141 3.00488 15.3584 3.00488 13.3744V5.23519C3.00488 4.79781 3.28913 4.41117 3.70661 4.28071L11.0049 2ZM11.0049 4.094L5.00488 5.97V13.3744C5.00488 14.6193 5.58406 15.7884 6.56329 16.5428L6.75154 16.6793L11.0049 19.579L14.7869 17H10.0049C9.4526 17 9.00488 16.5523 9.00488 16V8C9.00488 7.44772 9.4526 7 10.0049 7H17.0049V5.97L11.0049 4.094ZM11.0049 12V15H20.0049V12H11.0049ZM11.0049 10H20.0049V9H11.0049V10Z"></path>
              </svg>
            </div>
          </li>
          <li class="flex items-center">
            <div
              :class="{
                'bg-tertiary ': currentStep === 5,
                'bg-gray-100 ': currentStep < 5,
              }"
              class="flex items-center justify-center rounded-full h-14 w-14">
              <svg
                class="p-1 w-6 h-6 rounded-full"
                :class="{
                  'text-tertiary bg-white ': currentStep === 5,
                  'text-white bg-slate-400 ': currentStep < 5,
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
        :appointmentProcessData="appointmentProcessData" />
      <AppointmentStep2
        v-if="currentStep === 2"
        @continueStep3="handleContinueStep3" />
      <AppointmentStep3
        v-if="currentStep === 3"
        :appointmentProcessData="appointmentProcessData"
        @continueStep4="handleContinueStep4"
        @notAuthenticated="handleNotAuthenticated" />
      <AppointmentStep4
        v-if="currentStep === 4"
        :appointmentProcessData="appointmentProcessData"
        @continueStep5="handleContinueStep5"
        @notAuthenticated="handleNotAuthenticated" />
      <AppointmentStep5
        v-if="currentStep === 5"
        :appointmentProcessData="appointmentProcessData" />
    </div>
    <!-- MAIN CONTENT END -->
  </div>
</template>

<script setup>
import { onMounted, ref, computed, watch, onUpdated } from "vue";
import { useStore } from "vuex";
import AppointmentStep1 from "../components/AppointmentStep1.vue";
import AppointmentStep2 from "../components/AppointmentStep2.vue";
import AppointmentStep3 from "../components/AppointmentStep3.vue";
import AppointmentStep4 from "../components/AppointmentStep4.vue";
import AppointmentStep5 from "../components/AppointmentStep5.vue";
import SkeletonLoader from "../components/SkeletonLoader.vue";
import router from "../router";
import { ro } from "date-fns/locale";

const store = useStore();

const loading = ref(true);

const currentStep = computed(
  () => store.getters.getAppointmentProcessData.currentStep
);

const appointmentProcessData = computed(
  () => store.getters.getAppointmentProcessData
);

const handleContinueStep2 = (formData_) => {
  if (formData_) {
    try {
      store.commit("setAppointmentProcessData", { formData: formData_ });
      nextStep();
    } catch (error) {
      console.error("Error updating form data:", error);
    }
  } else {
    console.error("Form data is invalid or missing. Continue step2");
  }
  window.scrollTo(0, 0);
};

const handleContinueStep3 = (userData) => {
  if (userData) {
    try {
      store.commit("setAppointmentProcessData", { userData: userData });
      nextStep();
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  } else {
    console.error("Form data is invalid or missing. Continue step3");
  }
  window.scrollTo(0, 0);
};

const handleContinueStep4 = (uploadedFiles, notes) => {
  if (uploadedFiles && notes) {
    try {
      store.commit("setAppointmentProcessData", {
        uploadedFiles: uploadedFiles,
        notes: notes,
      });
      nextStep();
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  } else {
    console.error("Form data is invalid or missing. Continue step3");
  }
  window.scrollTo(0, 0);
};

const handleContinueStep5 = () => {
  try {
    nextStep();
    console.log("currentStep", currentStep.value);
  } catch (error) {
    console.error("Error updating user data:", error);
  }
};

const handleNotAuthenticated = () => {
  console.log("handleNotAuthenticated");
  store.commit("setAppointmentProcessData", { currentStep: 2, userData: null });
};

const nextStep = () => {
  const totalSteps = 5; // There are 5 steps
  if (currentStep.value < totalSteps) {
    try {
      store.commit("setAppointmentProcessData", {
        currentStep: currentStep.value + 1,
      });
    } catch (error) {
      console.error("Error advancing to the next step:", error);
    }
  }
};

const isAppointmentProcessDataReady = () => {
  const data = appointmentProcessData.value;

  return (
    data.appointmentToken &&
    data.attorneyData.id &&
    data.selectedDate &&
    data.selectedDay &&
    data.selectedSlot
  );
  // Check required fields for the readiness of appointmentProcessData
};

onMounted(async () => {
  console.log("AppointmentPage mounted");

  // Simulate or fetch any necessary data before loading completes
  try {
    if (!isAppointmentProcessDataReady()) {
      // If data is not ready, handle accordingly, e.g., redirect to an earlier step
      console.error("Appointment process data is not ready.");
      router.push("/");
    } else {
      console.log("Appointment data is ready. Proceeding with loading...");
    }
  } catch (error) {
    console.error("Error during appointment process validation:", error);
  } finally {
    setTimeout(() => {
      console.log("1s timeout");
      loading.value = false;
    }, 1000);
  }

  console.log("current step", currentStep.value);
  console.log("appointmentProcessData", appointmentProcessData.value);
});
</script>

<style scoped>
.hero-bg {
  background-image: url("../assets/images/blog-page-bg.webp");
}
</style>
