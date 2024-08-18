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
import ServicesSinglePage from "./views/ServicesSinglePage.vue";

const routes = [
  { path: "/", name: "Home", component: HomePage },
  { path: "/team", name: "Team", component: TeamPage },
  { path: "/services", name: "Services", component: ServicesPage },
  { path: "/blog", name: "Blog", component: BlogPage },
  { path: "/contact", name: "Contact", component: ContactPage },
  {
    path: "/blog/:slug/:id",
    name: "BlogSinglePage",
    component: BlogSinglePage,
  },
  {
    path: "/services/:service",
    name: "ServicesSinglePage",
    component: ServicesSinglePage,
  },
  {
    path: "/appointment",
    name: "AppointmentPage",
    component: AppointmentPage,
  },
  {
    path: "/profile",
    name: "Profile",
    component: ProfilePage,
    meta: { requiresAuth: true },
  },
  {
    path: "/payment/:id",
    name: "Payment",
    component: PaymentPage,
    meta: { requiresAuth: true },
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
    next('/');
  } else {
    next();
  }
});

export default router;
