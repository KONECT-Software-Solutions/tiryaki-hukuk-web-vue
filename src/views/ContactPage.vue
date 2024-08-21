<template>
  <div>
    <!-- HERO SECTION START -->
    <section class="relative hero-bg bg-cover bg-center h-[30vh] md:h-[50vh]" >
      <div class="absolute inset-0 bg-black opacity-30"></div>
      <div
        class="relative container mx-auto md:px-16 px-8 py-12 flex flex-col items-center justify-end h-full">
        <h1 class="text-white text-4xl lg:text-5xl font-[700] mb-4">
          İletişim
        </h1>
      </div>
    </section>
    <!-- HERO SECTION END -->

    <!-- MAIN CONTENT START -->
    <div class="container mx-auto md:py-[7em] py-[2em] md:px-12 px-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 py-6">
        <div
          class="relative group border text-center p-12 lg:p-16 w-full flex items-center justify-center bg-white hover:bg-primary hover:bg-opacity-80 transition ease-in duration-300">
          <div class="group-hover:blur-sm flex flex-col space-y-4">
            <i
              class="ri-phone-fill text-7xl text-primary group-hover:text-white"></i>
            <p
              class="font-medium text-slate-800 text-xl group-hover:text-white">
              0 (224) 273 04 05
            </p>
            <p class="text-slate-700 font-light group-hover:text-white">
              Pazartesi - Cuma <br />
              08:00 - 16:00
            </p>
          </div>
          <button
            onclick="window.location.href='tel:+902242730405'"
            class="absolute opacity-0 group-hover:opacity-100 bg-white text-slate-700 px-4 py-2 rounded">
            Ara
          </button>
        </div>
        <div
          class="relative group border text-center p-12 lg:p-16 w-full flex items-center justify-center bg-white hover:bg-primary hover:bg-opacity-80 transition ease-in duration-300">
          <div class="group-hover:blur-sm flex flex-col space-y-4">
            <i
              class="ri-mail-send-fill text-7xl text-primary group-hover:text-white"></i>
            <p
              class="font-medium text-slate-800 text-xl group-hover:text-white">
              info@tiryakihukuk.com
            </p>
            <p class="text-slate-700 font-light group-hover:text-white">
              Mesai saatleri içerisinde dönüş yapılacaktır.
            </p>
          </div>
          <button
            onclick="window.location.href='mailto:info@tiryakihukuk.com'"
            class="absolute opacity-0 group-hover:opacity-100 bg-white text-slate-700 px-4 py-2 rounded">
            Mail At
          </button>
        </div>
        <div
          class="relative group border text-center p-12 lg:p-16 w-full flex items-center justify-center bg-white hover:bg-primary hover:bg-opacity-80 transition ease-in duration-300">
          <div class="group-hover:blur-sm flex flex-col space-y-4">
            <i
              class="ri-map-pin-fill text-7xl text-primary group-hover:text-white"></i>
            <p
              class="font-medium text-slate-800 text-xl group-hover:text-white">
              Nilüfer/BURSA
            </p>
            <p class="text-slate-700 font-light group-hover:text-white">
              F.S.M. Bulvarı No:96/3 Bahar Sitesi C Blok K:2 D:4 Nilüfer/BURSA
            </p>
          </div>
          <button
            onclick="window.location.href='https://www.google.com/maps/place/Tiryaki+Avukatl%C4%B1k+B%C3%BCrosu/@40.2281544,28.9605383,14z/data=!3m1!4b1!4m6!3m5!1s0x14ca144729470daf:0x35a695c636f53151!8m2!3d40.2281562!4d28.9810949!16s%2Fg%2F11ggrky39x?entry=ttu'"
            class="absolute opacity-0 group-hover:opacity-100 bg-white text-slate-700 px-4 py-2 rounded">
            Yol Tarifi Al
          </button>
        </div>
      </div>
      <div class="flex flex-col md:flex-row">
        <!-- google maps section start -->
        <div class="hidden md:block flex-1 mb-4 md:mb-0 md:mr-4">
          <div id="map" class="border flex items-center justify-center h-full">
          </div>
        </div>
        <!-- google maps section end -->
        <div class="flex-1">
          <form class="border p-10">
            <div class="mb-4">
              <input
                type="text"
                placeholder="İsim"
                class="w-full px-3 py-2 border border-gray-300 rounded" />
            </div>
            <div class="mb-4">
              <input
                type="email"
                placeholder="Email"
                class="w-full px-3 py-2 border border-gray-300 rounded" />
            </div>
            <div class="mb-4">
              <input
                type="text"
                placeholder="Konu"
                class="w-full px-3 py-2 border border-gray-300 rounded" />
            </div>
            <div class="mb-4">
              <textarea
                placeholder="Mesajınız"
                class="w-full px-3 py-2 border border-gray-300 rounded">
              </textarea>
            </div>
            <div class="flex justify-end">
              <button
                type="submit"
                class="bg-primary text-white py-[0.5rem] px-4">
                Mesajı Gönder
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- MAIN CONTENT END -->
  </div>
</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
  const mapOptions = {
    center: { lat: 40.2227127, lng: 28.9583948 }, // Valid coordinates
    zoom: 16,
  };

  try {
    const map = new google.maps.Map(document.getElementById("map"), mapOptions);
  } catch (error) {
    console.error("Error initializing Google Maps:", error);
  }
});
</script>

<style scoped>
.hero-bg {
  background-image: url("../assets/images/contact-page-bg.webp");

}
</style>
