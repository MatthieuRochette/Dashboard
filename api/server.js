const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = process.env.API_PORT || "3080";

app.use(cors())
app.use(express.json())

const weather_route = require('./routes/weather');
app.use("/weather", weather_route)

const cocktail_route = require('./routes/cocktail');
app.use("/cocktail", cocktail_route);

const users_route = require('./routes/users');
app.use("/users", users_route);

const jokes_route = require('./routes/jokes');
app.use("/jokes", jokes_route);

const nasa_route = require('./routes/nasa');
app.use("/nasa", nasa_route);

const news_route = require('./routes/news');
app.use("/news", news_route);

const imgur_route = require('./routes/imgur');
app.use("/imgur", imgur_route);

app.get("/about.json", async (req, res) => {
    const file = fs.readFileSync("./about.json");
    res.json(JSON.parse(file));
})

app.listen(port, () => { console.log('App running on port ' + port); });