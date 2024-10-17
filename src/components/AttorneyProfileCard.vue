<template>
  <div
    v-if="attorneysData && attorneysData.length"
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-4 md:px-10">
    <div
      v-for="(attorneyData, index) in filteredAttorneys"
      :key="attorneyData.id">
      <div
        class="group bg-white border max-w-72 border-gray-200 hover:shadow-xl hover:scale-110 transition duration-300 flex items-center justify-center">
        <div v-if="showDateTimePicker !== index" class="relative flex flex-col">
          <div class="flex flex-col space-y-4">
            <div class="flex justify-center">
              <div class="text-center">
                <h1 class="text-lg md:text-xl font-semibold text-slate-800">
                  {{ attorneyData.name }}
                  <p class="text-gray-600 font-normal text-base">
                    {{ attorneyData.title }}
                  </p>
                </h1>
              </div>
            </div>
            <img
              :src="`assets/images/${attorneyData.id}.webp`"
              alt="Profile Image"
              class="h-96 object-cover" />
            <div
              class="absolute bottom-0 w-full flex flex-col justify-between overflow-hidden transition-all duration-300 custom-height group-hover:h-full">
              <div
                class="absolute inset-0 bg-tertiary w-full opacity-50 group-hover:opacity-90 group-hover:bg-gray-800 backdrop-blur-sm"></div>
              <div
                class="text-gray-100 text-center p-4 text-sm items-center pt-6 hidden group-hover:block">
                <p class="relative">
                  Avukat ******, İstanbul Üniversitesi Hukuk Fakültesi'nden
                  mezun olmuştur ve 10 yılı aşkın bir süredir hukuk alanında
                  çalışmaktadır. Özellikle aile hukuku, iş hukuku, ticaret
                  hukuku ve miras hukuku alanlarında uzmanlaşmıştır. Kariyeri
                  boyunca birçok karmaşık davada başarılı sonuçlar elde etmiş ve
                  müvekkillerine hukuki danışmanlık hizmetleri sunmuştur.
                  Profesyonel yaşamında etik kurallara bağlı kalarak
                  müvekkillerinin haklarını en iyi şekilde savunmayı ilke
                  edinmiştir. Hukuk eğitimi ve geniş deneyimi sayesinde,
                  müvekkillerine kapsamlı ve etkili çözümler sunmaktadır.
                </p>
              </div>
              <div
                class="w-full flex items-center py-2 group-hover:py-4 justify-center space-x-4">
                <a href="#" aria-label="Twitter" class="relative">
                  <div
                    class="bg-tertiary rounded-full w-8 h-8 flex items-center text-white justify-center hover:scale-150 hover:bg-white hover:text-tertiary transition duration-300">
                    <i class="ri-twitter-fill text-xl"></i>
                  </div>
                </a>
                <a href="#" aria-label="Instagram" class="relative">
                  <div
                    class="bg-tertiary rounded-full w-8 h-8 flex items-center text-white justify-center hover:scale-150 hover:bg-white hover:text-tertiary transition duration-300">
                    <i class="ri-instagram-fill text-xl"></i>
                  </div>
                </a>
                <a href="#" aria-label="Facebook" class="relative">
                  <div
                    class="bg-tertiary rounded-full w-8 h-8 flex items-center text-white justify-center hover:scale-150 hover:bg-white hover:text-tertiary transition duration-300">
                    <i class="ri-facebook-fill text-xl"></i>
                  </div>
                </a>
                <a href="#" aria-label="Linkedin" class="relative">
                  <div
                    class="bg-tertiary rounded-full w-8 h-8 flex items-center text-white justify-center hover:scale-150 hover:bg-white hover:text-tertiary transition duration-300">
                    <i class="ri-linkedin-fill text-xl"></i>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>....</div>
</template>

<script setup>
import { onMounted, computed, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

const attorneysData = computed(() => store.state.attorneys);
const showDateTimePicker = ref(false);

// Filter out the attorneys with role !== "admin"
const filteredAttorneys = computed(() =>
  attorneysData.value.filter((attorney) => attorney.role !== "admin")
);

onMounted(() => {
  if (!attorneysData.value.length) {
    store.dispatch("fetchAttorneys");
  }
});
</script>

<style scoped>
.custom-height {
  height: 50px; /* Initial height */
}

.group-hover\\:h-full:hover .custom-height {
  height: 100%; /* Full height on hover */
}
</style>
