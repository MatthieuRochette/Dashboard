const fetch = require('node-fetch');

const token = "59MCRHmQLG2bap1hPgj6LINqOS74yIoRhzYp5tKX";
const url_apod = "https://api.nasa.gov/planetary/apod?api_key=" + token;
const url_mars = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=" + token;

/**
 * Get the latest photos from the NASA Mars rover Curiosity, from a given camera
 *
 * @param {String} camera
 * @returns JSON object containing an array of photos with various metadata
 * @returns false if there is an error (i.e. wrong camera name)
 */
async function getCuriosityPhoto(camera) {
  const date = new Date();
  var date_str = undefined;
  do {
    date.setDate(date.getDate() - 1);
    date_str = date.toISOString().slice(0,10);
    var obj = await fetch(url_mars + `&earth_date=${date_str}&camera=${camera}`)
      .then(response => response.json());
    try {
      if (obj.photos.length > 0)
        return obj;
    } catch {
      return false;
    }
  } while (true);
}

/**
 * Get the Astronomical Photo Of the Day
 *
 * @param {String} date - format : YYYY-MM-DD
 * @returns the response from the NASA API, as a JSON object
 */
async function getAPOD(date) {
  return await fetch(url_apod + `&hd=True&date=${date}`)
    .then(response => response.json());
}

module.exports.getAPOD = getAPOD;
module.exports.getCuriosityPhoto = getCuriosityPhoto;