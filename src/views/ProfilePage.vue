<template>
  <div>
    <section class="relative bg-cover bg-center h-20 md:h-28">
      <div class="absolute inset-0 bg-[rgb(34,40,49)]"></div>
    </section>

    <div class="flex min-h-screen pb-4 md:pb-8 px-0 md:px-20 lg:px-32 2xl:px-60 bg-gray-100">
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

const handleCancelMeeting = async (meetingId, attorneyId) => {
  console.log("Cancelling appointment");
  try {
    // Update the meeting status to "6"
    await updateDoc(doc(db, "meetings", meetingId), {
      status: "6",
      cancel_reason: "Randevu danışan tarafından iptal edildi.",
    });
   
    console.log("Meeting cancelled successfully");

    console.log("delete exception from attorney");
    // Now we need to go to the attorney's document and remove the exception that has meetingId === meetingId
    const attorneyDocRef = doc(db, "attorneys", attorneyId);
    const attorneySnapshot = await getDoc(attorneyDocRef);

    if (attorneySnapshot.exists()) {
      const attorneyData = attorneySnapshot.data();
      const exceptions = attorneyData.exceptions || [];  // Get the exceptions array
      console.log("Attorney's exceptions array:", exceptions);
      // Filter out the exception that matches the meetingId
      const updatedExceptions = exceptions.filter(
        (exception) => exception.meetingId !== meetingId
      );
      console.log("Updated exceptions array:", updatedExceptions);
      // Update the attorney's document with the new exceptions array
      await updateDoc(attorneyDocRef, {
        exceptions: updatedExceptions,
      });

      console.log("Exception removed from attorney's exceptions array");
    } else {
      console.error("Attorney document does not exist");
    }

    // Update Vuex or other state management
    store.commit("updateMeetingStatus", { id: meetingId, status: "6" });

  } catch (error) {
    console.error("Error cancelling meeting:", error);
  }
};

onMounted(async () => {
  console.log("profile page mounted");
  console.log("meetingsData", meetingsData.value);
  if (userData.value.meetings && meetingsData.value.length === 0) {
    console.log("fetching meetings data");
    console.log("userData", userData.value.meetings);
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
  console.log("meetingsData", meetingsData.value);
});
</script>
