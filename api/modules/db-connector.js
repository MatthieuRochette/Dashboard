const Client = require('pg').Client

/**
 * @returns a client object for connecting to the database
 */
function _createClient() {
  return new Client({
    user: process.env.POSTGRES_USER || "postgres",
    host: process.env.POSTGRES_HOSTNAME || "127.0.0.1",
    database: process.env.POSTGRES_DB || "postgres",
    password: process.env.POSTGRES_PASSWORD || "azertyuiop",
    port: process.env.POSTGRES_PORT || "5432",
  });
}

/**
 * Make a query to the database
 *
 * @param {String} q - the query string, using parameters ($1, $2 etc.)
 * @param {Array} params - the parameters for the query string
 * @returns the object the original database call returns. Refer to the database library documentation (in this case, node postgres)
 */
async function query(q, params) {
  var ret = null;
  const client = _createClient();
  try {
    await client.connect()
    ret = await client.query(q, params);
    return ret;
  } catch (err) {
    console.error(err);
    throw "User already exists";
  } finally {
    await client.end();
  }
}

module.exports.query = query;