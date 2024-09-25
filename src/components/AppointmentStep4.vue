<template>
  <div
    class="mx-auto max-w-lg bg-white border border-gray-300 p-4 mb-4 space-y-3 relative">
    <div
      v-if="isCreatingMeeting && userData"
      class="absolute inset-0 flex items-center justify-center bg-white bg-opacity-95">
      <LoadingSpinner :text="'Randevu oluşturuluyor'" />
    </div>

    <div>
      <!-- Header Section -->
      <div class="flex flex-col items-center text-center space-y-2">
        <i class="ri-calendar-check-fill text-8xl text-tertiary"></i>
        <p class="text-lg font-medium">
          Sayın <span class="font-semibold">{{ userData.name }}</span
          >, randevunuz başarı ile alınmıştır.
        </p>
        <div class="w-full border-b border-gray-300 p-2 text-lg">
          Randevu Detayları
        </div>
        <div
          class="px-1 text-lg flex flex-col text-wrap md:text-nowrap items-center">
          <span>Randevu Tipi: {{ displayText }}</span>
          <span>
            Tarih: {{ formData.dateForDisplay }}
            <span class="ml-1">{{ formData.day }}</span>
          </span>
          <div class="flex">
            Saat:
            <span
              class="flex ml-2 items-center text-nowrap bg-yellow-100 rounded-xl px-1 text-sm">
              <i class="ri-time-fill text-lg"></i>{{ formData.slot }} -
              {{ formData.endTime }}
            </span>
          </div>
          <div class="text-lg">Avukat: {{ attorneyData.name }}</div>
        </div>
      </div>
      <div class="flex flex-col space-y-3 mt-2 items-center">
        <!-- Reminders Section -->
        <div class="space-y-3 text-center">
          <div
            class="text-center text-sm md:text-base border bg-slate-50 text-slate-600 border-slate-300 rounded-md p-2">
            <p>
              Görüşmeden 24 saat önce randevunuzun ödemesini tamamlamanız
              gerekmektedir. Aksi takdirde görüşmeniz iptal edilecektir.
              Ödemenizi Randevularım sayfasından yapabilirsiniz.
            </p>
          </div>
          <div
            class="text-center text-sm md:text-base border bg-slate-50 text-slate-600 border-slate-300 rounded-md p-2">
            <p>
              Toplantı detayları ve hatırlatma maili e-postanıza
              gönderilecektir. Ayrıca Randevularım sayfasından da görüşmeye
              katılabilirsiniz.
            </p>
          </div>
        </div>

        <!-- Action Buttons Section -->
        <router-link
          :to="'/hesabim'"
          class="bg-primary text-white py-[0.5rem] px-4">
          Randevularım
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useStore } from "vuex";
import LoadingSpinner from "./LoadingSpinner.vue";
import { doc, getDoc, addDoc, collection, updateDoc } from "firebase/firestore";
import { db } from "../firebase"; // Adjust the path as necessary
import axios from "axios";
import { sub } from "date-fns";

const store = useStore();
const userData = computed(() => store.getters.getUser);

const isCreatingMeeting = ref(true);

const props = defineProps({
  formData: Object,
  attorneyData: Object,
  uploadedFiles: Object,
});

const iconClass = computed(() => {
  switch (props.formData.selectedType) {
    case "video":
      return "ri-video-on-line";
    case "phone":
      return "ri-phone-line";
    case "inPerson":
      return "ri-user-line";
    // Add more cases as needed
    default:
      return "ri-question-line"; // Default icon
  }
});

const displayText = computed(() => {
  switch (props.formData.selectedType) {
    case "video":
      return "Online Video Görüşme";
    case "phone":
      return "Telefonla Görüşme";
    case "inPerson":
      return "Yüz Yüze Görüşme";
    // Add more cases as needed
    default:
      return "Belirtilmemiş"; // Default text
  }
});

const fetchUserData = async (uid) => {
  console.log("fetching user data...");
  try {
    const userDocRef = doc(db, "users", uid);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      userData.value = userDoc.data();
    }
  } catch (error) {
    console.error("Error fetching user data by ID:", error);
  }
};

const uploadFilesToFireStore = () => {
  console.log("uploading files to firestore...");
  return "firebase url";
};

const sendAppointmentRecievedMail = async (meetingData) => {
  try {
    const response = await axios.post(
      "https://ykt7hblm31.execute-api.eu-north-1.amazonaws.com/prod/send-appointment-recieved-email",
      {
        customer_name: meetingData.customer_name,
        attorney_name: meetingData.attorney_name,
        date_for_display: meetingData.date_for_display,
        day: meetingData.day,
        slot: meetingData.slot,
        end_time: meetingData.end_time,
        email: meetingData.customer_email,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(meetingData);
    console.log(response.data);
  } catch (error) {
    console.error("Error sending meeting accepted email:", error);
  }
};
// api key for google meet AIzaSyCl6q_iRFcgsH2CosKjx9MjVmExK6jNXeU



const saveMeeting = async (meetingData) => {
  try {
    console.log("saving meeting data...");
    // Save the meeting data to the firebase database
    const meetingDocRef = await addDoc(collection(db, "meetings"), meetingData);
    console.log("meeting data saved");
    // id of the saved document

    // Take meetingData, take user uid, go to user's document and add meetings array with meetingData as first element
    const userDocRef = doc(db, "users", userData.value.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userData_ = userDoc.data();
      const meetings = userData_.meetings || [];
      meetings.push(meetingDocRef.id);
      await updateDoc(userDocRef, { meetings });
      await store.dispatch("fetchMeetingsData", {
        meetingIds: meetings,
      });
      // update meetings state in Vuex
    }
  } catch (error) {
    console.error("Error saving meeting data:", error);
    alert("Error saving meeting data: " + error.message);
  }
};

const createMeeting = async () => {
  console.log("creating meeting...");

  //create date_time using date and slot
  const date_time = new Date(props.formData.date);
  const deadline = sub(date_time, { days: 1 })

  const [hours, minutes] = props.formData.slot.split(":").map(Number);
  date_time.setHours(hours, minutes);

  console.log("uploading files");
  const fileUrls = await uploadFilesToFireStore(); // Assuming this function uploads files and returns an array of URLs

  console.log("meeting created");

  // Create the customer_documents array
  const customerDocuments = props.uploadedFiles.map((file, index) => ({
    file_url: fileUrls[index], // Assuming fileUrls is an array and matches the order of uploadedFiles
    name: file.name,
    size: file.size,
    kind: file.type,
  }));

  const meetingData = {
    attorney_id: props.attorneyData.id,
    customer_id: userData.value.uid,
    attorney_name: props.attorneyData.name,
    attorney_email: props.attorneyData.email,
    category: props.formData.selectedArea,
    customer_documents: customerDocuments,
    customer_email: userData.value.email,
    customer_phone: userData.value.phone,
    customer_name: userData.value.name,
    date: props.formData.date,
    date_time: date_time,
    deadline: deadline,
    day: props.formData.day,
    slot: props.formData.slot,
    date_for_display: props.formData.dateForDisplay,
    end_time: props.formData.endTime,
    duration: props.formData.selectedDuration,
    type: props.formData.selectedType,
    price: props.formData.price,
    payment_status: "0",
    meeting_url: "mock-meeting-url",
    notes: props.formData.notes,
    topic: props.formData.topic,
    status: "0",
  };
  saveMeeting(meetingData);
  console.log(props.formData);

  // Send an email to the customer
  //sendAppointmentRecievedMail(meetingData);
};

onMounted(async () => {
  console.log("AppointmentStep4 component mounted");

  if (props) {
    // wait 1 second before creating the meeting
    setTimeout(() => {
      createMeeting();
      isCreatingMeeting.value = false;
    }, 1000);
  }
});
</script>

<style scoped>
/* Add any additional custom styling here */
</style>
