<template>
    <div>
    <ul class="list">
        <h4>{{ title }}</h4>
        <li v-for="(cocktail, index) in  cocktailsName" v-bind:key="index">
            <div class="card">
                <div class="col">
                    <div class="card-body" v-on:click="searchDetail(cocktail.idDrink)">
                        {{ changeTitle() }}
                        <img v-bind:src="cocktail.strDrinkThumb" alt="">
                        <h3> {{ cocktail.strDrink }}</h3>
                    </div>
                </div>
            </div>
        </li>
        <cocktailDetail v-if="reveal" v-bind:toggleDetail="toggleDetail" v-bind:reveal="reveal" v-bind:dataCocktail="dataCocktail"></cocktailDetail>
    </ul>
</div>
</template>

<script>

import CocktailDetail from './CocktailDetail.vue'

export default {
       name: 'ListCocktail',
    data() {
        return {
            title: "",
            reveal: false,
            dataCocktail: {
                instructions: '',
                title: '',
                urlImage: '',
                ingredients: '',
                isAlcool: false,
                typeGlass: ''
            }
        }
    },
    components: {
        'cocktailDetail': CocktailDetail
    },
    methods: {
        changeTitle() {
            this.title = "We offer you :"
        },
        async searchDetail(idDrink) {
            this.reveal = false
            const api_host = process.env.VUE_APP_API_HOST;
            const url = api_host + "/cocktail/lookup/" + idDrink
            const obj = await fetch(url)
                .then(function(response){ return response.json()})
            this.fillDataCocktail(obj)
            this.reveal = true
        },
        fillDataCocktail: function(obj) {
            this.dataCocktail.title = obj.name
            this.dataCocktail.instructions = obj.instructions
            this.dataCocktail.urlImage = obj.thumbnail
            this.dataCocktail.ingredients = obj.ingredients
            this.dataCocktail.typeGlass = obj.glass
            console.log(this.dataCocktail.typeGlass)
            if (obj.alcoholic == "Alcoholic") {
                this.dataCocktail.isAlcool = true
            } else {
                this.dataCocktail.isAlcool = false
            }
        },
        toggleDetail: function() {
            this.reveal = false
        }

    },
    props: ['cocktailsName']
}
</script>

<style scoped src='./ListCocktail.css'>

</style>