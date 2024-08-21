<template>
  <div>
    <NavBar />
    <transition name="fade">
      <router-view />
    </transition>
    <Footer />
  </div>
</template>

<script setup>
import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";
import { onMounted, computed, watch } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const user = computed(() => store.getters.getUser);

watch(user, (newUser, oldUser) => {
  if (newUser) {
    console.log('User data updated');
  }
}, { immediate: true });

onMounted(async ()=> {
  await store.dispatch('fetchUserData');

});
</script>

<style>
/* Add any necessary styles here */
/* add font monserrat open sans*/

@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap');

body {
  font-family: 'Roboto Condensed', sans-serif;
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
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter-from, .fade-leave-to {
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