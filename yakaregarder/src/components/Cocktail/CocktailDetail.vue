<template>
    <div v-on:click="toggleDetail" class="overlay">
        <div class="bloc-detail">
            <div class="modale card">
                <div v-on:click="toggleDetail" class="btn-close btn btn-danger">X</div>
                <div v-if="dataCocktail.isAlcool">
                    <img v-bind:src="urlAlccol" class="alcoolImg" alt="">
                </div>
                <img v-bind:src="dataCocktail.urlImage" class="cocktailImg" alt="">
                <h2>{{dataCocktail.title}}</h2>
                <h5>Ingredients:</h5>
                <li v-for="(ingredient, index) in dataCocktail.ingredients" v-bind:key="index">
                    <div class="card-body">
                        <h5 class="card-subtitle">
                            {{ingredient}}
                        </h5>
                    </div>
                </li>
                <h5>Instructions:</h5>
                <p class="instructions">{{dataCocktail.instructions}}</p>
                <h5>Type of glass:</h5>
                <p class="instructions">{{dataCocktail.typeGlass}}</p>
            </div>
        </div>
        
    </div>
    
</template>

<script>
export default {
    name: "cocktailDetail",
    data() {
        return {
            urlAlccol : 'https://www.signaletique-express.fr/1348-large_default/panneau-alcool-interdit-pour-les-femmes-enceintes.jpg',
        }

    },
    props: ['dataCocktail', 'reveal', 'toggleDetail']
}
</script>

<style scoped src='./CocktailDetail.css'>


</style>