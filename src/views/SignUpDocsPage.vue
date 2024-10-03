<template>
  <div>
    <section class="relative bg-cover bg-center h-20 md:h-28">
      <div class="absolute inset-0 bg-[rgb(34,40,49)]"></div>
    </section>

    <div
      class="flex min-h-screen px-0 md:px-20 lg:px-32 2xl:px-60 py-12 bg-gray-100">
      <!-- Side Menu -->

      <div class="w-full">
        <a
          href="src/assets/files/kvkk-basvuru-formu.pdf"
          download="kvkk-basvuru-formu.pdf"
          class="bg-quaternary flex items-center border w-fit border-quaternary text-white py-[0.7rem] px-5 my-4 hover:bg-white hover:text-primary hover:border-black hover:-translate-y-1 hover:translate-x-0.5 transition duration-300">
          <i class="ri-download-2-line pr-2 text-xl"></i>
          <span>KVKK Başvuru Formunu İndir</span>
        </a>
        <!-- Embed PDF using iframe -->
        <iframe
          src="src/assets/files/kvkk-aydinlatma-metni.pdf"
          class="w-full h-[80vh]"
          frameborder="0"></iframe>
      </div>
    </div>
  </div>
</template>
