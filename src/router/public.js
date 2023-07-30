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
      {
        path: "about",
        name: "about",
        component: () => import("../views/home/about/About.vue"),
      },
      {
        path: "price-list",
        name: "price-list",
        component: () => import("../views/home/priceList/PriceList.vue"),
      },
      {
        path: "contact",
        name: "contact",
        component: () => import("../views/home/contact/Contact.vue"),
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
