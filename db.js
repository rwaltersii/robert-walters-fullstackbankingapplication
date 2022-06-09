//This makes the connection to the Heroku database
const Pool = require("pg").Pool

const connectionString =
  "postgres://bqqyemmcarboqe:de0838b13aa71322218d04f4321aa840a44f02942080b44dcb7ee2d9ffc6cd21@ec2-34-225-159-178.compute-1.amazonaws.com:5432/d9316431tj3hfp" //heroku addons

//Added the 'rejectUnauthorized' and set to false to bypass Heroku access errors-
const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
})

module.exports = pool
