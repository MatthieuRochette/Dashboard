<template>
    <div>
        <div class="card mt-4">
            <h6>Cloud cover</h6>
            <p class="cloudTemperature">{{ cloudPourcentage }}%</p>
        </div>
    </div>
  
</template>

<script>
export default {
    name: 'Cloud',
    props: ['cloudPourcentage']

}
</script>

<style scoped>

.card {
    width: 250px;
    position: absolute;
    left: 35%;
    text-align: right;
    padding-right: 20px;
    height: 110px;
    color: white;
    background-color: grey;
    margin-left: -50%;
}

.cloudTemperature {
    font: bold;
    font-size: 60px;
    text-align: center;
}

h6 {
    margin-top: 5px;
    text-align: center;
}

</style>