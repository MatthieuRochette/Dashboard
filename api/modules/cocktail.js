const fetch = require('node-fetch');

const url_searchByIngredient = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i={ingredient}";
const url_lookupById = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i={id}";

/**
 * Make a search request to the cocktail api
 *
 * @param {String} ingredient - ingredient contained in the cocktail
 * @returns a json object containing an array of cocktail objects (names, IDs & url to thumbnail)
 * @returns null if the ingredient is not found
 */
async function searchByIngredient(ingredient) {
  try {
    const res = await fetch(url_searchByIngredient.replace("{ingredient}", ingredient))
    const json = await res.json();
    return json;
  } catch (err) {
    console.error(err);
    return null;
  }
}

/**
 * Get the details on a cocktail using its ID
 *
 * @param {*} id - id of the cocktail in the API's database
 * @returns a JSON object with details about the cocktail
 */
async function lookupById(id) {
  const json = await fetch(url_lookupById.replace("{id}", id))
    .then(function(response){ return response.json(); })
    .catch((error) => { return JSON.stringify({'status': 400}) });
  try {
    ret_obj = Object();
    ret_obj["id"] = json.drinks[0].idDrink;
    ret_obj["name"] = json.drinks[0].strDrink;
    ret_obj["alcoholic"] = json.drinks[0].strAlcoholic;
    ret_obj["glass"] = json.drinks[0].strGlass;
    ret_obj["instructions"] = json.drinks[0].strInstructions;
    ret_obj["thumbnail"] = json.drinks[0].strDrinkThumb;
    ret_obj["ingredients"] = [json.drinks[0].strIngredient1,
      json.drinks[0].strIngredient2, json.drinks[0].strIngredient3,
      json.drinks[0].strIngredient4, json.drinks[0].strIngredient5,
      json.drinks[0].strIngredient6, json.drinks[0].strIngredient7,
      json.drinks[0].strIngredient8, json.drinks[0].strIngredient9,
      json.drinks[0].strIngredient10, json.drinks[0].strIngredient11,
      json.drinks[0].strIngredient12, json.drinks[0].strIngredient13,
      json.drinks[0].strIngredient14, json.drinks[0].strIngredient15];
    ret_obj["ingredients"] = ret_obj["ingredients"].filter( (el) => {
      return el != null;
    });
    ret_obj["measures"] = [json.drinks[0].strMeasure1,
      json.drinks[0].strMeasure2, json.drinks[0].strMeasure3,
      json.drinks[0].strMeasure4, json.drinks[0].strMeasure5,
      json.drinks[0].strMeasure6, json.drinks[0].strMeasure7,
      json.drinks[0].strMeasure8, json.drinks[0].strMeasure9,
      json.drinks[0].strMeasure10, json.drinks[0].strMeasure11,
      json.drinks[0].strMeasure12, json.drinks[0].strMeasure13,
      json.drinks[0].strMeasure14, json.drinks[0].strMeasure15];
    ret_obj["measures"] = ret_obj["measures"].filter( (el) => {
        return el != null;
    });
    return ret_obj;
  } catch {
    return json;
  }
}

module.exports.searchByIngredient = searchByIngredient;
module.exports.lookupById = lookupById;