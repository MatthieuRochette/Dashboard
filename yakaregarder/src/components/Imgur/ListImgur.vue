<template>
    <div>
        <ul class="list">
            <li v-for="(image, index) in images" v-bind:key="index">
                <div class="card">
                    <div class="card-body">
                        <h3>{{ image.title }}</h3>
                        <p>Author: {{ image.account_url }}</p>
                        <img class="imgurimg" v-bind:src="image.link" alt="">
                    </div>
                </div>

            </li>
        </ul>
    </div>
  
</template>

<script>
export default {
    name: 'ListImgur',
    data() {
        return {
        }
    },
    props: ['images']

}
</script>

<style scoped>

.list {
    margin-top: 50px;
    margin-left: -40px;
    list-style-type: none;
}

.imgurimg {
    width: 400px;
}

</style>