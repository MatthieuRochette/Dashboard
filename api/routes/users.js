const express = require('express');
const bodyParser = require('body-parser');

const login_module = require('../modules/login');
const db_conn = require('../modules/db-connector');

const router = express.Router();
const jsonParser = bodyParser.json();

router.post('/sign_in', jsonParser, async (req, res) => {
  const ret = await login_module.signInNative(
    req.body.name, req.body.email, req.body.password, req.body.city
  );
  if (ret === true) {
    console.log("Created user " + req.body.name);
    res.sendStatus(201);
  } else
    res.status(403).send(ret);
});

router.post('/log_in', async (req, res) => {
  const ret = await login_module.logInNative(
    req.body.email, req.body.password
  );
  if (ret == true)
    res.sendStatus(202);
  else
    res.status(401).send("Invalid email or password");
});

router.get('/get_info/:email', async (req, res) => {
  const userdata = await db_conn.query(
    "select username, city from users where email = $1",
    [req.params.email]
  );
  const services = await db_conn.query(
    "select service from user_services where email = $1",
    [req.params.email]
  );
  let service_array = []
  for (let i = 0; i < services.rows.length; i++) {
    service_array.push(services.rows[i].service);
  }
  res.json({'account': userdata.rows[0], 'services': service_array});
})

router.post('/google_auth', async (req, res) => {
  const ret = await login_module.googleAuthManagement(req.body.google_id);
  if (ret != null) { //renvoyer l'email du compte
    res.status(200).json(ret);
  } else {
    res.sendStatus(400);
  }
})

router.post('/update_services', async (req, res) => {
  try {
    await db_conn.query("DELETE FROM user_services WHERE email = $1", [req.body.email]);
    for (let i = 0; i < req.body.services.length; i++) {
      await db_conn.query(
        "INSERT INTO user_services(email, service) SELECT $1, $2 WHERE NOT EXISTS (SELECT * FROM user_services WHERE email = $1 AND service = $2);",
        [req.body.email, req.body.services[i]]
      );
    }
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
})


module.exports = router;