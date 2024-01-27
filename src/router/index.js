import { createRouter, createWebHistory } from "vue-router";
import adminDashboard from "../views/Admin/Dashboard.vue";
import FirstPage from "../components/First.vue"
import adminLogin from "../views/Admin/Login.vue";
import adminRegister from "../views/Admin/Register.vue";
import adminEdit from "../views/Admin/Task/Edit.vue";
import adminCreate from "../views/Admin/Task/Create.vue";
import adminShow from "../views/Admin/Task/Show.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "first",
      component: FirstPage,
    },
    {
      path: "/admin",
      name: "admin.dashboard",
      component: adminDashboard,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/admin/register",
      name: "admin.register",
      component: adminRegister,
      meta: {
        requireAuth: false,
      },
    },
    {
      path: "/admin/login",
      name: "admin.login",
      component: adminLogin,
      meta: {
        requireAuth: false,
      },
    },
    {
      path: "/admin/edit/:id",
      name: "admin.edit",
      component: adminEdit,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/admin/show/:id",
      name: "admin.show",
      component: adminShow,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/admin/create",
      name: "admin.create",
      component: adminCreate,
      meta: {
        requireAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from) => {
  if (
    to.name.match("^admin") &&
    to.meta.requireAuth &&
    !localStorage.getItem("token")
  ) {
    return { name: "admin.login" };
  }

  if (
    to.name.match("^admin") &&
    !to.meta.requireAuth &&
    localStorage.getItem("token")
  ) {
    return { name: "admin.dashboard" };
  }
});

export default router;
