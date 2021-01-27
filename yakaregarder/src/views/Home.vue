<template>
  <div class="home">
    <menuselect v-if="!reveal" v-bind:loginData="loginData"></menuselect>
    <contenu v-if="!reveal" v-bind:email="email"></contenu>
    <header-top v-bind:loginDate="loginData"></header-top>
    <login v-bind:reveal="reveal" v-bind:toggleLogin="toggleLogin" v-on:toggleLogin="toggleLogin($event)"></login>
  </div>
</template>

<script>

import Header from '../components/Header.vue'
import Contenu from '../components/Contenu.vue'
import Login from '../components/Login.vue'
import Menu from '../components/Menu.vue'
import {bus} from '../main'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Vue from 'vue'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

export default {
  name: 'App',
  data () {
    return {
        checkDisplay: [''],
        reveal: true,
        email: '',
        isLogged: false,
        loginData: null
    }
  },
  methods: {
    toggleLogin(loginData) {
        this.loginData = loginData
        this.email = this.loginData.email
        this.reveal = !this.reveal
    }
  },
  components: {
    'header-top': Header,
    'contenu': Contenu,
    'login': Login,
    'menuselect': Menu
  }
}
</script>
