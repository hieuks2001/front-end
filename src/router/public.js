import auth from "./middleware/auth";

const publics = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/layouts/users/HomeLayout.vue"),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "/",
        name: "home",
        component: () => import("../views/home/Home.vue"),
      },
      {
        path:'/profile',
        name:'profile',
        component: ()=> import('../views/auth/Profile.vue')
      },
    ],
  },

  // Auth
  {
    path:'/login',
    name:'login',
    component: ()=> import('../views/auth/Login.vue')
  },
  {
    path:'/register',
    name:'register',
    component: ()=> import('../views/auth/Register.vue')
  },
  
];

export default publics;
