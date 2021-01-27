<template>
    <div>
        <h1>Welcome to the world of internet images</h1>
        <h3>Search</h3>
        <input type="text" v-on:keyup.enter="searchImg" v-model="searchStr" class="searchbar">
        <div v-on:click="searchImg" class="btn btn-info">Search</div>
        <p class="strerror"> {{strError}} </p>
        <listimgur v-bind:images="images"></listimgur>
    </div>
    
</template>


<script>

import ListImgur from './ListImgur.vue'

export default {
  methods: {
      searchImg: async function() {
        this.images = null
        this.strError = ''
        const api_host = process.env.VUE_APP_API_HOST
        const url = api_host + "/imgur/search/" + this.searchStr
        const response = await fetch(url)
        if (response.status == 404)
            this.strError = 'No result'
        const obj = await response.json()
        console.log(obj.images)
        if (obj.images.length == 0)
            this.strError = 'No result'
        this.images = obj.images
      }
    },
    name: 'Imgur',
    data() {
        return {
            searchStr: '',
            images: null,
            strError: ''
        }
    },
    components: {
        'listimgur': ListImgur
    }
}
</script>


<style scoped>

.strerror {
    color: red;
}

.btn {
    margin-left: 10px;
}

</style>