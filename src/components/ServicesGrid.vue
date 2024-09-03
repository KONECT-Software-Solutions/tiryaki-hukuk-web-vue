<template>
  <div
    class="grid container grid-cols-1 md:grid-cols-3 gap-4 gap-y-0 lg:grid-cols-4">
    <router-link
      :to="'/hizmetler/' + 'aile-hukuku'"
      class="bg-white border leading-relaxed mb-10 py-4 hover:scale-105 hover:shadow-lg hover:border-gray-300 group transition duration-300 ease-in-out">
      <div class="p-5 text-center">
        <div
          class="rounded-full bg-gray-100 w-24 h-24 mx-auto mb-2 flex items-center justify-center p-4">
          <img src="../assets/icons/family-law-icon.png" alt="family-icon" />
        </div>
        <h3 class="text-[20px] mb-2">Aile Hukuku</h3>
        <p class="text-[16px] text-gray-500">
          Aile hukukuna ilişkin boşanma, velayet, nafaka, mal paylaşımı ve evlat edinme gibi her türlü süreçte hukuki destek sağlıyoruz.

        </p>
      </div>
    </router-link>
    <router-link
      :to="'/hizmetler/' + 'ticaret-hukuku'"
      class="bg-white border leading-relaxed mb-10 py-4 hover:scale-105 hover:shadow-lg hover:border-gray-300 group transition duration-300 ease-in-out transform">
      <div class="p-5 text-center">
        <div
          class="rounded-full bg-gray-100 w-24 h-24 mx-auto mb-2 flex items-center justify-center p-4">
          <img src="../assets/icons/trade-law-icon.png" alt="family-icon" />
        </div>
        <h3 class="text-[20px] mb-2">Ticaret Hukuku</h3>
        <p class="text-[16px] text-gray-500">
          Şirket kuruluşları, rekabet hukuku, ticari sözleşmeler, şirket birleşmeleri ve uluslararası tahkim konularında uzman hukuki danışmanlık sağlıyoruz.
        </p>
      </div>
    </router-link>
    <router-link
      :to="'/hizmetler/' + 'deniz-ticareti-hukuku'"
      class="bg-white border leading-relaxed mb-10 py-4 hover:scale-105 hover:shadow-lg hover:border-gray-300 group transition duration-300 ease-in-out transform">
      <div class="p-5 text-center">
        <div
          class="rounded-full bg-gray-100 w-24 h-24 mx-auto mb-2 flex items-center justify-center p-4">
          <img src="../assets/icons/sea-trade-law-icon.png" alt="family-icon" />
        </div>
        <h3 class="text-[20px] mb-2">Deniz Ticareti Hukuku</h3>
        <p class="text-[16px] text-gray-500">
          Taşıma sözleşmeleri, navlun anlaşmaları, gemi alım-satım işlemleri, deniz kazaları ve gemi inşa projeleri gibi deniz ticareti süreçlerinde hukuki danışmanlık sağlamaktayız.
        </p>
      </div>
    </router-link>
    <router-link
      :to="'/hizmetler/' + 'is-hukuku'"
      class="bg-white border leading-relaxed mb-10 py-4 hover:scale-105 hover:shadow-lg hover:border-gray-300 group transition duration-300 ease-in-out transform">
      <div class="p-5 text-center">
        <div
          class="rounded-full bg-gray-100 w-24 h-24 mx-auto mb-2 flex items-center justify-center p-4">
          <img src="../assets/icons/labor-law-icon.png" alt="family-icon" />
        </div>
        <h3 class="text-[20px] mb-2">İş Hukuku</h3>
        <p class="text-[16px] text-gray-500">
          İş sözleşmeleri, çalışma koşulları, toplu iş sözleşmeleri ve sendikal faaliyetler gibi konularda uzman hukuki destek sunmaktayız.

        </p>
      </div>
    </router-link>
    <router-link
      :to="'/hizmetler/' + 'ceza-hukuku'"
      class="bg-white border leading-relaxed mb-10 py-4 hover:scale-105 hover:shadow-lg hover:border-gray-300 group transition duration-300 ease-in-out transform">
      <div class="p-5 text-center">
        <div
          class="rounded-full bg-gray-100 w-24 h-24 mx-auto mb-2 flex items-center justify-center p-4">
          <img src="../assets/icons/penal-law-icon.png" alt="family-icon" />
        </div>
        <h3 class="text-[20px] mb-2">Ceza Hukuku</h3>
        <p class="text-[16px] text-gray-500">
          Suç teşkil eden fiillerin tespiti, delil yönetimi, savunma, gözaltı ve tutukluluk gibi süreçlerde uzman hukuki destek sağlıyoruz.

        </p>
      </div>
    </router-link>
    <router-link
      :to="'/hizmetler/' + 'miras-hukuku'"
      class="bg-white border leading-relaxed mb-10 py-4 hover:scale-105 hover:shadow-lg hover:border-gray-300 group transition duration-300 ease-in-out transform">
      <div class="p-5 text-center">
        <div
          class="rounded-full bg-gray-100 w-24 h-24 mx-auto mb-2 flex items-center justify-center p-4">
          <img src="../assets/icons/legacy-law-icon.png" alt="family-icon" />
        </div>
        <h3 class="text-[20px] mb-2">Miras Hukuku</h3>
        <p class="text-[16px] text-gray-500">
          Vasiyetname hazırlama, miras paylaşımı, mirasçı hakları ve miras planlaması konularında kapsamlı hukuki danışmanlık hizmeti veriyoruz.

        </p>
      </div>
    </router-link>
    <router-link
      :to="'/hizmetler/' + 'kripto-hukuku'"
      class="bg-white border leading-relaxed mb-10 py-4 hover:scale-105 hover:shadow-lg hover:border-gray-300 group transition duration-300 ease-in-out transform">
      <div class="p-5 text-center">
        <div
          class="rounded-full bg-gray-100 w-24 h-24 mx-auto mb-2 flex items-center justify-center p-4">
          <img src="../assets/icons/crypto-law-icon.svg" alt="family-icon" />
        </div>
        <h3 class="text-[20px] mb-2">Kripto Hukuku</h3>
        <p class="text-[16px] text-gray-500">
          Kripto para şirketlerinin kurulumu, token düzenlemeleri, akıllı sözleşmeler ve siber güvenlik konularında hukuki destek sunmaktayız.

        </p>
      </div>
    </router-link>
    <router-link
      :to="'/hizmetler/' + 'yapay-zeka-hukuku'"
      class="bg-white border leading-relaxed mb-10 py-4 hover:scale-105 hover:shadow-lg hover:border-gray-300 group transition duration-300 ease-in-out transform">
      <div class="p-5 text-center">
        <div
          class="rounded-full bg-gray-100 w-24 h-24 mx-auto mb-2 flex items-center justify-center p-4">
          <img src="../assets/icons/ai-law-icon.png" alt="family-icon" />
        </div>
        <h3 class="text-[20px] mb-2">Yapay Zeka Hukuku</h3>
        <p class="text-[16px] text-gray-500">
          Yapay zeka sistemlerinin yasal çerçevesi, etik yönetimi, telif hakları, veri kullanımı ve siber suçlar gibi konularda hukuki danışmanlık sağlıyoruz.
        </p>
      </div>
    </router-link>
  </div>
</template>
