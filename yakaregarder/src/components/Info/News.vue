<template>
    <div>
        <h2>News</h2>
        <select v-model="categorieSelect">
            <option class="categorieSelect" v-bind:key="index" v-for="(categoriesOfNews, index) in categoriesOfNews">{{categoriesOfNews}}</option>
        </select>
        <h3>Search</h3>
        <p class="optionstr">(Optional)</p>
        <br>
        <input type="text" v-on:keyup.enter="fieldSearch" v-model="searchStr" class="searchbar">
        <br>
        <div v-on:click="searchNews" class="btn btn-primary mt-2">
            Search
        </div>
        <list-of-news v-bind:news="news"></list-of-news>
    </div>

</template>

<script>
import ListOfNews from './ListOfNews.vue';

export default {
  components: { ListOfNews },
  watch: {
  },
    name: 'News',
  data () {
    return {
        searchStr: '',
        news: null,
        dataNew : {
            title: '',
            description:'',
            url:'',
            displayButton: false
        },
        categorieSelect : 'business',
        categoriesOfNews : ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology']
    }
  },
  component: {
      'listOfNews': ListOfNews

  },
  methods: {
      async searchNews() {
          this.news = null
          const api_host = process.env.VUE_APP_API_HOST;
          const url = api_host + "/news/" + this.categorieSelect + "/" + this.searchStr
          const obj = await fetch(url)
            .then(function(response){ return response.json(); });
        console.log(obj)
        this.dataNew.title = obj.articles[0].title
        this.dataNew.description = obj.articles[0].description
        this.dataNew.url = obj.articles[0].url
        console.log(this.dataNew.url)
        this.news = obj.articles
        this.dataNew.displayButton = true
      },
      learnMore: function() {

      }
  },

}
</script>

<style scoped>

.optionstr {
    margin-top: -10px;
}

.searchbar {
    margin-top: -90px;
}

.answerTitle {
    margin-top: 10px;
    font-size: 21px;
}

</style>