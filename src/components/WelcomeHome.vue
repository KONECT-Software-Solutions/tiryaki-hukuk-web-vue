<template>
  <section class="move-in-bottom">
    <div
      class="flex flex-col md:flex-row items-center justify-center md:space-x-8 lg:space-x-16">
      <div class="bg-gray-100 border-gray-300 md:w-3/5 md:h-[42rem]">
        <img
          src="../assets/images/welcome-image.webp"
          alt="Main Page Image"
          class="w-full h-96 md:h-full object-cover object-center" />
      </div>
      <div class="flex flex-col mt-8 md:mt-0 md:w-2/5 md:h-[42rem]">
        <div>
          <h2 class="text-4xl font-semibold text-center md:text-left leading-normal mb-6">
            Tiryaki Hukuk & Arabuluculuk'a Hoş Geldiniz!
          </h2>
          <p class="text-lg md:text-xl text-gray-600 leading-relaxed mb-6">
            Bursa'da Avukatlık, Arabuluculuk ve Hukuki Danışmanlık hizmeti sunan firmamız,
            bireylerin haklarını arama özgürlüğünü ve onun ayrılmaz bir parçası
            olan kendini savunma özgürlüğünü hedeflemektedir.
          </p>
        </div>
        <div>
          <!-- Tabs -->
          <div
            class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 lg:space-x-4 mb-4">
            <button
              v-for="tab in Object.keys(tabContent)"
              :key="tab"
              @click="selectedTab = tab"
              :class="
                selectedTab === tab
                  ? 'bg-secondary text-white'
                  : 'bg-white text-gray-700 border-gray-300'
              "
              class="text-base md:text-lg py-2 px-4 border transition duration-500">
              {{ tab }}
            </button>
          </div>
          <!-- Tab Content -->
          <div class="bg-gray-100 tab-content p-4">
            <p class="text-gray-500 text-base md:text-lg leading-relaxed">
              {{ tabContent[selectedTab] }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const selectedTab = ref("Misyonumuz");
const tabContent = {
  Misyonumuz:
    "Sürekli gelişmekte ve değişmekte olan toplumsal yaşantının bir parçası olduğuna inandığımız hukukun, sorunların çözümünde farklı açılardan bakabilen, sağduyu ve pratik çözümlere odaklanan bir anlayışla yaklaşmayı amaçlıyoruz.",
  Vizyonumuz:
    "Vizyonumuz, hukukun üstünlüğünü ve adaleti savunan, müvekkillerimizin haklarını koruyan bir yaklaşım sergilemektir.",
  Değerlerimiz:
    "Değerlerimiz, dürüstlük, güven, profesyonellik ve müvekkillerimize karşı sorumluluk bilinciyle hareket etmektir.",
};
</script>

<style scoped>
button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

</style>
