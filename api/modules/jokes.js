const fetch = require('node-fetch');

const url_random = "https://www.blagues-api.fr/api/random";
const url_random_cat = "https://www.blagues-api.fr/api/type/{type}/random";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMjE1MTM2MDUxNDg2Nzg1NTM2IiwibGltaXQiOjEwMCwia2V5IjoiOVdVc2Juam9jM0I0c0tPVWxUNDlCbEVCS0gzWmNLeEE3SjNrREdoMXFTUTJIWmZGYzAiLCJjcmVhdGVkX2F0IjoiMjAyMC0xMS0yNFQxNjo0MzozOCswMTowMCIsImlhdCI6MTYwNjIzMjYxOH0.Sgp5MSbuB9VW9NDrs1_qOVbU35bZPwqv6w4WhmUUnTY";

/**
 * Get a random joke
 *
 * @returns a JSON object containing the joke
 */
async function getRandom() {
  return await fetch(url_random, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
  }).then(response => response.json());
}

/**
 * Get a random joke from a specified category
 *
 * @param {String} cat
 * @returns a JSON object containing the joke
 */
async function getRandomCategory(cat) {
  return await fetch(url_random_cat.replace("{type}", cat), {
      headers: {
        'Authorization': 'Bearer ' + token
      }
  }).then(response => response.json());
}

module.exports.getRandom = getRandom;
module.exports.getRandomCategory = getRandomCategory;