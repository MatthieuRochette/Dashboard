<template>
    <div>
        <div class="row">
            <div class="col">
                <select v-model="cameraSelect">
                    <option class="cameraSelect" v-bind:key="index" v-for="(cameras, index) in cameras">{{cameras}}</option>
                </select>
                <br>
                <div class="btn btn-success" v-on:click="displayPhotoMars">
                    Je veux voir des photos de mars !
                </div>
                <div class="imgnasa">
                    <img v-bind:src="data.urlMarsImage" alt="">
                </div>
            </div>
            <div class="col">
                <b-form-datepicker id="astro-datepicker" v-model="datePickerValue" class="datepicker"></b-form-datepicker>
                <br>
                <div class="btn-astro-photo btn-success" v-on:click="displayAstroPhoto">
                    Photo of the day ?
                </div>
                <br>
                <div class="imageapod" v-if="displayPhoto">
                    <img v-bind:src="data.urlApodImage">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name : 'Nasa',
    data() {
        return {
            displayPhoto: false,
            datePickerValue: '2020-11-01',
            data: {
                urlApodImage: '',
                urlMarsImage: ''
            },
            cameraSelect: 'FHAZ',
            cameras : ['FHAZ', 'RHAZ','MAST','CHEMCAM','MAHLI','MARDI','NAVCAM'],
            camerasDescription : ['Front Hazard Avoidance', 'Rear Hazard Avoidance', 'Mast Camera', 'Chemistry and Camera Complex', 'Mars Hand Lens Imager', 'Mars Descent Image', 'Navigation Camera', 'Panoramic Camera', 'Miniature Thermal Emission Spectrometer']
        }
    },
    methods: {
        async displayPhotoMars() {
            this.data.urlImage = ''
            const api_host = process.env.VUE_APP_API_HOST;
            const url = api_host + "/nasa/mars/" + this.cameraSelect;
            console.log(url)
            const obj = await fetch(url)
                .then(function(response){ return response.json(); });
            this.data.urlMarsImage = obj.photos[0].img_src
            console.log(obj.photos[0].img_src)
        },
        async displayAstroPhoto() {
            this.data.urlApodImage = ''
            const api_host = process.env.VUE_APP_API_HOST;
            const url = api_host + "/nasa/apod/" + this.datePickerValue
            console.log(url)
            const obj = await fetch(url)
                .then(function(response){return response.json(); });
            this.data.urlApodImage = obj.url
            this.displayPhoto = true
        }
    }
}
</script>

<style scoped src='./Nasa.css'>


</style>