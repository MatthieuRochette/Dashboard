// Open Weather Map module

const fetch = require('node-fetch');

const api_key = process.env.OPENWEATHERMAP_KEY || "5aad566f569fb1db1219d03a82ff85cd";
const url_fromCity = "https://api.openweathermap.org/data/2.5/weather?q={city}&units=metric&appid=" + api_key;

/**
 * Get the weather in a specific city.
 *
 * @param {String} city
 * @returns a simple Object with some weather parameters inside
 * @returns the original API response (as a JSON) on error (e.g. city not found).
 */
async function fromCity(city) {
    const json = await fetch(url_fromCity.replace("{city}", city))
        .then(function(response){ return response.json(); });
    if (json.cod == "200") {
        const ret_obj = Object();
        ret_obj["temp"] = json.main.temp;
        ret_obj["cloudiness"] = json.clouds.all;
        ret_obj["wind_speed"] = json.wind.speed;
        ret_obj["humidity"] = json.main.humidity;
        return ret_obj;
    } else {
        console.error("City not found");
        return json;
    }
}

module.exports.fromCity = fromCity;