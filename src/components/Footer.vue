<template>
  <footer class="bg-[rgb(34,40,49)] text-white py-16 pb-10">
    <div
      class="px-8 md:px-20 lg:px-32 2xl:px-60 grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-row md:items-start space-y-6 md:space-y-0 justify-between sm:space-x-6">
      <!-- Logo and Description Column -->
      <div>
        <div class="text-white font-bold text-nowrap leading-6 pb-8">
          <h1 class="text-[34px]">TIRYAKI</h1>
          <p class="text-[16px]">HUKUK & ARABULUCULUK</p>
        </div>
        <div>
          <p class="mb-2 text-slate-300 flex items-start hover:text-white">
            <i class="ri-map-pin-fill align-middle text-lg text-white pr-2"></i>
            F.S.M. Bulvarı No:96/3 Bahar Sitesi <br />
            C Blok K:2 D:4 Nilüfer/BURSA
          </p>
          <p
            class="mb-2 text-slate-300 flex items-start hover:text-white text-nowrap">
            <i class="ri-phone-fill align-middle text-lg text-white pr-2"></i>
            +0224-273 04 05
          </p>
          <p
            class="text-nowrap text-slate-300 flex items-start hover:text-white">
            <i class="ri-mail-fill align-middle text-lg text-white pr-2"></i>
            info@tiryakihukuk.com
          </p>
          
        </div>
        <div class="flex space-x-4 mt-4">
          <a href="#" class="" aria-label="Twitter">
            <div
              class="bg-tertiary rounded-full w-12 h-12 flex items-center justify-center hover:scale-110 hover:bg-white hover:text-tertiary transition duration-300">
              <i class="ri-linkedin-fill text-3xl"></i>
            </div>
          </a>
          <a href="" class="" aria-label="Instagram">
            <div
              class="bg-tertiary rounded-full w-12 h-12 flex items-center justify-center hover:scale-110 hover:bg-white hover:text-tertiary transition duration-300">
              <i class="ri-instagram-fill text-3xl"></i>
            </div>
          </a>
          <a href="" class="" aria-label="Facebook">
            <div
              class="bg-tertiary rounded-full w-12 h-12 flex items-center justify-center hover:scale-110 hover:bg-white hover:text-tertiary transition duration-300">
              <i class="ri-facebook-fill text-3xl"></i>
            </div>
          </a>
        </div>
      </div>

      <!-- Services Column -->
      <div>
        <h3 class="text-xl mb-4">Faydalı Linkler</h3>
        <ul class="space-y-2 text-slate-300">
          <li>
            <a
              rel="nofollow"
              class="hover:text-white"
              href="https://www.resmigazete.gov.tr/"
              >Resmi Gazete</a
            >
          </li>
          <li>
            <a
              rel="nofollow"
              class="hover:text-white"
              href="https://www.mevzuat.gov.tr/"
              >Mevzuat Bilgi Sistemi</a
            >
          </li>
          <li>
            <a
              rel="nofollow"
              class="hover:text-white"
              href="https://www.adalet.gov.tr"
              >T.C. Adalet Bakanlığı</a
            >
          </li>
          <li>
            <a
              rel="nofollow"
              class="hover:text-white"
              href="https://www.anayasa.gov.tr/tr/anasayfa/"
              >Anayasa Mahkemesi</a
            >
          </li>
          <li>
            <a
              rel="nofollow"
              class="hover:text-white"
              href="https://www.yargitay.gov.tr/"
              >Yargıtay</a
            >
          </li>
          <li>
            <a
              rel="nofollow"
              class="hover:text-white"
              href="https://www.danistay.gov.tr/"
              >Danıştay</a
            >
          </li>
          <li>
            <a
              rel="nofollow"
              class="hover:text-white"
              href="https://vatandas.uyap.gov.tr/"
              >UYAP</a
            >
          </li>
          <li>
            <a
              rel="nofollow"
              class="hover:text-white"
              href="https://www.barobirlik.org.tr/"
              >Türkiye Barolar Birliği</a
            >
          </li>
          
        </ul>
      </div>

      <div>
        <h3 class="text-xl mb-4">Hizmetlerimiz</h3>
        <ul class="space-y-2 text-slate-300">
          <li>
            <router-link
              :to="'/hizmetler/' + 'aile-hukuku'"
              class="hover:text-white"
              >Aile Hukuku</router-link
            >
          </li>
          <li>
            <router-link
              :to="'/hizmetler/' + 'ticaret-hukuku'"
              class="hover:text-white"
              >Ticaret Hukuku</router-link
            >
          </li>
          <li>
            <router-link
              :to="'/hizmetler/' + 'deniz-ticareti-hukuku'"
              class="hover:text-white"
              >Deniz Ticareti Hukuku</router-link
            >
          </li>
          <li>
            <router-link
              :to="'/hizmetler/' + 'is-hukuku'"
              class="hover:text-white"
              >İş Hukuku</router-link
            >
          </li>
          <li>
            <router-link
              :to="'/hizmetler/' + 'ceza-hukuku'"
              class="hover:text-white"
              >Ceza Hukuku</router-link
            >
          </li>
          <li>
            <router-link
              :to="'/hizmetler/' + 'miras-hukuku'"
              class="hover:text-white"
              >Miras Hukuku</router-link
            >
          </li>
          <li>
            <router-link
              :to="'/hizmetler/' + 'kripto-hukuku'"
              class="hover:text-white"
              >Kripto Hukuku</router-link
            >
          </li>
          <li>
            <router-link
              :to="'/hizmetler/' + 'yapay-zeka-hukuku'"
              class="hover:text-white"
              >Yapay Zeka Hukuku</router-link
            >
          </li>
        </ul>
      </div>

      <!-- Contact Information Column -->

      <!-- Working Hours Column -->
      <div class="w-full md:w-1/4">
        <GetAppointmentButton/>
        <div class="py-[1rem] mx-auto flex w-full">
          <img
            src="../assets/icons/logo_band_white.svg"
            class="max-w-[300px] md:max-w-[200px] lg:max-w-[330px] h-auto"
            alt="iyzico" />
        </div>
        <ul class="space-y-2 text-sm text-slate-200">
          <li>
            <router-link :to="'/kvkk'" target="_blank">
              KVKK Aydınlatma Metni</router-link
            >
          </li>
          <li>
            <router-link :to="'/mss'" target="_blank">
              Mesafeli Satış Sözleşmesi</router-link
            >
          </li>
          <li>
            <router-link :to="'/iptal-iade'" target="_blank">
              İptal ve İade Koşulları</router-link
            >
          </li>
        </ul>
   
      </div>
    </div>
    <div class="mt-12 text-center text-gray-500 text-sm">
      <p>
        Copyright ©2024 All rights reserved | This template is made by
        ebrarkarademir
      </p>
    </div>
  </footer>
</template>

<script setup>
import GetAppointmentButton from "../components/GetAppointmentButton.vue";
</script>
