<template>
    <div>
        <div class="card mt-4">
            <h6>Humidity</h6>
            <p class="humidityTitle">{{ humidity }}%</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Humidity',
    props: ['humidity']
}
</script>

<style scoped>

.card {
    position: absolute;
    left: 1%;
    width: 200px;
    text-align: center;
    height: 110px!important;
    color: white;
    background-color: grey;
}

.humidityTitle {
    font: bold;
    font-size: 60px;
}

h6 {
    margin-top: 5px;
    text-align: center;
}



</style>