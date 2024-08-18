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
        <div class="mb-4 flex items-center justify-between">
          <a href="#" class="text-sm font-medium">Şifremi unuttum?</a>
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
    <div class="flex-1 bg-white p-4 border border-gray-300 rounded-md">
      <h2 class="text-center text-lg font-medium mb-4">Üyeliğiniz yok mu?</h2>
      <button
        v-if="!showRegister"
        @click="(showRegister = true), (showSignIn = false)"
        class="w-full bg-quaternary text-white py-2">
        Kayıt Ol
      </button>
      <form v-else-if="showRegister" @submit.prevent="handleRegister">
        <div
          v-if="registerErrorMessage"
          class="text-center text-red-600 border border-red-400 rounded-md p-2 mb-4">
          {{ registerErrorMessage }}
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">Ad*</label>
          <input
            v-model="firstName"
            type="text"
            class="w-full p-2 border border-gray-300 rounded"
            required />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">Soyad*</label>
          <input
            v-model="lastName"
            type="text"
            class="w-full p-2 border border-gray-300 rounded"
            required />
        </div>
        <div class="mb-4">
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
                placeholder="532-123-4567"
                required />
            </div>
          </div>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">Email*</label>
          <input
            v-model="emailRegistiration"
            type="email"
            class="w-full p-2 border border-gray-300 rounded"
            required />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">Email doğrulama*</label>
          <input
            v-model="confirmEmail"
            type="re-email"
            class="w-full p-2 border border-gray-300 rounded"
            required />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">Şifre*</label>
          <input
            v-model="passwordRegistiration"
            type="password"
            class="w-full p-2 border border-gray-300 rounded"
            required />
        </div>
        <div class="mb-4 flex items-center">
          <input type="checkbox" id="terms" class="mr-2" required />
          <label for="terms" class="text-sm">
            Tiryaki Hukuk ve Danışmanlık'ın
            <a href="#" class="text-blue-500">Kullanım Koşulları</a> ve
            <a href="#" class="text-blue-500">Gizlilik Politikasını</a>
            kabul ediyorum.
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
        <LoadingSpinner :text="''"/>
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
      <div class="mb-4 flex items-center">
        <label for="terms" class="text-sm"
          >Eğer 1 dakika içinde doğrulama kodunu almadıysanız
          <a href="#" class="text-blue-500">buraya</a> tıklayarak yeni kod
          alabilirsiniz.</label
        >
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
import { onMounted, ref, watch } from "vue";
import { auth, db } from "../firebase"; // Adjust the path as necessary
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import axios from "axios";
import { useStore } from "vuex";

const emits = defineEmits(["emailVerified", "signedIn"]);

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
const verificationCodetoSend = Math.floor(100000 + Math.random() * 900000);

const emailSingIn = ref("");
const passwordSignIn = ref("");

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
        console.log(error )
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
      "https://obscure-oasis-12313-0014f39ac81c.herokuapp.com/send-verification-email",
      {
        email: emailRegistiration,
        verification_code: verificationCode,
      }
    );
    console.log(response.data);
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};

const handleRegister = async () => {
  window.scrollTo(0, 0)
  isLoading.value = true; // show loading spinner
  registerErrorMessage.value = ""; // Reset error message
  const phoneRegex = /^\d{3}-\d{3}-\d{2}-\d{2}$/;
  // phone regex for 555-554-52-26

  if (!phoneRegex.test(phone.value)) {
    registerErrorMessage.value =
      "Geçersiz telefon numarası. Tekrar deneyin. Örnek: 555-555-55-55";
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
  } catch (error) {
    console.error("Error sending verification email:", error);
    registerErrorMessage.value =
      "Doğrulama emaili gönderilemedi. Lütfen tekrar deneyin.";
  } finally {
    isLoading.value = false; // hide loading spinner
  }
};

const handleConfirmation = async () => {
  console.log("verification code entered", verificationCode.value);
  console.log("verification code sended", verificationCodetoSend.toString());
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
  console.log(emailSingIn.value, passwordSignIn.value);
  try {
    await store.dispatch("signIn", {
      email: emailSingIn.value,
      password: passwordSignIn.value,
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

onMounted(() => {
  console.log("AppointmentStep2 mounted");
});
</script>
