<template>
  <section class="bg-gray-50">
    <div class="container mx-auto text-center">
      <h1 class="text-3xl text-center text-slate-800 font-medium mb-8 md:mb-0">
        Hizmet Alanlarımız
      </h1>
      <p
        class="text-slate-700 hidden md:block leading-loose text-lg text-center md:px-24 p-4">
        Tiryaki Hukuk Bürosu, geniş bir uzmanlık yelpazesi sunan deneyimli
        avukat kadrosu ile kapsamlı avukatlık ve hukuki danışmanlık hizmetleri
        vermektedir. Büromuz, müvekkillerine en yüksek kalitede hukuki destek
        sağlama misyonuyla hareket etmektedir. Müvekkillerimizin ihtiyaç duyduğu
        hukuki çözümleri en etkin ve verimli şekilde sunmak amacıyla, çeşitli
        hukuk alanlarında derinlemesine bilgi ve tecrübeye sahip avukatlarımızla
        birlikte çalışıyoruz. Tiryaki Hukuk Bürosu olarak, hukuki süreçlerde
        müvekkillerimizin haklarını en iyi şekilde korumak ve savunmak için
        titizlikle çalışıyoruz.
      </p>
      <ServicesGrid />
    </div>
  </section>
</template>

<script setup>
import ServicesGrid from '../components/ServicesGrid.vue';
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
