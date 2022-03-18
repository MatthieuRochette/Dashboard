# Yakaregarder
*Epitech 3rd year - Dashboard project*

#### Authors
- Matthieu Rochette
- Théo Rohmer

## For deployment

1. Fill the .env file with your Gmail application credentials
2. Use the below command:

```sh
$ docker-compose up --build
```

to launch the app and press <Ctrl+C> to stop gracefully.  

Navigate to [your localhost on port 8080](http://localhost:8080) or your deployment FQDN to see the site.



## API routes

The API has a variety of routes, this is the official documentation about them.

All API routes begin with the FQDN where you deployed the website.
If deployed locally, you should use `http://localhost` instead of an IP address, otherwise some services (i.e. the Google authentication) won't work.

URL arguments are marked by a `:` in front of their name.


### Weather (Open Weather Map)

This weather service is based on the Open Weather Map (OWM) API.

#### Weather in a city
```
/api/weather/:city
```
Arguments:
- city: the city for which you want weather informations


### Cocktails

This cocktail service is based on the Cocktail DB API.

#### Search for a cocktail
```
/api/cocktail/search/ingredient/:ingredient
```
Arguments:
- ingredient: the ingredient you want to use in your cocktail


### Users

The user management of the site. Everything related to user accounts is found here.

#### Sign in
```
/api/users/sign_in
```
Body: name, email, password (not encrypted/hashed), city

#### Log in
```
/api/users/log_in
```
Body: email, password (not encrypted/hashed)

#### Get user account data
```
/api/users/get_info/:email
```
Arguments:
- email: the email of the user account you want information about

#### Google Authentication
```
/api/users/google_auth
```
Body: google_id (a.k.a. token_id)

#### Update chosen services
```
/api/users/update_services
```
Body:
- email: email of the account to update
- services: Array of all the services chosen (their String name)


### Jokes

This jokes service is based on the Blagues API.

#### Get a random joke from a given category
```
/api/jokes/:category
```
Arguments:
- category: the catogory of joke (find the list in the Blagues API reference). Special value accepted: `random`: uses a random category.


### NASA

This NASA service is based on the NASA APIs.

#### APOtD (Astrological Photography Of the Day)
```
/api/nasa/apod/:date
```
Arguments:
- date: the photo is assiociated with this date (format: "YYYY-MM-DD")

#### Mars Rover Image
This widget picks one photo among the latest photos taken by the Curiosity Mars Rover.
```
/api/nasa/mars/:camera
```
Arguments:
- camera: the camera of the Curiosity rover you want a photo from.


### News

This news service is based on the News API.

#### Search by category
```
/api/news/:category/:search
```
Arguments:
- category (mandatory): the category of news you want (business, tech...)
- search (optional): a specific search in that category.


### Imgur

This Imgur service is based on the Imgur API.

#### Search images on Imgur
```
/api/imgur/search/:sort/:q
```
Arguments:
- sort (optional): the sorting method for the search (time | top | viral)
- q (mandatory): the search query


### About.json
Get a JSON file describing the services and widgets of the API
```
/about.json
```
