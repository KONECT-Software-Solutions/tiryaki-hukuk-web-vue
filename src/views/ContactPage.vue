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
    <div class="container mx-auto md:py-[7em] py-[4em] md:px-12 px-6">
      <div class="mb-6">
        <h1 class="text-3xl pb-4">İletişim Bilgisi</h1>
        <div class="space-y-2 text-gray-600">
          <p>
            <span class="text-black"> Adres:</span>
            F.S.M. Bulvarı No:96/3 Bahar Sitesi C Blok K:2 D:4
            Nilüfer/BURSA
          </p>
          <p>
            <span class="text-black">Telefon:</span>
            <a href="tel:+02242730405" >+0224-273 04 05</a>
          </p>
          <p>
            <span class="text-black">Email:</span>
            <a href="mailto:tiryaki.hkuku@gmail.com">
              tiryaki.hukuk@gmail.com</a
            >
          </p>
        </div>
      </div>
      <div class="flex flex-col md:flex-row">
        <!-- google maps section start -->
        <div class="flex-1 mb-4 md:mb-0 md:mr-4">
          <div class="bg-gray-100 flex items-center justify-center h-full">
            <div class="text-center p-4">
              <div class="text-4xl">⚠️</div>
             
            </div>
          </div>
        </div>
        <!-- google maps section end -->
        <div class="flex-1">
          <form class="bg-gray-100 p-10 ">
            <div class="mb-4">
              <input
                type="text"
                placeholder="İsim"
                class="w-full px-3 py-2 border border-gray-300 rounded" />
              </div>
            <div class="mb-4">
              <input
                type="email"
                placeholder="Email"
                class="w-full px-3 py-2 border border-gray-300 rounded" />
              </div>
            <div class="mb-4">
              <input
                type="text"
                placeholder="Konu"
                class="w-full px-3 py-2 border border-gray-300 rounded" />
              </div>
            <div class="mb-4">
              <textarea
                placeholder="Mesaj"
                class="w-full px-3 py-2 border border-gray-300 rounded">
              </textarea>
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

// google maps api AIzaSyCiQbmZiNQaL6pjpNtkwVcOUWzcTN3qpCU


</script>

<style scoped>
.hero-bg {
  background-image: url("../assets/images/contact-page-bg.jpg");
}
</style>
