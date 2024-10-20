<template>
  <div>
    <NavBar />
    <transition name="fade">
      <router-view />
    </transition>
    <Footer />

    <button
      v-if="showResumeButton"
      @click="resumeAppointmentProcess"
      class="group fixed bottom-4 right-4 h-12 flex items-center justify-center bg-primary text-white rounded-full shadow-xl transition-all animate-bounce duration-300 ease-in-out z-50 w-12 hover:w-40">
      <span
        class="text-center opacity-0 w-0 group-hover:w-full group-hover:opacity-100 text-nowrap transition-opacity duration-0 group-hover:duration-700">
        Randevuyu tamamla!
      </span>
      <i
        class="ri-calendar-fill text-xl opacity-100 transition-opacity duration-700 group-hover:duration-0 group-hover:w-0 group-hover:opacity-0"></i>
    </button>
  </div>
</template>

<script setup>
import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";
import { computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";

const store = useStore();
const router = useRouter();
const route = useRoute();
const user = computed(() => store.getters.getUser);
const isFinished = computed(
  () => store.getters.getAppointmentProcessData.isFinished
);
const appointment_token = computed(
  () => store.getters.getAppointmentProcessData.appointmentToken
);

watch(
  user,
  (newUser, oldUser) => {
    if (newUser) {
      console.log("User data updated");
    }
  },
  { immediate: true }
);

const showResumeButton = computed(() => {
if (appointment_token && appointment_token.value) {
    console.log("appointmentToken exists", appointment_token.value)
    return route.name !== "Appointment" && !isFinished.value
  }
  else{
    console.log("no token")
    return false
  }
});

const resumeAppointmentProcess = () => {
  // Navigate to the appointment process route
  router.push("/randevu-olustur");
};

onMounted(() => {});
</script>

<style>
/* Add any necessary styles here */
/* add font monserrat open sans*/

@import url("https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap");

body {
  font-family: "Roboto Condensed", sans-serif;
}

.bg-brown-600 {
  background-color: #3e2723;
}
.bg-brown-500 {
  background-color: #563d2d;
}
.bg-brown-400 {
  background-color: #6d4c41;
}
.bg-brown-300 {
  background-color: #bcaaa4;
}
.bg-brown-200 {
  background-color: #d7ccc8;
}
.bg-brown-100 {
  background-color: #d7ccc8;
}

.text-brown-500 {
  color: #563d2d;
}

.border-brown-500 {
  border-color: #563d2d;
}

/* Add the following CSS for the transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 30%;
}

.move-in-bottom {
  animation: moveInBottom 0.6s ease-in-out;
}

@keyframes moveInBottom {
  0% {
    transform: translateY(100%);
    opacity: 0.2;
  }
  100% {
    transform: translateY(0%);
    opacity: 1;
  }
}
</style>
