<template>
    <div>
        <ul class="list">
            <li v-for="(news, index) in news" v-bind:key="index">
                <div class="card">
                    <div class="card-body">
                        <h3> {{ news.title }}</h3>
                        <p>{{ news.description}}</p>
                        <img class="imgInfo" v-bind:src="news.urlToImage" alt="">
                        <a v-bind:href="news.url" target="_blank" class="btn btn-info">Learn more</a>
                    </div>
                </div>
            </li>

        </ul>
    </div>
</template>

<script>
export default {
    name: 'ListOfNews',
    data() {
        return {

        }
    },
    methods: {

    },
    props: ['news']
    

}
</script>

<style scoped>

.btn {
    margin-left: 120px;
}

.imgInfo {
    width: 500px;
}

.list {
    list-style-type: none;
    align-items: center;
    margin-left: -40px;
}

</style>