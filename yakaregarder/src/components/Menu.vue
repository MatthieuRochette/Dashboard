<template>
    <div>
      <h1>Menu</h1>
        <div class="col-menu">
            <p class="prefUser">{{ name }}'s preference:</p>
            <div class="form-check">
                <input v-model="checkDisplay" value="Weather" id="weather" type="checkbox" class="form-check-input">
                <label for="weather">Weather</label>
            </div>
            <div class="form-check">
                <input v-model="checkDisplay" value="Cocktail" id="cocktail" type="checkbox" class="form-check-input">
                <label for="cocktail">Cocktails</label>
            </div>
            <div class="form-check">
                <input v-model="checkDisplay" value="Joke" id="joke" type="checkbox" class="form-check-input">
                <label for="joke">Joke</label>
            </div>
            <div class="form-check">
                <input v-model="checkDisplay" value="Nasa" id="nasa" type="checkbox" class="form-check-input">
                <label for="nasa">Nasa</label>
            </div>
            <div class="form-check">
                <input v-model="checkDisplay" value="Imgur" id="imgur" type="checkbox" class="form-check-input">
                <label for="imgur">Imgur</label>
            </div>
            <div class="form-check">
                <input v-model="checkDisplay" value="News" id="news" type="checkbox" class="form-check-input">
                <label for="news">News</label>
            </div>
        </div>
    </div>
</template>

<script>

import {bus} from '../main.js'

export default {
    async created () {
        const api_host = process.env.VUE_APP_API_HOST;
        const userdata = await fetch(api_host + "/users/get_info/" + this.loginData.email)
            .then((response) => { return response.json() })
        this.checkDisplay = userdata.services
        this.name = userdata.account.username
    },
name: 'Menu',
  watch: {
      checkDisplay: async function(newCheckDisplay) {
          const api_host = process.env.VUE_APP_API_HOST;
          const res = await fetch(api_host + "/users/update_services", {
              method: 'post',
              body: JSON.stringify({
                'services': newCheckDisplay,
                'email': this.loginData.email
              }),
              headers: {
                  "Content-type": "application/json; charset=UTF-8"
              }
          });
            if (res.status != 200) {
                console.error("Error when updating the chosen services")
            }
            bus.$emit('updateDisplay', newCheckDisplay)
      }
  },
  props: ['loginData'],
  data(){
    return {
        checkDisplay: [],
        name: ''
    }
  }
}
</script>

<style>

.col-menu {
  list-style:none;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  margin-left: 5px;
}

.form-check {
    margin-left: 10px;
}

.prefUser {
    font-weight: bold;
}
</style>