<template>
    <div>
        <div class="card mt-4">
            <h6>Wind speed</h6>
            <p class="windspeed">{{ windSpeed }}m/s</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "Wind",
    props: ['windSpeed']
    
}
</script>

<style scoped>
.card {
    position: absolute;
    left: 20%;
    width: 200px;
    text-align: center;
    height: 110px;
    color: white;
    background-color: grey;
    margin-left: -25%;
}

.windspeed {
    font: bold;
    font-size: 60px;
}

h6 {
    margin-top: 5px;
    text-align: center;
}


</style>