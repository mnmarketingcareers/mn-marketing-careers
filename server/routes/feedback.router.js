const express = require('express');
const axios = require('axios');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// Handles POST request with new job seeker feedback, responses to database
// Additional POST to post feedback to DOM?
router.post('/', (req, res) => {
    // console.log('req.body is', req.body);
    const reason = req.body.reason;
    const message = req.body.message;
    // the query that's responsible for inserting user feedback into the feedback database table
    const queryText = `INSERT INTO "feedback" ("reason", "message")
    VALUES ($1, $2) RETURNING id;`;
    // this pools the query text and datafields and sends the data on to the database 
    pool
        .query(queryText, [reason, message])
        .then(() => res.sendStatus(201))
        .catch((err) => {
            console.log('feedback POST failed: ', err);
            res.sendStatus(500);
        })
})

// Handles GET request, get feedback data from database
// Access level for admin-only access
// wrap query around conditional that checks for access_level
router.get('/feedbacklist', rejectUnauthenticated, (req, res) => {
    // console.log('in router.get', req.user);
    
    if (req.user.access_level >= 1){
        const queryText = `SELECT * FROM "feedback";`;
        //not positive on what we are actually pooling here
        pool.query(queryText)
        .then(results => {
        res.send(results.rows);
        })
        .catch(err => {
        console.log('ERROR: GET all feedback', err);
        res.sendStatus(500);
        })
    }  
});

// Handles PUT request, change feedback archived status to TRUE
// Access level for admin-only access
router.put('/:id', rejectUnauthenticated, (req, res) => {
    
    if (req.user.access_level >= 1) {
        // this query updates the archive boolean status of a job seeker's feedback
        const queryText = `UPDATE "feedback" SET "archived" = NOT "archived" WHERE "id" = $1;`;
        const queryValues = [req.body.id];
        // this pools the query text and values and sends the updated data back to the database
        pool.query(queryText, queryValues)
        .then(() => { res.sendStatus(200); })
        .catch((err) => {
            console.log('Error completing UPDATE feedback query', err);
            res.sendStatus(500);
        });
    } 
});


module.exports = router;
