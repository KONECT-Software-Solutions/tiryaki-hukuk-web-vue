<template>
  <div>
    <!-- HERO SECTION START -->
    <!-- :style="{ backgroundImage: `url(${blog.image})` }" -->
    <section
      class="relative hero-bg bg-secondary bg-cover bg-center h-[60vh] md:h-[60vh]">
      <div class="absolute inset-0 bg-black opacity-65"></div>
      <div
        class="relative container px-4 md:px-20 lg:px-32 2xl:px-60 py-2 flex flex-col items-start justify-end h-full">
        <h2 class="text-white text-lg font-bold mb-2">
          TIRYAKI HUKUK & ARABULUCULUK BÜROSU
        </h2>
        <h1 class="text-white text-4xl lg:text-5xl font-bold mb-4">
          Çalışma Alanımız:
          <span class="text-quaternary">{{ pageContent.title }}</span>
        </h1>
        <p class="text-white text-base md:text-lg lg:text-xl mb-8">
          {{ pageContent.description }}
        </p>
      </div>
    </section>
    <!-- HERO SECTION END -->

    <!-- MAIN CONTENT START -->
    <div>
      <div class="bg-gray-50">
        <div
          class="mx-auto px-4 container md:px-12 py-10 md:py-16 lg:py-24 flex flex-col justify-center lg:items-start lg:flex-row">
          <!-- Left Section -->
          <div class="max-w-3xl lg:pr-10">
            <img
              :src="pageContent.image"
              alt="Blog Image"
              class="w-full mb-6" />

            <div
              v-html="pageContent.content"
              class="text-slate-700 border-b mb-8 blog-content"></div>
            <div
              class="flex flex-col md:flex-row space-y-4 md:space-y-0 items-center justify-start mb-10">
              <h1 class="text-2xl md:mr-4">Bu alanda çalışan avukatlarımız</h1>
              <GetAppointmentButton />
            </div>
            <div
              class="flex flex-col md:flex-row items-center justify-start space-y-8 md:space-y-0 md:space-x-8">
              <AttorneyProfileCardSingle
                :attorneyData="pageContent.attorneyData[0]" />
              <AttorneyProfileCardSingle
                :attorneyData="pageContent.attorneyData[1]" />
            </div>
          </div>

          <!-- Right Sidebar -->
          <div class="lg:w-auto">
            <!-- Categories -->
            <div class="mt-6 lg:mt-0">
              <h4 class="text-lg font-semibold mb-3">Çalışma Alanlarımız</h4>
              <ul class="text-gray-600 text-[15px]">
                <li
                  v-for="category in categories"
                  :key="category"
                  class="mb-2 flex items-center pb-2 justify-between border-b border-gray-200 hover:translate-x-4 hover:font-semibold transition duration-300">
                  <router-link
                    :to="{
                      name: 'ServiceDetail',
                      params: { serviceName: category },
                    }">
                    <span>{{ categoryMap[category] }}</span>
                  </router-link>
                  <i class="ri-arrow-right-s-line"></i>
                </li>
              </ul>
            </div>

            <!-- Recent Posts -->
            <div class="mb-6 mt-6">
              <h4 class="text-lg font-semibold mb-3">Son Blog Yazılarımız</h4>
              <ul>
                <li
                  v-for="recentBlog in latestBlogs"
                  :key="recentBlog.id"
                  class="mb-4 flex">
                  <img
                    :src="recentBlog.image"
                    alt="Recent Post"
                    class="w-16 h-12 mr-4" />
                  <div>
                    <div
                      class="hover:translate-x-2 hover:font-semibold transition duration-300 text-gray-700">
                      <router-link
                        :to="'/blog/' + recentBlog.slug + '/' + recentBlog.id">
                        {{ recentBlog.title }}
                      </router-link>
                    </div>

                    <p class="text-sm text-gray-600">
                      {{
                        recentBlog.created_date.toDate().toLocaleDateString()
                      }}
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <!-- Tags -->
            <div class="mb-6">
              <h4 class="text-lg font-semibold mb-3">Etiketler</h4>
              <div class="flex flex-wrap uppercase text-[11px]">
                <span
                  v-for="(tag, index) in pageContent.tags"
                  :key="index"
                  class="border border-gray-300 hover:border-black rounded-md text-black px-3 py-1 mr-2 mb-2 transition-colors duration-300 ease-in-out"
                  >{{ tag }}</span
                >
              </div>
            </div>
            <!-- Blog Yazısını Paylaş -->
            <div class="mb-6">
              <h4 class="text-lg font-semibold mb-3">Blog Yazısını Paylaş</h4>
              <div class="flex space-x-4">
                <a href="#" aria-label="Twitter">
                  <div
                    class="bg-tertiary rounded-full w-8 h-8 flex items-center text-white justify-center hover:scale-150 transition duration-300">
                    <i class="ri-twitter-fill text-xl"></i>
                  </div>
                </a>
                <a href="#" aria-label="Facebook">
                  <div
                    class="bg-tertiary rounded-full w-8 h-8 flex items-center text-white justify-center hover:scale-150 transition duration-300">
                    <i class="ri-facebook-fill text-xl"></i>
                  </div>
                </a>
                <a href="#" aria-label="Linkedin">
                  <div
                    class="bg-tertiary rounded-full w-8 h-8 flex items-center text-white justify-center hover:scale-150 transition duration-300">
                    <i class="ri-linkedin-fill text-xl"></i>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- MAIN CONTENT END -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import AttorneyProfileCardSingle from "../components/AttorneyProfileCardSingle.vue";
import GetAppointmentButton from "../components/GetAppointmentButton.vue";
import { useRoute } from "vue-router";
import { getDocs, collection, orderBy, query, limit } from "firebase/firestore";
import { db } from "../firebase";
import AileHukukuImg from "../assets/images/aile-hukuku.webp";
import TicaretHukukuImg from "../assets/images/ticaret-hukuku.webp";
import DenizTicaretHukukuImg from "../assets/images/deniz-ticareti-hukuku.webp";
import IsHukukuImg from "../assets/images/is-hukuku.webp";
import CezaHukukuImg from "../assets/images/ceza-hukuku.webp";
import MirasHukukuImg from "../assets/images/miras-hukuku.webp";
import KriptoHukukuImg from "../assets/images/kripto-hukuku.webp";
import YapayZekaHukukuImg from "../assets/images/yapay-zeka-hukuku.webp";

const route = useRoute();
const serviceName = ref(route.params.serviceName);

const serviceDetails = [
  {
    title: "Aile Hukuku",
    tags: ["Boşanma Davaları", "Nafaka ve Mal Paylaşımı", "Velayet Davaları", "Soybağı ve Evlat Edinme", "Evlilik Sözleşmeleri"],
    description:
      "Aile hukuku, aile bireyleri arasındaki ilişkileri düzenleyen, evlilik, boşanma, velayet ve nafaka gibi konuları kapsayan bir hukuk dalıdır. Bu alanda hukuki danışmanlık sunmaktayız.",
    image: AileHukukuImg,
    content: `
    <div>
        <h1>Aile Hukuku</h1>
        <p>
            Aile hukuku, aile bireyleri arasındaki ilişkileri düzenleyen, evlilik, boşanma, velayet, nafaka gibi konuları kapsayan bir hukuk dalıdır. Aile hukuku, bireylerin aile içindeki haklarını ve yükümlülüklerini belirler.
        </p>

        <h2>Boşanma Davaları</h2>
        <p>
            Aile hukuku, anlaşmalı ve çekişmeli boşanma davalarının yönetilmesini, bu davalar sırasında ortaya çıkan nafaka, mal paylaşımı ve velayet gibi konuların düzenlenmesini sağlar.
        </p>

        <h2>Nafaka ve Mal Paylaşımı</h2>
        <p>
            Boşanma sürecinde veya sonrasında eşlerin ve çocukların maddi güvencelerinin sağlanması amacıyla nafaka belirlenir. Ayrıca, mal rejimi davaları ile mal paylaşımı düzenlenir ve taraflar arasındaki anlaşmazlıkların çözümü sağlanır.
        </p>

        <h2>Velayet Davaları</h2>
        <p>
            Çocukların velayeti konusunda ortaya çıkan uyuşmazlıkların çözümü, velayet hakkının hangi ebeveyne verileceği ve çocukların haklarının korunması aile hukuku kapsamında değerlendirilir.
        </p>

        <h2>Soybağı ve Evlat Edinme</h2>
        <p>
            Soybağı davaları, biyolojik veya hukuki olarak bir çocuğun ebeveynleri ile olan ilişkisini düzenler. Ayrıca, evlat edinme süreçleri ve bu süreçlerin hukuki boyutları aile hukuku çerçevesinde ele alınır.
        </p>

        <h2>Evlilik Sözleşmeleri</h2>
        <p>
            Evlilik öncesi veya evlilik süresince taraflar arasında yapılacak olan mal rejimi sözleşmeleri, aile hukuku tarafından düzenlenir ve bu sözleşmelerin geçerliliği hukuki olarak denetlenir.
        </p>

        <h2>Genel Olarak Hukuki Danışmanlık Verdiğimiz Alanlar</h2>
        <ul>
            <li>Anlaşmalı ve çekişmeli boşanma davaları,</li>
            <li>Nafaka, mal paylaşımı ve velayet konularında hukuki destek,</li>
            <li>Evlilik öncesi ve evlilik içi sözleşmelerin hazırlanması,</li>
            <li>Mal rejimi davaları,</li>
            <li>Soybağı davaları,</li>
            <li>Evlat edinme işlemleri ve hukuki danışmanlık.</li>
        </ul>
    </div>
`,
    attorneyData: [
      {
        name: "Av. Ezgi",
        id: "UCjKRboUFzbXGOYC6BjrVxnx1cE2",
        title: "Aile Hukuku Uzmanı",
        bio: "Av. Ayşe Tiryaki, aile hukuku alanında uzmanlaşmış bir avukat olup, Tiryaki Hukuk & Arabuluculuk Bürosu'nda çalışmaktadır. Özellikle aile hukuku, iş hukuku, ticaret hukuku ve miras hukuku alanlarında uzmanlaşmıştır. Kariyeri boyunca birçok karmaşık davada başarılı sonuçlar elde etmiş ve müvekkillerine hukuki Arabuluculuk hizmetleri sunmuştur. Profesyonel yaşamında etik kurallara bağlı kalarak müvekkillerinin haklarını en iyi şekilde savunmayı ilke edinmiştir. Hukuk eğitimi ve geniş deneyimi sayesinde, müvekkillerine kapsamlı ve etkili çözümler sunmaktadır.",
      },
      {
        name: "Av. Hande",
        id: "LFG3jBdG4qYmtJay4ucqOFxxVKW2",
        title: "Aile Hukuku Uzmanı",
        bio: "Av. Ayşe Tiryaki, aile hukuku alanında uzmanlaşmış bir avukat olup, Tiryaki Hukuk & Arabuluculuk Bürosu'nda çalışmaktadır. Özellikle aile hukuku, iş hukuku, ticaret hukuku ve miras hukuku alanlarında uzmanlaşmıştır. Kariyeri boyunca birçok karmaşık davada başarılı sonuçlar elde etmiş ve müvekkillerine hukuki Arabuluculuk hizmetleri sunmuştur. Profesyonel yaşamında etik kurallara bağlı kalarak müvekkillerinin haklarını en iyi şekilde savunmayı ilke edinmiştir. Hukuk eğitimi ve geniş deneyimi sayesinde, müvekkillerine kapsamlı ve etkili çözümler sunmaktadır.",
      },
    ],
  },
  {
    title: "Ticaret Hukuku",
    tags: ["Ticaret Hukuku", "Şirket Kuruluşu ve Yönetimi", "Şirket Birleşmeleri ve Devralmaları", "Rekabet Hukuku", "Ticari Sözleşmeler"], 
    description:
      "Ticaret hukuku, ticari işletmelerin faaliyetlerini düzenleyen bir hukuk dalıdır. Şirket kuruluşları, ticari sözleşmeler, rekabet hukuku ve uluslararası ticaret gibi konular bu alanın kapsamındadır.",
    image: TicaretHukukuImg,
    content: `
    <div>
        <h1>Ticaret Hukuku</h1>
        <p>
            Ticaret hukuku, ticari işletmelerin faaliyetlerini, kuruluşlarını, birleşmelerini, devralmalarını, tasfiyelerini ve genel olarak ticari ilişkileri düzenleyen bir hukuk dalıdır. Bu hukuk dalı, ticari hayatın düzenli ve güvenli bir şekilde yürütülmesini sağlamayı amaçlar. Ticaret hukuku, şirketler hukuku, rekabet hukuku, sigorta hukuku, taşımacılık hukuku gibi alt dallara ayrılır.
        </p>

        <h2>Şirket Kuruluşu ve Yönetimi</h2>
        <p>
            Ticaret hukuku, anonim, limited ve diğer şirket türlerinin kuruluşunu, yönetimini ve tasfiyesini düzenler. Bu kapsamda, şirketlerin esas sözleşmelerinin hazırlanması, ticaret siciline kayıt işlemleri, yönetim kurulu ve genel kurul toplantılarının düzenlenmesi, imtiyazlı pay sahiplerinin haklarının korunması gibi süreçlerde hukuki danışmanlık sağlanır.
        </p>

        <h2>Şirket Birleşmeleri ve Devralmaları</h2>
        <p>
            Şirketlerin birleşme ve devralma işlemleri, şirketlerin büyümesi ve yeniden yapılandırılması süreçlerini kapsar. Bu süreçte, due diligence yapılması, ortaklık yapılarının yeniden düzenlenmesi, birleşme ve devralma işlemlerinin hukuki boyutlarının yönetilmesi gibi konular ticaret hukuku çerçevesinde ele alınır.
        </p>

        <h2>Rekabet Hukuku</h2>
        <p>
            Rekabet hukuku, piyasa rekabetinin korunması ve tekelleşmenin önlenmesi amacıyla düzenlenmiş kuralları içerir. Ticaret hukuku, şirketlerin rekabet hukukuna uygun faaliyet göstermesini sağlamak için danışmanlık hizmeti verir. Bu kapsamda, rekabeti engelleyici anlaşma ve uygulamaların tespiti, rekabet kurumu nezdinde başvuruların yapılması, tekelleşme ve piyasa hakimiyeti konularında hukuki danışmanlık verilir.
        </p>

        <h2>Ticari Sözleşmeler</h2>
        <p>
            Ticaret hukuku, distribütörlük, bayilik, franchise, tedarik ve hizmet sözleşmeleri gibi ticari sözleşmelerin hazırlanmasını ve bu sözleşmelerin yürütülmesini düzenler. Ayrıca, uluslararası ticaret sözleşmeleri ve bu sözleşmelerden doğan uyuşmazlıkların çözümü de ticaret hukukunun kapsamına girer.
        </p>

        <h2>Genel Olarak Hukuki Danışmanlık Verdiğimiz Alanlar</h2>
        <ul>
            <li>Anonim, limited ve diğer şirket türlerinin kuruluşu, yönetimi ve tasfiyesi.</li>
            <li>Şirket birleşme ve devralmaları, ortaklık yapılarının yeniden düzenlenmesi, due-diligence sürecinde hukuki danışmanlık verilmesi.</li>
            <li>Yönetim kurulu ve genel kurul toplantılarının düzenlenmesi, kararların hazırlanması.</li>
            <li>Şirketlerin esas sözleşmelerinin ve ortaklık sözleşmelerinin hazırlanması, ticaret siciline kayıt yapılması.</li>
            <li>İmtiyazlı pay yaratma süreci, azınlık ve imtiyazlı pay sahiplerinin haklarının korunması.</li>
            <li>Yönetim Kurulu üyelerinin ibrası, sorumluluklarının denetlenmesi.</li>
            <li>Halka açılma, izahname süreci, SPK ve diğer ilgili mevzuatlara uyum süreci hakkında hukuki ve yönetimsel danışmanlık verilmesi.</li>
            <li>Şirketlerin tasfiyesi.</li>
            <li>Rekabet Hukuku kapsamında mevzuata ve Rekabet Kurumu’na uyum süreci.</li>
            <li>Rekabeti engelleyici anlaşma ve uygulamaların tespiti ve önlenmesi.</li>
            <li>Tekelleşme ve piyasa hakimiyeti konularında danışmanlık.</li>
            <li>Rekabet kurumu nezdinde başvurular ve savunmaların hazırlanması.</li>
            <li>Distribütörlük, bayilik, franchise, tedarik ve hizmet sözleşmeleri.</li>
            <li>Uluslararası ticaret sözleşmeleri ve uyuşmazlıkların çözümü.</li>
            <li>Rekabeti engelleyici anlaşma ve uygulamaların tespiti ve önlenmesi.</li>
            <li>Tekelleşme ve piyasa hakimiyeti konularında danışmanlık.</li>
            <li>Rekabet kurumu nezdinde başvurular ve savunmaların hazırlanması.</li>
        </ul>
        <p>
            Ticaret Hukuku’nun birçok alanında faaliyet göstermekteyiz.
        </p>
    </div>
`,
    attorneyData: [
      {
        name: "Av. Ezgi",
        id: "UCjKRboUFzbXGOYC6BjrVxnx1cE2",
        title: "Aile Hukuku Uzmanı",
        bio: "Av. Ayşe Tiryaki, aile hukuku alanında uzmanlaşmış bir avukat olup, Tiryaki Hukuk & Arabuluculuk Bürosu'nda çalışmaktadır. Özellikle aile hukuku, iş hukuku, ticaret hukuku ve miras hukuku alanlarında uzmanlaşmıştır. Kariyeri boyunca birçok karmaşık davada başarılı sonuçlar elde etmiş ve müvekkillerine hukuki Arabuluculuk hizmetleri sunmuştur. Profesyonel yaşamında etik kurallara bağlı kalarak müvekkillerinin haklarını en iyi şekilde savunmayı ilke edinmiştir. Hukuk eğitimi ve geniş deneyimi sayesinde, müvekkillerine kapsamlı ve etkili çözümler sunmaktadır.",
      },
      {
        name: "Av. Hande",
        id: "LFG3jBdG4qYmtJay4ucqOFxxVKW2",
        title: "Aile Hukuku Uzmanı",
        bio: "Av. Ayşe Tiryaki, aile hukuku alanında uzmanlaşmış bir avukat olup, Tiryaki Hukuk & Arabuluculuk Bürosu'nda çalışmaktadır. Özellikle aile hukuku, iş hukuku, ticaret hukuku ve miras hukuku alanlarında uzmanlaşmıştır. Kariyeri boyunca birçok karmaşık davada başarılı sonuçlar elde etmiş ve müvekkillerine hukuki Arabuluculuk hizmetleri sunmuştur. Profesyonel yaşamında etik kurallara bağlı kalarak müvekkillerinin haklarını en iyi şekilde savunmayı ilke edinmiştir. Hukuk eğitimi ve geniş deneyimi sayesinde, müvekkillerine kapsamlı ve etkili çözümler sunmaktadır.",
      },
    ],
  },
  {
    title: "Deniz Ticareti Hukuku",
    tags: ["Deniz Ticareti Hukuku", "Taşıma Sözleşmeleri", "Navlun Anlaşmaları", "Gemi Alım-Satım İşlemleri", "Deniz Kazaları ve Zararların Tazmini"],
    description:
      "Deniz ticareti hukuku, deniz yoluyla gerçekleştirilen taşımacılık ve denizcilik faaliyetlerini düzenleyen bir hukuk dalıdır. Gemi alım-satım işlemleri, deniz kazaları, navlun anlaşmaları, gemi finansmanı ve uluslararası denizcilik hukuku gibi konular bu alanın kapsamındadır.",
    image: DenizTicaretHukukuImg,
    content: `
  <div>
    <h1>Deniz Ticareti Hukuku</h1>
        <p>
            Deniz ticareti hukuku, deniz yolu ile yapılan taşımacılık ve denizcilik faaliyetlerini düzenleyen hukuk dalıdır. Bu hukuk dalı, gemi alım-satım işlemleri, gemi finansmanı, deniz kazaları ve uluslararası denizcilik hukuku gibi konuları kapsar.
        </p>

        <h2>Taşıma Sözleşmeleri</h2>
        <p>
            Deniz taşımacılığında yüklerin taşınmasına ilişkin sözleşmelerin hazırlanması, tarafların hak ve yükümlülüklerinin belirlenmesi ve bu sözleşmelerden doğan uyuşmazlıkların çözümü deniz ticareti hukukunun temel konularındandır.
        </p>

        <h2>Navlun Anlaşmaları</h2>
        <p>
            Navlun, deniz yolu ile yapılan taşımacılıkta taşıma ücreti anlamına gelir. Navlun anlaşmaları, bu taşıma ücretinin belirlenmesini ve bu ücretin nasıl ödeneceğini düzenler. Bu anlaşmaların hukuki boyutları deniz ticareti hukuku çerçevesinde ele alınır.
        </p>

        <h2>Gemi Alım-Satım İşlemleri</h2>
        <p>
            Gemi alım-satım sözleşmelerinin hazırlanması, gemi finansmanı ve kredi sözleşmelerinin düzenlenmesi, gemi ipoteği ve diğer güvencelerin tesis edilmesi gibi işlemler deniz ticareti hukuku kapsamında yer alır.
        </p>

        <h2>Deniz Kazaları ve Zararların Tazmini</h2>
        <p>
            Deniz taşımacılığı sırasında meydana gelen çatışma, karaya oturma, yangın gibi kazaların hukuki boyutları, zararların tazmini ve hukuki sorumlulukların belirlenmesi deniz ticareti hukukunun temel unsurlarındandır.
        </p>

        <h2>Gemi İnşa ve Tersane Hukuku</h2>
        <p>
            Gemi inşa projelerinin finansmanı, tersane ve donatan ilişkilerinin düzenlenmesi, gemi inşa sözleşmelerinin hazırlanması gibi konular deniz ticareti hukuku çerçevesinde düzenlenir.
        </p>

        <h2>Uluslararası Deniz Hukuku ve Tahkim</h2>
        <p>
            Uluslararası deniz ticaretinde ortaya çıkan uyuşmazlıkların çözümünde tahkim önemli bir yer tutar. Deniz ticareti hukuku, bu tahkim süreçlerinin yönetimini ve uluslararası denizcilik kurallarına uygun hareket edilmesini sağlar.
        </p>

        <h2>Genel Olarak Hukuki Danışmanlık Verdiğimiz Alanlar</h2>
        <ul>
            <li>Taşıma sözleşmeleri.</li>
            <li>Navlun anlaşmaları.</li>
            <li>Yükleme ve boşaltma işlemleri.</li>
            <li>Gemi alım-satım işlemleri.</li>
            <li>Gemi finansmanı ve kredi sözleşmeleri.</li>
            <li>Gemi ipoteği ve diğer güvencelerin tesis edilmesi.</li>
            <li>Çatışma, karaya oturma, yangın gibi deniz kazaları.</li>
            <li>Zararların tazmini ve hukuki sorumluluklar.</li>
            <li>Gemi inşa sözleşmeleri.</li>
            <li>Tersane ve donatan ilişkileri.</li>
            <li>Gemi inşa projelerinin finansmanı.</li>
            <li>Deniz hukukunda uluslararası tahkim.</li>
        </ul>
        <p>
            Deniz Ticareti Hukuku’nun birçok alanında faaliyet göstermekteyiz.
        </p>
        </div>
`,
    attorneyData: [
      {
        name: "Av. Ezgi",
        id: "UCjKRboUFzbXGOYC6BjrVxnx1cE2",
        title: "Aile Hukuku Uzmanı",
        bio: "Av. Ayşe Tiryaki, aile hukuku alanında uzmanlaşmış bir avukat olup, Tiryaki Hukuk & Arabuluculuk Bürosu'nda çalışmaktadır. Özellikle aile hukuku, iş hukuku, ticaret hukuku ve miras hukuku alanlarında uzmanlaşmıştır. Kariyeri boyunca birçok karmaşık davada başarılı sonuçlar elde etmiş ve müvekkillerine hukuki Arabuluculuk hizmetleri sunmuştur. Profesyonel yaşamında etik kurallara bağlı kalarak müvekkillerinin haklarını en iyi şekilde savunmayı ilke edinmiştir. Hukuk eğitimi ve geniş deneyimi sayesinde, müvekkillerine kapsamlı ve etkili çözümler sunmaktadır.",
      },
      {
        name: "Av. Hande",
        id: "LFG3jBdG4qYmtJay4ucqOFxxVKW2",
        title: "Aile Hukuku Uzmanı",
        bio: "Av. Ayşe Tiryaki, aile hukuku alanında uzmanlaşmış bir avukat olup, Tiryaki Hukuk & Arabuluculuk Bürosu'nda çalışmaktadır. Özellikle aile hukuku, iş hukuku, ticaret hukuku ve miras hukuku alanlarında uzmanlaşmıştır. Kariyeri boyunca birçok karmaşık davada başarılı sonuçlar elde etmiş ve müvekkillerine hukuki Arabuluculuk hizmetleri sunmuştur. Profesyonel yaşamında etik kurallara bağlı kalarak müvekkillerinin haklarını en iyi şekilde savunmayı ilke edinmiştir. Hukuk eğitimi ve geniş deneyimi sayesinde, müvekkillerine kapsamlı ve etkili çözümler sunmaktadır.",
      },
    ],
  },
  {
    title: "İş Hukuku",
    tags: ["İş Hukuku", "İş Sözleşmeleri", "Çalışma Koşulları ve İş Güvenliği", "Disiplin ve İşten Çıkarma", "Toplu İş Sözleşmeleri ve Sendikal İlişkiler"],
    description:
      "İş hukuku, işçi hakları ve işveren yükümlülüklerini düzenleyen bir hukuk dalıdır. İş sözleşmeleri, çalışma koşulları ve sendikal faaliyetler bu alanda ele alınan temel konulardır.",
    image: IsHukukuImg,
    content: `
<div>
  <h1>İş Hukuku</h1>
  <p>
    İş hukuku, işçi ve işveren arasındaki ilişkileri düzenleyen, işçi haklarını ve işveren yükümlülüklerini belirleyen bir hukuk dalıdır. Bu hukuk dalı, iş sözleşmeleri, çalışma koşulları, toplu iş sözleşmeleri ve sendikal faaliyetler gibi konuları kapsar.
  </p>

  <h2>İş Sözleşmeleri</h2>
  <p>
    İş hukuku, işçi ve işveren arasındaki iş sözleşmelerinin hazırlanmasını, bu sözleşmelerin şartlarının belirlenmesini ve güncellenmesini, iş sözleşmesinin feshi ve sonlandırılması süreçlerini düzenler.
  </p>

  <h2>Çalışma Koşulları ve İş Güvenliği</h2>
  <p>
    İşçilerin çalışma koşullarının düzenlenmesi, iş yerinde iş güvenliğinin sağlanması, işçilerin haklarının korunması ve işverenin yükümlülüklerinin yerine getirilmesi iş hukukunun temel konularındandır.
  </p>

  <h2>Disiplin ve İşten Çıkarma</h2>
  <p>
    İş yerinde disiplin kurallarının uygulanması, işçilerin davranışlarının denetlenmesi, işten çıkarma süreçlerinin yönetilmesi ve bu süreçlerde ortaya çıkabilecek uyuşmazlıkların çözümü iş hukuku kapsamında değerlendirilir.
  </p>

  <h2>Toplu İş Sözleşmeleri ve Sendikal İlişkiler</h2>
  <p>
    Toplu iş sözleşmelerinin hazırlanması, sendikal faaliyetlerin düzenlenmesi, grev ve lokavt süreçlerinin yönetilmesi iş hukukunun önemli unsurlarıdır. Bu süreçlerde hukuki danışmanlık verilmesi, işçi ve işveren arasındaki anlaşmazlıkların çözülmesine yardımcı olur.
  </p>

  <h2>Genel Olarak Hukuki Danışmanlık Verdiğimiz Alanlar</h2>
  <ul>
    <li>İş sözleşmelerinin hazırlanması,</li>
    <li>Sözleşme şartlarının belirlenmesi ve güncellenmesi,</li>
    <li>Sözleşme feshi ve sonlandırma işlemleri.</li>
    <li>İşverenlerin temsili ve hukuki danışmanlık hizmetleri,</li>
    <li>İşveren hak ve yükümlülüklerinin belirlenmesi,</li>
    <li>İş hukuku mevzuatına uyum danışmanlığı.</li>
    <li>İşçi hakları ve işveren yükümlülüklerinin yönetimi,</li>
    <li>İşyeri düzenlemeleri ve çalışma koşullarının belirlenmesi,</li>
    <li>Disiplin yönetimi ve işçi davranış kuralları.</li>
    <li>Toplu iş sözleşmeleri ve toplu pazarlık süreçleri,</li>
    <li>Sendikal ilişkiler,</li>
    <li>Grev ve lokavt yönetimi.</li>
  </ul>
  <p>
    İş Hukuku’nun birçok alanında hizmet vermekteyiz.
  </p>
</div>
`,
    attorneyData: [
      {
        name: "Av. Ezgi",
        id: "UCjKRboUFzbXGOYC6BjrVxnx1cE2",
        title: "Aile Hukuku Uzmanı",
        bio: "Av. Ayşe Tiryaki, aile hukuku alanında uzmanlaşmış bir avukat olup, Tiryaki Hukuk & Arabuluculuk Bürosu'nda çalışmaktadır. Özellikle aile hukuku, iş hukuku, ticaret hukuku ve miras hukuku alanlarında uzmanlaşmıştır. Kariyeri boyunca birçok karmaşık davada başarılı sonuçlar elde etmiş ve müvekkillerine hukuki Arabuluculuk hizmetleri sunmuştur. Profesyonel yaşamında etik kurallara bağlı kalarak müvekkillerinin haklarını en iyi şekilde savunmayı ilke edinmiştir. Hukuk eğitimi ve geniş deneyimi sayesinde, müvekkillerine kapsamlı ve etkili çözümler sunmaktadır.",
      },
      {
        name: "Av. Hande",
        id: "LFG3jBdG4qYmtJay4ucqOFxxVKW2",
        title: "Aile Hukuku Uzmanı",
        bio: "Av. Ayşe Tiryaki, aile hukuku alanında uzmanlaşmış bir avukat olup, Tiryaki Hukuk & Arabuluculuk Bürosu'nda çalışmaktadır. Özellikle aile hukuku, iş hukuku, ticaret hukuku ve miras hukuku alanlarında uzmanlaşmıştır. Kariyeri boyunca birçok karmaşık davada başarılı sonuçlar elde etmiş ve müvekkillerine hukuki Arabuluculuk hizmetleri sunmuştur. Profesyonel yaşamında etik kurallara bağlı kalarak müvekkillerinin haklarını en iyi şekilde savunmayı ilke edinmiştir. Hukuk eğitimi ve geniş deneyimi sayesinde, müvekkillerine kapsamlı ve etkili çözümler sunmaktadır.",
      },
    ],
  },
  {
    title: "Ceza Hukuku",
    tags: ["Ceza Hukuku", "Şüpheli ve Sanık Savunması", "Delil Toplama ve Analizi", "Gözaltı ve Tutukluluk", "İtiraz ve Temyiz Süreçleri"],
    description:
      "Ceza hukuku, suç teşkil eden fiillerin tespiti, delil yönetimi, savunma ve gözaltı süreçlerini kapsayan bir hukuk dalıdır. Tutukluluk, mahkeme süreci ve ceza infazı gibi konularda uzman hukuki destek sunar.",
    image: CezaHukukuImg,
    content: `
  <div>
    <h1>Ceza Hukuku</h1>
    <p>
      Ceza hukuku, suç teşkil eden fiillerin belirlenmesi ve bu fiillerin işlenmesi durumunda uygulanacak yaptırımları düzenleyen bir hukuk dalıdır. Ceza hukuku, toplumun düzenini korumayı ve suç işleyen kişilerin adalet önünde hesap vermesini sağlamayı amaçlar.
    </p>

    <h2>Suçun Tespiti ve Savunma</h2>
    <p>
      Ceza hukuku, suç teşkil eden fiillerin tespit edilmesi, suçun işlenip işlenmediğinin belirlenmesi ve sanıkların savunulması süreçlerini kapsar. Şüpheli ve sanıkların haklarının korunması, adil yargılanma ilkesi çerçevesinde savunmalarının yapılması ceza hukuku çerçevesinde değerlendirilir.
    </p>

    <h2>Delil Yönetimi</h2>
    <p>
      Ceza soruşturmalarında delillerin toplanması, delil yasağı, delillerin değerlendirilmesi ve bu delillere dayalı olarak kararların verilmesi ceza hukukunun önemli unsurlarındandır.
    </p>

    <h2>Gözaltı ve Tutukluluk</h2>
    <p>
      Suç şüphesi altında bulunan kişilerin gözaltına alınması, tutuklanması ve adli kontrol altına alınması süreçlerinde hukuki danışmanlık verilmesi, bireylerin haklarının korunması açısından önemlidir.
    </p>

    <h2>İtiraz ve Temyiz Süreçleri</h2>
    <p>
      Ceza davalarında verilen kararların üst mahkemelerde incelenmesi, itiraz ve temyiz süreçlerinin yürütülmesi ceza hukuku kapsamında ele alınır. Bu süreçler, adil bir yargılama sürecinin sağlanması için kritik öneme sahiptir.
    </p>

    <h2>Genel Olarak Hukuki Danışmanlık Verdiğimiz Alanlar</h2>
    <ul>
      <li>Şüpheli ve sanık savunması</li>
      <li>Mağdur ve müşteki temsili</li>
      <li>Delil toplama ve analizi</li>
      <li>Gözaltı, tutukluluk ve adli kontrol işlemleri</li>
      <li>Delil yasağı ve delillerin değerlendirilmesi</li>
      <li>İtiraz ve temyiz süreçleri</li>
    </ul>
  </div>
`,
    attorneyData: [
      {
        name: "Av. Ezgi",
        id: "UCjKRboUFzbXGOYC6BjrVxnx1cE2",
        title: "Aile Hukuku Uzmanı",
        bio: "Av. Ayşe Tiryaki, aile hukuku alanında uzmanlaşmış bir avukat olup, Tiryaki Hukuk & Arabuluculuk Bürosu'nda çalışmaktadır. Özellikle aile hukuku, iş hukuku, ticaret hukuku ve miras hukuku alanlarında uzmanlaşmıştır. Kariyeri boyunca birçok karmaşık davada başarılı sonuçlar elde etmiş ve müvekkillerine hukuki Arabuluculuk hizmetleri sunmuştur. Profesyonel yaşamında etik kurallara bağlı kalarak müvekkillerinin haklarını en iyi şekilde savunmayı ilke edinmiştir. Hukuk eğitimi ve geniş deneyimi sayesinde, müvekkillerine kapsamlı ve etkili çözümler sunmaktadır.",
      },
      {
        name: "Av. Hande",
        id: "LFG3jBdG4qYmtJay4ucqOFxxVKW2",
        title: "Aile Hukuku Uzmanı",
        bio: "Av. Ayşe Tiryaki, aile hukuku alanında uzmanlaşmış bir avukat olup, Tiryaki Hukuk & Arabuluculuk Bürosu'nda çalışmaktadır. Özellikle aile hukuku, iş hukuku, ticaret hukuku ve miras hukuku alanlarında uzmanlaşmıştır. Kariyeri boyunca birçok karmaşık davada başarılı sonuçlar elde etmiş ve müvekkillerine hukuki Arabuluculuk hizmetleri sunmuştur. Profesyonel yaşamında etik kurallara bağlı kalarak müvekkillerinin haklarını en iyi şekilde savunmayı ilke edinmiştir. Hukuk eğitimi ve geniş deneyimi sayesinde, müvekkillerine kapsamlı ve etkili çözümler sunmaktadır.",
      },
    ],
  },
  {
    title: "Miras Hukuku",
    tags: ["Miras Hukuku", "Vasiyetname Hazırlama", "Miras Paylaşımı", "Mirasçı Hakları", "Miras Planlaması"],
    description:
      "Miras hukuku, miras paylaşımı, mirasçı hakları ve miras planlaması gibi konuları düzenleyen bir hukuk dalıdır. Vasiyetname hazırlama ve miras süreçlerinin yönetimi bu alanda sağlanan hizmetler arasındadır.",
    image: MirasHukukuImg,
    content: `
  <div>
    <h1>Miras Hukuku</h1>
    <p>
      Miras hukuku, bir kişinin ölümünden sonra malvarlığının nasıl paylaşılacağını düzenleyen bir hukuk dalıdır. 
      Miras hukuku, mirasçıların haklarını ve yükümlülüklerini belirler, miras paylaşımından doğan uyuşmazlıkları çözer.
    </p>

    <h2>Vasiyetname Hazırlama ve Miras Planlaması</h2>
    <p>
      Miras hukuku, bireylerin ölümünden sonra malvarlıklarının nasıl dağıtılacağını belirleyen vasiyetnamelerin 
      hazırlanmasını düzenler. Ayrıca, miras planlaması yapılarak, mirasçıların haklarının korunması ve vergi 
      yükümlülüklerinin azaltılması sağlanır.
    </p>

    <h2>Miras Paylaşımı ve Uyuşmazlıkların Çözümü</h2>
    <p>
      Mirasçılar arasında malvarlığının adil bir şekilde paylaşılması ve bu süreçte ortaya çıkan uyuşmazlıkların 
      çözülmesi miras hukukunun temel konularındandır. Miras taksimi davalarının yürütülmesi ve sulh süreçlerinin 
      yönetilmesi bu kapsamda değerlendirilir.
    </p>

    <h2>Mirasçı Hakları</h2>
    <p>
      Miras hukuku, mirasçıların reddi miras hakkı, miras paylarının düzeltilmesi, mirasçılık belgesi alınması 
      ve mirasın resmi olarak devredilmesi gibi hakları düzenler. Bu hakların korunması ve mirasçılar arasında adil 
      bir paylaşım yapılması hukuki süreçlerle sağlanır.
    </p>

    <h2>Hukuki Danışmanlık Verdiğimiz Alanlar</h2>
    <ul>
      <li>Vasiyetnamelerin hazırlanması,</li>
      <li>Miras planlaması ve vergi planlaması danışmanlığı,</li>
      <li>Miras paylaşımı anlaşmazlıkları,</li>
      <li>Miras taksimi davaları ve sulh süreçleri,</li>
      <li>Mirasçıların reddi miras hakkı,</li>
      <li>Miras paylarının adil bir şekilde düzeltilmesi,</li>
      <li>Mirasçılık belgesi alınması,</li>
      <li>Mirasın resmi olarak devredilmesi işlemleri.</li>
    </ul>
  </div>
`,
    attorneyData: [
      {
        name: "Av. Ezgi",
        id: "UCjKRboUFzbXGOYC6BjrVxnx1cE2",
        title: "Aile Hukuku Uzmanı",
        bio: "Av. Ayşe Tiryaki, aile hukuku alanında uzmanlaşmış bir avukat olup, Tiryaki Hukuk & Arabuluculuk Bürosu'nda çalışmaktadır. Özellikle aile hukuku, iş hukuku, ticaret hukuku ve miras hukuku alanlarında uzmanlaşmıştır. Kariyeri boyunca birçok karmaşık davada başarılı sonuçlar elde etmiş ve müvekkillerine hukuki Arabuluculuk hizmetleri sunmuştur. Profesyonel yaşamında etik kurallara bağlı kalarak müvekkillerinin haklarını en iyi şekilde savunmayı ilke edinmiştir. Hukuk eğitimi ve geniş deneyimi sayesinde, müvekkillerine kapsamlı ve etkili çözümler sunmaktadır.",
      },
      {
        name: "Av. Hande",
        id: "LFG3jBdG4qYmtJay4ucqOFxxVKW2",
        title: "Aile Hukuku Uzmanı",
        bio: "Av. Ayşe Tiryaki, aile hukuku alanında uzmanlaşmış bir avukat olup, Tiryaki Hukuk & Arabuluculuk Bürosu'nda çalışmaktadır. Özellikle aile hukuku, iş hukuku, ticaret hukuku ve miras hukuku alanlarında uzmanlaşmıştır. Kariyeri boyunca birçok karmaşık davada başarılı sonuçlar elde etmiş ve müvekkillerine hukuki Arabuluculuk hizmetleri sunmuştur. Profesyonel yaşamında etik kurallara bağlı kalarak müvekkillerinin haklarını en iyi şekilde savunmayı ilke edinmiştir. Hukuk eğitimi ve geniş deneyimi sayesinde, müvekkillerine kapsamlı ve etkili çözümler sunmaktadır.",
      },
    ],
  },
  {
    title: "Kripto Hukuku",
    tags: ["Kripto Hukuku", "Kripto Para Şirketleri", "Token Düzenlemeleri", "Akıllı Sözleşmeler ve Blockchain Teknolojisi", "Kripto Para Dolandırıcılığı ve Siber Güvenlik"],
    description:
      "Kripto hukuku, dijital varlıklar ve blockchain teknolojisi alanında yasal düzenlemeleri içeren bir hukuk dalıdır. Kripto para şirketlerinin kurulumu, token düzenlemeleri, akıllı sözleşmeler ve siber güvenlik gibi konular bu alanda ele alınır.",
    image: KriptoHukukuImg,
    content: `
    <div>
        <h1>Kripto Hukuku</h1>
        <p>
            Kripto hukuku, kripto para birimleri, token'lar ve blockchain teknolojisinin yasal düzenlemelerini kapsayan bir hukuk dalıdır. Kripto hukuku, dijital varlıkların güvenli ve yasal bir çerçevede kullanılması için gereken hukuki altyapıyı sağlar.
        </p>

        <h2>Kripto Para Şirketlerinin Kurulumu</h2>
        <p>
            Kripto hukuku, kripto para alanında faaliyet gösterecek şirketlerin yurtiçi ve yurtdışında kurulması, bu şirketlerin yasal düzenlemelere uygun olarak faaliyet göstermesi için gerekli hukuki danışmanlığı sağlar.
        </p>

        <h2>Kripto Para ve Token Düzenlemeleri</h2>
        <p>
            Kripto para birimleri ve token'ların yasal statüsü, bu varlıkların alım-satımı, borsalarının işletilmesi ve kullanıcı sözleşmeleri gibi konular kripto hukuku çerçevesinde ele alınır. Ayrıca, kripto varlıkların vergilendirilmesi ve bu varlıklarla ilgili siber güvenlik önlemleri de bu kapsamda değerlendirilir.
        </p>

        <h2>Akıllı Sözleşmeler ve Blockchain Teknolojisi</h2>
        <p>
            Kripto hukuku, blockchain teknolojisi ile oluşturulan akıllı sözleşmelerin hazırlanması, uygulanması ve bu sözleşmelerin yasal geçerliliğinin sağlanması konularında danışmanlık sunar. Blockchain teknolojisinin hukuki boyutları, özellikle veri güvenliği ve şeffaflık açısından önemlidir.
        </p>

        <h2>Kripto Para Dolandırıcılığı ve Siber Güvenlik</h2>
        <p>
            Kripto para dolandırıcılığı ve hırsızlığı gibi suçlar kripto hukuku kapsamında ele alınır. Ayrıca, siber güvenlik ihlalleri ve kripto varlıkların korunması için gerekli hukuki düzenlemeler yapılır. Kripto para aklama ve terör finansmanı ile mücadele de kripto hukukun önemli unsurlarındandır.
        </p>

        <h2>Hukuki Danışmanlık Alanlarımız</h2>
        <ul>
            <li>- Kripto para alanında faaliyet gösterecek şirketlerin yurtiçi ve yurtdışında kurulumu</li>
            <li>- Kripto para birimleri ve token'lar için yasal düzenlemeler</li>
            <li>- Kripto borsaları ve cüzdan hizmetleri ile ilgili mevzuat</li>
            <li>- Kripto varlıkların vergilendirilmesi</li>
            <li>- Blockchain teknolojisinin hukuki boyutları</li>
            <li>- Akıllı sözleşmelerin hazırlanması ve uygulanması</li>
            <li>- ICO, IEO ve STO gibi kripto para arzları</li>
            <li>- Yatırımcı hakları ve yatırım anlaşmazlıkları</li>
            <li>- Kripto para dolandırıcılığı ve hırsızlığı</li>
            <li>- Siber güvenlik ihlalleri ve koruma önlemleri</li>
            <li>- Kripto para aklama ve terör finansmanı ile mücadele</li>
            <li>- Kripto para borsalarının kurulması ve işletilmesi</li>
            <li>- Kripto para ticaretinde hukuki düzenlemeler</li>
            <li>- Kullanıcı sözleşmeleri ve ticaret politikaları</li>
        </ul>
    </div>
`,
    attorneyData: [
      {
        name: "Av. Ezgi",
        id: "UCjKRboUFzbXGOYC6BjrVxnx1cE2",
        title: "Aile Hukuku Uzmanı",
        bio: "Av. Ayşe Tiryaki, aile hukuku alanında uzmanlaşmış bir avukat olup, Tiryaki Hukuk & Arabuluculuk Bürosu'nda çalışmaktadır. Özellikle aile hukuku, iş hukuku, ticaret hukuku ve miras hukuku alanlarında uzmanlaşmıştır. Kariyeri boyunca birçok karmaşık davada başarılı sonuçlar elde etmiş ve müvekkillerine hukuki Arabuluculuk hizmetleri sunmuştur. Profesyonel yaşamında etik kurallara bağlı kalarak müvekkillerinin haklarını en iyi şekilde savunmayı ilke edinmiştir. Hukuk eğitimi ve geniş deneyimi sayesinde, müvekkillerine kapsamlı ve etkili çözümler sunmaktadır.",
      },
      {
        name: "Av. Hande",
        id: "LFG3jBdG4qYmtJay4ucqOFxxVKW2",
        title: "Aile Hukuku Uzmanı",
        bio: "Av. Ayşe Tiryaki, aile hukuku alanında uzmanlaşmış bir avukat olup, Tiryaki Hukuk & Arabuluculuk Bürosu'nda çalışmaktadır. Özellikle aile hukuku, iş hukuku, ticaret hukuku ve miras hukuku alanlarında uzmanlaşmıştır. Kariyeri boyunca birçok karmaşık davada başarılı sonuçlar elde etmiş ve müvekkillerine hukuki Arabuluculuk hizmetleri sunmuştur. Profesyonel yaşamında etik kurallara bağlı kalarak müvekkillerinin haklarını en iyi şekilde savunmayı ilke edinmiştir. Hukuk eğitimi ve geniş deneyimi sayesinde, müvekkillerine kapsamlı ve etkili çözümler sunmaktadır.",
      },
    ],
  },
  {
    title: "Yapay Zeka Hukuku",
    tags: ["Yapay Zeka Hukuku", "Telif Hakları", "Veri Kullanımı", "Siber Suçlar", "Yapay Zeka Sistemlerinin Sorumluluğu"],
    image: YapayZekaHukukuImg,
    description:
      "Yapay zeka hukuku, yapay zeka sistemlerinin yasal ve etik standartlara uygun şekilde geliştirilmesi ve kullanılması ile ilgili düzenlemeleri kapsayan bir hukuk dalıdır. Bu hukuk dalı, telif hakları, veri kullanımı, siber suçlar ve yapay zeka sistemlerinin sorumluluğu gibi konuları içerir.",
    content: `
    <div>
        <h1>Yapay Zeka Hukuku</h1>
        <p>
            Yapay zeka hukuku, yapay zeka sistemlerinin yasal çerçevesini ve etik kurallarını düzenleyen bir hukuk dalıdır. Bu hukuk dalı, yapay zeka teknolojilerinin yasal ve etik standartlara uygun olarak geliştirilmesini ve kullanılmasını sağlar.
        </p>

        <h2>Yapay Zeka Sistemlerinin Yasal Çerçevesi</h2>
        <p>
            Yapay zeka hukuku, yapay zeka sistemlerinin geliştirilmesi, kullanılması ve bu sistemlerin yasal çerçevesinin belirlenmesi konularını kapsar. Ulusal ve uluslararası düzenlemeler çerçevesinde, yapay zeka sistemlerinin hukuka uygun olarak geliştirilmesi sağlanır.
        </p>

        <h2>Yapay Zeka Etiği ve Yönetimi</h2>
        <p>
            Yapay zeka hukuku, yapay zeka sistemlerinin etik kurallar çerçevesinde yönetilmesini sağlar. Yapay zeka sistemlerinin toplumsal etkileri, veri gizliliği, adalet ve sorumluluk gibi konular bu hukuk dalının kapsamına girer.
        </p>

        <h2>Yapay Zeka ve Telif Hakları</h2>
        <p>
            Yapay zeka tarafından üretilen eserlerin telif hakları, bu eserlerin ticari kullanımı ve yapay zeka buluşlarının patentlenmesi yapay zeka hukukunun önemli konularındandır. Ayrıca, ticari sırların korunması ve know-how yönetimi de bu hukuk dalı kapsamında değerlendirilir.
        </p>

        <h2>Yapay Zeka Sistemlerinin Veri Kullanımı</h2>
        <p>
            Yapay zeka sistemlerinin veri toplama, işleme ve kullanma süreçleri, veri gizliliği ve koruma kuralları çerçevesinde düzenlenir. Bu süreçlerin hukuka uygun olarak yürütülmesi yapay zeka hukuku tarafından denetlenir.
        </p>

        <h2>Yapay Zeka ve Siber Suçlar</h2>
        <p>
            Yapay zeka sistemlerinin hukuka aykırı kullanımı, siber suçlar ve bu sistemlerin oluşturabileceği riskler yapay zeka hukuku çerçevesinde ele alınır. Ayrıca, yapay zeka sistemlerinin sorumluluğu ve cezai yaptırımlar gibi konular da bu hukuk dalının kapsamına girer.
        </p>

        <h2>Hukuki Danışmanlık Alanlarımız</h2>
        <ul>
            <li>- Yapay zeka sistemlerinin yasal çerçevesi</li>
            <li>- Ulusal ve uluslararası düzenlemeler</li>
            <li>- Yapay zeka etiği ve yönetimi</li>
            <li>- Yapay zeka tarafından üretilen eserlerin telif hakkı</li>
            <li>- Patentler ve yapay zeka buluşları</li>
            <li>- Ticari sır koruması ve know-how yönetimi</li>
            <li>- Yapay zeka hizmet sözleşmeleri</li>
            <li>- Yapay zeka sistemlerinin veri toplama ve kullanımı</li>
            <li>- Yapay zeka sistemlerinin hukuka aykırı kullanımı</li>
            <li>- Siber suçlar ve yapay zeka</li>
            <li>- Yapay zeka sistemlerinin sorumluluğu ve cezai yaptırımlar</li>
        </ul>
    </div>
`,
    attorneyData: [
      {
        name: "Av. Ezgi",
        id: "UCjKRboUFzbXGOYC6BjrVxnx1cE2",
        title: "Aile Hukuku Uzmanı",
        bio: "Av. Ayşe Tiryaki, aile hukuku alanında uzmanlaşmış bir avukat olup, Tiryaki Hukuk & Arabuluculuk Bürosu'nda çalışmaktadır. Özellikle aile hukuku, iş hukuku, ticaret hukuku ve miras hukuku alanlarında uzmanlaşmıştır. Kariyeri boyunca birçok karmaşık davada başarılı sonuçlar elde etmiş ve müvekkillerine hukuki Arabuluculuk hizmetleri sunmuştur. Profesyonel yaşamında etik kurallara bağlı kalarak müvekkillerinin haklarını en iyi şekilde savunmayı ilke edinmiştir. Hukuk eğitimi ve geniş deneyimi sayesinde, müvekkillerine kapsamlı ve etkili çözümler sunmaktadır.",
      },
      {
        name: "Av. Hande",
        id: "LFG3jBdG4qYmtJay4ucqOFxxVKW2",
        title: "Aile Hukuku Uzmanı",
        bio: "Av. Ayşe Tiryaki, aile hukuku alanında uzmanlaşmış bir avukat olup, Tiryaki Hukuk & Arabuluculuk Bürosu'nda çalışmaktadır. Özellikle aile hukuku, iş hukuku, ticaret hukuku ve miras hukuku alanlarında uzmanlaşmıştır. Kariyeri boyunca birçok karmaşık davada başarılı sonuçlar elde etmiş ve müvekkillerine hukuki Arabuluculuk hizmetleri sunmuştur. Profesyonel yaşamında etik kurallara bağlı kalarak müvekkillerinin haklarını en iyi şekilde savunmayı ilke edinmiştir. Hukuk eğitimi ve geniş deneyimi sayesinde, müvekkillerine kapsamlı ve etkili çözümler sunmaktadır.",
      },
    ],
  },
];
// switch case for service name

watch(
  () => route.params.serviceName,
  (newServiceName) => {
    serviceName.value = newServiceName;
    console.log("Service Name Changed: ", serviceName.value);
  }
);

const pageContent = computed(() => {
  switch (serviceName.value) {
    case "aile-hukuku":
      return serviceDetails[0];
    case "ticaret-hukuku":
      return serviceDetails[1];
    case "deniz-ticareti-hukuku":
      return serviceDetails[2];
    case "is-hukuku":
      return serviceDetails[3];
    case "ceza-hukuku":
      return serviceDetails[4];
    case "miras-hukuku":
      return serviceDetails[5];
    case "kripto-hukuku":
      return serviceDetails[6];
    case "yapay-zeka-hukuku":
      return serviceDetails[7];
    default:
      return serviceDetails[0];
  }
});

const tags = ref(["Tag 1", "Tag 2", "Tag 3", "Tag 4", "Tag 5"]);
const categoryMap = {
  "aile-hukuku": "Aile Hukuku",
  "ticaret-hukuku": "Ticaret Hukuku",
  "deniz-ticareti-hukuku": "Deniz Ticareti Hukuku",
  "is-hukuku": "İş Hukuku",
  "ceza-hukuku": "Ceza Hukuku",
  "miras-hukuku": "Miras Hukuku",
  "kripto-hukuku": "Kripto Hukuku",
  "yapay-zeka-hukuku": "Yapay Zeka Hukuku",
};

const categories = ref([
  "aile-hukuku",
  "ticaret-hukuku",
  "deniz-ticareti-hukuku",
  "is-hukuku",
  "ceza-hukuku",
  "miras-hukuku",
  "kripto-hukuku",
  "yapay-zeka-hukuku",
]);

function handleContentChange(category) {
  serviceName.value = category;
}

const latestBlogs = ref([]);

// Function to fetch latest blogs
const fetchLatestBlogs = async () => {
  try {
    const blogsQuery = query(
      collection(db, "blogs"),
      orderBy("created_date", "desc"), // Order by creation time
      limit(3) // Limit to 3 blogs
    );

    const querySnapshot = await getDocs(blogsQuery);
    const latestBlogs = [];

    querySnapshot.forEach((doc) => {
      latestBlogs.push({ id: doc.id, ...doc.data() });
    });

    return latestBlogs;
  } catch (error) {
    console.error("Error fetching latest blogs: ", error);
    return [];
  }
};

onMounted(async () => {
  console.log("Service Name: ", serviceName);
  const data = await fetchLatestBlogs();
  latestBlogs.value = data;
});
</script>

<style scoped>
.hero-bg {
  background-image: url("../assets/images/blog-page-bg.webp");
}

.cursor-pointer {
  cursor: pointer;
}

.blog-content :deep(h1) {
  font-size: 2.5rem;
  font-weight: 600;
  margin: 1.5rem 0;
}

.blog-content :deep(h2) {
  font-size: 2rem;
  font-weight: 500;
  margin: 1.5rem 0;
}

.blog-content :deep(h3) {
  font-size: 1.75rem;
  font-weight: 500;
}

.blog-content :deep(h4) {
  font-size: 1.5rem;
  font-weight: 500;
}

.blog-content :deep(h5) {
  font-size: 1.25rem;
  font-weight: 500;
}

.blog-content :deep(h6) {
  font-size: 1rem;
  font-weight: 500;
}

.blog-content :deep(p) {
  line-height: 1.6;
}

.blog-content :deep(strong) {
  font-weight: bold;
}

.blog-content :deep(em) {
  font-style: italic;
}

.blog-content :deep(u) {
  text-decoration: underline;
}

.blog-content :deep(blockquote) {
  border-left: 4px solid #ccc;
  padding-left: 1rem;
  color: #666;
  margin: 1.5rem 0;
  font-style: italic;
}

.blog-content :deep(a) {
  color: #3490dc;
  text-decoration: underline;
}

.blog-content :deep(a:hover) {
  color: #1d68a7;
}

.blog-content :deep(ol) {
  list-style-type: decimal;
  margin: 1rem 0;
  padding-left: 1.5rem;
}

.blog-content :deep(ul) {
  list-style-type: disc;
  margin: 1rem 0;
  padding-left: 1.5rem;
}

.blog-content :deep(li) {
  margin-bottom: 0.5rem;
}

.blog-content :deep(.ql-align-right) {
  text-align: right;
}

.blog-content :deep(.ql-align-center) {
  text-align: center;
}

.blog-content :deep(.ql-align-justify) {
  text-align: justify;
}
</style>
