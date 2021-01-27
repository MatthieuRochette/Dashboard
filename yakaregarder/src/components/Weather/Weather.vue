<template>
    <div class="container">
        <h1>Weather</h1>
        <label for="city">Merci de choisir une ville</label>
        <input v-on:keyup.enter="searchWeather" v-model="cityChoose" type="texte" id="city" class="form-control">
        <div class="btn btn-info mt-2" v-on:click="searchWeather">Indique moi la météo !</div>
        <br>
        <br>
        <p class='error'> {{ strError }}</p>
        <div v-if="isDisplayInfo" class="containerInfo">
            <div class="row">
                <br>
                <div class="col">
                    <temp class="iconTemp" v-bind:temperature="temperature"></temp>
                </div>
                <div class="col">
                    <wind class="iconWind" v-bind:windSpeed="windSpeed"></wind>
                </div>
                <div class="col">
                    <cloud class="iconCloud" v-bind:cloudPourcentage="cloudPourcentage"></cloud>
                </div>
                <div class="col">
                    <humidity v-bind:humidity="humidity"></humidity>
                </div>
            </div>
        </div>
    </div>
</template>


<script>

import Temp from './Temp.vue'
import Wind from './Wind.vue'
import Cloud from './Cloud.vue'
import Humidity from './Humidity.vue'
import {bus} from '../../main.js'

export default {
  props: ['city'],
    name: 'Weather',
    data() {
        return {
            cityChoose: '',
            isDisplayInfo: false,
            temperature : '',
            windSpeed : '',
            humidity : '',
            cloudPourcentage: '',
            strError: '',
            timer: ''
        }
    },
    created() {
        if (this.city != '')
            this.cityChoose = this.city
        this.fetchEventsList();
        this.timer = setInterval(this.fetchEventsList, 30000);
    },
    methods: {
        fetchEventsList () {
            this.searchWeather()
        },
        cancelAutoUpdate () { clearInterval(this.timer) },
        async searchWeather() {
            if (this.cityChoose == '')
                this.strError = 'Merci de rentrer une ville'
            else 
                this.strError = ''
            const api_host = process.env.VUE_APP_API_HOST;
            const url = api_host + "/weather/" + this.cityChoose;
            const obj = await fetch(url)
                .then(function(response){ return response.json(); });
            if (obj.cod == '404') {
                this.isDisplayInfo = false
                this.strError = 'Impossible de trouver la ville'
            } else {
                this.temperature = obj.temp
                this.windSpeed = obj.wind_speed
                this.humidity = obj.humidity
                this.cloudPourcentage = obj.cloudiness
                this.isDisplayInfo = true
            }
        },
        displayInfo: function() {

        }
    },
    beforeDestroy () {
      clearInterval(this.timer)
    },
    components: {
        'temp' : Temp,
        'wind': Wind,
        'cloud' : Cloud,
        'humidity' : Humidity
    }
}
</script>

<style scoped>
.containerInfo {
    height: 150px;
}

.error {
    color: red;
    font-size: 12px;
    margin-top: -15px;
}
</style>