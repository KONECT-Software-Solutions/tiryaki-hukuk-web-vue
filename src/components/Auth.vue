<!-- 
 1- bu componentte aynı e mail ile üyelik açma ile ilgili bir problem
 2- diğer problem ise e mail doğruladıktan sonra ve hesabı oluşturduktan sonra tekrar giriş yap ekranına atıyoruz ama oraya 
 atarken zaten signIn yapıyor.
-->
<template>
  <div v-if="!showConfirm && !showAfterConfirm" class="flex flex-col space-y-3">
    <div class="flex-1 bg-white p-4 border border-gray-300">
      <h2 class="text-center text-lg font-medium mb-4">Üyeliğiniz var mı?</h2>
      <button
        v-if="!showSignIn"
        @click="(showSignIn = true), (showRegister = false)"
        type="submit"
        class="w-full bg-primary text-white py-2">
        Giriş Yap
      </button>
      <form v-if="showSignIn" @submit.prevent="handleSignIn">
        <div
          v-if="loginErrorMessage"
          class="text-center text-red-600 border border-red-400 rounded-md p-2 mb-4">
          {{ loginErrorMessage }}
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">Email*</label>
          <input
            type="email"
            v-model="emailSingIn"
            class="w-full p-2 border border-gray-300 rounded"
            required />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">Şifre*</label>
          <input
            type="password"
            v-model="passwordSignIn"
            class="w-full p-2 border border-gray-300 rounded"
            required />
        </div>
        <div class="flex text-slate-600 justify-between mb-4">
          <div class="flex space-x-2">
            <input
              id="rememberMe"
              v-model="rememberMe"
              type="checkbox"
              class="p-2 border border-gray-300 rounded" />
            <label for="rememberMe" class="block text-sm font-medium mb-2"
              >Beni hatırla</label
            >
          </div>
          <div class="flex items-center justify-between">
            <button
              @click="handleForgotPw"
              type="button"
              class="text-sm font-medium">
              Şifremi unuttum?
            </button>
          </div>
        </div>

        <button
          type="submit"
          class="w-full bg-primary text-white py-2"
          v-if="!isLoading">
          Giriş Yap
        </button>
        <div v-else class="w-full bg-primary text-white py-2">
          <LoadingSpinner :text="'Giriş Yapılıyor'" />
        </div>
      </form>
    </div>

    <div class="flex-1 bg-white p-4 border border-gray-300">
      <h2 class="text-center text-lg font-medium mb-4">Üyeliğiniz yok mu?</h2>
      <button
        v-if="!showRegister"
        @click="(showRegister = true), (showSignIn = false)"
        class="w-full bg-quaternary text-white py-2">
        Kayıt Ol
      </button>
      <form
        v-else-if="showRegister"
        @submit.prevent="handleRegister"
        class="space-y-4">
        <div
          v-if="registerErrorMessage"
          class="text-center text-red-600 border border-red-400 rounded-md p-2 mb-4">
          {{ registerErrorMessage }}
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">Ad*</label>
          <input
            v-model="firstName"
            type="text"
            class="w-full p-2 border border-gray-300 rounded"
            required />
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">Soyad*</label>
          <input
            v-model="lastName"
            type="text"
            class="w-full p-2 border border-gray-300 rounded"
            required />
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">Telefon*</label>
          <div class="flex items-center">
            <div
              class="flex-shrink-0 inline-flex items-center py-2.5 px-4 text-sm rounded rounded-r-none font-medium border border-gray-300 text-center text-gray-900 bg-gray-100">
              <img
                src="../assets/icons/turkey-flag.png"
                alt="Icon"
                class="w-5 h-5 mr-1" />
              +90
            </div>
            <div class="relative w-full">
              <input
                type="text"
                v-model="phone"
                id="phone-input"
                class="w-full p-2 border border-l-0 rounded rounded-l-none border-gray-300"
                placeholder="5551234567"
                maxlength="10"
                required />
            </div>
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">Email*</label>
          <input
            v-model="emailRegistiration"
            type="email"
            class="w-full p-2 border border-gray-300 rounded"
            required />
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">Email doğrulama*</label>
          <input
            v-model="confirmEmail"
            type="re-email"
            class="w-full p-2 border border-gray-300 rounded"
            required />
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">Şifre*</label>
          <input
            v-model="passwordRegistiration"
            type="password"
            class="w-full p-2 border border-gray-300 rounded"
            required />
        </div>

        <div>
          <input
            id="kvkk"
            type="checkbox"
            class="p-2 border mr-1 border-gray-300 rounded"
            required />
          <label for="kvkk" class="text-sm text-slate-500">
            Tiryaki Hukuk ve Arabuluculuk'un Kişisel Verilerin İşlenmesine
            Yönelik
            <router-link :to="'/kvkk'" target="_blank" class="text-blue-500">
              KVKK Aydınlatma Metni'ni </router-link
            >okudum ve kabul ediyorum.
          </label>
        </div>
        <button
          type="submit"
          class="w-full bg-quaternary text-white py-2"
          v-if="!isLoading">
          Kayıt Ol
        </button>
        <LoadingSpinner v-else />
      </form>
    </div>
  </div>
  <div v-if="showConfirm" class="flex flex-col space-y-3">
    <div class="flex-1 bg-white p-4 border border-gray-300 rounded-md">
      <div
        v-if="isCreatingUser"
        class="absolute inset-0 flex items-center m-4 justify-center bg-white bg-opacity-65">
        <LoadingSpinner :text="''" />
      </div>
      <div
        v-if="confirmationErrorMessage"
        class="text-center text-red-600 border border-red-400 rounded-md p-2 mb-4">
        {{ confirmationErrorMessage }}
      </div>
      <div
        v-if="confirmationSuccessMessage"
        class="text-center text-green-600 border border-green-400 rounded-md p-2 mb-4">
        {{ confirmationSuccessMessage }}
      </div>
      <div class="mb-4">
        <label class="block text-lg font-medium mb-2"
          >E-posta doğrulaması*</label
        >
        <p class="mb-2 text-gray-700">
          Lütfen
          <span class="font-bold text-black">{{ emailRegistiration }}</span>
          adresine gönderdiğimiz doğrulama kodunu giriniz.
        </p>

        <input
          type="verificationCode"
          v-model="verificationCode"
          class="w-full p-2 border border-gray-300 rounded"
          placeholder="Doğrulama kodu..."
          required />
      </div>
      <div>
        <div class="mb-4 flex justify-between items-center">
          <div class="text-gray-500 flex items-center">
            <i class="ri-time-fill mr-1 text-xl"></i>
            <span v-if="!isResendActive"> {{ counter }} saniye </span>
            <span v-else> 0 saniye </span>
          </div>
          <div class="flex items-center text-gray">
            <i class="ri-restart-line mr-1 text-xl"></i>
            <span v-if="!isResendActive" class=""> Tekrar gönder </span>
            <a
              v-else
              href="#"
              class="text-blue-500 font-medium"
              @click="handleResendCode">
              Tekrar gönder
            </a>
          </div>
        </div>
      </div>
      <button
        @click="handleConfirmation"
        class="w-full bg-[#6a994e] text-white py-2">
        Doğrula
      </button>
    </div>
  </div>
  <div v-if="showAfterConfirm" class="flex flex-col space-y-3">
    <div class="flex-1 bg-white p-4 border border-gray-300 rounded-md">
      <div
        class="text-center text-green-600 border border-green-400 rounded-md p-2 mb-4">
        Hesabınız başarıyla oluşturuldu ve giriş yapıldı.
      </div>
    </div>
  </div>
</template>

<script setup>
import LoadingSpinner from "./LoadingSpinner.vue";
import { onMounted, ref } from "vue";
import { auth, db } from "../firebase"; // Adjust the path as necessary
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import axios from "axios";
import { useStore } from "vuex";

const emits = defineEmits(["emailVerified", "signedIn", "forgotPw"]);

const store = useStore();

const showRegister = ref(false);
const showSignIn = ref(true);
const showConfirm = ref(false);
const showAfterConfirm = ref(false);
const isLoading = ref(false);
const isCreatingUser = ref(false);

const loginErrorMessage = ref("");
const registerErrorMessage = ref("");
const confirmationErrorMessage = ref("");
const confirmationSuccessMessage = ref("");

const firstName = ref("");
const lastName = ref("");
const phone = ref("");
const emailRegistiration = ref("");
const confirmEmail = ref("");
const passwordRegistiration = ref("");
const verificationCode = ref("");
let verificationCodetoSend = Math.floor(
  100000 + Math.random() * 900000
).toString();

const emailSingIn = ref("");
const passwordSignIn = ref("");
const rememberMe = ref(false);
// Define the countdown timer duration in seconds
const countdownDuration = 300; // 5 minutes in seconds
let countdownInterval = null; // Declare interval reference outside

// Reactive state
const counter = ref(countdownDuration);
const isResendActive = ref(false);

const handleResendCode = async () => {
  // Generate a new verification code
  verificationCodetoSend = Math.floor(
    100000 + Math.random() * 900000
  ).toString();

  // Reset the counter and button
  isResendActive.value = false;
  counter.value = countdownDuration;

  try {
    // Send the new verification email
    await sendVerificationEmail(
      emailRegistiration.value,
      verificationCodetoSend
    );

    console.log("New verification email sent successfully");
    confirmationSuccessMessage.value = "Yeni doğrulama kodu gönderildi.";
    confirmationErrorMessage.value = null;
  } catch (error) {
    console.error("Error resending verification email:", error);
    confirmationSuccessMessage.value = null;
    confirmationErrorMessage.value =
      "Yeni doğrulama kodu gönderilemedi. Lütfen tekrar deneyin.";
  }
};

const startCountdown = () => {
  // Clear any existing interval to avoid multiple intervals running
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }

  countdownInterval = setInterval(() => {
    if (counter.value > 0) {
      counter.value--;
    } else {
      isResendActive.value = true;
      clearInterval(countdownInterval); // Clear the interval once done
    }
  }, 1000); // Use 1000 ms (1 second) for accurate countdown timing
};

const createUser = async () => {
  isCreatingUser.value = true;
  console.log("Creating user...");
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      emailRegistiration.value,
      passwordRegistiration.value
    );
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      email: emailRegistiration.value,
      name: `${firstName.value} ${lastName.value}`,
      phone: phone.value,
    });
    console.log("User created successfully");

    setTimeout(() => {
      isCreatingUser.value = false;
      showConfirm.value = false;
      showAfterConfirm.value = true;
      emits("signedIn");
    }, 2000);
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      confirmationSuccessMessage.value = null;
      confirmationErrorMessage.value =
        "Bu email adresi zaten kullanımda. Lütfen başka bir email adresi deneyin.";
      console.log(error);
      isCreatingUser.value = false;
    } else {
      console.error("Error creating user:", error);
      confirmationSuccessMessage.value = null;
      confirmationErrorMessage.value =
        "Kullanıcı oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.";
      isCreatingUser.value = false;
    }
  }
};

const sendVerificationEmail = async (emailRegistiration, verificationCode) => {
  try {
    const response = await axios.post(
      "https://ykt7hblm31.execute-api.eu-north-1.amazonaws.com/prod/send-verification-email",
      {
        email: emailRegistiration,
        verification_code: verificationCode,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    startCountdown();
    console.log(response.data);
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};

const handleRegister = async () => {
  window.scrollTo(0, 0);
  isLoading.value = true; // show loading spinner
  registerErrorMessage.value = ""; // Reset error message
  const phoneRegex = /^\d{10}$/;
  // phone regex for 5555545226

  if (!phoneRegex.test(phone.value)) {
    registerErrorMessage.value =
      "Geçersiz telefon numarası. Tekrar deneyin. Örnek: 5555555555";
    isLoading.value = false;
    return;
  }

  // Validate email match and format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (
    !emailRegex.test(emailRegistiration.value) ||
    !emailRegex.test(confirmEmail.value)
  ) {
    registerErrorMessage.value = "Geçersiz e-mail adresi. Tekrar deneyin.";
    isLoading.value = false;

    return;
  }

  if (emailRegistiration.value !== confirmEmail.value) {
    registerErrorMessage.value =
      "Email adresleri uyuşmuyor. Lütfen kontrol edin.";
    isLoading.value = false;

    return;
  }
  /*
  // not working properly handle later
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;
  if (!passwordRegex.test(passwordRegistiration.value)) {
    registerErrorMessage.value =
      "Şifre en az 8 karakterli olmalıdır ve bir sayı, bir büyük harf ve bir özel karakter içermelidir.";
    return;
  }
    */
  showRegister.value = false;
  showSignIn.value = false;
  showConfirm.value = true;

  try {
    await sendVerificationEmail(
      emailRegistiration.value,
      verificationCodetoSend
    );
    confirmationSuccessMessage.value = "Doğrulama kodu gönderildi.";
    confirmationErrorMessage.value = null;
  } catch (error) {
    console.error("Error sending verification email:", error);
    confirmationSuccessMessage.value = null;
    confirmationErrorMessage.value =
      "Doğrulama kodu gönderilemedi. Lütfen tekrar deneyin.";
  } finally {
    isLoading.value = false; // hide loading spinner
  }
};

const handleConfirmation = async () => {
  console.log("verification code entered", verificationCode.value);
  if (verificationCode.value === verificationCodetoSend.toString()) {
    console.log("Email verified successfully");
    confirmationErrorMessage.value = null;
    confirmationSuccessMessage.value = "Email doğrulama başarılı.";
    createUser();
  } else {
    confirmationSuccessMessage.value = null;
    confirmationErrorMessage.value =
      "Doğrulama kodu hatalı. Lütfen tekrar deneyin.";
  }
};

const handleSignIn = async () => {
  isLoading.value = true; // show loading spinner
  // reset  signin message
  loginErrorMessage.value = "";
  console.log("Sign in form submitted");
  try {
    await store.dispatch("signIn", {
      email: emailSingIn.value,
      password: passwordSignIn.value,
      rememberMe: rememberMe.value,
    });

    const user = auth.currentUser;
    console.log("User signed in successfully:", user);

    emits("signedIn");
  } catch (error) {
    console.error("Error signing in:", error);
    loginErrorMessage.value = "Email veya şifre hatalı. Lütfen tekrar deneyin.";
  } finally {
    isLoading.value = false; // hide spinner
  }
};

const handleForgotPw = () => {
  console.log("Forgot password clicked");
  emits("forgotPw");
};

onMounted(() => {
  console.log("AppointmentStep2 mounted");
});
</script>
