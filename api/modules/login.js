const fetch = require('node-fetch');
const bcrypt = require('bcrypt');
const db_conn = require('./db-connector');
const emailer = require('./emailer');

const url_google = "https://oauth2.googleapis.com/tokeninfo?id_token={token}"
const saltRounds = 10;

/**
 * Create a hash from a password string
 *
 * @param {String} passwd
 * @returns the hash in a String
 */
async function createHash(passwd) {
  return await bcrypt.hash(passwd, saltRounds);
}

/**
 * Compare a password string to a hash
 *
 * @param {String} passwd
 * @param {String} hash
 * @returns a boolean: true if it matched, false otherwise
 */
async function compareHash(passwd, hash) {
  return await bcrypt.compare(passwd, hash);
}

/**
 * Native sign in method (insert in the database and then send an email).
 * Checks the validity of the email with a regex.
 *
 * @param {String} username
 * @param {String} email
 * @param {String} password
 * @param {String} city
 * @returns true if the user was successfully registered
 * @returns a String containing the error message otherwise
 */
async function signInNative(username, email, password, city) {
  try {
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!regex.test(email))
      throw "Not a valid email";
    const hashed = await createHash(password);
    await db_conn.query(
      "insert into users values ($1, $2, $3, $4)",
      [email, username, hashed, city]
    );
  } catch (err) {
    console.error(err);
    return err;
  };
  const mailObj = await emailer.newTxtMail(
    email,
    "Confirmation de création d'un compte chez Yakaregarder !",
    "Bonjour " + username + " ! Merci d'avoir créé un compte sur notre plateforme. Vous pouvez dès à présent vous connecter. Si vous n'êtes à l'origine de la création de ce compte, veuillez nous contacter au plus vite en répondant à ce mail."
  );
  emailer.send(mailObj);
  return true;
}

/**
 * Native log in method.
 *
 * @param {String} email - email for the account
 * @param {String} passwd - password for the account
 * @returns true if the log in succeeded, false otherwise
 */
async function logInNative(email, passwd) {
  try {
    const obj = await db_conn.query(
      "select pw_hash from users where email = $1",
      [email]
    );
    return await compareHash(passwd, obj.rows[0].pw_hash);
  } catch (err) {
    console.error(err);
    return false;
  }
}

/**
 * Manage the Google Authentication method od authenticating
 *
 * @param {String} recv_google_id - the id_token received from OAuth2
 * @returns an object with basic informations about the account (email, name)
 */
async function googleAuthManagement(recv_google_id) {
  const res = await fetch(url_google.replace("{token}", recv_google_id))
    .then(function(response) { return response.json() });
  return {
    'email': res.email,
    'name': res.name
  };
}

module.exports.signInNative = signInNative;
module.exports.logInNative = logInNative;
module.exports.googleAuthManagement = googleAuthManagement;