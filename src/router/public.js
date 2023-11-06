const publics = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/layouts/users/HomeLayout.vue"),
    children: [
      {
        path: "/",
        name: "home",
        component: () => import("../views/home/Home.vue"),
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
  }
];

export default publics;
