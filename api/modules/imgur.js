const fetch = require('node-fetch');

const client_id = "f3da223b37d2de2"
const url_search = "https://api.imgur.com/3/gallery/search{/sort}?q={search}"

/**
 * Parses the response from thhe Imgur API to give the front only relevant data
 *
 * @param {Object} obj - the response from the Imgur API
 * @returns {Object} An object containing an 'images' array of Object
 */
async function parse_search_response(obj) {
    const ret_obj = {
        images: []
    }
    obj.data.forEach(element => {
        var first_img_url = element.link;
        if (element.is_album == true) {
            first_img_url = element.images[0].link
        }
        if (first_img_url.indexOf(".mp4") != -1) {
            return;
        }
        ret_obj.images.push({
            'link': first_img_url,
            'title': element.title,
            'account_url': element.account_url
        });
    });
    return ret_obj
}

/**
 * Imgur API search call wrapper
 *
 * @param {String} search
 * @param {String} sort
 * @returns Returns the result of the search after being filtered through parse_search_response()
 */
async function search(search, sort) {
    let url_search_final = url_search.replace("{search}", search)
    if (sort != null) {
        url_search_final = url_search_final.replace("{/sort}", "/" + sort)
    } else {
        url_search_final = url_search_final.replace("{/sort}", "")
    }
    const obj = await fetch(url_search_final, {
      headers: {
        'Authorization': 'Client-ID ' + client_id
      }
    }).then(response => response.json());
    if (obj.status == 200 && obj.success == true) {
        return await parse_search_response(obj);
    } else {
        return null;
    }
}

module.exports.search = search;