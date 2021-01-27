<template>
    <div class="container">
        <h1>Find the best cocktail</h1>
        <div>
            <input type="text" v-on:keyup.enter="fieldIngredient" v-model="ingredient" class="input-group"> 
            <button v-on:click="fieldIngredient" id="searchButton" class="btn btn-primary mt-2"> Trouve moi à boire !</button>
            <p class="strerror">{{ strError }}</p>
        </div>
        <br>
        <listCocktail v-bind:cocktailsName='cocktailsName'></listCocktail>
    </div>
</template>
<script>

import ListCocktail from './ListCocktail.vue'

export default {
  components: { ListCocktail },
    name: 'CocktailPage',
    data() {
        return {
            cocktailsName : null,
            ingredient : "",
            strError: ""
        }
    },
    methods: {
        fieldIngredient: function() {
            if (this.ingredient == "") {
                this.strError = "Missing ingredient"
            } else {
                this.strError = ""
                this.searchCocktail()
            }
        },
        async searchCocktail() {
            this.cocktailsName = null
            const api_host = process.env.VUE_APP_API_HOST;
            console.log(api_host);
            const url = api_host + "/cocktail/search/ingredient/" + this.ingredient;
            console.log(url);
            const obj = await fetch(url)
                .then(function(response){ return response.json(); });
            this.cocktailsName = obj.drinks
        }
    },
    component: {
        'listCocktail': ListCocktail
    },
}
</script>

<style scoped>

.strerror {
    color: red;
    font-size: 14px;
}

</style>