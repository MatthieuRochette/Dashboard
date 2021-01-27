<template>
    <div class="container mt-3">
        <br>
        <br>
        <br>
        <div v-if="displayNav.weather" class="btn btn-outline-primary mr-2" v-on:click="toggleOnWeather">Weather</div>
        <div v-if="displayNav.imgur" class="btn btn-outline-primary mr-2" v-on:click="toggleOnImgur">Imgur</div>
        <div v-if="displayNav.cocktails" class="btn btn-outline-primary mr-2" v-on:click="toggleOnCocktail">Cocktails</div>
        <div v-if="displayNav.joke" class="btn btn-outline-primary mr-2" v-on:click="toggleOnJoke">Joke</div>
        <div v-if="displayNav.nasa" class="btn btn-outline-primary mr-2" v-on:click="toggleOnNasa">Nasa</div>
        <div v-if="displayNav.news" class="btn btn-outline-primary mr-2" v-on:click="toggleOnNews">News</div>
    
    <div class="card mb-5" v-if="toggle1">
        <weather class="weather" v-bind:city="city"></weather>
    </div>
    <div class="card mb-5" v-if="toggle2">
        <imgur class="p-2"></imgur>
    </div>
    <div class="card mb-5" v-if="toggle3">
        <cocktail></cocktail>
    </div>
    <div class="card mb-5" v-if="toggle4">
        <joke></joke>
    </div>
    <div class="card mb-5" v-if="toggle5">
        <nasa></nasa>
    </div>
    <div class="card mb-5" v-if="toggle6">
        <news></news>
    </div>

    </div>
</template>

<script>
import Weather from './Weather/Weather.vue'
import Imgur from './Imgur/Imgur.vue'
import Cocktail from './Cocktail/Cocktail.vue'
import Joke from './Joke/Jocke.vue'
import Nasa from './NASA/Nasa.vue'
import News from './Info/News.vue'
import {bus} from '../main'

export default {
  props: ['email'],
    components: {
        'weather' : Weather,
        'imgur' : Imgur,
        'cocktail' : Cocktail,
        'joke' : Joke,
        'nasa' : Nasa,
        'news' : News
    },
    data() {
        return {
            checkDisplay: [''],
            city: '',
            toggle1: false,
            toggle2: false,
            toggle3: false,
            toggle4: false,
            toggle5: false,
            toggle6: false,
            displayNav: {
                weather: false,
                cocktails: false,
                joke: false,
                nasa: false,
                news: false,
                imgur: false
            }
        }
    },
    created() {
        bus.$on('updateDisplay', (data) => {
            this.checkDisplay = data
            if (this.checkDisplay.includes('Nasa') == true)
                this.displayNav.nasa = true
            else
                this.displayNav.nasa = false
            if (this.checkDisplay.includes('Joke') == true)
                this.displayNav.joke = true
            else
                this.displayNav.joke = false
            if (this.checkDisplay.includes('Cocktail') == true)
                this.displayNav.cocktails = true
            else
                this.displayNav.cocktails = false
            if (this.checkDisplay.includes('Weather') == true)
                this.displayNav.weather = true
            else
                this.displayNav.weather = false
            if (this.checkDisplay.includes('News') == true)
                this.displayNav.news = true
            else
                this.displayNav.news = false
            if (this.checkDisplay.includes('Imgur') == true)
                this.displayNav.imgur = true
            else
                this.displayNav.imgur = false
            this.toggleFalse()
        })
        this.getInfoUser()
    },
    methods: {
        getInfoUser: async function() {
            const api_host = process.env.VUE_APP_API_HOST;
            const userdata = await fetch(api_host + "/users/get_info/" + this.email)
                .then((response) => { return response.json() })
            this.city = userdata.account.city
        },
        toggleFalse: function() {
            this.toggle1 = false
            this.toggle2 = false
            this.toggle3 = false
            this.toggle4 = false
            this.toggle5 = false
            this.toggle6 = false
        },
        toggleOnWeather: function() {
            this.toggle1 = true
            this.toggle2 = false
            this.toggle3 = false
            this.toggle4 = false
            this.toggle5 = false
            this.toggle6 = false
        },
        toggleOnImgur: function() {
            this.toggle1 = false
            this.toggle2 = true
            this.toggle3 = false
            this.toggle4 = false
            this.toggle5 = false
            this.toggle6 = false
        },
        toggleOnCocktail: function() {
            this.toggle1 = false
            this.toggle2 = false
            this.toggle3 = true
            this.toggle4 = false
            this.toggle5 = false
            this.toggle6 = false
        },
        toggleOnJoke: function() {
            this.toggle1 = false
            this.toggle2 = false
            this.toggle3 = false
            this.toggle4 = true
            this.toggle5 = false
            this.toggle6 = false
        },
        toggleOnNasa: function() {
            this.toggle1 = false
            this.toggle2 = false
            this.toggle3 = false
            this.toggle4 = false
            this.toggle5 = true
            this.toggle6 = false
        },
        toggleOnNews: function() {
            this.toggle1 = false
            this.toggle2 = false
            this.toggle3 = false
            this.toggle4 = false
            this.toggle5 = false
            this.toggle6 = true
        }
    }
}
</script>

<style scoped>
h1 {
    margin-top: 100px!important;
}

.weather {
    margin-top: 10px;
    margin-left: 5px;
}
</style>>