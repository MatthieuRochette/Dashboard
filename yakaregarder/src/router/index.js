import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const api_url = process.env.VUE_APP_API_ABOUT_URL

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about.json',
    redirect: api_url
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
