<template>
  <div
    class="mx-auto max-w-lg bg-white border border-gray-300 p-4 mb-4 space-y-3 relative">
    <div
      v-if="isLoading && appointmentProcessData.userData"
      class="absolute inset-0 flex items-center justify-center bg-white bg-opacity-95">
      <LoadingSpinner :text="''" />
    </div>

    <div>
      <!-- Header Section -->
      <div class="flex flex-col items-center text-center space-y-2">
        <i class="ri-calendar-check-fill text-8xl text-tertiary"></i>
        <p class="text-lg">
          Sayın
          <span class="font-medium">{{
            appointmentProcessData.userData.name
          }}</span
          >, randevunuz başarı ile alınmıştır.
        </p>
        <div class="w-full border-b border-gray-300 p-2 text-lg">
          Randevu Detayları
        </div>
        <div
          class="px-1 text-lg flex flex-col text-wrap md:text-nowrap items-center">
          <span>Randevu Tipi: {{ displayText }}</span>
          <span>
            Tarih: {{ appointmentProcessData.selectedDateForDisplay }}
            <span class="ml-1">{{ appointmentProcessData.selectedDay }}</span>
          </span>
          <div class="flex">
            Saat:
            <span
              class="flex ml-2 items-center text-nowrap bg-yellow-100 rounded-xl px-1 text-sm">
              <i class="ri-time-fill text-lg"></i
              >{{ appointmentProcessData.selectedSlot }} -
              {{ appointmentProcessData.formData.endTime }}
            </span>
          </div>
          <div class="text-lg">
            Avukat: {{ appointmentProcessData.attorneyData.name }}
          </div>
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
          class="bg-primary flex w-full justify-center items-center border border-primary text-white py-[0.7rem] px-5 hover:bg-white hover:text-primary hover:border-black transition duration-300">
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
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { db, storage } from "../firebase"; // Adjust the path as necessary
import axios from "axios";
import { add, sub } from "date-fns";

const store = useStore();

const isLoading = ref(true);

const props = defineProps(["appointmentProcessData"]);

const iconClass = computed(() => {
  switch (props.appointmentProcessData.formData.selectedType) {
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
  switch (props.appointmentProcessData.formData.selectedType) {
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

const uploadFilesToFireStore = async (uploadedFiles) => {
  const fileUrls = [];

  for (const fileObj of uploadedFiles) {
    try {
      const file = fileObj.file; // Get the actual File object
      // Create a storage reference using meetingId + file name
      const fileRef = storageRef(storage, `customer_documents/${file.name}`);

      // Use uploadBytes to handle the file binary data safely
      const snapshot = await uploadBytes(fileRef, file);

      // Get the download URL after upload
      const downloadUrl = await getDownloadURL(snapshot.ref);

      // Push the download URL to the array
      fileUrls.push(downloadUrl);
    } catch (error) {
      console.error(`Error uploading file ${file.name}:`, error);
      throw new Error("File upload failed.");
    }
  }

  return fileUrls; // Return an array of file URLs
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
const addException = async (exceptionData) => {
  console.log("Exception data to add:", exceptionData);
  try {
    const attorneyDocRef = doc(db, "attorneys", exceptionData.attorney_id);
    const attorneyDoc = await getDoc(attorneyDocRef);
    if (attorneyDoc.exists()) {
      const attorneyData = attorneyDoc.data();
      const exceptions = attorneyData.exceptions || [];
      delete exceptionData.attorney_id
      exceptions.push(exceptionData);
      await updateDoc(attorneyDocRef, { exceptions });
    }
  } catch (error) {
    console.error("Error fetching attorney by ID:", error);
  }
};


const saveMeeting = async (meetingData, addException_) => {
  
  console.log("saving meeting data");
  try {
    console.log("saving meeting data...");
    // Save the meeting data to the firebase database
    const meetingDocRef = await addDoc(collection(db, "meetings"), meetingData);
    // get meeting id
    if (addException_ === true){
      const meetingId = meetingDocRef.id;
      console.log("meetingId", meetingId);
      await addException({
            date: meetingData.date,
            startTime: meetingData.slot,
            endTime: meetingData.end_time,
            repeat: false,
            isMeeting: true,
            attorney_id: meetingData.attorney_id,
            meeting_id: meetingId,
          });
    }
    

    console.log("meeting data saved");
    // id of the saved document

    // Take meetingData, take user uid, go to user's document and add meetings array with meetingData as first element
    const userDocRef = doc(db, "users", props.appointmentProcessData.userData.uid);
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

const createAppointment = async () => {
  console.log("creating appointment...");

  //create date_time using date and slot
  const date_time = new Date(props.appointmentProcessData.selectedDate);
  const deadline = sub(date_time, { days: 1 });

  const [hours, minutes] = props.appointmentProcessData.selectedSlot
    .split(":")
    .map(Number);
  date_time.setHours(hours, minutes);

  const fileUrls = await uploadFilesToFireStore(
    props.appointmentProcessData.uploadedFiles
  ); // Wait for files to upload

  // Create the customer_documents array with URLs
  const customerDocuments = props.appointmentProcessData.uploadedFiles.map(
    (file, index) => ({
      file_url: fileUrls[index], // Use file URL after upload
      name: file.name,
      size: file.size,
      kind: file.type,
    })
  );

  const meetingData = {
    attorney_id: props.appointmentProcessData.attorneyData.id,
    customer_id: props.appointmentProcessData.userData.uid,
    attorney_name: props.appointmentProcessData.attorneyData.name,
    attorney_email: props.appointmentProcessData.attorneyData.email,
    category: props.appointmentProcessData.formData.selectedArea,
    customer_documents: customerDocuments,
    customer_email: props.appointmentProcessData.userData.email,
    customer_phone: props.appointmentProcessData.userData.phone,
    customer_name: props.appointmentProcessData.userData.name,
    date: props.appointmentProcessData.selectedDate,
    date_time: date_time,
    deadline: deadline,
    day: props.appointmentProcessData.selectedDay,
    slot: props.appointmentProcessData.selectedSlot,
    date_for_display: props.appointmentProcessData.selectedDateForDisplay,
    end_time: props.appointmentProcessData.formData.endTime,
    duration: props.appointmentProcessData.formData.selectedDuration,
    type: props.appointmentProcessData.formData.selectedType,
    price: props.appointmentProcessData.formData.price,
    payment_status: "0",
    meeting_url: "mock-meeting-url",
    notes: props.appointmentProcessData.notes,
    topic: props.appointmentProcessData.formData.topic,
    status: "0",
    appointment_token: props.appointmentProcessData.appointmentToken,
    payment_token: props.appointmentProcessData.paymentToken,
  };
  console.log(meetingData);

  saveMeeting(meetingData);
  // Send an email to the customer
  // uncomment
  sendAppointmentRecievedMail(meetingData);
};

const createMeetingUrl = async (start_time, attorney_email, customer_email) => {
  // iso format formatted again because the iso format that google accepts doesnt include the millisecond precision
  // uncomment after test
  const start_time_iso = start_time.toISOString().split(".")[0] + "Z"; // Manually add "Z" to indicate UTC
  console.log("start_time_iso", start_time_iso);
  
  try {
    const response = await axios.post(
      "https://ykt7hblm31.execute-api.eu-north-1.amazonaws.com/prod/create-meeting",
      {
        start_time: start_time_iso,
        attorney_email: attorney_email,
        customer_email: customer_email,
      }
    );
    const meetLink = JSON.parse(response.data.body)["meet_link"];
    console.log("response data", JSON.parse(response.data.body)["meet_link"]); // I get the response data successfully
    console.log("Meeting created successfully");
    console.log("meetLink", meetLink);
    return meetLink; // Return the meeting link here
  } catch (error) {
    if (error.response) {
      // Log detailed error response from the server
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
      console.error("Error response headers:", error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
    } else {
      // Something else caused the error
      console.error("Error setting up the request:", error.message);
    }
  }
};
const sendMeetingAcceptedEmail = async (meetingData) => {
  console.log("sending meeting accepted mail");
  try {
    const response = await axios.post(
      "https://ykt7hblm31.execute-api.eu-north-1.amazonaws.com/prod/send-meeting-accepted-email",
      {
        customer_name: meetingData.customer_name,
        attorney_name: meetingData.attorney_name,
        date_for_display: meetingData.date_for_display,
        day: meetingData.day,
        slot: meetingData.slot,
        end_time: meetingData.end_time,
        email: meetingData.customer_email,
        meeting_url: meetingData.meeting_url,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    console.log("Meeting accepted email sent successfully");
  } catch (error) {
    console.error("Error sending appointment recieved email:", error);
  }
};

const createMeeting = async () => {
  console.log("creating meeting...");

  //create date_time using date and slot
  const date_time = new Date(props.appointmentProcessData.selectedDate);
  const deadline = sub(date_time, { days: 1 });

  const [hours, minutes] = props.appointmentProcessData.selectedSlot
    .split(":")
    .map(Number);
  date_time.setHours(hours, minutes);
  console.log("calling create meeting url on create meeting function")
  const meetingUrl = await createMeetingUrl(
    date_time,
    props.appointmentProcessData.attorneyData.email,
    props.appointmentProcessData.userData.email
  );

  const fileUrls = await uploadFilesToFireStore(
    props.appointmentProcessData.uploadedFiles
  ); // Wait for files to upload

  // Create the customer_documents array with URLs
  const customerDocuments = props.appointmentProcessData.uploadedFiles.map(
    (file, index) => ({
      file_url: fileUrls[index], // Use file URL after upload
      name: file.name,
      size: file.size,
      kind: file.type,
    })
  );

  const meetingData = {
    attorney_id: props.appointmentProcessData.attorneyData.id,
    customer_id: props.appointmentProcessData.userData.uid,
    attorney_name: props.appointmentProcessData.attorneyData.name,
    attorney_email: props.appointmentProcessData.attorneyData.email,
    category: props.appointmentProcessData.formData.selectedArea,
    customer_documents: customerDocuments,
    customer_email: props.appointmentProcessData.userData.email,
    customer_phone: props.appointmentProcessData.userData.phone,
    customer_name: props.appointmentProcessData.userData.name,
    date: props.appointmentProcessData.selectedDate,
    date_time: date_time,
    deadline: deadline,
    day: props.appointmentProcessData.selectedDay,
    slot: props.appointmentProcessData.selectedSlot,
    date_for_display: props.appointmentProcessData.selectedDateForDisplay,
    end_time: props.appointmentProcessData.formData.endTime,
    duration: props.appointmentProcessData.formData.selectedDuration,
    type: props.appointmentProcessData.formData.selectedType,
    price: props.appointmentProcessData.formData.price,
    payment_status: "1",
    meeting_url: meetingUrl,
    notes: props.appointmentProcessData.notes,
    topic: props.appointmentProcessData.formData.topic,
    status: "1",
    appointment_token: props.appointmentProcessData.appointmentToken,
    payment_token: props.appointmentProcessData.paymentToken,
  };
  console.log("meeting data", meetingData);
  saveMeeting(meetingData, true);

  // Send an email to the customer
  // uncomment
  sendMeetingAcceptedEmail(meetingData);
};

onMounted(async () => {
  console.log("AppointmentStep5 component mounted");

  if (props.appointmentProcessData.in24Hours === false) {
    console.log("creating appointment because !in24Hours");
    // wait 1 second before creating the meeting
    setTimeout(() => {
      createAppointment();
      isLoading.value = false;
    }, 1000);
  } else if (
    props.appointmentProcessData.in24Hours === true &&
    props.appointmentProcessData.paymentStatus === "success"
  ) {
    console.log("creating meeting because in24Hours");
    createMeeting();
    isLoading.value = false;
  }
});
</script>

<style scoped>
/* Add any additional custom styling here */
</style>
