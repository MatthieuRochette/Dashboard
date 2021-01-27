const fetch = require('node-fetch');

const token = "737ad8e6909a4be9a0ec74f6624f2aff";
const url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=" + token;

/**
 * Get the latest news in a specific category.
 * If the research field is empty, will return most trending. Else, returns the query results.
 *
 * @param {String} category
 * @param {String} search
 * @returns a JSON object containing a list of press articles about the requested category and query
 */
async function topNews(category, search) {
  var req = url + `&category=${category}`;
  if (search != "") {
    req += `&q=${search}`;
  }
  return await fetch(req, {
    headers: {
      'Authorization': token
    }
  }).then(response => response.json());
}

module.exports.topNews = topNews;