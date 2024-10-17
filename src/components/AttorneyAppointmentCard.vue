<template>
  <div class="flex flex-col max-w-5xl mx-auto justify-center">
    <div v-if="attorneysData && attorneysData.length">
      <div
        v-for="(attorneyData, index) in filteredAttorneys"
        :key="attorneyData.id">
        <div
          class="pt-4 p-2 md:px-4 my-4 bg-white border border-gray-200 hover:shadow-lg hover:border-gray-300 flex items-center justify-center lg:justify-between space-x-6">
          <div
            v-if="showDateTimePicker !== index"
            class="flex flex-col space-y-4">
            <div class="flex space-x-4">
              <div>
                <img
                  :src="`assets/images/${attorneyData.id}.webp`"
                  alt="Profile Image"
                  class="h-56 min-w-36 object-cover" />
              </div>
              <div class="flex flex-col justify-between max-w-md">
                <div>
                  <div class="flex justify-between ml-2 items-start">
                    <div>
                      <h2 class="text-lg md:text-xl font-semibold">
                        {{ attorneyData.name }} <span>/</span
                        ><span
                          class="text-gray-600 font-normal text-base md:text-lg"
                          >{{ attorneyData.title }}</span
                        >
                      </h2>
                    </div>
                  </div>

                  <div
                    class="mt-2 space-y-1 text-sm md:text-base text-gray-600">
                    <div class="flex items-center space-x-2">
                      <i class="fas fa-globe"></i>
                      <span>{{ attorneyData.experience }}+ Yıllık Tecrübe</span>
                    </div>
                    <div class="flex items-center space-x-2">
                      <i class="fas fa-university"></i>
                      <span>{{ attorneyData.university }}</span>
                    </div>
                  </div>
                  <div class="mt-2 flex text-sm flex-wrap max-w-72">
                    <span
                      v-for="area in attorneyData.practiceAreas"
                      class="px-3 py-1 my-1 mx-1 bg-white text-primary border border-gray-400 rounded-md hover:bg-gray-100"
                      >{{ area }}</span
                    >
                  </div>
                </div>
              </div>
            </div>
            <button
              @click="toggleDateTimePicker(index)"
              class="lg:hidden bg-tertiary w-full my-2 border border-tertiary text-white hover:bg-white hover:text-tertiary hover:scale-105 hover:-translate-y-1 transition duration-300 py-1 px-4">
              Randevu Al
            </button>
          </div>

          <DateTimePicker
            :class="[
              '',
              showDateTimePicker === index ? 'block' : 'hidden lg:block',
            ]"
            :attorneyData="attorneyData" />
        </div>
      </div>
    </div>
    <div v-else>fetching</div> <!-- BURAYA SKELETON LOADER GELECEK -->
  </div>
</template>

<script setup>
import DateTimePicker from "./DateTimePicker.vue";
import { onMounted, computed, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

const attorneysData = computed(() => store.state.attorneys);
const showDateTimePicker = ref(null);

const toggleDateTimePicker = (index) => {
  showDateTimePicker.value = showDateTimePicker.value === index ? null : index;
};

// Filter out the attorneys with role !== "admin"
const filteredAttorneys = computed(() =>
  attorneysData.value.filter((attorney) => attorney.role !== "admin")
);

onMounted(() => {
  store.dispatch("fetchAttorneys");
});
</script>
