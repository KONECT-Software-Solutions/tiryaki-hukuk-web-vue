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
        <img src="../assets/icons/check.png" alt="Icon" class="w-48 h-48 mb-5" />
        <MessageWrapper type="success">
          Randevunuz başarı ile alındı.
        </MessageWrapper>
        <MessageWrapper type="normal">
          Sayın
          <span class="font-semibold">{{
            appointmentProcessData.userData.name
          }}</span
          >,
          <span class="font-semibold">{{
            appointmentProcessData.selectedDateForDisplay
          }}</span>
          <span
            class="items-center text-nowrap bg-yellow-100 rounded-xl px-2 py-1.5 font-semibold text-sm">
            <i class="ri-time-fill text-lg"></i
            >{{ appointmentProcessData.selectedSlot }} -
            {{ appointmentProcessData.formData.endTime }}
          </span>
          tarihli
          <span class="font-semibold">{{ selectedOption.text }}</span>
          randevunuz başarı ile alınmıştır. Görüşme saatinde avukatımız
          <span class="font-semibold">{{
            appointmentProcessData.attorneyData.name
          }}</span>
          sizi bekliyor olacaktır.
        </MessageWrapper>
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
import MessageWrapper from "../wrappers/MessageWrapper.vue";
import { doc, getDoc, addDoc, collection, updateDoc } from "firebase/firestore";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { db, storage } from "../firebase";
import axios from "axios";
import { sub } from "date-fns";

const store = useStore();

const props = defineProps(["appointmentProcessData"]);

const isLoading = ref(true);

// Display options
const displayOptions = {
  video: { text: "Online Video Görüşme", icon: "ri-video-on-line" },
  phone: { text: "Telefonla Görüşme", icon: "ri-phone-line" },
  inPerson: { text: "Yüz Yüze Görüşme", icon: "ri-user-line" },
};

const selectedOption = computed(() => {
  const type = props.appointmentProcessData.formData.selectedType || "default";
  return (
    displayOptions[type] || { text: "Belirtilmemiş", icon: "ri-question-line" }
  );
});
// Helper function to upload files
const uploadFilesToFireStore = async (uploadedFiles) => {
  console.log("uploading files");
  const fileUrls = [];
  for (const fileObj of uploadedFiles) {
    try {
      const file = fileObj.file;
      const fileRef = storageRef(storage, `customer_documents/${file.name}`);
      const snapshot = await uploadBytes(fileRef, file);
      const downloadUrl = await getDownloadURL(snapshot.ref);
      fileUrls.push(downloadUrl);
    } catch (error) {
      console.error(`Error uploading file ${fileObj.name}:`, error);
      throw new Error("File upload failed.");
    }
  }
  return fileUrls;
};

// Helper function to send emails
const sendEmail = async (url, data) => {
  return null;
  try {
    const response = await axios.post(url, data, {
      headers: { "Content-Type": "application/json" },
    });
    console.log(`Email sent successfully to ${data.email}`, response.data);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// Helper function to handle Firestore updates (exceptions, meeting save)
const saveDataToFirestore = async (docRef, fieldName, newData) => {
  console.log("saving exception data", newData);
  return null;
  try {
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      const docData = docSnapshot.data();
      const fieldData = docData[fieldName] || [];
      fieldData.push(newData);
      await updateDoc(docRef, { [fieldName]: fieldData });
    }
  } catch (error) {
    console.error(`Error updating Firestore for ${fieldName}:`, error);
  }
};

// Helper function to handle meeting data
const saveMeeting = async (meetingData, addException = false) => {
  try {
    console.log("Saving meeting data...", meetingData);
    const meetingDocRef = await addDoc(collection(db, "meetings"), meetingData);
    const meetingId = meetingDocRef.id;
    if (addException) {
      await saveDataToFirestore(
        doc(db, "attorneys", meetingData.attorney_id),
        "exceptions",
        {
          date: meetingData.date,
          startTime: meetingData.slot,
          endTime: meetingData.end_time,
          repeat: false,
          isMeeting: true,
          meeting_id: meetingId
        }
      );
    }

    // Update user with meeting reference
    const userDocRef = doc(
      db,
      "users",
      props.appointmentProcessData.userData.uid
    );
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      const userData_ = userDoc.data();
      const meetings = userData_.meetings || [];
      meetings.push(meetingId);
      await updateDoc(userDocRef, { meetings });
      console.log("Adding meetingId to userData")
      store.commit("updateUserDataMeetings", meetingId);
    }
  } catch (error) {
    console.error("Error saving meeting:", error);
  }
};

// Combine appointment creation logic
const handleAppointmentCreation = async (
  meetingData,
  createMeeting = false
) => {
  try {
    // Show status message to user for file uploads
    const fileUrls = await uploadFilesToFireStore(
      props.appointmentProcessData.uploadedFiles
    );
    meetingData.customer_documents =
      props.appointmentProcessData.uploadedFiles.map((file, index) => ({
        file_url: fileUrls[index],
        name: file.name,
        size: file.size,
        kind: file.type,
      }));

    const date_time = new Date(meetingData.date);
    const [hours, minutes] = meetingData.slot.split(":").map(Number);
    date_time.setHours(hours, minutes);
    const deadline = sub(date_time, { days: 1 });
    // If it's a meeting creation, generate a real meeting URL
    if (createMeeting) {
      meetingData.meeting_url = await createMeetingUrl(
        date_time,
        meetingData.attorney_email,
        meetingData.customer_email
      );
      meetingData.payment_status = "1"; // For meeting creation, payment is complete
      meetingData.status = "1"; // Meeting has been successfully created
    } else {
      // For appointment creation, use a mock URL and set payment_status and status to 0
      meetingData.meeting_url = "mock-meeting-url";
      meetingData.payment_status = "0";
      meetingData.status = "0";
    }
    meetingData.date_time = date_time;
    meetingData.deadline = deadline;
    // Show status message for saving meeting
    console.log("meeting data to save", meetingData);
    await saveMeeting(meetingData, createMeeting);

    const emailData = {
      customer_name: meetingData.customer_name,
      attorney_name: meetingData.attorney_name,
      date_for_display: meetingData.date_for_display,
      day: meetingData.day,
      slot: meetingData.slot,
      end_time: meetingData.end_time,
      email: meetingData.customer_email,
      meeting_url: meetingData.meeting_url,
    };
    // Send the appropriate email
    const emailType = createMeeting
      ? "send-meeting-accepted-email"
      : "send-appointment-recieved-email";
    sendEmail(
      `https://ykt7hblm31.execute-api.eu-north-1.amazonaws.com/prod/${emailType}`,
      emailData
    );

    console.log("Appointment successfully created.");
    store.commit("setAppointmentProcessData", { isFinished: true });
    console.log("Appointment process set to finished.");

    return true;
  } catch (error) {
    console.error("Error creating appointment:", error);
  }
};

// API to create a meeting link (conditionally used for meetings)
const createMeetingUrl = async (start_time, attorney_email, customer_email) => {
  return "mock-meeting-url";
  const start_time_iso = start_time.toISOString().split(".")[0] + "Z";
  try {
    const response = await axios.post(
      "https://ykt7hblm31.execute-api.eu-north-1.amazonaws.com/prod/create-meeting",
      { start_time: start_time_iso, attorney_email, customer_email }
    );
    return JSON.parse(response.data.body)["meet_link"];
  } catch (error) {
    console.error("Error creating meeting URL:", error);
  }
};

// Appointment creation flow
onMounted(async () => {
  console.log("AppointmentStep5 component mounted");

  const { in24Hours, paymentStatus, isFinished } = props.appointmentProcessData;

  const meetingData = {
    attorney_id: props.appointmentProcessData.attorneyData.id,
    customer_id: props.appointmentProcessData.userData.uid,
    attorney_name: props.appointmentProcessData.attorneyData.name,
    attorney_email: props.appointmentProcessData.attorneyData.email,
    category: props.appointmentProcessData.formData.selectedArea,
    customer_email: props.appointmentProcessData.userData.email,
    customer_phone: props.appointmentProcessData.userData.phone,
    customer_name: props.appointmentProcessData.userData.name,
    date: props.appointmentProcessData.selectedDate,
    date_for_display: props.appointmentProcessData.selectedDateForDisplay,
    end_time: props.appointmentProcessData.formData.endTime,
    duration: props.appointmentProcessData.formData.selectedDuration,
    type: props.appointmentProcessData.formData.selectedType,
    price: props.appointmentProcessData.formData.price,
    slot: props.appointmentProcessData.selectedSlot,
    day: props.appointmentProcessData.selectedDay,
    topic: props.appointmentProcessData.formData.topic,
    notes: props.appointmentProcessData.notes,
    payment_token: props.appointmentProcessData.paymentToken,
    appointment_token: props.appointmentProcessData.appointmentToken,
  };
  if (isFinished) {
    console.log("Appointment process already finished");
    isLoading.value = false;
    return;
  }
  if (!in24Hours) {
    console.log("Creating appointment (not in 24 hours)");
    handleAppointmentCreation(meetingData);
  } else if (in24Hours && paymentStatus === "success") {
    console.log("Creating meeting (in 24 hours with payment success)");
    handleAppointmentCreation(meetingData, true);
  }

  isLoading.value = false;
});
</script>

<style scoped>
/* Add any additional custom styling here */
</style>
