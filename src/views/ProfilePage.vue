<template>
  <div>
    <section class="relative bg-cover bg-center h-20 md:h-28">
      <div class="absolute inset-0 bg-[rgb(34,40,49)]"></div>
    </section>

    <div class="flex min-h-screen px-0 md:px-20 lg:px-32 2xl:px-60 bg-gray-100">
      <!-- Side Menu -->

      <!-- Main Content -->
      <main class="flex-1 px-4">
        <div class="w-full border-b border-gray-200 text-center">
          <div
            class="flex justify-start h-16 mx-auto overflow-x-auto md:overflow-visible">
            <div
              v-for="item in menu"
              :key="item"
              @click="selectCategory(item)"
              :class="[
                'cursor-pointer flex-shrink-0 transition-colors duration-500 flex items-center ease-in-out px-2 md:px-8 hover:bg-neutral-100 hover:text-black',
                currentView === item
                  ? ' text-lg text-slate-800 border-b-2 border-quaternary'
                  : 'text-slate-500',
              ]">
              {{ item }}
            </div>
          </div>
        </div>
        <MyMeetings
          v-if="currentView === 'Randevular'"
          :meetingsData="meetingsData"
          :loading="loading"
          :noMeeting="noMeeting"
          @cancel="handleCancelMeeting" />
        <MyAccount :userData= userData v-else-if="currentView === 'Hesap'" />
      </main>
    </div>
  </div>
</template>

<script setup>
import MyMeetings from "../components/MyMeetings.vue";
import MyAccount from "../components/MyAccount.vue";
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const store = useStore();
const userData = computed(() => store.getters.getUser);
const meetingsData = computed(() => store.getters.getMeetings);
const loading = ref(true);
const noMeeting = ref(false)

const currentView = ref("Randevular");

const selectCategory = (item) => {
  currentView.value = item;
};

const menu = ["Randevular", "Hesap"];

const handleCancelMeeting = async (id) => {
  console.log("Cancelling appointment");
  try {
    // Update the meeting status to 3
    await updateDoc(doc(db, "meetings", id), {
      status: "6",
    });
    console.log("Meeting cancelled successfully");
    //

    store.commit("updateMeetingStatus", { id, status: "6" });
  } catch (error) {
    console.error("Error cancelling meeting:", error);
  }
};

onMounted(async () => {
  console.log("profile page mounted");
  if (userData.value.meetings && meetingsData.value.length === 0) {
    await store.dispatch("fetchMeetingsData", {
      meetingIds: userData.value.meetings,
    });
    if (meetingsData.value.length > 0) {
      loading.value = false;
    }
    else if (meetingsData.value.length === 0){
      loading.value = false;
      noMeeting.value = true;
    }
  } else {
    loading.value = false;
  }
});
</script>
