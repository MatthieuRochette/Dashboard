<template>
    <div>
        <div class="card mt-4">
            <h6>Temperature</h6>
            <p class="temperatureTitle">{{ temperature }}°C</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "Temperature",
    props: ['temperature']
}
</script>

<style scoped>
.card {
    width: 200px;
    position: absolute;
    text-align: center;
    height: 110px;
    margin-top: -500px;
    color: white;
    background-color: grey;
}

.temperatureTitle{
    font: bold;
    font-size: 60px;
}

h6 {
    margin-top: 5px;
    text-align: center;
}


</style>