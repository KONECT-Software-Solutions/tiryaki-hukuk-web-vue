import { createRouter, createWebHistory } from "vue-router";
import store from './store';
import HomePage from "./views/HomePage.vue";
import TeamPage from "./views/TeamPage.vue";
import ServicesPage from "./views/ServicesPage.vue";
import BlogPage from "./views/BlogPage.vue";
import ContactPage from "./views/ContactPage.vue";
import BlogSinglePage from "./views/BlogSinglePage.vue";
import AppointmentPage from "./views/AppointmentPage.vue";
import ProfilePage from "./views/ProfilePage.vue";
import PaymentPage from "./views/PaymentPage.vue";
import ServiceDetailPage from "./views/ServiceDetailPage.vue";
import NotFound from "./views/NotFound.vue";

const routes = [
  { path: "/", name: "Home", component: HomePage },
  { path: "/ekip", name: "Team", component: TeamPage },
  { path: "/hizmetler", name: "Services", component: ServicesPage },
  { path: "/blog", name: "Blog", component: BlogPage },
  { path: "/iletisim", name: "Contact", component: ContactPage },
  {
    path: "/blog/:slug/:id",
    name: "BlogSinglePage",
    component: BlogSinglePage,
  },
  {
    path: "/hizmetler/:serviceName",
    name: "ServiceDetail",
    component: ServiceDetailPage 
  },
  {
    path: "/randevu-olustur",
    name: "AppointmentPage",
    component: AppointmentPage,
  },
  {
    path: "/hesabim",
    name: "Profile",
    component: ProfilePage,
    meta: { requiresAuth: true },
  },
  {
    path: "/odeme/:id",
    name: "Payment",
    component: PaymentPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/:pathMatch(.*)*', // Catch-all route
    name: 'NotFound',
    component: NotFound
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    alert('Bu sayfayı görüntülemek için giriş yapmalısınız.');
    next('/');
  } else {
    next();
  }
});

export default router;
