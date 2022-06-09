//This makes the connection to the Heroku database
const Pool = require("pg").Pool

const connectionString =
  "postgres://dfednjmhursubc:d45adb7f62a940233bed9d25b7df30ab28e1f5a0ef23fc601cf28644b84a2c4a@ec2-34-198-186-145.compute-1.amazonaws.com:5432/dbq681jlmimuj5" //heroku addons

//This code is for the robert-walters-badbank (first one - origianl)
// const connectionString =
//   "postgres://bqqyemmcarboqe:de0838b13aa71322218d04f4321aa840a44f02942080b44dcb7ee2d9ffc6cd21@ec2-34-225-159-178.compute-1.amazonaws.com:5432/d9316431tj3hfp" //heroku addons

//Added the 'rejectUnauthorized' and set to false to bypass Heroku access errors-
const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
})

module.exports = pool
