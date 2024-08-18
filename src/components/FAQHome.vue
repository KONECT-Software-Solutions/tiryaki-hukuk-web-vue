<template>
  <div>
    <h2 class="text-3xl font-bold text-center mb-8">Sık Sorulan Sorular</h2>
    <div class="space-y-4">
      <div
        v-for="(item, index) in faqItems"
        :key="index"
        :class="[
          'p-6 flex justify-between items-center',
          item.toggled
            ? 'bg-tertiary text-white'
            : 'bg-white border border-gray-300',
        ]">
        <div>
          <h3 class="font-bold mb-3 text-xl">{{ item.question }}</h3>
          <transition name="toggle">
            <p
              v-show="item.toggled"
              :key="index"
              class="text-md text-slate-100">
              {{ item.answer }}
            </p>
          </transition>
        </div>
        <button @click="toggleItem(index)" class="text-3xl">
          <i
            :class="
              item.toggled ? 'ri-arrow-up-s-fill' : 'ri-arrow-down-s-fill'
            "></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";

const faqItems = reactive([
  {
    question: "Nasıl randevu alabilirim?",
    answer:
      "Randevu almak için web uygulamasına giriş yaparak uygun tarih ve saat seçimini yapabilir ve tercih ettiğiniz randevu türünü belirleyebilirsiniz.",
    toggled: false,
  },
  {
    question: "Randevu türleri nelerdir?",
    answer:
      "Randevu türleri arasında avukatın uygunluğuna göre video görüşme, yüz yüze görüşme ve telefon görüşmesi seçenekleri bulunur. Kullanıcı ihtiyacına göre uygun olanı seçebilir.",
    toggled: true,
  },
  {
    question: "Randevumu nasıl iptal ederim?",
    answer:
      "Randevunuzu iptal etmek için Hesabım > Randevularım sayfası üzerinden giderek randevunuzu iptal edebilirsiniz.",
    toggled: false,
  },
  {
    question: "Randevu için onay mesajı alacak mıyım?",
    answer:
      "Evet, randevunuz onaylandığında size e-posta veya SMS yoluyla bir onay mesajı gönderilecektir. Ayrıca görüşme tarihinden önce hatırlatıcı e-posta ve video görüşme linki tarafınıza iletilecektir.",
    toggled: false,
  },
  {
    question: " Randevu ücretini nasıl öğrenebilirim?",
    answer:
      "Randevu ücreti, randevu alırken seçtiğiniz randevu türüne ve avukatın belirlediği fiyatlandırmaya göre değişiklik gösterir. Randevu alırken ilk aşamada ücret bilgisi size gösterilecektir.",
    toggled: false,
  },
  {
    question: "Randevu ücretini nasıl ödeyebilirim?",
    answer:
      "Randevunuz onaylandıktan sonra ücretinizi kredi kartı veya banka kartı ile ödeyebilirsiniz. Ödeme işlemi sırasında güvenliğiniz için 3D Secure doğrulama işlemi uygulanır. Unutmayın randevudan son 24 saat önce ödemeyi tamamlamanız gerekiyor. Aksi taktirde randevunuz iptal edilecektir.",
    toggled: false,
  },
]);

const toggleItem = (index) => {
  // un-toggle all items
  faqItems.forEach((item, i) => {
    if (i !== index) {
      item.toggled = false;
    }
  });

  faqItems[index].toggled = !faqItems[index].toggled;
};
</script>

<style scoped>
.toggle-enter-active,
.toggle-leave-active {
  transition: all 1s ease;
}
.toggle-enter-from,
.toggle-leave-to {
  max-height: 0;
  opacity: 0;
}
.toggle-enter-to,
.toggle-leave-from {
  max-height: 600px; /* Adjust based on content size */
  opacity: 1;
}

.toggle-enter-active > .text-md,
.toggle-leave-active > .text-md {
  transition: opacity 0.8s ease;
}
</style>
