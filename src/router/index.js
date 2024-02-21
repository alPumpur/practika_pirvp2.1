import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'products',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/ProductsView.vue')
    }
  },
  {
    path: '/cart',
    name: 'cart',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/CartView.vue')
    }
  },
  {
    path: '/login',
    name: 'login',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
    }
  },
  {
    path: '/registration',
    name: 'registration',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/RegistrationView.vue')
    }
  },
  {
    path: '/order',
    name: 'order',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/OrderView.vue')
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
