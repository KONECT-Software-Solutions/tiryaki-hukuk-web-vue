<template>
  <div>
    <!-- HERO SECTION START -->
    <section class="relative hero-bg bg-cover bg-center h-[30vh] md:h-[50vh]">
      <div class="absolute inset-0 bg-black opacity-30"></div>
      <div
        class="relative container mx-auto md:px-16 px-8 py-12 flex flex-col items-center justify-end h-full">
        <h1 class="text-white text-4xl lg:text-5xl font-[700] mb-4">
          İletişim
        </h1>
      </div>
    </section>
    <!-- HERO SECTION END -->

    <!-- MAIN CONTENT START -->
    <div class="container mx-auto md:py-[7em] py-[2em] md:px-12 px-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 py-6">
        <div
          class="relative group border text-center p-12 lg:p-16 w-full flex items-center justify-center bg-white hover:bg-primary hover:bg-opacity-80 transition ease-in duration-300">
          <div class="group-hover:blur-sm flex flex-col space-y-4">
            <i
              class="ri-phone-fill text-7xl text-primary group-hover:text-white"></i>
            <p
              class="font-medium text-slate-800 text-xl group-hover:text-white">
              0 (224) 273 04 05
            </p>
            <p class="text-slate-700 font-light group-hover:text-white">
              Pazartesi - Cuma <br />
              08:00 - 16:00
            </p>
          </div>
          <button
            onclick="window.location.href='tel:+902242730405'"
            class="absolute opacity-0 group-hover:opacity-100 bg-white text-slate-700 px-4 py-2 rounded">
            Ara
          </button>
        </div>
        <div
          class="relative group border text-center p-12 lg:p-16 w-full flex items-center justify-center bg-white hover:bg-primary hover:bg-opacity-80 transition ease-in duration-300">
          <div class="group-hover:blur-sm flex flex-col space-y-4">
            <i
              class="ri-mail-send-fill text-7xl text-primary group-hover:text-white"></i>
            <p
              class="font-medium text-slate-800 text-xl group-hover:text-white">
              info@tiryakihukuk.com
            </p>
            <p class="text-slate-700 font-light group-hover:text-white">
              Mesai saatleri içerisinde dönüş yapılacaktır.
            </p>
          </div>
          <button
            onclick="window.location.href='mailto:info@tiryakihukuk.com'"
            class="absolute opacity-0 group-hover:opacity-100 bg-white text-slate-700 px-4 py-2 rounded">
            Mail At
          </button>
        </div>
        <div
          class="relative group border text-center p-12 lg:p-16 w-full flex items-center justify-center bg-white hover:bg-primary hover:bg-opacity-80 transition ease-in duration-300">
          <div class="group-hover:blur-sm flex flex-col space-y-4">
            <i
              class="ri-map-pin-fill text-7xl text-primary group-hover:text-white"></i>
            <p
              class="font-medium text-slate-800 text-xl group-hover:text-white">
              Nilüfer/BURSA
            </p>
            <p class="text-slate-700 font-light group-hover:text-white">
              F.S.M. Bulvarı No:96/3 Bahar Sitesi C Blok K:2 D:4 Nilüfer/BURSA
            </p>
          </div>
          <button
            onclick="window.location.href='https://www.google.com/maps/place/Tiryaki+Avukatlık+Bürosu/@40.2281329,28.9810869,21z/data=!4m14!1m7!3m6!1s0x14ca144729470daf:0x35a695c636f53151!2sTiryaki+Avukatlık+Bürosu!8m2!3d40.2281562!4d28.9810949!16s%2Fg%2F11ggrky39x!3m5!1s0x14ca144729470daf:0x35a695c636f53151!8m2!3d40.2281562!4d28.9810949!16s%2Fg%2F11ggrky39x?entry=ttu"
            class="absolute opacity-0 group-hover:opacity-100 bg-white text-slate-700 px-4 py-2 rounded">
            Yol Tarifi Al
          </button>
        </div>
      </div>
      <div class="flex flex-col md:flex-row">
        <!-- google maps section start -->
        <div class="hidden md:block flex-1 mb-4 md:mb-0 md:mr-4">
          <div
            id="map"
            class="border flex items-center justify-center h-full"></div>
        </div>
        <!-- google maps section end -->
        <div class="flex-1">
          <form class="border p-10 relative" @submit.prevent="handleSubmit">
            <div
              class="absolute inset-0 flex items-center justify-center bg-white bg-opacity-95"
              v-if="isLoading">
              <LoadingSpinner :text="'Mesaj gönderiliyor'" />
            </div>

            <div class="space-y-3 text-center mb-5">
              <div
                v-if="isSuccess"
                class="text-center text-sm md:text-base bg-slate-50 text-green-600 border border-green-400 rounded-md p-2">
                <p>E-mail başarıyla gönderildi</p>
              </div>
              <div
                v-if="isError"
                class="text-center text-sm md:text-base bg-slate-50 text-red-600 border border-red-400 rounded-md p-2">
                <p>E-mail gönderilemedi, tekrar deneyin</p>
              </div>
            </div>

            <div class="mb-4">
              <input
                type="text"
                placeholder="İsim"
                class="w-full px-3 py-2 border border-gray-300 rounded"
                required />
            </div>
            <div class="mb-4">
              <input
                type="email"
                placeholder="Email"
                class="w-full px-3 py-2 border border-gray-300 rounded"
                required />
            </div>
            <div class="mb-4">
              <input
                type="text"
                placeholder="Konu"
                class="w-full px-3 py-2 border border-gray-300 rounded"
                required />
            </div>
            <div class="mb-4">
              <textarea
                placeholder="Mesajınız"
                class="w-full px-3 py-2 border border-gray-300 h-24 rounded"></textarea>
            </div>
            <div class="flex items-center mb-4">
              <label for="terms" class="text-sm text-slate-500">
                Mesaj gönderdiğinizde Tiryaki Hukuk ve Arabuluculuk'un Kişisel
                Verilerin İşlenmesine Yönelik
                <router-link
                  :to="'/aydinlatma-metni'"
                  target="_blank"
                  class="text-blue-500">
                  KVKK Aydınlatma Metni
                </router-link>
                okumuş ve kabul etmiş olursunuz.
              </label>
            </div>
            <div class="flex justify-end">
              <button
                type="submit"
                class="bg-primary text-white py-[0.5rem] px-4">
                Mesajı Gönder
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- MAIN CONTENT END -->
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner.vue";

onMounted(() => {
  const mapOptions = {
    center: { lat: 40.22818, lng: 28.98144 }, // Center near the office
    zoom: 16,
  };

  try {
    // Initialize the map
    const map = new google.maps.Map(document.getElementById("map"), mapOptions);

    // Ensure that google.maps.places is available
    if (google.maps.places) {
      const placeId = "ChIJrw1HKUcUyhQRUTH1NsaVpjU"; // Replace with actual Place ID

      const service = new google.maps.places.PlacesService(map);
      service.getDetails({ placeId: placeId }, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          // Create a marker at the place
          const marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location,
            title: place.name,
          });

          // Optionally, add an info window with place details
          const infoWindow = new google.maps.InfoWindow({
            content: `<h4>${place.name}</h4><p>${place.formatted_address}</p>`,
          });

          marker.addListener("click", () => {
            infoWindow.open(map, marker);
          });
        } else {
          console.error("Place details request failed:", status);
        }
      });
    } else {
      console.error("Google Maps Places API not available.");
    }
  } catch (error) {
    console.error("Error initializing Google Maps:", error);
  }
});

const isLoading = ref(false);
const isSuccess = ref(false);
const isError = ref(false);

const handleSubmit = async (event) => {
  event.preventDefault();

  // Reset status before submission
  isLoading.value = true;
  isSuccess.value = false;
  isError.value = false;

  // Extract form data
  const formData = {
    name: event.target[0].value, // Get the name from the first input field
    email: event.target[1].value, // Get the email from the second input field
    subject: event.target[2].value, // Get the subject from the third input field
    message: event.target[3].value, // Get the message from the textarea
  };

  try {
    // Send the form data to the Lambda endpoint
    const response = await axios.post(
      "https://ykt7hblm31.execute-api.eu-north-1.amazonaws.com/prod/send-contact-form-email",
      formData
    );

    console.log("Email sent successfully:", response.data);
    isSuccess.value = true;
  } catch (error) {
    console.error("Error sending email:", error);
    isError.value = true;
  } finally {
    isLoading.value = false; // Stop loading once the request is completed
  }
};
</script>

<style scoped>
.hero-bg {
  background-image: url("../assets/images/contact-page-bg.webp");
}
</style>
