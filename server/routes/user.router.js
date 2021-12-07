const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles Ajax request for all users, if user is authenticated and has correct access level
router.get('/list', rejectUnauthenticated, (req, res) => {
  // check access level
  if (req.user.access_level > 1) {
    pool.query(
        `SELECT "id", "email", "first_name", "last_name", "access_level" 
        FROM "user" ORDER BY "id";`
    ).then(response => {
      console.log('User list Requested:', response);
      res.send(response.rows);
    }).catch(err => {
      console.log('Error fetching Users:', err);
      res.sendStatus(500);
    });
  } else {
    res.send({message: 'You do not have access to this content.'})
  }
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" (email, password, first_name, last_name)
    VALUES ($1, $2, $3, $4) RETURNING id`;
  pool
    .query(queryText, [username, password, req.body.first_name, req.body.last_name])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
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

// handles request to grant access
router.put('/grant/:id', rejectUnauthenticated, (req, res) => {
  if(req.user.access_level > 1) {
    // change user access level to 1
    const userToUpdate = req.params.id;
    pool.query(`UPDATE "user" SET "access_level" = 1 WHERE "id" = $1`, [userToUpdate])
    .then(response => {
      console.log('If updated show 1; if not, show 0: ', response.rowCount);
      res.sendStatus(201);
    })
  } else {
    res.send({message: 'You do not have access to this content.'})
  }
});

router.put('/remove/:id', rejectUnauthenticated, (req, res) => {
  if(req.user.access_level > 1) {
    // change user access level to 1
    const userToUpdate = req.params.id;
    pool.query(`UPDATE "user" SET "access_level" = 0 WHERE "id" = $1`, [userToUpdate])
    .then(response => {
      console.log('If updated show 1; if not, show 0: ', response.rowCount);
      res.sendStatus(201);
    })
  } else {
    res.send({message: 'You do not have access to this content.'})
  }
});

module.exports = router;
