const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');
const axios = require('axios');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', async (req, res, next) => {
  try {
    await pool.query('BEGIN');
    if (req.body.token) {
      // validate captcha token 
      const secretKey = process.env.REACT_APP_SECRET_KEY;
      const token = req.body.token;
      const validate = await axios.post(`
    https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}
    `)
      console.log('validation response', validate.data.success);
      if (validate.data.success != true) {
        const error = 'Captcha not validated';
        throw error;
      }

    } else {
      res.status(500).send('Captcha token required');
      return;
    }
    const username = req.body.username;
    const password = encryptLib.encryptPassword(req.body.password);

    const queryText = `INSERT INTO "user" (email, password, first_name, last_name)
    VALUES ($1, $2, $3, $4) RETURNING id`;
    await pool.query(queryText, [username, password, req.body.first_name, req.body.last_name])
    await pool.query('COMMIT');
    res.sendStatus(201)
  } catch (err) {
    console.log('User registration failed: ', err);
    await pool.query('ROLLBACK');
    res.sendStatus(500);
  }
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
