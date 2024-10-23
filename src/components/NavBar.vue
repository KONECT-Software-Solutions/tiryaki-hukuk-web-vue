<template>
  <ForgotPwModal v-if="showForgotPwModal" @close="showForgotPwModal = false"/>
  <AuthModal v-if="showSignInModal" @close="showSignInModal = false" @forgotPw="showSignInModal = false; showForgotPwModal = true"/>
  <nav
    :class="[
      'nav-bar w-full top-0 left-0 z-30 px-4 md:px-20 lg:px-32 2xl:px-60',
      shouldAnimateNavBar
        ? 'move-in-top border-b bg-white text-gray-800 py-5'
        : 'text-white md:py-8 py-6 ',
    ]">
    <div class="mx-auto flex items-center justify-between">
      <router-link :to="'/'" class="font-bold text-nowrap leading-4">
        <h1 class="text-[23px]">TIRYAKI</h1>
        <p class="text-[13px]">HUKUK & ARABULUCULUK</p>
      </router-link>
      <ul
        class="hidden items-center text-nowrap md:text-[15px] font-normal md:flex md:space-x-4 lg:space-x-8">
        <li v-for="menu in menus" :key="menu.title">
          <router-link
            :to="menu.link"
            class="md:hover:text-slate-300 hover:text-gray-900">
            <span>{{ menu.title }}</span>
          </router-link>
        </li>
        <li v-if="!isAuthenticated">
          <button
            @click="showSignInModal = true"
            class="bg-primary flex items-center text-white py-[0.5rem] px-4">
            <i class="ri-login-box-line pr-2 text-xl"></i>
            Giriş Yap
          </button>
        </li>
        <li v-else class="flex justify-center">
          <router-link
            :to="'/hesabim'"
            class="bg-primary flex items-center text-white py-[0.5rem] px-4 mr-2">
            <i class="ri-user-line text-xl pr-2"></i> Hesabım
          </router-link>
          <button
            @click="signOut"
            class="bg-primary flex items-center text-white py-[0.5rem] px-4">
            <i class="ri-logout-box-line text-xl"></i>
          </button>
        </li>
      </ul>
      <button @click="toggleMenu" class="md:hidden focus:outline-none">
        <svg
          class="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>
    </div>
    <div
      v-if="isMenuOpen"
      class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-20"
      @click="toggleMenu()"></div>
    <div
      :class="[
        'side-nav-bar fixed top-0 right-0 h-full w-52 bg-black bg-opacity-30 text-white transition-transform transform z-30',
        isMenuOpen ? 'translate-x-0' : 'translate-x-full',
      ]">
      <router-link
        :to="'/'"
        class="font-bold absolute top-5 left-4 text-nowrap leading-4">
        <h1 class="text-[23px]">TIRYAKI</h1>
        <p class="text-[13px]">HUKUK & ARABULUCULUK</p>
      </router-link>
      <button @click="toggleMenu()" class="text-white absolute top-4 right-4">
        <svg
          class="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
      <div class="pb-16 border-b border-gray-400"></div>
      <ul>
        <li v-for="menu in menus" :key="menu.title">
          <router-link
            :to="menu.link"
            class="block pl-[0.8rem] py-4 hover:text-white hover:bg-gray-500 hover:bg-opacity-50"
            @click="toggleMenu()">
            <span>{{ menu.title }}</span>
          </router-link>
        </li>
        <li v-if="!isAuthenticated">
          <button
            @click="(showSignInModal = true), toggleMenu()"
            class="bg-primary w-full text-start text-white py-4 px-4">
            <div class="flex items-center">
              <i class="ri-login-box-line text-xl pr-2"></i> <span>Giriş Yap</span>
            </div>
          </button>
        </li>
        <li v-else>
          <router-link
            :to="'/hesabim'"
            @click="toggleMenu()"
            class="bg-primary flex items-start border-b border-gray-400 text-white py-4 px-4">
            <div class="flex justify-center items-center">
              <i class="ri-user-line text-xl pr-2"></i> <span>Hesabım</span>
            </div>
          </router-link>
          <button
            @click="signOut(), toggleMenu()"
            class="bg-primary w-full text-start text-white py-4 px-4">
            <div class="flex items-center">
              <i class="ri-logout-box-line text-xl pr-2"></i> <span>Çıkış Yap</span>
            </div>
          </button>
        </li>
        <li>
          <GetAppointmentButton @click="toggleMenu()"/>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { onMounted, onUnmounted, onUpdated, ref } from "vue";
import AuthModal from "./AuthModal.vue";
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import GetAppointmentButton from "./GetAppointmentButton.vue";
import ForgotPwModal from "./ForgotPwModal.vue";

const store = useStore();
const router = useRouter();

const isAuthenticated = computed(() => store.getters.isAuthenticated);
const user = computed(() => store.getters.getUser);

const isMenuOpen = ref(false);
const scrollPosition = ref(0);
const shouldAnimateNavBar = computed(() => {
  return scrollPosition.value >= window.innerHeight / 2;
});
const showSignInModal = ref(false);
const showForgotPwModal = ref(false);

const menus = [
  { title: "Ana Sayfa", link: "/" },
  { title: "Ekibimiz", link: "/ekip" },
  { title: "Hizmetlerimiz", link: "/hizmetler" },
  { title: "Blog", link: "/blog" },
  { title: "İletişim", link: "/iletisim" },
];

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const handleScroll = () => {
  scrollPosition.value = window.scrollY;
};

const signOut = async () => {
  await store.dispatch("signOut");
  router.push("/");
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

onUpdated(() => {});
</script>

<style scoped>
.transition-transform {
  transition: transform 0.3s ease-in-out;
}

.nav-bar {
  position: absolute; /* Ensure navbar does not affect the document flow */
}
.nav-bar.move-in-top {
  animation: moveInTop 0.6s ease-in-out;
  position: fixed; /* Ensure navbar does not affect the document flow */
}

@keyframes moveInTop {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0%);
  }
}
</style>
