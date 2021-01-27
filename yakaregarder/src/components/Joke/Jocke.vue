<template>
    <div class="containerJoke">
        <br>
        <h2>Welcome to your comic space</h2>
        <br>
        <select v-model="select">
            <option class="jokeselect" v-bind:key="index" v-for="(categories, index) in categories">{{ categories }}</option>
        </select>
        <br>
        <div class="btn btn-info" v-on:click="findRiddle">
            Trouve moi une devinette !
        </div>
        <div>
        <p class="errorStr">{{ strError }}</p>
        </div>
        <br>
        <br>
        <div v-if="displayRiddle">
            <p class="jokeStr">{{jokeData.joke}}</p>
            <div class="btn btn-success" v-on:click="showAnswer">
                Show the answer
            </div>
            <div v-if="displayAnswer">
                <p class="answer">{{jokeData.answer}}</p>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'Joke',
    data() {
        return {
            jokeData: {
                joke : '',
                answer : ''
            },
            displayRiddle : false,
            displayAnswer: false,
            select : '',
            strError: '',
            categories : ['global', 'dev', 'dark', 'limit', 'beauf', 'blondes', 'random']

        }
    },
    methods: {
        async findRiddle() {
            this.displayAnswer = false
            this.jokeData.answer = ''
            const api_host = process.env.VUE_APP_API_HOST;
            const url = api_host + "/jokes/" + this.select;
            const response = await fetch(url);
            if (response.status == 404)
                this.strError = "Please enter a categories"
            const obj = await response.json()
            this.jokeData.joke = obj.joke;
            this.jokeData.answer = obj.answer;
            if (obj.status != 400)
                this.strError = ''
                this.displayRiddle = true
        },
        showAnswer: function() {
            this.displayAnswer = true
        }
    }
}
</script>

<style scoped>

h2 {
    font-size: 50px;
}

.btn {
    align-items: center;
    margin-top: 5px;
    margin-left: 50px;
}

.containerJoke {
    text-align: center;
}

.answer {
    margin-top: 20px;
}

.errorStr {
    color: red;
    font-size: 9px;
    text-align: center;
    margin-left: -55px;
}

</style>