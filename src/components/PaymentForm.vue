<template>
  <div class="bg-white p-6 shadow-md">
    <h1 class="text-2xl font-semibold text-gray-800 mb-6">Payment Page</h1>

    <!-- Profile Form -->
    <form @submit.prevent="handlePayment()" class="space-y-6">
      <div>
        <label class="block text-sm font-medium text-gray-700">Input</label>
        <input
          type="text"
          class="mt-1 p-2 border border-gray-300 rounded w-full"
          placeholder="Enter your name" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Input</label>
        <input
          type="email"
          class="mt-1 p-2 border border-gray-300 rounded w-full"
          placeholder="Enter your email" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Input</label>
        <input
          type="tel"
          class="mt-1 p-2 border border-gray-300 rounded w-full"
          placeholder="Enter your phone number" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Input</label>
        <input
          type="password"
          class="mt-1 p-2 border border-gray-300 rounded w-full"
          placeholder="Enter your password" />
      </div>
      <div class="flex justify-end">
        <button
          type="submit"
          class="px-4 py-1 border bg-quaternary text-white hover:bg-white hover:text-quaternary transition duration-30000">
          Complete Payment
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import {doc , updateDoc} from "firebase/firestore";
import { db } from "../firebase";

const props = defineProps({
  id: String,
});


const store = useStore();
const router = useRouter();

const handlePayment = async () => {

try {
    // Update the meeting status to 3
    await updateDoc(doc(db, "meetings", props.id), {
      is_paid: true,
    });
    console.log("payment updated successfully on db for id", props.id);

    store.commit('updatePaymentStatus', {id: props.id, is_paid: true});
    router.push('/hesabım');
  } catch (error) {
    console.error("Error updating db for payment:", error);
  }


};
</script>
